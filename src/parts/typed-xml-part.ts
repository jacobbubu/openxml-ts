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
import {
  type MarkupCompatibilityProcessSettings,
  processMarkupCompatibility,
} from "../markup-compat/index.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";

/**
 * 全局「typed-part 加载中」计数。`TypedXmlPart.load` 在反序列化期间递增，
 * 完成后递减——partial mixin（如 Cell.appendChild dirty tracking）通过
 * `isTypedPartLoading()` 在加载阶段抑制副作用，避免把「读出来」误判为「改过」。
 */
let _activeLoads = 0;
export function isTypedPartLoading(): boolean {
  return _activeLoads > 0;
}

export abstract class TypedXmlPart<T extends OpenXmlElement> {
  protected _root: T | undefined;
  protected _loaded = false;

  constructor(
    protected readonly _part: IPackagePart,
    protected readonly registry: ElementRegistry,
    protected readonly RootCtor: new () => T,
    protected mcSettings?: MarkupCompatibilityProcessSettings,
  ) {}

  /** 原始 IPackagePart 句柄（用于查 part-level relationships 等）。 */
  get part(): IPackagePart {
    return this._part;
  }

  /**
   * 设置 MC 协商处理设置（Epic-82）。
   *
   * 必须在首次访问 `root`（触发懒加载）之前调用才有效。
   * 由文档门面（WordprocessingDocument / SpreadsheetDocument / PresentationDocument）
   * 在构造 Part 实例后立即调用，无需变更各 Part 类的构造函数签名。
   */
  setMcSettings(settings: MarkupCompatibilityProcessSettings): void {
    this.mcSettings = settings;
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
    _activeLoads += 1;
    try {
      let root = deserialize(xml, { registry: this.registry }) as T;
      // MC 协商处理：若 settings 存在且 processMode 非 NoProcess，对反序列化后的元素树执行 MC 处理
      if (this.mcSettings !== undefined && this.mcSettings.processMode !== "NoProcess") {
        root = processMarkupCompatibility(root, this.mcSettings) as T;
      }
      this._root = root;
    } finally {
      _activeLoads -= 1;
    }
  }
}
