---
stepsCompleted: []
inputDocuments:
  - docs/planning/project-brief.md
  - docs/planning/prd.md
workflowType: 'architecture'
projectName: openxml-ts
language: zh-CN
---

# 架构文档 — openxml-ts

**作者：** BMAD Architect 代理（Winston）
**日期：** 2026-05-15
**版本：** v0.1（草案）
**输入：** [项目简报](./project-brief.md) · [PRD](./prd.md)

> 本文件是一份**策略决策清单**，不是 API 参考；按主题给出取舍与理由，便于 SM/Dev 在拆分 Story 与编码时直接引用。所有可以改变的决策标 ADR-XX 编号，便于追溯。

## 0. 设计原则

1. **保留可识别性优先于命名习惯**。类名、关系语义、字段含义尽量与 .NET SDK 一一对应；只在 TS 习惯上彻底反人类时改写（例：`PackageProperties.LastModifiedBy` 接受 `null` 直接保留；不强行变 `nullable<string>` 之外的 API 形状）。
2. **OPC 内核独立可用**。Packaging 不依赖任何文档族 schema；上层各 Epic 才挂载强类型 schema。
3. **Web Streams 作公共 I/O 语言**。包内核只读写 `ReadableStream<Uint8Array>` / `WritableStream<Uint8Array>` 与 `Uint8Array`；任何 `node:fs`、`Blob`、`Bun.file` 都封装到 adapter。
4. **异步默认，同步是特例**。所有 I/O 一律 async；同步只在「我已经持有 `Uint8Array`」时存在。
5. **没有隐式状态**。`OpenXmlPackage` 的修改 in-memory 即时生效；`save` 是显式提交。`autoSave` 仅控制 dispose 行为，不在每次修改后偷偷写盘。
6. **错误就是数据**。所有失败抛 `OpenXmlPackageError` 派生类，含 `code` 与上下文字段；调用方可以 narrow（`if (err.code === "PART_NOT_FOUND")`）。

## 1. 整体分层

```
┌────────────────────────────────────────────────────────────┐
│ Epic-5 LINQ View（可选）                                    │
│  - 把 OpenXmlElement 树暴露为 XElement-like 的查询投影      │
├────────────────────────────────────────────────────────────┤
│ Epic-2/3/4 文档族 Schema 类                                │
│  WordprocessingDocument / SpreadsheetDocument /            │
│  PresentationDocument 及成千个强类型 element                │
├────────────────────────────────────────────────────────────┤
│ ⭐ Epic-1 OPC Packaging（MVP — 本文档主体）                 │
│  IPackage / IPackagePart / IPackageRelationship /          │
│  IPackageProperties / ContentTypes / FlatOpc               │
├────────────────────────────────────────────────────────────┤
│ Storage Backends                                           │
│  ZipPackageBackend   FlatOpcBackend   MemoryPackageBackend │
├────────────────────────────────────────────────────────────┤
│ Runtime Adapters                                           │
│  fs(node) · fs(bun) · Blob · ReadableStream · Uint8Array   │
└────────────────────────────────────────────────────────────┘
```

MVP 范围：`Storage Backends`（仅 Zip + Flat + Memory）+ `OPC Packaging` 层 + 必要的 `Runtime Adapters`。

## 2. 包结构

**采纳：单仓 monorepo（pnpm workspaces），但 MVP 期间只发布一个根包 `openxml-ts`。**

理由：

- 早期把所有代码塞在一个包里，迭代轻；workspaces 占位让以后切 `@openxml-ts/packaging`、`@openxml-ts/wordprocessing` 时不必重排目录。
- 仅 OPC 这一层不值得现在拆。

目录形态（MVP）：

```
openxml-ts/
├── package.json              # workspace root + 当前唯一发布包
├── pnpm-workspace.yaml       # 未来扩展用，MVP 期间仅 ["packages/*"] 占位
├── packages/                 # MVP 期间为空
├── src/
│   ├── index.ts              # 公共 API 入口
│   ├── packaging/
│   │   ├── interfaces/       # IPackage / IPackagePart / ...
│   │   ├── core/             # OpenXmlPackage、PartContainer、Disposable 行为
│   │   ├── relationships/    # Relationship + RelationshipCollection + rId 生成
│   │   ├── content-types/    # ContentTypeManifest 读写
│   │   ├── parts/            # PackagePart、MediaDataPart 等
│   │   ├── flat-opc/         # ToFlatOpc / FromFlatOpc
│   │   └── errors.ts
│   ├── backends/
│   │   ├── zip/              # ZipPackageBackend（@zip.js/zip.js 适配）
│   │   ├── flat/             # FlatOpcBackend
│   │   └── memory/           # MemoryPackageBackend（测试 + 兜底）
│   ├── adapters/
│   │   ├── node-fs.ts
│   │   ├── bun-fs.ts
│   │   ├── blob.ts
│   │   └── streams.ts        # Web Streams helper
│   ├── xml/                  # 仅 OPC 所需的最小 XML 工具（手写）
│   └── util/
├── test/
│   ├── unit/
│   ├── roundtrip/            # 真实样例 docx/xlsx/pptx
│   └── fixtures/
├── examples/
└── docs/
```

> ADR-001：MVP 选 monorepo 占位 + 单包发布。Epic-2 上线 schema 类时拆 `@openxml-ts/wordprocessing` 等。

## 3. .NET → TypeScript 概念映射

| .NET 概念 | TS 实现 | 备注 |
| --- | --- | --- |
| `System.IO.Packaging.Package` | `OpenXmlPackage`（抽象类） | 入口与 .NET 同名，保留命名空间不再加 `Document` 前缀 |
| `IPackage` / `IPackagePart` / `IPackageRelationship` | 同名 TS interface | 严格用 `IPrefix` 命名以减少与上层类冲突 |
| `Uri partUri` | `PartUri`（newtype string） | 通过 `branded type` 校验 OPC URI 规则 |
| `Stream`（`FileMode/FileAccess`） | `ReadableStream<Uint8Array>` / `WritableStream<Uint8Array>` | 不暴露 `Buffer`；helper 提供 `streamToBytes` |
| `CompressionOption` | `type CompressionLevel = "none" \| "fast" \| "normal" \| "max"` | 字符串而非枚举，便于 JSON 配置 |
| `TargetMode { Internal, External }` | `type TargetMode = "internal" \| "external"` | 同上 |
| `IDictionary<string, object>` | `Map<string, unknown>` | 避免 `Record`，迭代顺序确定 |
| `IDisposable` | `[Symbol.dispose]` | 同步 dispose |
| `IAsyncDisposable` | `[Symbol.asyncDispose]` | 异步 dispose；与 `using await` 配合 |
| `Task<T>` | `Promise<T>` | — |
| `event PackageEvents` | `EventTarget` + 自定义 `Event` 子类 | 浏览器友好 |
| `Exception` 派生 | `class OpenXmlPackageError extends Error` 并带 `code` | 见 §6 错误模型 |
| LINQ `IEnumerable<T>` | `Iterable<T>` / `AsyncIterable<T>` | 不预先实例化数组 |
| `XElement`（Epic-5） | 自家 `XElement` shim | MVP 不引入 |

## 4. ZIP 后端选型（核心决策）

**采纳：@zip.js/zip.js（v2.x）作为 MVP 唯一 ZIP 后端。**

候选对比：

| 库 | 跨运行时 | API 形态 | 流式 | 随机访问 | 包体 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| @zip.js/zip.js | ✅ Node/Bun/Browser | Web Streams 原生 | ✅ | ✅ 通过 `ZipReader.getEntries()` | 中 | 维护活跃，TS 类型完整 |
| fflate | ✅ | 回调 + Promise 包装 | ✅ | ⚠️ 需要全量解压 | 小 | 速度最快但 API 偏底层 |
| yauzl(-promise) | ❌ 仅 Node | 回调/Promise | ✅ | ✅ | 中 | 不能跨运行时，淘汰 |
| adm-zip | ❌ 仅 Node | 同步 | ❌ | ✅ | 小 | 同步、慢，淘汰 |

理由：

- `@zip.js/zip.js` 的 ZipReader/ZipWriter 直接吃 `ReadableStream`，与我们的 I/O 抽象一致；随机访问 entries 让 `OpenXmlPackage.getPart()` 不需要先把全包解压到内存。
- 浏览器、Bun、Node 三端 API 一致，不需要 backend per runtime。
- TypeScript 类型完整，无需 `@types/*`。

> ADR-002：ZIP 后端选 @zip.js/zip.js v2；为可能的迁移留 `IZipBackend` 接口隔离，但 MVP 不引入第二实现。
>
> 风险预案：若性能 / 内存压力超 NFR-1.1，做 fflate spike（保留 `IZipBackend` 抽象方便切换）。

## 5. XML 处理策略

OPC 内核只读写两类 XML：`[Content_Types].xml` 与 `*.rels`。两者 schema 简单且严格，**MVP 选择手写解析与序列化**，不引入 XML 库：

- 解析：`fast-xml-parser` 体积小但仍是依赖；手写 SAX 风格状态机覆盖 OPC 用例足够，约 200~300 行。
- 序列化：模板字符串拼接 + 严格转义。
- 校验：XML namespace 与必需属性运行时断言；非法输入抛 `OpenXmlPackageError` 子类。
- 安全：禁用外部实体（DTD）、限制元素深度上限（默认 64）。

> Epic-2 引入 Schema 类时再选完整 XML 库（候选 `@xmldom/xmldom` 与 `linkedom`），由 Epic-2 的 Architect 复评。
>
> ADR-003：MVP 期 OPC XML 手写，不引入第三方 XML 库。

## 6. 错误模型

所有失败统一从 `OpenXmlPackageError` 抛出：

```ts
class OpenXmlPackageError extends Error {
  readonly code: OpenXmlPackageErrorCode;
  readonly partUri?: PartUri;
  readonly relationshipId?: string;
  readonly cause?: unknown;
}

type OpenXmlPackageErrorCode =
  | "INVALID_ZIP"
  | "MISSING_CONTENT_TYPES"
  | "PART_NOT_FOUND"
  | "PART_ALREADY_EXISTS"
  | "RELATIONSHIP_ID_CONFLICT"
  | "RELATIONSHIP_TARGET_INVALID"
  | "CONTENT_TYPE_MISSING"
  | "UNSUPPORTED_OPERATION"
  | "BACKEND_ERROR"
  | "INVALID_PART_URI"
  | "STREAM_CLOSED"
  | "SECURITY_VIOLATION";
```

- 调用方可以 `switch(err.code)` narrow，TypeScript 享受字面量类型推断。
- `cause` 字段透传底层异常（如 `@zip.js/zip.js` 的 ZIP 错误），不丢栈。
- 验证类问题（关系孤儿、`rId` 重复但允许修复等）走 `OpenXmlPackageValidationResult`，**不**抛错。

> ADR-004：单根错误类 + 枚举 code，不为每种错误新建 class（避免类爆炸）。

## 7. 异步 vs 同步策略

| 场景 | 默认 API |
| --- | --- |
| 从文件路径 / Blob / Stream 打开 | `OpenXmlPackage.openAsync(source, opts?)` |
| 从 `Uint8Array` 打开（最快路径） | `OpenXmlPackage.openSync(bytes, opts?)` |
| 枚举 Parts | 同步 `Iterable<IPackagePart>`（结构已加载） |
| 读取 Part 数据 | `Part.openReadStream()` → `ReadableStream<Uint8Array>` |
| 写入 Part 数据 | `Part.writeAsync(input)` 接受 4 类输入 |
| 保存 | `package.saveAsync()` / `package.saveAsAsync(target)` |
| Dispose | `[Symbol.asyncDispose]` 优先；同步 `[Symbol.dispose]` 调用 await but no top-level await |

> ADR-005：`OpenXmlPackage` 的生命周期入口（open/save/dispose）一律异步；只有 in-memory 操作（addPart 等）保持同步以避免 await 噪音。

## 8. 浏览器兼容策略

- 核心代码不 import `node:fs`、`node:buffer`、`node:stream`。所有 Node 特性走 `src/adapters/node-fs.ts` 等独立文件，并通过 package.json `exports` 条件导出（`"node"` vs `"default"`）：

```jsonc
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "node":   "./dist/index.node.js",
      "bun":    "./dist/index.bun.js",
      "default": "./dist/index.js"
    }
  }
}
```

- MVP 不主动发布浏览器 bundle，但保证 `import "openxml-ts"` 在 `vite build` 下能 tree-shake 通过且不报 `Module not found`。
- `Bun.file` 在 Bun adapter 中可选择性使用以加速本地路径读取。

> ADR-006：用 `exports` 条件导出而不是 `browser` 字段（后者已被现代打包工具弱化）。

## 9. 资源生命周期与并发

- 单个 `OpenXmlPackage` 实例**非线程安全**：调用方必须避免在同一实例上并发 read+write。
- 多 reader 模式：`package.openParallel(uri[])` 返回多个独立 ReadableStream，由 backend 决定是否共享 ZipReader 实例（@zip.js/zip.js 支持）。
- `using` / `using await`：
  ```ts
  await using pkg = await OpenXmlPackage.openAsync("foo.docx");
  // ... 修改
  // 自动 saveAsync + close
  ```
- 显式 dispose 兼容旧 TS：暴露 `await pkg.dispose()`。

## 10. 性能预算

| 操作 | 目标 p95 | 备注 |
| --- | --- | --- |
| 打开 1 MB 包 + 枚举 Part | ≤ 100 ms | NFR-1.1 |
| 单 Part 读取（1 MB 内） | ≤ 50 ms | 流式直读，不缓存 |
| 添加 Part + saveAsAsync 透传 | ≤ 200 ms | NFR-1.1 |
| Flat OPC ↔ ZIP 互转（1 MB） | ≤ 400 ms | 因要重写 XML，宽限 2× |

测量基准：M-series MacBook，Node 20.x / Bun 1.1.x，本地 NVMe。

## 11. 构建 / 发布管线

- 编译：`tsc --build`（无 bundler；ESM 模块映射到 `dist/`）。
- 包导出条件：见 §8。
- 发版：release-please 驱动；conventional commit 触发 minor/patch。
- 版本策略：Epic-1 完成切 `0.1.0`；公共 API 在 Epic-4 之前允许破坏性变更，需在 CHANGELOG 显式标记。

## 12. 测试策略

| 层 | 工具 | 范围 |
| --- | --- | --- |
| 单元 | vitest（node 与 bun 双跑） | interfaces + ZipPackageBackend + Relationship 算法 |
| 集成 | vitest + 真实样例 | `test/roundtrip/`，最少 1 docx / 1 xlsx / 1 pptx |
| 性能 | vitest bench + 标准样例 | 跟踪 NFR-1.1 / NFR-1.2 |
| 模糊 | fast-check（计划） | rId 生成、Part URI 校验、Content-Types 解析 |

> 关键：roundtrip 测试要把 .NET 端预生成的「黄金样本」放进 `test/fixtures/golden/`，用 `dotnet run --project tools/golden-generator` 离线刷新。

## 13. 代码风格与依赖红线

- 公共 API 必须有 TSDoc，并在文档注释中引用 .NET 源类型（如 `@see DocumentFormat.OpenXml.Packaging.OpenXmlPackage`）。
- 禁用 `any`；`unknown` 后必须 narrow。
- 禁用同步 `fs` 读写文件 > 1 MB 的路径（除非显式 `forceSync`）。
- 依赖红线：除 `@zip.js/zip.js` 与 runtime 内置外，MVP 不再引入运行时依赖；devDeps 不限。

## 14. 未决问题（交由 SM 与 Dev 在 Story 内回答）

1. `MediaDataPart` 的扩展点是否在 MVP 范围（PRD 列为占位，但具体接口形状未定）。
2. `OpenXmlPackage.Features` 体系是否原样迁移；MVP 倾向不迁移，等 Epic-2 schema 类需要才动。
3. `OPENXML_TS_DEBUG=1` 的日志格式标准（JSON line 还是 human）。
4. Conventional Commits 中文 scope 命名规范（`packaging`、`zip-backend`、`xml`、`build`、`docs`）。

## 15. ADR 索引

| 编号 | 决策 | 状态 |
| --- | --- | --- |
| ADR-001 | monorepo 占位 + MVP 单包发布 | accepted |
| ADR-002 | ZIP 后端：@zip.js/zip.js v2 | accepted (with spike fallback) |
| ADR-003 | OPC XML 手写不引第三方 | accepted |
| ADR-004 | 单根 `OpenXmlPackageError` + code 枚举 | accepted |
| ADR-005 | 生命周期 async-only；内存操作 sync | accepted |
| ADR-006 | `exports` 条件导出区分 Node/Bun/Browser | accepted |

后续若有翻案：在 `docs/planning/adr/ADR-NNN-*.md` 写补充并把状态改为 `superseded`。

## 16. 衔接到 SM 阶段

下一步：**BMAD SM 代理** 把 §3 的 FR-1 .. FR-8 配合本文 §1/§2/§3/§4 的结构，拆成 Story-1.1 … Story-1.N。建议的拆分粒度：

- **Story-1.1** 接口契约 + `OpenXmlPackageError` 模型（无后端实现）
- **Story-1.2** MemoryPackageBackend + 基础单测
- **Story-1.3** ContentTypes 读写
- **Story-1.4** Relationships 读写 + rId 算法
- **Story-1.5** ZipPackageBackend（@zip.js/zip.js 接入）
- **Story-1.6** Parts 增删改 + 端到端读流
- **Story-1.7** Flat OPC 互转
- **Story-1.8** Roundtrip 真实样例测试集 + golden 生成器
- **Story-1.9** 性能 baseline + 文档 + 0.1.0 发版准备
