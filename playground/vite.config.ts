import { defineConfig } from "vite";

/**
 * Vite playground for openxml-ts.
 *
 * 通过 `file:..` 解到根工程的 dist/，所以先在根目录跑 `pnpm build` 把 dist/ 生成
 * 出来再 `pnpm install`。
 */
export default defineConfig({
  // 不要把 openxml-ts 当 SSR external（默认行为）——我们要它跟着 vite 打成 bundle。
  optimizeDeps: {
    include: ["openxml-ts", "openxml-ts/word", "openxml-ts/excel", "openxml-ts/ppt"],
  },
});
