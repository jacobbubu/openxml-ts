/**
 * Element 注册表。
 *
 * `xml-deserialize` 在遇到 XML open tag 时按 `(namespaceUri, localName)` 在此查
 * 元素类构造器；未注册时降级为 {@link OpenXmlUnknownElement}。
 *
 * 注册典型在两处发生：
 * 1. **codegen 产物**（Story-2.5+）：`registerWordprocessingElements(registry)` 这类
 *    批量注入函数；调用方按需 import 来开启 typed 解析；
 * 2. **测试 / 手工扩展**：直接 `registry.register(ns, localName, ctor)`。
 *
 * **Lazy-import 设计**：库不会自动注册任何类——保留 tree-shake 友好（ADR-012）。
 * 调用方只引到 `Paragraph` 类时，registry 仍为空；只有显式调用注册函数后才填充。
 *
 * **Context-aware child resolution（Epic-86）**：每个复合父元素类可通过
 * `registerChildMap` 注册其 schema 声明的子元素映射，格式为
 * `parentClassName → Map<"ns:local", ElementFactory>`。反序列化时优先按此映射
 * 消歧同名子元素，只有父类无映射时才降级到全局扁平 lookup。
 */

import type { OpenXmlElement } from "./element.js";
import { strictToTransitional } from "./strict-namespace-map.js";

export type ElementFactory = new () => OpenXmlElement;

/** 子元素映射：`"namespaceUri|localName"` → ElementFactory。 */
export type ChildMap = ReadonlyMap<string, ElementFactory>;

export class ElementRegistry {
  private readonly map = new Map<string, ElementFactory>();
  /**
   * 父类名 → 子元素映射。key 为 `parentCtor.name`（JS class name），
   * value 为 `"namespaceUri|localName"` → ElementFactory。
   */
  private readonly childMaps = new Map<string, Map<string, ElementFactory>>();

  register(namespaceUri: string, localName: string, ctor: ElementFactory): void {
    this.map.set(this.key(namespaceUri, localName), ctor);
  }

  /**
   * 注册父类的子元素映射。`parentClassName` 为父 JS 类名（`SomeClass.name`）；
   * `entries` 为 `[namespaceUri, localName, childCtor]` 三元组数组。
   * 多次调用同一父类时合并（不覆盖已有条目）。
   */
  registerChildMap(
    parentClassName: string,
    entries: ReadonlyArray<readonly [string, string, ElementFactory]>,
  ): void {
    let m = this.childMaps.get(parentClassName);
    if (m === undefined) {
      m = new Map();
      this.childMaps.set(parentClassName, m);
    }
    for (const [ns, local, ctor] of entries) {
      m.set(this.key(ns, local), ctor);
    }
  }

  /**
   * 按父类上下文查子元素类。`parentClassName` 为 `parent.constructor.name`。
   * 命中父类的 child-map 则按 `(namespaceUri, localName)` 精确解析；
   * 未命中（父类无 child-map，或 child qname 不在映射中）返回 `undefined`，
   * 由调用方降级到全局 `lookup`。
   *
   * Strict ↔ Transitional 兜底与全局 lookup 对称。
   */
  lookupChild(
    parentClassName: string,
    namespaceUri: string,
    localName: string,
  ): ElementFactory | undefined {
    const m = this.childMaps.get(parentClassName);
    if (m === undefined) return undefined;
    const direct = m.get(this.key(namespaceUri, localName));
    if (direct !== undefined) return direct;
    const trans = strictToTransitional(namespaceUri);
    if (trans === namespaceUri) return undefined;
    return m.get(this.key(trans, localName));
  }

  /**
   * 按 (ns, localName) 查类。先按传入 ns 精确匹配；未命中时把 Strict URI
   * 翻成 Transitional 等价再试一次（Epic-8 Strict ↔ Transitional 兜底）。
   * 非 Strict 命名空间这层 fallback 零开销。
   */
  lookup(namespaceUri: string, localName: string): ElementFactory | undefined {
    const direct = this.map.get(this.key(namespaceUri, localName));
    if (direct !== undefined) return direct;
    const trans = strictToTransitional(namespaceUri);
    if (trans === namespaceUri) return undefined;
    return this.map.get(this.key(trans, localName));
  }

  has(namespaceUri: string, localName: string): boolean {
    if (this.map.has(this.key(namespaceUri, localName))) return true;
    const trans = strictToTransitional(namespaceUri);
    return trans !== namespaceUri && this.map.has(this.key(trans, localName));
  }

  clear(): void {
    this.map.clear();
    this.childMaps.clear();
  }

  get size(): number {
    return this.map.size;
  }

  private key(namespaceUri: string, localName: string): string {
    return `${namespaceUri}|${localName}`;
  }
}

/**
 * 进程级默认注册表。库代码不会自动写它；调用方/测试可显式注册以启用 typed 解析。
 */
export const elementRegistry = new ElementRegistry();
