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

import type { XmlWriter } from "../packaging/xml/index.js";
import type { OpenXmlElementList } from "./element-list.js";

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
}

export abstract class OpenXmlLeafElement extends OpenXmlElement {
  /**
   * 元素文本内容（适用于 `w:t` 这种 mixed content 的叶子节点）。
   * 未设置时为 `undefined`；空字符串 `""` 表示「确实是空文本节点」。
   */
  text: string | undefined;

  override writeTo(writer: XmlWriter): void {
    const qname = this.qualifiedName;
    const attrs = this.collectAttributes();
    if (this.text === undefined) {
      writer.empty(qname, attrs);
      return;
    }
    writer.open(qname, attrs).text(this.text).close(qname);
  }
}

export abstract class OpenXmlCompositeElement extends OpenXmlElement {
  /**
   * 子元素集合。访问 `children` 直接得到列表；常用 mutation 走 {@link appendChild}
   * 等便捷方法，以确保 `parent` 字段被正确维护。
   */
  abstract readonly children: OpenXmlElementList;

  /** 把 `child` 挂到末尾；返回 `child` 本身以便链式书写。 */
  appendChild<T extends OpenXmlElement>(child: T): T {
    this.children.append(child);
    return child;
  }

  /** 把 `child` 插到 `sibling` 之前；`sibling` 必须是本元素的现有子节点。 */
  insertBefore<T extends OpenXmlElement>(child: T, sibling: OpenXmlElement): T {
    this.children.insertBefore(child, sibling);
    return child;
  }

  /** 把 `child` 从子集合中移除；返回是否命中。 */
  remove(child: OpenXmlElement): boolean {
    return this.children.remove(child);
  }

  /**
   * 直接子元素的迭代器；可选 `ctor` 过滤为某具体类。
   *
   * ```ts
   * for (const p of body.elements(Paragraph)) { ... }
   * ```
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

  /** 首个匹配的直接子元素；未命中返回 `undefined`。 */
  firstChild<T extends OpenXmlElement = OpenXmlElement>(ctor?: ElementCtor<T>): T | undefined {
    for (const child of this.children) {
      if (ctor === undefined || child instanceof ctor) {
        return child as T;
      }
    }
    return undefined;
  }

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
