/**
 * OpenXmlPartReader — 前向拉取游标（镜像 .NET SDK OpenXmlPartReader）。
 *
 * 设计原则：
 * - 同步拉取模型：`read()` 返回 boolean（false = EOF）；
 * - 底层复用 `tokenizeXml` tokenizer；
 * - `loadCurrentElement()` 利用 `deserialize` 从捕获的 XML 片段物化子树；
 * - 无 Node Readable / async-iterator（SDK 风格）。
 * - 支持从 `IPackagePart` 同步构造（Epic-97）。
 */

import type { MemoryPackagePart } from "../backends/memory/memory-package-part.js";
import type { OpenXmlElement } from "../element/element.js";
import type { ElementRegistry } from "../element/registry.js";
import { type DeserializeOptions, deserialize } from "../element/xml-deserialize.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import { xmlEscapeAttr, xmlEscapeText } from "../packaging/xml/escape.js";
import { type XmlToken, tokenizeXml } from "../packaging/xml/tokenizer.js";

// ---- Public types ----

export interface ReaderAttribute {
  readonly name: string;
  readonly value: string;
}

/** 游标当前节点类型。 */
export type ReaderNodeType = "startElement" | "endElement" | "text" | "none";

// ---- Internal node representation ----

interface StartNode {
  readonly kind: "startElement";
  readonly localName: string;
  readonly prefix: string;
  readonly namespaceUri: string;
  readonly qualifiedName: string;
  readonly attributes: readonly ReaderAttribute[];
  readonly depth: number;
  readonly selfClosing: boolean;
}

interface EndNode {
  readonly kind: "endElement";
  readonly localName: string;
  readonly prefix: string;
  readonly namespaceUri: string;
  readonly qualifiedName: string;
  readonly depth: number;
}

interface TextNode {
  readonly kind: "text";
  readonly value: string;
  readonly depth: number;
}

type ReaderNode = StartNode | EndNode | TextNode;

// ---- Namespace scope utilities ----

type NsScope = ReadonlyMap<string, string>;

function collectNsDeclarations(attrs: ReadonlyMap<string, string>): ReadonlyMap<string, string> {
  const out = new Map<string, string>();
  for (const [k, v] of attrs) {
    if (k === "xmlns") out.set("", v);
    else if (k.startsWith("xmlns:")) out.set(k.slice(6), v);
  }
  return out;
}

function mergeScope(parent: NsScope, local: ReadonlyMap<string, string>): NsScope {
  if (local.size === 0) return parent;
  const m = new Map(parent);
  for (const [k, v] of local) m.set(k, v);
  return m;
}

function resolveQName(
  qname: string,
  scope: NsScope,
): { prefix: string; localName: string; namespaceUri: string } {
  const colon = qname.indexOf(":");
  const prefix = colon === -1 ? "" : qname.slice(0, colon);
  const localName = colon === -1 ? qname : qname.slice(colon + 1);
  const namespaceUri = scope.get(prefix) ?? "";
  return { prefix, localName, namespaceUri };
}

// ---- XML snippet reconstruction (for loadCurrentElement) ----

function attrsToXml(attrs: readonly ReaderAttribute[]): string {
  let s = "";
  for (const a of attrs) {
    s += ` ${a.name}="${xmlEscapeAttr(a.value)}"`;
  }
  return s;
}

// ---- OpenXmlPartReader ----

export interface OpenXmlPartReaderOptions {
  /** 元素注册表；用于 `elementType` 属性和 `loadCurrentElement()`。 */
  readonly registry?: ElementRegistry;
}

/**
 * 前向拉取游标，镜像 .NET `DocumentFormat.OpenXml.OpenXmlPartReader`。
 *
 * 用法示例：
 * ```ts
 * const reader = new OpenXmlPartReader(xmlString, { registry });
 * while (reader.read()) {
 *   if (reader.isStartElement && reader.localName === "body") {
 *     const el = reader.loadCurrentElement();
 *     // el 是已物化的 typed element 子树
 *     break;
 *   }
 * }
 * ```
 */
export class OpenXmlPartReader {
  private readonly _tokens: Generator<XmlToken>;
  private readonly _registry: ElementRegistry | undefined;

  /** 预读缓冲区（未消费的节点队列）。 */
  private readonly _buffer: ReaderNode[] = [];

  /** 命名空间作用域栈；每层对应一个未关闭的 start element。 */
  private readonly _scopeStack: NsScope[] = [];

  private _current: ReaderNode | undefined;
  private _eof = false;

  /**
   * 构造 OpenXmlPartReader。
   *
   * @param source - XML 字符串（Epic-80 原有方式），或 `IPackagePart`（Epic-97 新增：
   *   从 part 的字节内容同步读 XML）。
   * @param options - 可选注册表等选项。
   *
   * 对位 .NET：
   * - `new OpenXmlPartReader(xmlString)` — 原有
   * - `new OpenXmlPartReader(openXmlPart)` / `OpenXmlReader.Create(part)` — Epic-97
   */
  constructor(source: string | IPackagePart, options: OpenXmlPartReaderOptions = {}) {
    let xml: string;
    if (typeof source === "string") {
      xml = source;
    } else {
      // IPackagePart — read synchronously via snapshot (MemoryPackagePart)
      const bytes = (source as MemoryPackagePart).snapshot();
      xml = new TextDecoder("utf-8").decode(bytes);
    }
    this._tokens = tokenizeXml(xml);
    this._registry = options.registry;
  }

  // ---- Navigation ----

  /**
   * 前进到下一个节点；返回 `false` 表示已到达文档末尾（EOF）。
   * 镜像 .NET `Read()`。
   */
  read(): boolean {
    const node = this._nextNode();
    if (node === undefined) {
      this._current = undefined;
      this._eof = true;
      return false;
    }
    this._current = node;
    return true;
  }

  /**
   * 跳过当前元素的所有子节点，移动到下一个同级节点的 startElement（或父级的
   * endElement）。镜像 .NET `ReadNextSibling()`。
   *
   * 若当前节点不是 startElement，行为等同 `read()`。
   * 返回 `false` 表示无下一个同级（已到 EOF 或父级关闭）。
   */
  readNextSibling(): boolean {
    if (this._current?.kind === "startElement" && !this._current.selfClosing) {
      this._skipToEndOfCurrent();
    }
    return this.read();
  }

  /**
   * 移动到当前元素的第一个子节点（startElement）。
   * 若当前节点不是 startElement 或没有子节点，返回 `false`。
   * 镜像 .NET `ReadFirstChild()`。
   */
  readFirstChild(): boolean {
    if (this._current?.kind !== "startElement" || this._current.selfClosing) {
      return false;
    }
    return this.read();
  }

  /**
   * 跳过当前元素整个子树，停在其 endElement 之后的下一节点。
   * 镜像 .NET `Skip()`。
   */
  skip(): boolean {
    if (this._current?.kind === "startElement" && !this._current.selfClosing) {
      this._skipToEndOfCurrent();
      // consume the end element itself
      this._nextNode();
    }
    return this.read();
  }

  // ---- Current node properties ----

  /** 当前节点的本地名（标签名中 prefix 之后的部分）。 */
  get localName(): string {
    return (this._current as StartNode | EndNode | undefined)?.localName ?? "";
  }

  /** 当前节点的 namespace prefix。 */
  get prefix(): string {
    return (this._current as StartNode | EndNode | undefined)?.prefix ?? "";
  }

  /** 当前节点的 namespace URI。 */
  get namespaceUri(): string {
    return (this._current as StartNode | EndNode | undefined)?.namespaceUri ?? "";
  }

  /** 当前节点是否为 startElement（包括 self-closing）。 */
  get isStartElement(): boolean {
    return this._current?.kind === "startElement";
  }

  /** 当前节点是否为 endElement。 */
  get isEndElement(): boolean {
    return this._current?.kind === "endElement";
  }

  /** 当前节点是否为文本节点。 */
  get isMiscNode(): boolean {
    return this._current?.kind === "text";
  }

  /** 当前节点的 XML 属性列表（startElement 时有效，其他情况返回空数组）。 */
  get attributes(): readonly ReaderAttribute[] {
    if (this._current?.kind === "startElement") return this._current.attributes;
    return [];
  }

  /** 当前节点在文档中的嵌套深度（root = 0）。 */
  get depth(): number {
    return this._current?.depth ?? 0;
  }

  /** 是否已到达 EOF（`read()` 返回 false 之后）。 */
  get eof(): boolean {
    return this._eof;
  }

  /**
   * 已在 ElementRegistry 中注册的元素类构造器（startElement 时有效）。
   * 未注册时返回 `undefined`。
   */
  get elementType(): (new () => OpenXmlElement) | undefined {
    if (this._current?.kind !== "startElement") return undefined;
    if (this._registry === undefined) return undefined;
    return this._registry.lookup(this._current.namespaceUri, this._current.localName);
  }

  /**
   * 当前文本节点的字符串内容（isMiscNode 为 true 时有效）。
   */
  getText(): string {
    if (this._current?.kind === "text") return this._current.value;
    return "";
  }

  // ---- Materialization ----

  /**
   * 将当前 startElement 及其整个子树物化为 typed `OpenXmlElement`，并将游标推进
   * 到该元素 endElement 之后的下一节点（或 EOF）。
   *
   * 镜像 .NET `LoadCurrentElement()`。
   *
   * 当前节点不是 startElement 时返回 `undefined`。
   */
  loadCurrentElement(): OpenXmlElement | undefined {
    if (this._current?.kind !== "startElement") return undefined;
    const start = this._current;

    // Reconstruct the XML snippet for this subtree.
    // We capture tokens until we close this element, re-encoding into XML.
    // IMPORTANT: inject all in-scope namespace bindings that are not already
    // declared in this element's own attributes, so that deserialize() can
    // resolve namespace prefixes defined on ancestor elements.
    const snippetParts: string[] = [];
    snippetParts.push(this._startNodeToXmlWithInheritedNs(start));

    if (!start.selfClosing) {
      // Collect all tokens until the matching end element
      this._collectSubtreeXml(start.depth, snippetParts);
      snippetParts.push(`</${start.qualifiedName}>`);
    }

    const xml = snippetParts.join("");
    const opts: DeserializeOptions =
      this._registry !== undefined ? { registry: this._registry } : {};

    let element: OpenXmlElement;
    try {
      element = deserialize(xml, opts);
    } catch {
      return undefined;
    }

    // Advance past the element (read next node)
    this.read();
    return element;
  }

  // ---- Private helpers ----

  /**
   * Pull the next pre-resolved node from the buffer, or advance the generator.
   */
  private _nextNode(): ReaderNode | undefined {
    if (this._buffer.length > 0) return this._buffer.shift();
    return this._advanceGenerator();
  }

  /**
   * Advance the token generator and convert to a ReaderNode, handling namespace
   * resolution with the scope stack.
   */
  private _advanceGenerator(): ReaderNode | undefined {
    while (true) {
      const result = this._tokens.next();
      if (result.done) return undefined;
      const token = result.value;

      if (token.kind === "decl") continue;

      if (token.kind === "open") {
        const parentScope =
          this._scopeStack.length > 0
            ? this._scopeStack[this._scopeStack.length - 1]
            : (new Map() as NsScope);
        const localDecls = collectNsDeclarations(token.attrs);
        const scope = mergeScope(parentScope ?? new Map(), localDecls);
        const { prefix, localName, namespaceUri } = resolveQName(token.name, scope);
        const depth = this._scopeStack.length;

        // Build attributes list (include xmlns decls)
        const attrs: ReaderAttribute[] = [];
        for (const [k, v] of token.attrs) {
          attrs.push({ name: k, value: v });
        }

        const node: StartNode = {
          kind: "startElement",
          localName,
          prefix,
          namespaceUri,
          qualifiedName: token.name,
          attributes: attrs,
          depth,
          selfClosing: token.selfClosing,
        };

        if (!token.selfClosing) {
          this._scopeStack.push(scope);
        }

        return node;
      }

      if (token.kind === "close") {
        const scope = this._scopeStack.pop();
        const depth = this._scopeStack.length;
        const parentScope = scope ?? new Map<string, string>();
        const { prefix, localName, namespaceUri } = resolveQName(
          token.name,
          parentScope as NsScope,
        );

        const node: EndNode = {
          kind: "endElement",
          localName,
          prefix,
          namespaceUri,
          qualifiedName: token.name,
          depth,
        };
        return node;
      }

      if (token.kind === "text") {
        const depth = this._scopeStack.length;
        const node: TextNode = {
          kind: "text",
          value: token.value,
          depth,
        };
        return node;
      }
    }
  }

  /**
   * Skip forward until the end element matching the current startElement's depth.
   * After this call, the endElement node has been consumed from the generator but
   * NOT placed in the buffer.
   */
  private _skipToEndOfCurrent(): void {
    const targetDepth = this._current?.depth ?? 0;
    while (true) {
      const node = this._advanceGenerator();
      if (node === undefined) break;
      if (node.kind === "endElement" && node.depth === targetDepth) break;
    }
  }

  /**
   * Collect the inner XML of the current element subtree into `parts`.
   * Stops just before the matching end tag (does not include the end tag itself).
   */
  private _collectSubtreeXml(startDepth: number, parts: string[]): void {
    while (true) {
      const node = this._advanceGenerator();
      if (node === undefined) break;

      if (node.kind === "endElement") {
        if (node.depth === startDepth) {
          // This IS the matching end element — do NOT include it, and stop.
          break;
        }
        // Inner end element
        parts.push(`</${node.qualifiedName}>`);
        continue;
      }

      if (node.kind === "startElement") {
        parts.push(this._startNodeToXml(node));
        continue;
      }

      if (node.kind === "text") {
        parts.push(xmlEscapeText(node.value));
      }
    }
  }

  private _startNodeToXml(node: StartNode): string {
    const attrStr = attrsToXml(node.attributes);
    if (node.selfClosing) return `<${node.qualifiedName}${attrStr}/>`;
    return `<${node.qualifiedName}${attrStr}>`;
  }

  /**
   * Like `_startNodeToXml` but also injects any in-scope namespace bindings
   * that are inherited from ancestor elements and not already present in the
   * node's own attributes. This ensures `deserialize()` can resolve namespace
   * prefixes even when this element is serialized in isolation.
   */
  private _startNodeToXmlWithInheritedNs(node: StartNode): string {
    // Collect namespace bindings already declared in this element's attrs
    const declaredPrefixes = new Set<string>();
    for (const a of node.attributes) {
      if (a.name === "xmlns") declaredPrefixes.add("");
      else if (a.name.startsWith("xmlns:")) declaredPrefixes.add(a.name.slice(6));
    }

    // The current scope (at node.depth) is scopeStack[node.depth] — but by
    // the time loadCurrentElement() is called, _scopeStack has the scope for
    // depth = node.depth already pushed (we entered this element). So the
    // current full scope is _scopeStack[node.depth].
    const currentScope: NsScope =
      node.depth < this._scopeStack.length
        ? (this._scopeStack[node.depth] ?? new Map())
        : new Map();

    // Build extra xmlns attrs for inherited bindings not already declared
    const extraAttrs: ReaderAttribute[] = [];
    for (const [prefix, uri] of currentScope) {
      if (uri.length === 0) continue; // skip empty-URI bindings
      const attrName = prefix.length === 0 ? "xmlns" : `xmlns:${prefix}`;
      if (!declaredPrefixes.has(prefix)) {
        extraAttrs.push({ name: attrName, value: uri });
      }
    }

    const allAttrs = [...node.attributes, ...extraAttrs];
    const attrStr = attrsToXml(allAttrs);
    if (node.selfClosing) return `<${node.qualifiedName}${attrStr}/>`;
    return `<${node.qualifiedName}${attrStr}>`;
  }
}
