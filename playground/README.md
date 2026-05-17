# openxml-ts · 浏览器 playground

证明 openxml-ts 在浏览器里跟 Node / Bun 三端语义一致（ADR-006）。拖入或选 docx/xlsx/pptx，
看 SDK 解出来的 element 树统计，可选写回下载。

## 跑法

```bash
# 一次性：先在根目录把 dist/ 编出来（playground 通过 file:.. 解到根的 dist/）
cd ..
pnpm install
pnpm build

# 然后进 playground
cd playground
pnpm install
pnpm dev
```

打开 Vite 提示的 `http://localhost:5173/`，拖入文件即可。

## 范围

- 支持 .docx / .xlsx / .pptx；
- 显示段落数 / cell 数 / slide 数 / effective color scheme 等基本统计；
- 点「修改 + 下载」按钮：往根 element 上塞一个 `data-playground` 属性 → `saveAsBytesAsync` →
  下载 `*.mutated.{docx,xlsx,pptx}`，证明浏览器侧 ZIP 写出可用；
- 不在 fixture / 大文件上做更深的演示（demo 不替代 examples）。

## 已知限制

- 浏览器没有 fs，调用 `openAsync(path: string)` 会抛 `UNSUPPORTED_OPERATION`。本 playground 只接
  Blob / Uint8Array 路径；
- 路径相关的诊断（如 saveAsync 默认回写到 origin path）在浏览器不可用，需走 `saveAsBytesAsync`。
