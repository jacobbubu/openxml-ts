# 手工测试日志（Story-1.8 起维护）

自动化无法替代「真把文件交给 Microsoft Office 客户端打开」的验证，本文档记录每次
Epic-1 收尾的人工验证结果。

## 协议

1. 跑 `pnpm tsx test/roundtrip/golden-fixtures.test.ts`，把每个 fixture 经
   `openAsync → saveAsBytesAsync` 写出对应的 `*.roundtrip.{docx,xlsx,pptx}`；
2. 用 Microsoft Word / Excel / PowerPoint **Desktop** 与 **Web** 打开；
3. 记录：是否弹「修复 / 受损 / 兼容性问题」对话框；是否能保存。

## 当前结果（待执行）

| 日期 | 输入 | Word/Excel/PowerPoint Desktop | Office Web | 备注 |
| --- | --- | --- | --- | --- |
| - | `HelloWorld.docx` | 待执行 | 待执行 | - |
| - | `basicspreadsheet.xlsx` | 待执行 | 待执行 | - |
| - | `mcppt.pptx` | 待执行 | 待执行 | - |

> Story-1.8 的 AC 接受「先写下流程占位」，Story-1.9 发版前补齐。
> 任何「需要修复」的提示视作 release-blocking，需要在 Story-1.9 之前定位修复。

## Epic-2 / Story-2.10 · Word 子系统手工验证

新增覆盖 `examples/word-create.ts`（程序构造）与 `examples/word-replace.ts`（占位文本替换）
两条用户路径。流程：

1. `bun run examples/word-create.ts /tmp/wc-create.docx`
   → 用 Word Desktop / Office Web 打开 `wc-create.docx`，确认能正常显示 3 行文本；
2. 准备一份含 `{{client}}` 占位的 `template.docx`（任意 Word 客户端写一份），
   `bun run examples/word-replace.ts /tmp/template.docx /tmp/wc-replace.docx Acme`
   → 用 Word Desktop / Office Web 打开 `wc-replace.docx`，确认 `{{client}}` 已被替换为 `Acme`
   且未弹「文件已损坏 / 需修复」对话框。

| 日期 | 用例 | Word Desktop | Office Web | 备注 |
| --- | --- | --- | --- | --- |
| 2026-05-16 | `examples/word-create.ts` 输出 | ✅ 正常打开，3 行文本一致，无修复提示 | ✅ 正常打开，3 行文本一致，无修复提示 | 0.2.0 release-blocking 已解除 |
| 2026-05-16 | `examples/word-replace.ts` 输出 | ✅ 正常打开，`{{client}}` 已替换为 `Acme Corp`，无修复提示 | ✅ 正常打开，`{{client}}` 已替换为 `Acme Corp`，无修复提示 | 0.2.0 release-blocking 已解除 |

> 任一行弹「需要修复」视作 0.2.0 release-blocking，需先回归定位。

## Epic-3 / Story-3.10 · Excel 子系统手工验证

覆盖 5 条用户路径：

1. `examples/excel-create.ts` 输出（从零造 3×5 inlineStr 单元格）；
2. `examples/excel-replace.ts` 输出（`{{client}}` → `Acme Corp` 占位替换）；
3. `basicspreadsheet.xlsx` roundtrip（含 pivotTables / pivotCache / tables / drawings / charts / 条件格式 / 富文本 SST）；
4. `Spreadsheet.xlsx` roundtrip（含 drawings / charts / theme / vml）；
5. `missingcalcchainpart.xlsx` roundtrip（多 sheet、ext namespace、`xr:revisionPtr` 类 Unknown 元素）。

种子脚本：`.omc/seed-3-10-inputs.ts`（构造 5 份输入到 `/tmp/openxml-verify-3-10/`）。

| 日期 | 用例 | Excel Desktop | Office Web | 备注 |
| --- | --- | --- | --- | --- |
| 2026-05-17 | `excel-create.xlsx` | ✅ 正常打开，3 行 × 5 列、无修复提示。B/D 列数字显示绿三角「数字以文本存」属 inlineStr 字面值预期，非数据错误 | 未测（依赖 Desktop 通过传递性） | issue #42 / #43 修复后通过 |
| 2026-05-17 | `excel-replace-output.xlsx` | ✅ 正常打开，`{{client}}` 已替换为 `Acme Corp` 共 2 处，无修复提示 | 未测（同上） | - |
| 2026-05-17 | `basicspreadsheet.roundtrip.xlsx` | ✅ 正常打开，pivot/chart/diagram/conditional formatting 全保留，无修复提示 | 未测（同上） | issue #45 修复 SST `xml:space="preserve"` 单空格丢失后通过 |
| 2026-05-17 | `Spreadsheet.roundtrip.xlsx` | ✅ 正常打开，drawings/charts/theme 全保留，无修复提示 | 未测（同上） | issue #44 修复 deserializer xmlns 重复后通过 |
| 2026-05-17 | `missingcalcchainpart.roundtrip.xlsx` | ✅ 多 sheet 正常打开，tab 配色/标题/表格布局完整，无修复提示 | 未测（同上） | - |

> Web 列本轮主动跳过：Office Web 自动验证需 Microsoft 账号 OAuth / Playwright + 2FA，成本不在 0.3.0 一轮内。考虑 Excel Desktop 严格度 ≥ Web（OPC 校验/SST 校验/relationships 完整性都更严），Desktop 全过则 Web 通过性高。0.3.0 评审需明示该 gap。
> 任一行弹「需要修复」视作 0.3.0 release-blocking。

## Epic-3 调试记录

本轮验证暴露并修复的 4 个 0.3.0 release-blocking bug：

| Issue | 触发症状 | 根因 |
| --- | --- | --- |
| #42 | `excel-create.xlsx` Excel Desktop 弹 Repaired | `SpreadsheetDocument.create()` 未 seed `xl/styles.xml`，Excel 要求 stylesheet Part 存在 |
| #43 | `excel-create.xlsx` 弹「We found a problem」recover 对话 | `[Content_Types].xml` 缺 `<Default Extension="rels"/>` + `<Default Extension="xml"/>`，Excel 无法解析 `.rels` content-type |
| #44 | `basicspreadsheet.roundtrip.xlsx` + `Spreadsheet.roundtrip.xlsx` 弹 recover | deserializer 在每层 typed 子元素重复 `xmlns:x` 声明，文件 4x 暴胀触发严格客户端拒读 |
| #45 | `basicspreadsheet.roundtrip.xlsx` Excel 恢复日志报「String properties from /xl/sharedStrings.xml」 | tokenizer 过滤元素内纯空白，`<t xml:space="preserve"> </t>` 单空格被吃 |

## Epic-4 / Story-4.10 · PowerPoint 子系统手工验证

覆盖 6 条用户路径：

1. `examples/ppt-create.ts` 输出（从零造 3 张含标题文字 + `{{date}}` 占位的 pptx）；
2. `examples/ppt-replace.ts` 输入（含占位的源 pptx）；
3. `examples/ppt-replace.ts` 输出（`{{date}}` → `2026-05-17` 占位替换）；
4. `mcppt.pptx` roundtrip（dotnet/Open-XML-SDK Markup Compatibility 测试 deck）；
5. `autosave.pptx` roundtrip（基础 autosave 元素）；
6. `Of16-02.pptx` roundtrip（Office 2016 完整 master/layout/theme 链路）。

种子脚本：`examples/ppt-create.ts` + `examples/ppt-replace.ts` + `.omc/seed-4-10-inputs.ts`
（构造 6 份输入到 `/tmp/openxml-verify-4-10/`）。

| 日期 | 用例 | PowerPoint Desktop | Office Web | 备注 |
| --- | --- | --- | --- | --- |
| 2026-05-17 | `ppt-create.pptx` | ✅ 3 张 Slide 标题文字可见，无修复提示 | 未测（同 Epic-3） | issue #56 修 shape 缺 `<a:xfrm>` 几何属性导致白页后通过 |
| 2026-05-17 | `ppt-replace-input.pptx` | ✅ 同上含 `{{date}}` 占位 | 未测 | - |
| 2026-05-17 | `ppt-replace-output.pptx` | ✅ `{{date}}` → `2026-05-17` 替换 1 处，无修复提示 | 未测 | - |
| 2026-05-17 | `mcppt.roundtrip.pptx` | ⚠️ PowerPoint Mac 弹「Repaired and removed it」——同源 fixture `test/ppt/fixtures/mcppt.pptx` 直开**同样**弹，与 roundtrip 无关 | 未测 | dotnet/Open-XML-SDK 这份 fixture 含 mc-extensions / `mc:Ignorable` 等元素，PowerPoint Mac 已知不完全兼容；非我们 0.4.0 release-blocking |
| 2026-05-17 | `autosave.roundtrip.pptx` | ✅ 正常打开，无修复提示 | 未测 | - |
| 2026-05-17 | `Of16-02.roundtrip.pptx` | ✅ 正常打开，无修复提示 | 未测 | 含完整 master/layout/theme 三级链路 |

> Web 列同 Epic-3：成本不在 0.4.0 一轮内主动跳过。
> 任一 Desktop 行弹「需要修复」且原 fixture 不弹视作 0.4.0 release-blocking。

## Epic-4 调试记录

本轮验证暴露并修复的 1 个 0.4.0 release-blocking bug：

| Issue | 触发症状 | 根因 |
| --- | --- | --- |
| #56 | `examples/ppt-create.ts` 输出 PowerPoint 打开是 3 页全白 | slide XML 内 shape 缺 `<a:xfrm>`（位置/大小）+ `<a:prstGeom>`（图形预设），PowerPoint 渲染零几何 → 文本不可见。修复：补 `<a:xfrm><a:off/><a:ext/></a:xfrm>` + `<a:prstGeom prst="rect"/>` |

## Epic-6 / Story-6.4 · 浏览器手工验证

Live demo：<https://jacobbubu.github.io/openxml-ts/>（由
`.github/workflows/playground-deploy.yml` 自动部署到 GitHub Pages）。

验证流程：在 chromium-based 桌面浏览器（或 Safari）打开 live demo，拖入 / 选 fixture
文件 → 看 status 显示的统计 → 点「修改 + 下载」生成 `*.mutated.{docx,xlsx,pptx}`
→ 用对应 Office Desktop 重开 mutated 文件，确认无 repair / 损坏。

| 日期 | 用例 | 浏览器统计 | mutated 文件 Office Desktop | 备注 |
| --- | --- | --- | --- | --- |
| 2026-05-17 | `test/fixtures/golden/HelloWorld.docx` | ✅ 段落数 = 1 | ✅ Word Desktop 重开无修复 | - |
| 2026-05-17 | `test/fixtures/golden/basicspreadsheet.xlsx` | ✅ Worksheet 数 ≥ 3，Cell 总数 > 0 | ✅ Excel Desktop 重开无修复 | - |
| 2026-05-17 | `test/ppt/fixtures/autosave.pptx` | ✅ Slide ≥ 1，effective color scheme = `clrScheme` | ✅ PowerPoint Desktop 重开无修复 | - |

> 浏览器侧 chromium headless 已有 413 用例 vitest 守护（Story-6.1）。
> Live demo 是手工烟雾测试入口，跑通 3 栈基本路径即视作 Epic-6 验收通过。
