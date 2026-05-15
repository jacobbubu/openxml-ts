/**
 * ZIP 后端共享常量与安全阈值。
 *
 * 与 PRD §NFR-4 对齐：拒绝过大单 Part 与过大 ZIP 总包；拒绝路径穿越。
 */

import { configure } from "@zip.js/zip.js";

/** 单 Part 解压后允许的最大字节数，默认 100 MB（NFR-4.1）。 */
export const DEFAULT_MAX_ENTRY_BYTES = 100 * 1024 * 1024;

/** ZIP 内所有 Part 解压后允许的字节合计上限，默认 500 MB（NFR-4.1）。 */
export const DEFAULT_MAX_TOTAL_BYTES = 500 * 1024 * 1024;

/**
 * 关闭 Web Worker。Node/Bun 服务端场景下 worker 没有收益且会引入额外依赖；
 * 浏览器调用方可在自身入口处再 `configure({ useWebWorkers: true })`。
 */
let configured = false;
export function configureZipJs(): void {
  if (configured) return;
  configured = true;
  configure({ useWebWorkers: false });
}

export interface ZipLimits {
  readonly maxEntryBytes: number;
  readonly maxTotalBytes: number;
}

export function resolveLimits(input?: Partial<ZipLimits>): ZipLimits {
  return {
    maxEntryBytes: input?.maxEntryBytes ?? DEFAULT_MAX_ENTRY_BYTES,
    maxTotalBytes: input?.maxTotalBytes ?? DEFAULT_MAX_TOTAL_BYTES,
  };
}
