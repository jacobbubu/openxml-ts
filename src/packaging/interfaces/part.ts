import type { IPackage } from "./package.js";
import type { IRelationshipCollection } from "./relationship.js";
import type { PartUri, PartWriteInput } from "./types.js";

/**
 * 单个 OPC Part（包内的「文件」）。
 *
 * 形态对位 .NET 的 `PackagePart` / `IPackagePart`，但 I/O 全部走 Web Streams：
 * - 读：{@link openReadStream} 返回 `ReadableStream<Uint8Array>`，调用方按需消费。
 * - 写：{@link writeAsync} 接受四类输入，由实现适配到底层 backend。
 *
 * @see DocumentFormat.OpenXml.Packaging.IPackagePart
 */
export interface IPackagePart {
  /** 拥有此 Part 的包实例。 */
  readonly package: IPackage;

  /** Part URI（包内绝对路径）。 */
  readonly uri: PartUri;

  /** MIME 内容类型，例如 `application/xml`。 */
  readonly contentType: string;

  /** 该 Part 自己的关系集合（`_rels/<basename>.rels`）。 */
  readonly relationships: IRelationshipCollection;

  /**
   * 以 Web Streams 的形式读取该 Part 内容。
   *
   * - 调用方负责消费完流并按 Web Streams 规范关闭。
   * - 同一 Part 允许并发多个 reader（实现要求 backend 支持随机访问）。
   */
  openReadStream(): ReadableStream<Uint8Array>;

  /**
   * 替换 Part 内容。原内容在 `saveAsync` 之前以内存形态暂存。
   *
   * 支持的输入：
   * - `Uint8Array`：直接吞下；
   * - `ReadableStream<Uint8Array>`：流式落到 backend；
   * - `Blob`：调用 `arrayBuffer()` 兜底；
   * - `string`：按 UTF-8 编码。
   */
  writeAsync(input: PartWriteInput): Promise<void>;
}
