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

## 历史

- 2026-05-18：初稿，伴随 api-extractor 接入。
EOF
