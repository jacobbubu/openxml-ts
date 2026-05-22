# API 稳定承诺

适用于 **v1.0 及之后**所有发布版本。当前 0.x 系列处于 pre-release，未走以下保证。

## 我们承诺保留的 API surface

「公开 API」指能通过下面任意一种方式 import 到的导出符号：

```ts
import { ... } from "openxml-ts";
import { ... } from "openxml-ts/word";
import { ... } from "openxml-ts/excel";
import { ... } from "openxml-ts/ppt";
import { ... } from "openxml-ts/drawing";
import { ... } from "openxml-ts/office-ext";
import { ... } from "openxml-ts/validation";
import { ... } from "openxml-ts/streaming";
import { ... } from "openxml-ts/markup-compat";
import { ... } from "openxml-ts/linq";
```

不在承诺范围：

- `openxml-ts/<sub>/generated/*` 路径下的深引入——codegen 重生成时类名 / 属性
  名 / 文件路径都可能变动；
- 任何带 `// @internal` 标注或下划线开头的命名（`_`、`__`）；
- 任何只用于内部 mixin / 测试基础设施的导出；
- `docs/` / `examples/` / `bench/` 目录里的所有内容。

## 什么算 breaking change（v1.0+）

任一项命中 → minor/patch 不允许，必须 major bump：

1. **删除**任何上述 entry 暴露的命名导出（class / function / const / type / interface）；
2. **重命名**——直接 rename 等价于 1（即使加 deprecated alias 也算 breaking，除非
   alias 保留至少一个 major 版本周期）；
3. **方法签名收紧**：新增必填参数、收缩参数类型、放宽返回类型；
4. **类层级改动**：把已有 class 转成 interface、删除 `extends`、把 public 改 protected/private；
5. **抛错语义变化**：原本不抛的代码路径开始抛、抛的 error code 改名；
6. **运行时行为变化**：相同输入产出不同字节（除非属于 OOXML 兼容性提升，PR 描述里明示）。

下列不算 breaking：

- 添加新可选参数（必须有默认值）；
- 放宽参数类型；
- 添加新方法 / 类 / 模块；
- 修 bug（产物行为改变到「更符合 OOXML 规范」，PR 描述里说明 issue 编号）。

## 怎么知道有没有破坏 API

跑 `pnpm api:check`。Build 后 api-extractor 会校验 `dist/<entry>/index.d.ts` 与
`api/<entry>.api.md` 是否一致：

- 不一致 → exit 1，提示开发者运行 `pnpm api:update` 并 commit。
- 一致 → exit 0。

CI 加了同样的 check，PR 没更新 api 报告无法合并。

任何 api 报告 diff 都必须在 PR 描述里：

- 标 `api-update`：纯文档 / 注释 / 内部重构溢出到 surface（非语义变化）；
- 标 `api-add`：新 API（不构成 breaking）；
- 标 `BREAKING`：构成 v1.0+ breaking。

## 长期 unstable 区域

虽然落在 entry 暴露范围，但短期内仍会调整：

- `openxml-ts/linq` 的 mutator API（Epic-7）——`XElement.SetAttributeValue` 等
  仍可能根据用户反馈微调。1.0 时锁定。

## 与 .NET DocumentFormat.OpenXml SDK 的对齐边界

openxml-ts 的使命是忠实移植微软 DocumentFormat.OpenXml SDK 的能力，但它是一次**有意的重新架构**，不是逐成员镜像。完整的逐类比对见
[`sdk-parity-audit.md`](./sdk-parity-audit.md)。下面声明对齐边界，作为 1.0 承诺的一部分。

**已对齐（核心）：**

- typed element 类层：155 个 OOXML 命名空间全覆盖（~4400 个 schema 类）；
- typed Part 类层：128 个，对位 `DocumentFormat.OpenXml.Packaging`；
- `OpenXmlElement` 家族公开方法（导航 / 变更 / 内容 / 克隆）；
- 值类型：22 个，与 .NET `OpenXmlSimpleValue` 家族对齐；
- `OpenXmlValidator`：结构（Particle）+ 属性 + 943/948 条 schematron 语义规则 + `FileFormatVersions` 版本定向；
- 流式 API（`OpenXmlPartReader` / `OpenXmlPartWriter`）、Markup Compatibility 协商；
- `IFeatureCollection` / `FeatureCollection` 扩展点。

**有意分叉 / 有意省略（不视为「遗失」）：**

- **封装层架构**：openxml-ts 用「低层 `OpenXmlPackage` / `IPackagePart` + 文档门面」组合，
  替代 .NET 的三层 part 继承体系——能力等价，类层级不同。
- **Features 体系**：仅移植面向使用者的公开子集；.NET 的 ~37 个 `internal` feature 接口
  与事件 feature 属于其封装层的依赖注入管线，openxml-ts 架构无对应宿主，不移植。
- **schematron**：943/948。余 5 条是语义二义的裸属性测试，强行覆盖会对合法文件误报，
  为守「真实文件零误报」底线而留空。
- **明确不做**（这些也不属 .NET SDK 核心对象模型）：文档渲染、OOXML 加密解密、
  模板引擎、VBA 宏执行、数字签名验证。

**便捷扩展层**：openxml-ts 自有的人机工程学 API（mixin / 自由函数），.NET SDK 无对等物，
已在 [`convenience-layer.md`](./convenience-layer.md) 全量标注——属「之上的扩展」，不冒充移植层。

1.0 之后，上述「已对齐」与「便捷扩展层」surface 走严格 semver；分叉与省略的边界若调整，
会在 CHANGELOG 与本文件记录。

## 历史

- 2026-05-18：初稿，伴随 api-extractor 接入。
- 2026-05-22：补全 4 个新 entry（office-ext / validation / streaming / markup-compat）；
  新增「与 .NET SDK 的对齐边界」声明（1.0 门禁，#270）。
