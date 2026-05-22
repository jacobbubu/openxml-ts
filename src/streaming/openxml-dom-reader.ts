/**
 * OpenXmlDomReader — 在内存元素树上运行的前向拉取游标（镜像 .NET SDK OpenXmlDomReader）。
 *
 * 设计原则：
 * - 与 `OpenXmlPartReader` 共享相同的公共接口（`read()`, `isStartElement`,
 *   `localName`, `loadCurrentElement()`, `attributes`, `depth` 等）；
 * - 底层遍历 `OpenXmlElement` 树，不做 XML 解析；
 * - `loadCurrentElement()` 直接返回当前元素对象（无需再次物化）；
 * - 对位 .NET `DocumentFormat.OpenXml.OpenXmlDomReader`，Epic-97 新增。
 *
 * 游标状态机（对位 .NET ElementState）：
 *   null → start* → [start* | end] → ... → EOF
 *
 * `read()` 语义（前序 DFS，对位 .NET MoveToNextElement）：
 *   - 首次调用：进入根元素 startElement。
 *   - 在 startElement：若有子节点，进入第一个子节点的 startElement；否则进入 endElement。
 *   - 在 endElement / leafStart：移动到下一兄弟的 startElement；若无，进入父级 endElement；
 *     若已是根，EOF。
 */

import type { OpenXmlCompositeElement, OpenXmlElement } from "../element/element.js";
import type { ElementRegistry } from "../element/registry.js";
import type { ReaderAttribute, ReaderNodeType } from "./openxml-part-reader.js";

// ---- Internal state enum ----

enum DomState {
  /** 未调用首次 read()。 */
  Null = "null",
  /** 当前位于元素的 startElement（复合元素有子节点时）。 */
  Start = "start",
  /** 当前位于叶子/无子节点复合元素的 startElement（下一步直接进 End）。 */
  LeafStart = "leafStart",
  /** 当前位于元素的 endElement。 */
  End = "end",
  /** 文档末尾。 */
  EOF = "eof",
}

// ---- OpenXmlDomReader ----

/**
 * 前向拉取游标，在 `OpenXmlElement` DOM 树上遍历，镜像 .NET `OpenXmlDomReader`。
 *
 * 用法示例：
 * ```ts
 * const reader = new OpenXmlDomReader(rootElement);
 * while (reader.read()) {
 *   if (reader.isStartElement && reader.localName === "body") {
 *     const el = reader.loadCurrentElement();
 *     break;
 *   }
 * }
 * ```
 */
export class OpenXmlDomReader {
  private readonly _root: OpenXmlElement;
  private readonly _registry: ElementRegistry | undefined;

  /**
   * 游标栈：每个条目是当前"关注"的元素。
   * - 栈顶 = 游标当前所指元素。
   * - 深度 = 栈长度 - 1（根元素深度为 0）。
   */
  private readonly _stack: OpenXmlElement[] = [];
  private _state: DomState = DomState.Null;

  /**
   * 构造 OpenXmlDomReader。
   *
   * @param element - 要遍历的根元素（或子树根）。
   * @param options - 可选注册表，用于 `elementType` 属性。
   *
   * 对位 .NET：
   * - `new OpenXmlDomReader(openXmlElement)` / `OpenXmlReader.Create(element)`
   */
  constructor(element: OpenXmlElement, options: { readonly registry?: ElementRegistry } = {}) {
    this._root = element;
    this._registry = options.registry;
  }

  // ---- Navigation ----

  /**
   * 前进到下一个节点；返回 `false` 表示已到达文档末尾（EOF）。
   * 镜像 .NET `Read()`。
   */
  read(): boolean {
    switch (this._state) {
      case DomState.Null:
        // First read: enter root element
        this._stack.push(this._root);
        this._state = this._computeState(this._root);
        return true;

      case DomState.Start: {
        // At a composite start: move to first child
        const current = this._stack[this._stack.length - 1];
        const firstChild = (current as OpenXmlCompositeElement).firstChildElement;
        if (firstChild !== undefined) {
          this._stack.push(firstChild);
          this._state = this._computeState(firstChild);
          return true;
        }
        // No children — go to end
        this._state = DomState.End;
        return true;
      }

      case DomState.LeafStart:
        // Leaf start: immediately go to end of this element
        this._state = DomState.End;
        return true;

      case DomState.End:
      case DomState.EOF:
        return this._moveToNextSiblingOrParentEnd();

      default:
        return false;
    }
  }

  /**
   * 移动到当前元素的第一个子节点（startElement）。
   * 若当前节点不是 startElement 或没有子节点，返回 `false`。
   * 镜像 .NET `ReadFirstChild()`。
   */
  readFirstChild(): boolean {
    if (this._state !== DomState.Start) return false;
    const current = this._stack[this._stack.length - 1];
    const firstChild = (current as OpenXmlCompositeElement).firstChildElement;
    if (firstChild === undefined) {
      this._state = DomState.End;
      return false;
    }
    this._stack.push(firstChild);
    this._state = this._computeState(firstChild);
    return true;
  }

  /**
   * 跳过当前元素的所有子节点，移动到下一个同级节点的 startElement（或父级的 endElement）。
   * 镜像 .NET `ReadNextSibling()`。
   */
  readNextSibling(): boolean {
    if (this._state === DomState.Start || this._state === DomState.LeafStart) {
      // Skip subtree: go straight to sibling
      this._state = DomState.End;
    }
    return this._moveToNextSiblingOrParentEnd();
  }

  /**
   * 跳过当前元素整个子树，停在其 endElement 之后的下一节点。
   * 镜像 .NET `Skip()`。
   */
  skip(): boolean {
    if (this._state === DomState.Start || this._state === DomState.LeafStart) {
      this._state = DomState.End;
    }
    return this._moveToNextSiblingOrParentEnd();
  }

  // ---- Current node properties ----

  /** 当前节点的本地名。 */
  get localName(): string {
    return this._stack.length > 0 ? (this._stack[this._stack.length - 1]?.localName ?? "") : "";
  }

  /** 当前节点的 namespace prefix。 */
  get prefix(): string {
    return this._stack.length > 0 ? (this._stack[this._stack.length - 1]?.prefix ?? "") : "";
  }

  /** 当前节点的 namespace URI。 */
  get namespaceUri(): string {
    return this._stack.length > 0 ? (this._stack[this._stack.length - 1]?.namespaceUri ?? "") : "";
  }

  /** 当前节点是否为 startElement（包括 leafStart）。 */
  get isStartElement(): boolean {
    return this._state === DomState.Start || this._state === DomState.LeafStart;
  }

  /** 当前节点是否为 endElement。 */
  get isEndElement(): boolean {
    return this._state === DomState.End;
  }

  /** DOM 读取器中文本节点由 `getText()` 返回；isMiscNode 固定为 false。 */
  get isMiscNode(): boolean {
    return false;
  }

  /**
   * 当前节点的属性列表（startElement 时有效）。
   * 从元素的 `extendedAttributes` + `collectAttributes()` 收集。
   */
  get attributes(): readonly ReaderAttribute[] {
    if (!this.isStartElement || this._stack.length === 0) return [];
    const el = this._stack[this._stack.length - 1];
    if (el === undefined) return [];
    // Collect via the public extendedAttributes; typed attrs are merged there by codegen
    const result: ReaderAttribute[] = [];
    for (const [name, value] of el.extendedAttributes) {
      result.push({ name, value });
    }
    return result;
  }

  /** 当前节点在文档中的嵌套深度（root = 0）。 */
  get depth(): number {
    if (this._stack.length === 0) return 0;
    return this._stack.length - 1;
  }

  /** 是否已到达 EOF。 */
  get eof(): boolean {
    return this._state === DomState.EOF;
  }

  /**
   * 已在 ElementRegistry 中注册的元素类构造器（startElement 时有效）。
   * 未注册时返回 `undefined`。
   */
  get elementType(): (new () => OpenXmlElement) | undefined {
    if (!this.isStartElement || this._registry === undefined || this._stack.length === 0) {
      return undefined;
    }
    const el = this._stack[this._stack.length - 1];
    if (el === undefined) return undefined;
    return this._registry.lookup(el.namespaceUri, el.localName);
  }

  /**
   * 节点类型（对位 `ReaderNodeType`）。
   */
  get nodeType(): ReaderNodeType {
    if (this._state === DomState.Start || this._state === DomState.LeafStart) return "startElement";
    if (this._state === DomState.End) return "endElement";
    return "none";
  }

  /**
   * 当前文本内容（若当前元素是叶文本元素 `OpenXmlLeafTextElement` 时有效）。
   * 镜像 .NET `GetText()`。
   */
  getText(): string {
    if (!this.isStartElement || this._stack.length === 0) return "";
    const el = this._stack[this._stack.length - 1];
    if (el === undefined) return "";
    // Duck-type check for OpenXmlLeafTextElement (has `text` property)
    if ("text" in el && typeof (el as unknown as { text: unknown }).text === "string") {
      return (el as unknown as { text: string }).text;
    }
    return "";
  }

  // ---- Materialization ----

  /**
   * 返回当前 startElement 对应的 `OpenXmlElement` 实例，并将游标推进到该元素的
   * endElement（对位 .NET `LoadCurrentElement()` DOM 语义）。
   *
   * 注意：与 `OpenXmlPartReader` 不同，这里直接返回树中的元素对象（无需反序列化）。
   */
  loadCurrentElement(): OpenXmlElement | undefined {
    if (!this.isStartElement || this._stack.length === 0) return undefined;
    const el = this._stack[this._stack.length - 1];
    // Move cursor to endElement of this element
    this._state = DomState.End;
    return el;
  }

  // ---- Private helpers ----

  /**
   * 计算元素应该进入哪种 start 状态（复合有子 → Start，其他 → LeafStart）。
   */
  private _computeState(el: OpenXmlElement): DomState {
    if (el.hasChildren) return DomState.Start;
    return DomState.LeafStart;
  }

  /**
   * 从当前 End 状态移动到下一个兄弟的 startElement，或父级的 endElement。
   * 若无父级（根 endElement），转为 EOF。
   */
  private _moveToNextSiblingOrParentEnd(): boolean {
    if (this._state === DomState.EOF) return false;

    // Pop current element
    const current = this._stack.pop();
    if (current === undefined || this._stack.length === 0) {
      // Popped root — EOF
      this._state = DomState.EOF;
      return false;
    }

    // Try next sibling
    const sibling = current.nextSibling();
    if (sibling !== undefined) {
      this._stack.push(sibling);
      this._state = this._computeState(sibling);
      return true;
    }

    // No more siblings — parent end
    this._state = DomState.End;
    return true;
  }
}
