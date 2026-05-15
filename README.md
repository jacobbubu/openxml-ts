# openxml-ts

A TypeScript port of [Microsoft Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK).

> 状态：早期搭建中（BMAD-method 驱动）。当前里程碑：**OPC Packaging 内核**（zip + parts + relationships）。

## 设计目标

- 与 ISO/IEC 29500 对齐，保持与 .NET 版本 API 表面的可识别映射
- **Bun 优先**，同时兼容 **Node ≥ 20**
- **ESM only**，强类型，`strict` + `exactOptionalPropertyTypes`
- 使用 **pnpm** 作为唯一包管理器

## 工具链

| 项目 | 版本约束 |
| --- | --- |
| Node.js | `>= 20` |
| Bun | `>= 1.1` |
| pnpm | `>= 9` |
| TypeScript | `>= 5.5` |

## 路线图（高层）

1. **Epic-1 OPC Packaging**（进行中）：`IPackage`、Parts、Relationships、Content-Types、ZIP I/O。
2. Epic-2 WordprocessingML
3. Epic-3 SpreadsheetML
4. Epic-4 PresentationML
5. Epic-5 LINQ-to-XML 兼容层（可选）

每个 Epic 拆分为 BMAD Stories，进度见 GitHub Issues。

## 致谢

派生自 [.NET Open-XML-SDK](https://github.com/dotnet/Open-XML-SDK)，MIT 协议。详见 [LICENSE](./LICENSE)。
