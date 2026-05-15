/**
 * 核心标识类型与字面量联合。
 *
 * 对位：`DocumentFormat.OpenXml.Packaging` 命名空间下的
 *   - `Uri partUri` (在 .NET 端是 `System.Uri`)
 *   - `enum TargetMode`
 *   - `enum CompressionOption`
 *   - `enum FileAccess`
 */

/**
 * 包内 Part 的 URI。OPC 规范（ISO/IEC 29500-2 §9.1）规定：
 *
 * - 必须以 `/` 开头；
 * - 各 segment 不能为空（不允许 `//`）；
 * - 不允许 `.` 或 `..` segment；
 * - 末尾不能是 `/`（除非整体就是包根 `/`，但包根本身不是 Part）。
 *
 * 使用 `PartUri` 而非裸 `string`，借助 brand 类型避免把任意字符串误传进来。
 * 通过 {@link partUri} 工厂校验并铸造。
 *
 * @see DocumentFormat.OpenXml.Packaging.IPackagePart.Uri
 */
export type PartUri = string & { readonly __brand: "PartUri" };

/**
 * 当前 URI 是否符合 OPC Part URI 规则。不抛错，仅返回布尔。
 */
export function isPartUri(value: unknown): value is PartUri {
  if (typeof value !== "string") return false;
  if (value.length === 0) return false;
  if (!value.startsWith("/")) return false;
  if (value === "/") return false;
  if (value.endsWith("/")) return false;
  if (value.includes("//")) return false;
  const segments = value.slice(1).split("/");
  for (const seg of segments) {
    if (seg.length === 0) return false;
    if (seg === "." || seg === "..") return false;
  }
  return true;
}

/**
 * 把字符串校验并铸造为 {@link PartUri}。校验失败时返回 `undefined`，
 * 调用方在需要抛错时自行包装为 `OpenXmlPackageError({ code: "INVALID_PART_URI" })`。
 */
export function tryPartUri(value: string): PartUri | undefined {
  return isPartUri(value) ? value : undefined;
}

/**
 * Relationship 的目标解释方式。
 *
 * - `"internal"`：目标在同一 OPC 包内，target 解析为 {@link PartUri}。
 * - `"external"`：目标在包外（http/file/mailto 等），target 为任意 URI 字符串。
 *
 * @see DocumentFormat.OpenXml.Packaging.TargetMode
 */
export type TargetMode = "internal" | "external";

/**
 * ZIP 压缩级别。对位 .NET 的 `CompressionOption` 枚举，但合并了 `Fast` 与
 * `SuperFast`（实际场景几乎无人区分），并使用字符串字面量便于 JSON 序列化。
 *
 * @see System.IO.Packaging.CompressionOption
 */
export type CompressionLevel = "none" | "fast" | "normal" | "max";

/**
 * 包的访问模式。
 *
 * - `"read"`：只读打开，所有写入操作抛 `UNSUPPORTED_OPERATION`。
 * - `"readWrite"`：可读可写，默认值。
 *
 * @see System.IO.FileAccess
 */
export type AccessMode = "read" | "readWrite";

/**
 * Part 写入的输入类型联合。具体 backend 自行实现适配。
 */
export type PartWriteInput = Uint8Array | ReadableStream<Uint8Array> | Blob | string;
