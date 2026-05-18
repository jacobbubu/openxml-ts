/**
 * `BinaryPart` —— 非 XML 二进制 Part 的轻量基类。
 *
 * 与 `TypedXmlPart<T>` 平行：后者是「字节 → 解析成 OpenXmlElement 树 → 序列化回字节」，
 * 本类直接把 Part 的字节当不透明 blob 看待。典型用例：图片（png / jpeg）、字体（otf /
 * ttf）、嵌入 OLE 等。
 *
 * 设计：
 * - `bytes` getter 走 backend `snapshot()`，O(1) 拿到当前内存里的字节副本；
 * - `bytes` setter 替换内存里的字节；下次 `saveAsync` 时随 package 一起写出去；
 * - 没有缓存层——backend 自己已经在 ZIP 解压时把 entry 字节缓存到内存了。
 *
 * 不建议直接 new BinaryPart——子类（如 {@link ImagePart}）通过 static `contentType`
 * / `relationshipType` 提供具体绑定。这里只提供「拿字节 / 改字节」公共能力。
 *
 * @see ../packaging/interfaces/part.ts `IPackagePart` 是底层句柄
 */

import type { MemoryPackagePart } from "../backends/memory/memory-package-part.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";

export class BinaryPart {
  constructor(protected readonly _part: IPackagePart) {}

  /** 原始 IPackagePart 句柄。需要操 part-level relationships 时用。 */
  get part(): IPackagePart {
    return this._part;
  }

  /** Part URI（包内绝对路径）。 */
  get uri(): string {
    return this._part.uri;
  }

  /** Part 的 content-type（MIME），来自构造时 `package.createPart` 传入或 ZIP 解析时 Content-Types 映射出来的。 */
  get contentType(): string {
    return this._part.contentType;
  }

  /** 当前字节副本——backend 内部维护内存缓存，多次访问之间共享底层缓冲。 */
  get bytes(): Uint8Array {
    return (this._part as MemoryPackagePart).snapshot();
  }

  /** 替换字节内容；下次 `saveAsync` 时同步到 backend。 */
  async writeAsync(bytes: Uint8Array): Promise<void> {
    await this._part.writeAsync(bytes);
  }
}
