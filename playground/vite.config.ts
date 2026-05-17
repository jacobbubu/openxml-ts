import { defineConfig } from "vite";

/**
 * Vite playground for openxml-ts.
 *
 * 通过 `file:..` 解到根工程的 dist/，所以先在根目录跑 `pnpm build` 把 dist/ 生成
 * 出来再 `pnpm install`。
 *
 * GitHub Pages 部署：在 `playground-deploy.yml` 把 `PLAYGROUND_BASE=/openxml-ts/`
 * 注入到环境；本地 `pnpm dev` 不设这个变量，base 用默认 `/`。
 */
export default defineConfig({
  base: process.env.PLAYGROUND_BASE ?? "/",
  // 不要把 openxml-ts 当 SSR external（默认行为）——我们要它跟着 vite 打成 bundle。
  optimizeDeps: {
    include: ["openxml-ts", "openxml-ts/word", "openxml-ts/excel", "openxml-ts/ppt"],
  },
});
