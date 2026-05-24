import {
  MemoryOpenXmlPackage,
  type MemoryPackageOptions,
} from "../backends/memory/memory-package.js";
import { type ZipSource, readSourceToBytes } from "../backends/zip/source-reader.js";
import type { ZipLimits } from "../backends/zip/zip-config.js";
import { ZipOpenXmlPackage } from "../backends/zip/zip-package.js";
import { parseZipBytes } from "../backends/zip/zip-reader.js";
import type { MarkupCompatibilityProcessSettings } from "../markup-compat/index.js";
import type { OpenXmlPackage } from "./core/open-xml-package.js";
import { OpenXmlPackageError } from "./errors.js";
import type { AccessMode } from "./interfaces/types.js";
import { OpenSettings } from "./open-settings.js";

export { OpenSettings };

/**
 * 创建一个空的内存 OPC 包。等同于「新建一个干净的 docx 容器」，但不写入任何文档族特有的 Part。
 *
 * 主要用途：
 * - 单测 / 行为示例的最小载体；
 * - 上层 Word/Excel/PowerPoint 工厂（Epic-2+）在内部用它当蓝图。
 */
export function createInMemory(options?: MemoryPackageOptions): OpenXmlPackage {
  return new MemoryOpenXmlPackage(options);
}

/**
 * 同步打开一个 OPC 包。
 *
 * 当前实现支持：
 * - 空 `Uint8Array`（length === 0）：等同于 {@link createInMemory}。
 *
 * 非空字节流不走同步路径——请使用 {@link openAsync}。
 */
export function openSync(bytes: Uint8Array, options?: MemoryPackageOptions): OpenXmlPackage {
  if (bytes.byteLength === 0) {
    return new MemoryOpenXmlPackage(options);
  }
  throw new OpenXmlPackageError({
    code: "UNSUPPORTED_OPERATION",
    message:
      "Sync open of non-empty packages is not supported — use openAsync(bytes) for ZIP packages",
  });
}

/**
 * `openAsync` 入参。所有字段都可省。
 *
 * - `accessMode` 默认 `"read-write"`，传 `"read"` 阻断任何 mutation 调用。
 * - `limits` 透传给 ZIP backend 的解压安全阈值（最大 entry 字节、总字节、压缩比等）。
 * - `markupCompatibilityProcessSettings` 若设置，文档打开后对每个 typed Part 的元素树
 *   执行 Markup Compatibility (MC) 协商处理（ISO/IEC 29500 Part 3）。不设置时（默认）
 *   不执行任何 MC 处理，现有行为完全不变。
 */
export interface OpenAsyncOptions {
  readonly accessMode?: AccessMode;
  readonly limits?: Partial<ZipLimits>;
  readonly markupCompatibilityProcessSettings?: MarkupCompatibilityProcessSettings;
}

/**
 * 将 `OpenSettings` 或 `OpenAsyncOptions` 规范化为内部选项对象。
 *
 * 允许调用方使用新的 `OpenSettings` API，同时保持向后兼容的 `OpenAsyncOptions` 形态。
 */
function resolveOptions(optionsOrSettings: OpenAsyncOptions | OpenSettings = {}): OpenAsyncOptions {
  if (optionsOrSettings instanceof OpenSettings) {
    return {
      markupCompatibilityProcessSettings:
        optionsOrSettings.markupCompatibilityProcessSettings.processMode !== "NoProcess"
          ? optionsOrSettings.markupCompatibilityProcessSettings
          : undefined,
    };
  }
  return optionsOrSettings;
}

/**
 * 异步打开一个 OPC 包。
 *
 * 支持的 source 类型：
 * - `string`：文件路径（Node/Bun，浏览器抛 UNSUPPORTED_OPERATION）；
 * - `Uint8Array`：内存字节流；
 * - `Blob`：浏览器友好；
 * - `ReadableStream<Uint8Array>`：流式读入到内存后再解析。
 *
 * 第二参数可以是 {@link OpenAsyncOptions}（向后兼容）或 {@link OpenSettings}（新 API）。
 *
 * 返回 {@link ZipOpenXmlPackage}（向上转型为 OpenXmlPackage 暴露给调用方），
 * 该实例支持 `saveAsBytesAsync()` / `saveAsAsync(path)`；当 source 是路径时
 * `saveAsync()` 默认回写到该路径。
 */
export async function openAsync(
  source: ZipSource,
  options: OpenAsyncOptions | OpenSettings = {},
): Promise<ZipOpenXmlPackage> {
  const resolved = resolveOptions(options);
  const bytes = await readSourceToBytes(source);
  if (bytes.byteLength === 0) {
    throw new OpenXmlPackageError({
      code: "INVALID_ZIP",
      message: "Cannot open empty input as a ZIP package",
    });
  }
  const parsed = await parseZipBytes(bytes, resolved.limits);
  return new ZipOpenXmlPackage(parsed, {
    ...(resolved.accessMode !== undefined ? { accessMode: resolved.accessMode } : {}),
    ...(typeof source === "string" ? { originPath: source } : {}),
  });
}
