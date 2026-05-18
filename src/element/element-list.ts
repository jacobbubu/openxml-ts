/**
 * 子元素集合 `OpenXmlElementList`（Story-2.1）。
 *
 * 与 `OpenXmlCompositeElement` 紧耦合：列表持有「拥有者」引用，append/insertBefore/
 * remove 时同步维护 `child.parent`，避免外部跳过便捷方法直接操作而导致 parent 失稳。
 */

import { OpenXmlPackageError } from "../packaging/errors.js";
import type { OpenXmlCompositeElement, OpenXmlElement } from "./element.js";

export class OpenXmlElementList implements Iterable<OpenXmlElement> {
  private readonly items: OpenXmlElement[] = [];

  constructor(private readonly owner: OpenXmlCompositeElement) {}

  /** 当前子元素数量。 */
  get count(): number {
    return this.items.length;
  }

  /** 按索引访问；越界返回 `undefined`。 */
  at(index: number): OpenXmlElement | undefined {
    return this.items[index];
  }

  /** 追加到末尾；维护 `child.parent`。 */
  append(child: OpenXmlElement): void {
    this.assertReparentable(child);
    this.items.push(child);
    child.parent = this.owner;
  }

  /** 把 `child` 插到 `sibling` 之前；`sibling` 必须是本列表的现有元素。 */
  insertBefore(child: OpenXmlElement, sibling: OpenXmlElement): void {
    const idx = this.items.indexOf(sibling);
    if (idx === -1) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: "insertBefore: sibling is not a child of this element",
      });
    }
    this.assertReparentable(child);
    this.items.splice(idx, 0, child);
    child.parent = this.owner;
  }

  /**
   * 移除指定子元素；命中返回 `true` 并清空其 `parent`，未命中返回 `false`。
   */
  remove(child: OpenXmlElement): boolean {
    const idx = this.items.indexOf(child);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    if (child.parent === this.owner) child.parent = undefined;
    return true;
  }

  /** 清空所有子元素。 */
  clear(): void {
    for (const child of this.items) {
      if (child.parent === this.owner) child.parent = undefined;
    }
    this.items.length = 0;
  }

  [Symbol.iterator](): IterableIterator<OpenXmlElement> {
    return this.items[Symbol.iterator]();
  }

  /** 返回当前快照副本——遍历过程中 mutate 不影响快照。 */
  toArray(): OpenXmlElement[] {
    return this.items.slice();
  }

  /**
   * 阻止把已经挂在别处的元素直接挂进来——会导致同一节点出现在两棵树，
   * 序列化产物错乱。调用方必须先 `oldParent.remove(child)` 再 append。
   */
  private assertReparentable(child: OpenXmlElement): void {
    if (child.parent !== undefined && child.parent !== this.owner) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message:
          "Cannot move an element that already has a parent; remove it from its current parent first",
      });
    }
    if (child === (this.owner as OpenXmlElement)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: "Cannot append an element to itself",
      });
    }
  }
}
