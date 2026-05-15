import {
  MemoryOpenXmlPackage,
  type MemoryPackageOptions,
} from "../backends/memory/memory-package.js";
import type { OpenXmlPackage } from "./core/open-xml-package.js";
import { OpenXmlPackageError } from "./errors.js";

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
 * 非空字节流暂未支持，等 Story-1.5 接入 ZIP backend 后再补充。在那之前会抛
 * `UNSUPPORTED_OPERATION`，让调用方知道异步路径 `openAsync` 是当前唯一选项。
 */
export function openSync(bytes: Uint8Array, options?: MemoryPackageOptions): OpenXmlPackage {
  if (bytes.byteLength === 0) {
    return new MemoryOpenXmlPackage(options);
  }
  throw new OpenXmlPackageError({
    code: "UNSUPPORTED_OPERATION",
    message:
      "openSync of non-empty packages will be supported when the ZIP backend lands in Story-1.5",
  });
}
