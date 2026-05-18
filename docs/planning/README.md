# docs/planning · 内部 BMAD 规划文档

> **这是 BMAD 内部规划文档，不是面向用户的 API 参考。**
>
> 外部读者请从这里开始：
> - 用户视角：仓库根 [`README.md`](../../README.md)
> - 单页架构总览：[`../architecture-overview.md`](../architecture-overview.md)
> - 贡献者指南：[`../../CONTRIBUTING.md`](../../CONTRIBUTING.md)

## 这里是什么

按 BMAD 方法（Brief → Model → Architect → Develop）记录的项目立项与各 Epic 决策。
文件按时间顺序产出，不一定与代码当前状态严格一致——它们是「当时为什么这么决定」
的固化记录，不是「现在 API 是什么」的事实来源。

## 文件清单

| 文件 | 角色 | 阶段 |
| --- | --- | --- |
| [`project-brief.md`](./project-brief.md) | 项目立项简报：愿景、范围、不做什么 | Brief |
| [`prd.md`](./prd.md) | 产品需求文档：用户旅程、MVP 范围、功能 / 非功能需求 | PRD（Model 阶段） |
| [`architecture.md`](./architecture.md) | Epic-1 OPC 内核的架构设计 | Architect |
| [`epic-2-prd.md`](./epic-2-prd.md) | Epic-2 WordprocessingML PRD | PRD |
| [`epic-2-architecture.md`](./epic-2-architecture.md) | Epic-2 架构设计 | Architect |
| [`epic-3-prd.md`](./epic-3-prd.md) | Epic-3 SpreadsheetML PRD | PRD |
| [`epic-3-architecture.md`](./epic-3-architecture.md) | Epic-3 架构设计 | Architect |
| [`epic-4-prd.md`](./epic-4-prd.md) | Epic-4 PresentationML PRD | PRD |
| [`epic-4-architecture.md`](./epic-4-architecture.md) | Epic-4 架构设计 | Architect |

Epic-5～10（LINQ / 浏览器 / mutator / Strict / CLI / 文档）走轻量化流程，没单独生成
PRD + Architecture 文档；决策直接落在 issue + commit 里，关键 ADR 在 architecture-overview
的速查表里也能查到。

## 怎么读

**只想用 SDK**：跳到外部文档上面三份，本目录略过；

**想理解某个子系统的早期设计取舍 / ADR 来源**：选对应 epic-N-architecture.md，
在 ADR 速查表（在 architecture-overview.md）里搜你关心的编号；

**准备提一个跨子系统大改动**：先读 `architecture.md` 顶层视图与对应 epic 的 PRD，
判断改动是否在 MVP 范围内、是否触发 ADR 修订，然后照 CONTRIBUTING 的「需要大改动
请先开 issue 讨论」流程走。
