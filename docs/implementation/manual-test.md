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
