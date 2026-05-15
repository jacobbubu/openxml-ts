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
 */

import type { OpenXmlElement } from "./element.js";

export type ElementFactory = new () => OpenXmlElement;

export class ElementRegistry {
  private readonly map = new Map<string, ElementFactory>();

  register(namespaceUri: string, localName: string, ctor: ElementFactory): void {
    this.map.set(this.key(namespaceUri, localName), ctor);
  }

  lookup(namespaceUri: string, localName: string): ElementFactory | undefined {
    return this.map.get(this.key(namespaceUri, localName));
  }

  has(namespaceUri: string, localName: string): boolean {
    return this.map.has(this.key(namespaceUri, localName));
  }

  clear(): void {
    this.map.clear();
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
