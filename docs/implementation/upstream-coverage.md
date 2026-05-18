# 上游 fixture 覆盖

把 dotnet/Open-XML-SDK 的 64 份测试资产（`test/DocumentFormat.OpenXml.Tests.Assets/assets/TestFiles/`）拉到 `test/fixtures/upstream-smoke/`，作为我们的真实场景兜底。

## 覆盖矩阵

| 层级 | 守护测试 | 通过数 | 备注 |
| --- | --- | --- | --- |
| OPC 层（`openAsync` + 枚举 parts + 读 relationships） | `test/fixtures/upstream-smoke.test.ts` | 63 / 63 | `encrypted_pptx.pptx` 显式跳过 |
| typed Document 层（门面 + typed Part lazy chain + 主集合非空） | `test/fixtures/upstream-typed-smoke.test.ts` | 63 / 63 | 同上 |

两层加起来，对应上游 ECMA-376 主路径达 **100%** OPC + typed 覆盖（除加密文件外）。

## 已知跳过

| 文件 | 原因 | 计划 |
| --- | --- | --- |
| `encrypted_pptx.pptx` | OOXML 加密（CFB 容器 + Agile encryption），核心 SDK 不实现 | 未来用 optional peer dep `officecrypto-tool` 在 Node 侧接入解密入口；浏览器侧保持检测+抛错（与上游 dotnet SDK 同策略） |

## 设计取舍

**Lenient deserialize**：`src/element/xml-deserialize.ts` 的属性 apply 走 try/catch
吞掉 schema validator 异常（典型如 `Color.val maxLength=3` 撞到 "auto" 4 字符或
"FFFFFF" 6 字符）。**理由**：真实 Office 文件含大量 schema 越界值，硬抛会让一半
fixture 解不开；validator 留给上层显式调用（`element.validateRequired()` 等）。
代价：用户拿到的 typed value 可能违反 schema，需要自己写时再校验。

**lazy typed Part chain**：每份 fixture 我们只触发到主门面 + 主集合（worksheets /
slideParts / mainDocumentPart），不全树遍历——典型 fixture 几十 KB / 几千 element，
深遍历会让 vitest 跑成分钟级。深遍历测试在各 epic 自己的 roundtrip 测试守护（3 份
xlsx + 3 份 pptx 各 3 轮）。

## 后续可扩

如果要进一步加强：

1. **跨 layer element golden 对 64 份全跑**：跑 `pnpm golden:gen` 时把 upstream-smoke
   也纳入；问题是 binary 比对会被 Strict→Transitional 翻译影响，需先解决；
2. **fuzz / property test**：往真实 fixture 上随机改 attribute / 加节点 → 序列化 →
   反序列化，断言 element 树不变。需引入 fast-check；
3. **浏览器侧也跑 64 份**：当前浏览器测试只跑纯逻辑测试文件，fixture 读盘走 `node:fs`
   不跨 Worker。可以打包 fixture 进静态资源走 fetch（成本较高，价值有限）。
