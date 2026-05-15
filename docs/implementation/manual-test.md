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
