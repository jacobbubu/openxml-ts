# 代码与类型规范

写给贡献者的执行细则。原则部分参见 [`CONTRIBUTING.md`](../CONTRIBUTING.md) §设计原则速查；
本文档落到「具体哪些写法允许 / 不允许 / 命名约定 / 注释要求」。

## 1. TypeScript 严格度（编译器强制）

`tsconfig.json` 锁死的不再赘述（`strict` + `exactOptionalPropertyTypes` +
`noUncheckedIndexedAccess` + `noImplicitOverride` 等）。下表是「编译器不直接拦住，
但本项目按这套写」的约定：

| 写法 | 允许？ | 备注 |
| --- | --- | --- |
| `as any` | **禁止** | 当前仓库 0 次。要逃，先到 `as unknown`，无解再用 `// biome-ignore` + 行 PR 评审说明 |
| `as unknown` | **限场景** | 仅在跨 typed Part 公开 API 与内部 partial mixin 边界用；总量当前 5 次 |
| 非空断言 `x!` | **限场景** | 运行时仅在 generated 序列化器内部 emit（codegen 输出）。手写代码不应有；当前仓库手写 0 次 |
| `@ts-ignore` / `@ts-expect-error` / `@ts-nocheck` | **禁止** | 当前 0 次 |
| `// biome-ignore` / `// eslint-disable` | **限场景** | 必须紧跟一行单 // 注释说明为何 disable；当前仓库 0 次 |
| `// @internal` 注释 | **推荐** | 1.0 前可选；1.0 后强制——区分公开 / 内部 API（`api-extractor` 友好） |

## 2. 命名规范（手写代码）

`biome.json#linter.useNamingConvention` 默认关，但本项目按下表执行：

| 标识 | 风格 | 例 |
| --- | --- | --- |
| Class | `PascalCase` | `OpenXmlElement` |
| Interface | `PascalCase` 名词开头，不加 `I` 前缀（**例外**：`IPackage` / `IPackagePart` 等 OPC 老约定保留） | `XDocumentOptions` |
| Type alias | `PascalCase` | `ValidationIssue` |
| Function | `camelCase` 动词开头 | `collectValidationIssues` |
| Variable / parameter | `camelCase` | `let count = 0` |
| Module-level const | `SCREAMING_SNAKE` 仅给真正不可变的字面量 / URI 用 | `const PNS = "...";` |
| Enum-like union | `PascalCase` 字符串字面量 | `"internal" \| "external"` |
| File | `kebab-case.ts` | `shared-string-table.ts` |
| Test file | 与被测文件对应 `kebab-case.test.ts` | `shared-string-table.test.ts` |

## 3. JSDoc / TSDoc 注释

**强制注释场景**：

- 任何 `export` 的 class / function / interface / type 至少一段顶部注释；
- `public` 字段的 getter / setter；
- 任何抛错的函数列出错码（`@throws OpenXmlPackageError(code=...)`）；
- 任何「行为不直观」的内部函数（不导出但跨多文件用）也建议加注释。

**模板**：

\`\`\`ts
/**
 * 一句话主旨。
 *
 * 详细说明：什么时候用、为什么这么设计、与同类 API 区别。
 * 引用相关 ADR / Issue 时用 \`ADR-024\` / \`#42\` 形式，方便交叉检索。
 */
export function doSomething(): void {}
\`\`\`

**反例**：

- ✗ 注释只重复函数名：`/** Returns the count. */ getCount()`
- ✗ 用 `// xxx` 单行注释代替块注释
- ✗ 注释里仍出现 BMAD 内部术语（Story-N.M / Epic-N），用户读到困惑

**当前覆盖**：手写代码 export 共 159 处，已注释 63（40%）；packaging 模块尤其低
（≈ 0%），是 follow-up issue #76 的目标。

## 4. 错误处理

| 场景 | 做法 |
| --- | --- |
| 解析失败 / 资源访问失败 | 抛 `OpenXmlPackageError` 带具体 `code`（如 `INVALID_ZIP` / `PART_NOT_FOUND`），消息含 part URI / 文件名等定位信息 |
| 找不到（合法的「无」情况） | 返 `undefined`，不抛 |
| 用户参数非法（如空字符串 / 负数 length） | 抛 `OpenXmlPackageError(code="BACKEND_ERROR")` 或自定义 `code` |
| 上游库抛错（zip.js / TextDecoder） | 包成 `OpenXmlPackageError(cause: err)`，保留原始 cause |
| schema validator 错（lenient mode） | 在 deserialize 路径里**吞掉**，用户显式调 `collectValidationIssues()` 才看 |

`OpenXmlPackageErrorCode` 是字面量联合（见 `src/packaging/errors.ts`），新加 code 要
同时补 `DEFAULT_MESSAGES` 映射。

## 5. async / sync 分层

| 层 | 倾向 |
| --- | --- |
| 公开 IO（`openAsync` / `saveAsBytesAsync` / `writeAsync`） | **全 async**——文件路径 / Blob / ReadableStream 任意输入 |
| 内存包构造（`createInMemory` / `SpreadsheetDocument.create`） | **全 sync**——纯内存对象，无 IO |
| typed Part lazy 加载（`get root`） | **sync**——首次访问触发解析（已落到内存字节流），不返 Promise |
| element 树操作（appendChild / descendants） | **sync**——纯内存 |
| 反序列化 / 序列化 | **sync**——纯字节字符串到对象 |

**例外**：`saveAsync()` 在 ZIP backend 是 async（要重打包 ZIP），在 Memory backend
仍 async（保 API 一致）。

## 6. 测试约定

- 单元测试 `*.test.ts` 与对应 src 文件**位置对称**：`src/foo/bar.ts` ↔ `test/foo/bar.test.ts`；
- **覆盖率目标**：手写代码（非 generated）≥ 90% 行；当前实际覆盖率见 `pnpm test:coverage`；
- generated 代码不强制单测——靠子系统集成测试（roundtrip / typed smoke）守护；
- 浏览器侧：纯逻辑测试加进 `vitest.browser.config.ts` 的 include；依赖 `node:fs/promises`
  的留在 Node 侧；
- fixture 路径：通用 docx/xlsx/pptx 放 `test/fixtures/golden/`；子系统专属（PPT
  roundtrip 用）放 `test/ppt/fixtures/`；上游 64 份兜底放 `test/fixtures/upstream-smoke/`；
- bench：性能敏感改动跑 `pnpm bench`，结果贴 PR 与 `docs/implementation/bench-baseline.md` 对照。

## 7. 子系统边界

- `openxml-ts` root entry 不强引 ~1830 个 generated 类——保 root bundle ≤ 100 KB gzip；
- Word / Excel / PPT 子系统通过 `openxml-ts/{word,excel,ppt,drawing}` 子 entry 暴露；
- `openxml-ts/linq` 给 .NET 移植用，**只读视图 + opt-in mutator**，不替代 typed API；
- 跨子系统命名冲突（Paragraph / Text / Run / Shape）：**必须 alias import**——见 ADR-026。

## 8. 强制工具链（PR 必过）

\`\`\`bash
pnpm typecheck        # tsc --noEmit；编译器级别 0 error
pnpm test             # vitest run；当前 613/613 全过
pnpm lint             # biome check；warn 允许、error 阻塞
pnpm size             # size-limit；任一 entry 超阈值 PR 红
\`\`\`

CI 跑同一套；本地通了再 push，避免来回 force push。

## 9. Biome 规则当前等级

`biome.json` 现状（2026-05-18）：

| 规则 | 等级 | 实际占用（src/ 不含 generated） |
| --- | --- | --- |
| `style/noNonNullAssertion` | warn | 0；bench/examples/playground 残留 19 处（场景需要） |
| `style/useNamingConvention` | off | 见 §2 表格（手维护） |
| `suspicious/noExplicitAny` | warn | 0 |
| `correctness/noUnusedVariables` | warn | 少量 |
| `correctness/noUnusedImports` | warn | 少量 |

升 error 的阻塞点：bench / examples / playground 有合理的 `!` 用例（一次性脚本省
typed Part lazy 检查样板）。要么先重构这些目录、要么给它们单独配 biome override，
然后再升 src/ 的规则。当前选择继续 warn，**违规靠 PR review 把关 + code-style.md 文档化**。

未来候选改动：

1. bench / examples / playground 用 `biome.json#overrides` 配单独的更宽松规则；
2. src/ 升 `noExplicitAny: "error"` + `noUnusedImports: "error"`；
3. 1.0 RC 前补 packaging/ 模块 JSDoc，把 §3 「当前覆盖 40%」拉到 ≥ 80%。
