import { defineConfig } from "vitest/config";

/**
 * 浏览器侧测试配置（Story-1.9 之后的 Plan B 闭合）。
 *
 * 通过 Playwright 的 headless Chromium 把同一套 `*.test.ts` 在真实浏览器里跑一遍，
 * 验证我们对架构 ADR-006「Node + Bun + 浏览器三端语义一致」的承诺。
 *
 * 三类测试**不在**这里跑：
 * - 用到 `node:fs/promises` 等 Node 内置模块的（diagnostics 的 fixture 读盘、
 *   zip.test.ts 的 tmpdir saveAsync、roundtrip 的 golden 文件读盘）；
 * - 浏览器原生 `process` 缺席就抛 UNSUPPORTED_OPERATION 的路径——它们的 Node 覆盖率
 *   已经够了。
 *
 * 默认跑法：`pnpm test:browser`（一次性）。本地首跑需要先 `pnpm playwright install chromium`。
 */
export default defineConfig({
  test: {
    name: "browser",
    include: [
      "test/smoke.test.ts",
      "test/packaging/part-uri.test.ts",
      "test/packaging/errors.test.ts",
      "test/packaging/public-api.test.ts",
      "test/packaging/xml/**/*.test.ts",
      "test/packaging/content-types/**/*.test.ts",
      "test/packaging/relationships/**/*.test.ts",
      "test/packaging/backends/memory.test.ts",
      "test/packaging/backends/zip/zip-crud.test.ts",
      "test/packaging/flat-opc/**/*.test.ts",
    ],
    browser: {
      enabled: true,
      provider: "playwright",
      name: "chromium",
      headless: true,
      screenshotFailures: false,
    },
  },
});
