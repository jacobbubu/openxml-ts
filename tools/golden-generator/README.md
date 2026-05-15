# golden-generator

把 `test/fixtures/golden/` 下的真实 docx/xlsx/pptx 用 `openxml-ts` 读出来，
快照 OPC 结构（Parts、Content-Types、Relationships）落到 `<name>.golden.json`。

## 跑

```bash
pnpm tsx tools/golden-generator/generate.ts
# 或者 pnpm golden:gen（已在 package.json scripts 注册）
```

## 何时刷新

- 新加 / 替换 `test/fixtures/golden/*.{docx,xlsx,pptx}`；
- 公共 API（`pkg.parts()` / `pkg.relationships` / `pkg.contentTypes`）的行为变更
  影响快照——通常这种变更需要在 PR 描述中解释 diff。

## 当前限制

本工具用 `openxml-ts` 自家解析作为「黄金」来源——**自验证**而非外部对照。
roundtrip 测试至少能保证我们的 read → write → read 链路稳定（任何回归都会
导致 golden 与本次读取的 diff）。

## 计划：真正的黄金 = .NET 端预生成

下一步会用 .NET 6+ 编写同名命令行工具，调用 `DocumentFormat.OpenXml.Packaging`
枚举 Parts、Relationships、Content-Types，并落同形 JSON。两端结果一致即可用
TS 写代码验证「与 Microsoft 实现互通」。届时此 TS 版本退役为开发期辅助。

跟踪 issue：（待后续 Story 1.9+ 收尾时建）。
