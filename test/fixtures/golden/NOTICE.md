# 黄金参照样例来源

本目录下三份二进制 OOXML 文件来自 [`dotnet/Open-XML-SDK`](https://github.com/dotnet/Open-XML-SDK)
仓库的测试资源，遵循其 MIT 协议（与本项目 LICENSE 中 `.NET Foundation` 归属一致）：

| 本地文件 | 上游路径 |
| --- | --- |
| `HelloWorld.docx` | `test/DocumentFormat.OpenXml.Tests.Assets/assets/TestFiles/HelloWorld.docx` |
| `basicspreadsheet.xlsx` | `test/DocumentFormat.OpenXml.Tests.Assets/assets/TestFiles/basicspreadsheet.xlsx` |
| `mcppt.pptx` | `test/DocumentFormat.OpenXml.Tests.Assets/assets/TestFiles/mcppt.pptx` |

每个 fixture 的 `<basename>.golden.json` 描述 `openxml-ts` 读出来的 OPC 状态
（Parts / Content-Types / Relationships）。生成方式见 [`tools/golden-generator/README.md`](../../../tools/golden-generator/README.md)。

> 后续 Story 计划加入「.NET 端 cli 工具对照」交叉校验；当前阶段以 `openxml-ts`
> 自家解析结果为参照，roundtrip 测试至少能保证我们的 read → write → read 链路稳定。
