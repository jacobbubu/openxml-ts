/**
 * OpenXmlElement 基类层级。
 *
 * 对位 .NET `DocumentFormat.OpenXml.OpenXmlElement` / `OpenXmlLeafElement` /
 * `OpenXmlCompositeElement`：
 *
 * - **OpenXmlElement**：所有元素的抽象基类，持有 namespace prefix / 本地名 /
 *   namespace URI、可选父节点、扩展属性，并定义 `writeTo` 与 `applyAttribute` 钩子；
 * - **OpenXmlLeafElement**：叶子元素，可有属性与文本内容，不能有子元素（如 `w:t`）；
 * - **OpenXmlCompositeElement**：复合元素，持有子元素集合，支持树操作（如 `w:p`、`w:body`）。
 *
 * 设计原则（架构 §3 / ADR-009）：mutable 属性 + 显式 mutation 方法；不绕到 getter/setter
 * 包装层。Validator 的 setter 注入在 Story-2.7 由 codegen 完成；属性派发与
 * `writeTo` 的覆盖也由 codegen 在 Story-2.5 完成。
 */

import { XmlWriter } from "../packaging/xml/index.js";
import type { OpenXmlElementList } from "./element-list.js";
import { FeatureCollection, type IFeatureCollection } from "./features.js";

/**
 * Element 构造器类型——抽象/具体均可。本类型仅用于 `instanceof` 类型守卫场景，
 * 调用方不会实际 `new`，因此参数用 `never[]` 让 TS 兼容任意签名的具体类。
 */
export type ElementCtor<T extends OpenXmlElement = OpenXmlElement> = abstract new (
  ...args: never[]
) => T;

export abstract class OpenXmlElement {
  /** XML 本地名，例如 `"p"`。 */
  abstract readonly localName: string;

  /** Namespace prefix，例如 `"w"`；包级无 prefix 元素留空字符串。 */
  abstract readonly prefix: string;

  /** Namespace URI。 */
  abstract readonly namespaceUri: string;

  /** 父节点（若已挂在某个复合元素下）。 */
  parent: OpenXmlCompositeElement | undefined;

  /**
   * 透传的扩展属性——任何在 schema 中未声明的属性都收纳在这里，写回时原样输出。
   * 用 `Map` 保插入顺序，便于字节级稳定 diff。
   */
  readonly extendedAttributes = new Map<string, string>();

  /** 序列化为 XML 片段；具体由 Leaf/Composite 子类提供默认实现，codegen 可重写。 */
  abstract writeTo(writer: XmlWriter): void;

  /**
   * 反序列化期被 deserializer 调用——把属性塞入元素。默认实现把所有 qname →
   * value 收纳到 {@link extendedAttributes}；codegen 生成的具体类会重写本方法，
   * 把已知属性派发到 typed setter。
   */
  applyAttribute(qname: string, value: string): void {
    this.extendedAttributes.set(qname, value);
  }

  /** XML 限定名（含 prefix），例如 `"w:p"`；空 prefix 时仅 `"p"`。 */
  get qualifiedName(): string {
    return this.prefix.length === 0 ? this.localName : `${this.prefix}:${this.localName}`;
  }

  /**
   * 收集要输出的属性列表。默认实现仅返回 {@link extendedAttributes} 的副本；
   * codegen 生成的具体类会重写为「先 typed 属性，后 extended」的合并。
   */
  protected collectAttributes(): Array<[string, string]> {
    return [...this.extendedAttributes.entries()];
  }

  // ---------------------------------------------------------------------------
  // Navigation（对位 .NET OpenXmlElement public navigation members）
  // ---------------------------------------------------------------------------

  /**
   * 当前元素的第一个子元素；叶子元素始终返回 `undefined`。
   *
   * 对位 .NET `OpenXmlElement.FirstChild`。
   */
  get firstChildElement(): OpenXmlElement | undefined {
    return undefined;
  }

  /**
   * 当前元素的最后一个子元素；叶子元素始终返回 `undefined`。
   *
   * 对位 .NET `OpenXmlElement.LastChild`。
   */
  get lastChildElement(): OpenXmlElement | undefined {
    return undefined;
  }

  /**
   * 当前元素是否有子元素。
   *
   * 对位 .NET `OpenXmlElement.HasChildren`。
   */
  get hasChildren(): boolean {
    return false;
  }

  /**
   * 当前元素在兄弟节点中的下一个元素；若无父节点或已是最后一个子节点，返回 `undefined`。
   *
   * 对位 .NET `OpenXmlElement.NextSibling()`。
   */
  nextSibling(): OpenXmlElement | undefined {
    if (this.parent === undefined) return undefined;
    const items = this.parent.children.toArray();
    const idx = items.indexOf(this);
    if (idx === -1 || idx === items.length - 1) return undefined;
    return items[idx + 1];
  }

  /**
   * 向后查找第一个匹配指定类型的兄弟节点。
   *
   * 对位 .NET `OpenXmlElement.NextSibling<T>()`。
   */
  nextSiblingOfType<T extends OpenXmlElement>(ctor: ElementCtor<T>): T | undefined {
    let el = this.nextSibling();
    while (el !== undefined) {
      if (el instanceof ctor) return el as T;
      el = el.nextSibling();
    }
    return undefined;
  }

  /**
   * 当前元素在兄弟节点中的上一个元素；若无父节点或已是第一个子节点，返回 `undefined`。
   *
   * 对位 .NET `OpenXmlElement.PreviousSibling()`。
   */
  previousSibling(): OpenXmlElement | undefined {
    if (this.parent === undefined) return undefined;
    const items = this.parent.children.toArray();
    const idx = items.indexOf(this);
    if (idx <= 0) return undefined;
    return items[idx - 1];
  }

  /**
   * 向前查找第一个匹配指定类型的兄弟节点。
   *
   * 对位 .NET `OpenXmlElement.PreviousSibling<T>()`。
   */
  previousSiblingOfType<T extends OpenXmlElement>(ctor: ElementCtor<T>): T | undefined {
    let el = this.previousSibling();
    while (el !== undefined) {
      if (el instanceof ctor) return el as T;
      el = el.previousSibling();
    }
    return undefined;
  }

  /**
   * 枚举当前元素的所有祖先（由近到远：parent → grandparent → …）。
   *
   * 对位 .NET `OpenXmlElement.Ancestors()`。
   */
  *ancestors(): IterableIterator<OpenXmlCompositeElement> {
    let anc: OpenXmlCompositeElement | undefined = this.parent;
    while (anc !== undefined) {
      yield anc;
      anc = anc.parent;
    }
  }

  /**
   * 枚举祖先中匹配指定类型的节点。
   *
   * 对位 .NET `OpenXmlElement.Ancestors<T>()`。
   */
  *ancestorsOfType<T extends OpenXmlElement>(ctor: ElementCtor<T>): IterableIterator<T> {
    let anc: OpenXmlCompositeElement | undefined = this.parent;
    while (anc !== undefined) {
      if (anc instanceof ctor) yield anc as T;
      anc = anc.parent;
    }
  }

  /**
   * 枚举在文档顺序中排在当前元素之前的所有同级节点（同一父元素，位置较早的）。
   *
   * 对位 .NET `OpenXmlElement.ElementsBefore()`。
   */
  *elementsBefore(): IterableIterator<OpenXmlElement> {
    if (this.parent === undefined) return;
    for (const el of this.parent.children) {
      if (el === this) return;
      yield el;
    }
  }

  /**
   * 枚举在文档顺序中排在当前元素之后的所有同级节点（同一父元素，位置较晚的）。
   *
   * 对位 .NET `OpenXmlElement.ElementsAfter()`。
   */
  *elementsAfter(): IterableIterator<OpenXmlElement> {
    let found = false;
    if (this.parent === undefined) return;
    for (const el of this.parent.children) {
      if (found) {
        yield el;
      } else if (el === this) {
        found = true;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Document order（对位 .NET IsBefore / IsAfter）
  // ---------------------------------------------------------------------------

  /**
   * 判断当前元素在文档顺序中是否位于 `other` 之前。
   *
   * 对位 .NET `OpenXmlElement.IsBefore(OpenXmlElement)`。
   */
  isBefore(other: OpenXmlElement): boolean {
    return getDocumentOrder(this, other) === "before";
  }

  /**
   * 判断当前元素在文档顺序中是否位于 `other` 之后。
   *
   * 对位 .NET `OpenXmlElement.IsAfter(OpenXmlElement)`。
   */
  isAfter(other: OpenXmlElement): boolean {
    return getDocumentOrder(this, other) === "after";
  }

  // ---------------------------------------------------------------------------
  // Mutation（self-remove / self-insert — on the base class）
  // ---------------------------------------------------------------------------

  /**
   * 从父节点中移除当前元素自身。若无父节点则抛出错误。
   *
   * 对位 .NET `OpenXmlElement.Remove()`。
   */
  removeSelf(): void {
    if (this.parent === undefined) {
      throw new Error("Cannot remove element: it has no parent");
    }
    this.parent.removeChild(this);
  }

  /**
   * 把 `newElement` 插到当前元素之后（作为其兄弟节点）。
   *
   * 对位 .NET `OpenXmlElement.InsertAfterSelf<T>(T)`。
   */
  insertAfterSelf<T extends OpenXmlElement>(newElement: T): T {
    if (this.parent === undefined) {
      throw new Error("Cannot insertAfterSelf: element has no parent");
    }
    return this.parent.insertAfter(newElement, this);
  }

  /**
   * 把 `newElement` 插到当前元素之前（作为其兄弟节点）。
   *
   * 对位 .NET `OpenXmlElement.InsertBeforeSelf<T>(T)`。
   */
  insertBeforeSelf<T extends OpenXmlElement>(newElement: T): T {
    if (this.parent === undefined) {
      throw new Error("Cannot insertBeforeSelf: element has no parent");
    }
    return this.parent.insertBefore(newElement, this);
  }

  // ---------------------------------------------------------------------------
  // Content（对位 .NET InnerText / OuterXml / CloneNode）
  // ---------------------------------------------------------------------------

  /**
   * 当前元素及其所有子元素的文本内容拼接。叶子元素实现见 {@link OpenXmlLeafElement}，
   * 复合元素实现见 {@link OpenXmlCompositeElement}。
   *
   * 对位 .NET `OpenXmlElement.InnerText`。
   */
  get innerText(): string {
    return "";
  }

  /**
   * 序列化当前元素（含子树）为 XML 字符串。
   *
   * 对位 .NET `OpenXmlElement.OuterXml`。
   */
  get outerXml(): string {
    const writer = new XmlWriter();
    this.writeTo(writer);
    return writer.toString();
  }

  // ---------------------------------------------------------------------------
  // Features（对位 .NET OpenXmlElement.Features / IFeatureCollection）
  // ---------------------------------------------------------------------------

  #features: IFeatureCollection | undefined;

  /**
   * 当前元素的特性集合（延迟初始化）。
   *
   * 对位 .NET `OpenXmlElement.Features`。用法示例：
   * ```ts
   * element.features.set(MyFeature, new MyFeatureImpl());
   * const feat = element.features.get(MyFeature); // MyFeatureImpl | undefined
   * ```
   */
  get features(): IFeatureCollection {
    if (this.#features === undefined) {
      this.#features = new FeatureCollection();
    }
    return this.#features;
  }

  /**
   * 克隆当前节点。`deep=true` 时递归复制整棵子树；`deep=false` 仅克隆本节点（不带子节点）。
   * 克隆的节点 `parent` 为 `undefined`。
   *
   * 对位 .NET `OpenXmlElement.CloneNode(bool deep)`。
   */
  abstract cloneNode(deep: boolean): OpenXmlElement;
}

// ---------------------------------------------------------------------------
// Leaf
// ---------------------------------------------------------------------------

export abstract class OpenXmlLeafElement extends OpenXmlElement {
  /**
   * 元素文本内容（适用于 `w:t` 这种 mixed content 的叶子节点）。
   * 未设置时为 `undefined`；空字符串 `""` 表示「确实是空文本节点」。
   */
  text: string | undefined;

  /** 叶子元素的 innerText 就是 {@link text}（若有）。 */
  override get innerText(): string {
    return this.text ?? "";
  }

  /** 叶子元素无子节点。 */
  override get hasChildren(): boolean {
    return false;
  }

  override writeTo(writer: XmlWriter): void {
    const qname = this.qualifiedName;
    const attrs = this.collectAttributes();
    if (this.text === undefined) {
      writer.empty(qname, attrs);
      return;
    }
    writer.open(qname, attrs).text(this.text).close(qname);
  }

  /**
   * 克隆当前叶子节点。`deep` 参数对叶子节点无实质影响（无子节点）。
   *
   * 对位 .NET `OpenXmlElement.CloneNode(bool deep)`。
   */
  override cloneNode(_deep: boolean): OpenXmlLeafElement {
    // Invoke the no-arg constructor of the concrete subclass so that
    // any field initialisers (e.g. typed attribute defaults) run correctly.
    // Generated leaf classes have no required constructor arguments.
    const clone = new (this.constructor as new () => OpenXmlLeafElement)();
    clone.text = this.text;
    for (const [k, v] of this.extendedAttributes) {
      clone.extendedAttributes.set(k, v);
    }
    return clone;
  }
}

// ---------------------------------------------------------------------------
// Composite
// ---------------------------------------------------------------------------

export abstract class OpenXmlCompositeElement extends OpenXmlElement {
  /**
   * 子元素集合。访问 `children` 直接得到列表；常用 mutation 走 {@link appendChild}
   * 等便捷方法，以确保 `parent` 字段被正确维护。
   */
  abstract readonly children: OpenXmlElementList;

  // ---------------------------------------------------------------------------
  // Navigation overrides
  // ---------------------------------------------------------------------------

  /**
   * 第一个子元素，对位 .NET `OpenXmlCompositeElement.FirstChild`。
   */
  override get firstChildElement(): OpenXmlElement | undefined {
    return this.children.at(0);
  }

  /**
   * 最后一个子元素，对位 .NET `OpenXmlCompositeElement.LastChild`。
   */
  override get lastChildElement(): OpenXmlElement | undefined {
    const count = this.children.count;
    if (count === 0) return undefined;
    return this.children.at(count - 1);
  }

  /**
   * 是否有子元素，对位 .NET `OpenXmlCompositeElement.HasChildren`。
   */
  override get hasChildren(): boolean {
    return this.children.count > 0;
  }

  // ---------------------------------------------------------------------------
  // innerText（复合：拼接所有子节点的 innerText）
  // ---------------------------------------------------------------------------

  /**
   * 当前元素所有子元素 `innerText` 的拼接。
   *
   * 对位 .NET `OpenXmlCompositeElement.InnerText`。
   */
  override get innerText(): string {
    let result = "";
    for (const child of this.children) {
      result += child.innerText;
    }
    return result;
  }

  // ---------------------------------------------------------------------------
  // Mutation
  // ---------------------------------------------------------------------------

  /**
   * 把 `child` 挂到末尾；返回 `child` 本身以便链式书写。
   *
   * 对位 .NET `OpenXmlCompositeElement.AppendChild<T>(T)`。
   */
  appendChild<T extends OpenXmlElement>(child: T): T {
    this.children.append(child);
    return child;
  }

  /**
   * 把多个子节点依次追加到末尾。
   *
   * 对位 .NET `OpenXmlElement.Append(IEnumerable<OpenXmlElement>)` /
   * `Append(params OpenXmlElement[])`.
   */
  append(...newChildren: OpenXmlElement[]): void {
    for (const child of newChildren) {
      this.children.append(child);
    }
  }

  /**
   * 把 `child` 插到子列表头部。
   *
   * 对位 .NET `OpenXmlCompositeElement.PrependChild<T>(T)`。
   */
  prependChild<T extends OpenXmlElement>(child: T): T {
    const first = this.children.at(0);
    if (first === undefined) {
      this.children.append(child);
    } else {
      this.children.insertBefore(child, first);
    }
    return child;
  }

  /**
   * 把 `child` 插到 `sibling` 之前；`sibling` 必须是本元素的现有子节点。
   *
   * 对位 .NET `OpenXmlCompositeElement.InsertBefore<T>(T, OpenXmlElement)`。
   */
  insertBefore<T extends OpenXmlElement>(child: T, sibling: OpenXmlElement): T {
    this.children.insertBefore(child, sibling);
    return child;
  }

  /**
   * 把 `child` 插到 `sibling` 之后；`sibling` 必须是本元素的现有子节点。
   * `sibling` 为 `undefined` 时等同于 {@link prependChild}。
   *
   * 对位 .NET `OpenXmlCompositeElement.InsertAfter<T>(T, OpenXmlElement?)`。
   */
  insertAfter<T extends OpenXmlElement>(child: T, sibling: OpenXmlElement | undefined): T {
    if (sibling === undefined) {
      return this.prependChild(child);
    }
    const nextEl = sibling.nextSibling();
    if (nextEl === undefined) {
      this.children.append(child);
      return child;
    }
    this.children.insertBefore(child, nextEl);
    return child;
  }

  /**
   * 把 `child` 插到指定索引位置（零基）。
   *
   * 对位 .NET `OpenXmlCompositeElement.InsertAt<T>(T, int)`。
   */
  insertAt<T extends OpenXmlElement>(child: T, index: number): T {
    const count = this.children.count;
    if (index < 0 || index > count) {
      throw new RangeError(`insertAt: index ${index} out of range [0, ${count}]`);
    }
    if (index === count) {
      this.children.append(child);
      return child;
    }
    const ref = this.children.at(index);
    if (ref === undefined) {
      this.children.append(child);
      return child;
    }
    this.children.insertBefore(child, ref);
    return child;
  }

  /**
   * 把 `oldChild` 从子集合中移除，返回被移除的元素。
   *
   * 对位 .NET `OpenXmlCompositeElement.RemoveChild<T>(T)`。
   */
  removeChild<T extends OpenXmlElement>(child: T): T {
    this.children.remove(child);
    return child;
  }

  /**
   * 移除所有子元素。
   *
   * 对位 .NET `OpenXmlCompositeElement.RemoveAllChildren()`。
   */
  removeAllChildren(): void {
    this.children.clear();
  }

  /**
   * 移除所有匹配指定类型的子元素。
   *
   * 对位 .NET `OpenXmlElement.RemoveAllChildren<T>()`。
   */
  removeAllChildrenOfType<T extends OpenXmlElement>(ctor: ElementCtor<T>): void {
    for (const child of this.children.toArray()) {
      if (child instanceof ctor) {
        this.children.remove(child);
      }
    }
  }

  /**
   * 用 `newChild` 替换 `oldChild`；`oldChild` 必须是本元素的现有子节点。
   * 返回被替换的 `oldChild`。
   *
   * 对位 .NET `OpenXmlCompositeElement.ReplaceChild<T>(OpenXmlElement, T)`。
   */
  replaceChild<T extends OpenXmlElement>(newChild: OpenXmlElement, oldChild: T): T {
    const ref = oldChild.nextSibling();
    this.children.remove(oldChild);
    if (ref === undefined) {
      this.children.append(newChild);
    } else {
      this.children.insertBefore(newChild, ref);
    }
    return oldChild;
  }

  /**
   * 把 `child` 从子集合中移除；返回是否命中（旧版便捷方法，保留向后兼容）。
   *
   * @deprecated 优先使用 {@link removeChild}（与 .NET SDK 命名一致）。
   */
  remove(child: OpenXmlElement): boolean {
    return this.children.remove(child);
  }

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  /**
   * 首个匹配的直接子元素；未命中返回 `undefined`。
   *
   * 对位 .NET `OpenXmlElement.GetFirstChild<T>()`。
   */
  getFirstChild<T extends OpenXmlElement>(ctor: ElementCtor<T>): T | undefined {
    for (const child of this.children) {
      if (child instanceof ctor) return child as T;
    }
    return undefined;
  }

  /**
   * 首个匹配的直接子元素；未命中返回 `undefined`。
   * 无 ctor 时返回第一个子元素（任意类型）。
   *
   * @deprecated 优先使用 {@link getFirstChild}（与 .NET SDK 命名一致）。
   */
  firstChild<T extends OpenXmlElement = OpenXmlElement>(ctor?: ElementCtor<T>): T | undefined {
    for (const child of this.children) {
      if (ctor === undefined || child instanceof ctor) {
        return child as T;
      }
    }
    return undefined;
  }

  /**
   * 直接子元素的迭代器；可选 `ctor` 过滤为某具体类。
   *
   * ```ts
   * for (const p of body.elements(Paragraph)) { ... }
   * ```
   *
   * 对位 .NET `OpenXmlElement.Elements()` / `Elements<T>()`。
   */
  *elements<T extends OpenXmlElement = OpenXmlElement>(ctor?: ElementCtor<T>): IterableIterator<T> {
    for (const child of this.children) {
      if (ctor === undefined || child instanceof ctor) {
        yield child as T;
      }
    }
  }

  /**
   * DFS 后代迭代器（深度优先，先访问当前节点的直接子，再递归）；可选 `ctor` 过滤。
   *
   * 注意：不包含 `this` 自身，只产生后代。
   *
   * 对位 .NET `OpenXmlElement.Descendants()` / `Descendants<T>()`。
   */
  *descendants<T extends OpenXmlElement = OpenXmlElement>(
    ctor?: ElementCtor<T>,
  ): IterableIterator<T> {
    for (const child of this.children) {
      if (ctor === undefined || child instanceof ctor) {
        yield child as T;
      }
      if (child instanceof OpenXmlCompositeElement) {
        yield* child.descendants(ctor);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Clone
  // ---------------------------------------------------------------------------

  /**
   * 克隆当前节点。`deep=true` 时递归复制整棵子树；`deep=false` 仅克隆本节点（不带子节点）。
   * 克隆的节点 `parent` 为 `undefined`。
   *
   * 对位 .NET `OpenXmlCompositeElement.CloneNode(bool deep)`。
   *
   * 注意：具体子类（如 `OpenXmlUnknownElement`）若构造器带必填参数，
   * 需自行重写本方法。
   */
  override cloneNode(deep: boolean): OpenXmlCompositeElement {
    // Call the no-arg constructor of the concrete subclass so that field
    // initialisers (including `children = new OpenXmlElementList(this)`) run.
    const clone = new (this.constructor as new () => OpenXmlCompositeElement)();
    for (const [k, v] of this.extendedAttributes) {
      clone.extendedAttributes.set(k, v);
    }
    if (deep) {
      for (const child of this.children) {
        clone.children.append(child.cloneNode(true));
      }
    }
    return clone;
  }

  // ---------------------------------------------------------------------------
  // Serialisation
  // ---------------------------------------------------------------------------

  override writeTo(writer: XmlWriter): void {
    const qname = this.qualifiedName;
    const attrs = this.collectAttributes();
    if (this.children.count === 0) {
      writer.empty(qname, attrs);
      return;
    }
    writer.open(qname, attrs);
    for (const c of this.children) c.writeTo(writer);
    writer.close(qname);
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Document-order comparison result. */
type DocOrder = "before" | "after" | "same" | "unrelated";

/**
 * Determine the document order of `a` relative to `b`.
 * Mirrors the logic in .NET `OpenXmlElement.GetOrder`.
 */
function getDocumentOrder(a: OpenXmlElement, b: OpenXmlElement): DocOrder {
  if (a === b) return "same";

  // Build ancestor stacks (element itself at index 0, root at end).
  const aPath = buildAncestorPath(a);
  const bPath = buildAncestorPath(b);

  // Walk from the root downward until paths diverge.
  let ai = aPath.length - 1;
  let bi = bPath.length - 1;

  if (aPath[ai] !== bPath[bi]) {
    return "unrelated"; // Different roots
  }

  while (ai >= 0 && bi >= 0 && aPath[ai] === bPath[bi]) {
    ai--;
    bi--;
  }

  // If ai < 0, `a` is an ancestor of `b` → a is before b.
  if (ai < 0) return "before";
  // If bi < 0, `b` is an ancestor of `a` → a is after b.
  if (bi < 0) return "after";

  // aPath[ai] and bPath[bi] are siblings under the same parent.
  const aNode = aPath[ai];
  const bNode = bPath[bi];
  if (aNode === undefined || bNode === undefined) return "unrelated";

  const par = aNode.parent;
  if (par === undefined) return "unrelated";

  for (const child of par.children) {
    if (child === aNode) return "before";
    if (child === bNode) return "after";
  }

  return "unrelated";
}

/** Returns [element, parent, grandparent, …] */
function buildAncestorPath(el: OpenXmlElement): OpenXmlElement[] {
  const path: OpenXmlElement[] = [el];
  let cur: OpenXmlCompositeElement | undefined = el.parent;
  while (cur !== undefined) {
    path.push(cur);
    cur = cur.parent;
  }
  return path;
}
