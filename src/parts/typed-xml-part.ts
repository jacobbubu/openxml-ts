/**
 * `TypedXmlPart<T>` —— 把一个 `IPackagePart` 的字节流和一个 typed element 树连起来。
 *
 * 设计：
 * - 首次访问 `root` 触发懒加载：part bytes → deserialize → typed element instance；
 * - `set root` 直接替换缓存，不立刻刷盘；
 * - `flushAsync()` 序列化回 part bytes（由 WordprocessingDocument.saveAsync 统一调）；
 * - 空 part（新建场景）懒构造默认实例。
 */

import type { MemoryPackagePart } from "../backends/memory/memory-package-part.js";
import {
  type ElementRegistry,
  type OpenXmlElement,
  deserialize,
  serialize,
} from "../element/index.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";

export abstract class TypedXmlPart<T extends OpenXmlElement> {
  protected _root: T | undefined;
  protected _loaded = false;

  constructor(
    protected readonly _part: IPackagePart,
    protected readonly registry: ElementRegistry,
    protected readonly RootCtor: new () => T,
  ) {}

  /** 原始 IPackagePart 句柄（用于查 part-level relationships 等）。 */
  get part(): IPackagePart {
    return this._part;
  }

  /** 懒加载 typed 根元素。多次访问返回同一实例。 */
  get root(): T {
    if (!this._loaded) this.load();
    if (this._root === undefined) {
      this._root = new this.RootCtor();
      this._loaded = true;
    }
    return this._root;
  }

  /** 替换 typed 根元素；后续 flush 会用新实例序列化。 */
  set root(value: T) {
    this._root = value;
    this._loaded = true;
  }

  /** 是否已加载（懒构造的根不算）。便于 flushAsync 决定要不要刷。 */
  get isLoaded(): boolean {
    return this._loaded;
  }

  /** 序列化当前 typed 根回写到 part bytes；未加载则无操作。 */
  async flushAsync(): Promise<void> {
    if (!this._loaded || this._root === undefined) return;
    const xml = serialize(this._root);
    await this._part.writeAsync(xml);
  }

  private load(): void {
    // 所有 backend 的 Part 都是 MemoryPackagePart 实例（含 ZIP backend，继承自 Memory）
    const bytes = (this._part as MemoryPackagePart).snapshot();
    this._loaded = true;
    if (bytes.byteLength === 0) return; // 留给 root getter 懒构造默认实例
    const xml = new TextDecoder("utf-8").decode(bytes);
    this._root = deserialize(xml, { registry: this.registry }) as T;
  }
}
