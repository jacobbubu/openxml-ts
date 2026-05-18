# 贡献指南

感谢有兴趣给 openxml-ts 提 PR / issue。本文写给**外部贡献者**——已经会用基础 git
但还不熟悉这个仓库的人。

## 一句话定位

- **是什么**：Microsoft Open-XML-SDK 的 TypeScript 重写，ECMA-376 兼容；
- **跑在哪**：Node ≥ 20、Bun ≥ 1.1、现代浏览器（chromium / safari，**Web Streams**
  作为唯一 IO 抽象）；
- **不是什么**：不是 Office 文档渲染引擎；不是模板引擎；schema validator 在 backlog 里
  但优先级最低。

## 开发环境

```bash
# 一次性
pnpm install

# 日常
pnpm build         # tsc --build；增量编进 dist/
pnpm typecheck     # 不出文件，纯类型检查 src + test
pnpm test          # vitest run（含 Node 侧 + 子系统测试 / Epic-1~10）
pnpm test:watch    # 改文件自动重跑
pnpm test:browser  # playwright chromium headless 跑可移植子集
pnpm lint          # biome check
pnpm lint:fix      # biome check --write
pnpm format        # biome format --write
pnpm bench         # vitest bench --run；NFR-1/3/4 守护
pnpm size          # size-limit；root / word / excel / ppt / drawing 子 entry 阈值
pnpm golden:gen    # 重生 test/fixtures/golden/ 与 test/ppt/fixtures/ 的 OPC + element snapshot
pnpm gen:word      # codegen wordprocessingml schema → src/word/generated/
pnpm gen:excel     # 同 spreadsheetml
pnpm gen:ppt       # 同 presentationml
pnpm gen:drawing   # 同 drawingml
```

跑 CLI / examples 用 `bun run`（最快）或 `node --experimental-strip-types`：

```bash
bun run examples/excel-create.ts /tmp/hello.xlsx
bun run examples/linq-tutorial.ts
bun run src/bin/openxml-ts.ts inspect ./template.docx
```

## 仓库布局

```
src/
├── element/                  # OpenXmlElement 基类、序列化 / 反序列化、registry
├── packaging/                # OPC 内核（Part / Relationships / ContentTypes / Flat OPC）
├── parts/                    # 跨子系统共享的 typed Part 基类与工具
├── backends/                 # ZIP / Memory 两种 backend，Web Streams 归一化
├── word/, excel/, ppt/, drawing/    # 四大子系统：generated + parts + facade
├── linq/                     # LINQ to XML 兼容层（XDocument / XElement / Enumerable）
└── bin/                      # CLI 入口

test/                         # 与 src 对位，按子系统分目录
playground/                   # 独立 Vite 工程，浏览器 demo
bench/                        # vitest bench 性能基线
examples/                     # 各子系统真实用例脚本
tools/                        # schema-codegen / golden-generator
docs/
├── planning/                 # BMAD epic-N-prd.md / epic-N-architecture.md
└── implementation/           # 各 Story 实现笔记、bench-baseline、manual-test
```

详见 [`docs/architecture-overview.md`](./docs/architecture-overview.md)。

## 测试约定

- 单元测试与对应源文件**位置对称**：`src/foo/bar.ts` ↔ `test/foo/bar.test.ts`；
- **fixture 路径**：通用的 docx/xlsx/pptx 放 `test/fixtures/golden/`；子系统专属（PPT
  整轮 roundtrip 用）放 `test/ppt/fixtures/`；
- **覆盖率**：新加代码 ≥ 90% 行（generated/ 除外，不计入）；
- **golden 文件**：fixture 增减后跑 `pnpm golden:gen` 重生；CI 在 OPC + element 两层比对；
- **bench**：性能敏感改动跑 `pnpm bench`，把结果贴 PR 描述里，与
  `docs/implementation/bench-baseline.md` 对照；
- **浏览器**：只要不依赖 `node:fs/promises`，加进 `vitest.browser.config.ts#include`，
  CI 跑 chromium headless 再校一遍。

## Commit message / PR 规范

走 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)，
release-please 据此自动 bump 版本 + 写 CHANGELOG：

| type | 含义 | 版本影响 |
| --- | --- | --- |
| `feat` | 新功能 | minor (0.x.0) |
| `fix` | bug 修复 | patch (0.0.x) |
| `perf` / `refactor` | 性能 / 重构 | patch |
| `docs` / `test` / `ci` / `build` / `chore` | 不出现在 changelog（除 docs）| 不 bump |
| `feat!` / `BREAKING CHANGE:` | 破坏性 | 在 1.0 前等同 minor，1.0 后 major |

scope 例：`feat(excel): 新增 ...`、`fix(linq): ...`、`docs(epic-3): ...`。

PR 简短描述：要解决什么问题、怎么改、怎么测的。引用 issue 用 `(#NN)`。

## BMAD 流程（项目内部约定）

本项目按 BMAD（Brief → Model → Architect → Develop）阶段推进。已完成 Epic：

| Epic | 主题 | release | 备注 |
| --- | --- | --- | --- |
| 1 | OPC Packaging 内核 | v0.1.0 | `IPackage` / Part / Relationships / ContentTypes / Flat OPC |
| 2 | WordprocessingML | v0.2.0 | ~720 element 类、6 typed Parts、`openxml-ts/word` 子 entry |
| 3 | SpreadsheetML | v0.3.0 | ~460 element 类、6 typed Parts、SharedString + CalcChain 自动失效 |
| 4 | PresentationML | v0.4.0 | ~270 ppt + ~380 drawing element 类、7 typed Parts、effective\* resolver |
| 5 | LINQ to XML 兼容层 | v0.6.0 | XDocument / XElement / XName / XNamespace / Enumerable |
| 6 | 浏览器构建 + playground | v0.5.0 | Vite playground + GitHub Pages live demo |
| 7 | LINQ mutator API | v0.7.0 | XElement.Add / SetAttributeValue / Remove + XDocument.ToString/Save |
| 8 | OOXML Strict ↔ Transitional 兼容 | v0.7.0 | ElementRegistry + relationship type fallback |
| 9 | CLI 工具 | v0.7.0 | `openxml-ts inspect / cat` |
| 10 | 贡献指南 + 单页架构总览 | v0.7.0 | 本文件 + `docs/architecture-overview.md` |

**外部贡献者**不必跟 BMAD 全套，只需：

1. 看 issue 选一个 `feature` / `bug` / `chore` 标签的开始；
2. fork → 本地 `pnpm install` → 编码 → `pnpm test && pnpm typecheck && pnpm size && pnpm lint`
   都过；
3. 一个 issue 一个 PR；commit message 走 conventional commits；
4. PR 描述带上「什么改了、怎么测的、有无新 fixture / 新 ADR」。

需要大改动（跨多个子系统、引入新依赖、破坏 API）请先开 issue 讨论，避免做完了被拒。

详细规划文档在 `docs/planning/`（**内部 BMAD 视角**——PRD / Architecture / Story 拆分；
外部贡献者从 `docs/architecture-overview.md` 起即可）。

## 设计原则速查

- **跟 ECMA-376 对齐**：API 表面与 .NET Open-XML-SDK 可识别映射；
- **Bun 优先 + Node ≥ 20**：所有运行时路径都过 Bun 一遍；
- **ESM only，strict**：`exactOptionalPropertyTypes` + `noUncheckedIndexedAccess`
  全开；
- **Web Streams 唯一 IO**：所有 backend 进出走 `ReadableStream<Uint8Array>` 或
  `Uint8Array`，端到端语义一致（ADR-006）；
- **Tree-shake 友好**：子系统走独立 subpath（`openxml-ts/word` 等），root entry
  不强引 generated；
- **不暴露写时 mutator 默认值**：所有 typed root 都是用户已注入；空 attribute 不
  自动塞默认；
- **OPC 关系优先于文件路径**：根据 relationship 走，不硬编路径；
- **Strict ↔ Transitional URI 互译**：ElementRegistry / findRelationship 自带 fallback
  (Epic-8)。

## ADR 索引

关键架构决策记录（按子系统聚集）：

- `docs/planning/architecture.md` 总览（Epic-1 内核）；
- `docs/planning/epic-2-architecture.md` Word（ADR-013～019）；
- `docs/planning/epic-3-architecture.md` Excel（ADR-019～022）；
- `docs/planning/epic-4-architecture.md` PPT（ADR-023～026）；
- README / CHANGELOG 末尾的 release notes 含跨 Epic 的变更说明。

不熟悉 BMAD 不用全读，挑你改动到的子系统对应那份。

## 报 bug

带上：
- 复现步骤（最好是 minimal repro，最坏给 fixture 文件 + 一段代码）；
- 期望行为 vs 实际行为；
- Node / Bun / OS 版本；
- 如果是 Office 文档兼容问题，附原文件与 mutated 文件，注明用哪版 Office Desktop / Web 验证。

Issue title 用中文或英文都可，body 描述清楚就行。
