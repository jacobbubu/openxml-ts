# schema-codegen

把 `dotnet/Open-XML-SDK/data/schemas/*.json` 转换成符合 Story-2.1/2.2/2.3 形态的 TypeScript element 类。

## 跑

```bash
pnpm gen:word                      # 默认读 Word 主 schema → src/word/generated/
pnpm gen:word -- --input <path>    # 自定义输入
pnpm gen:word -- --output <dir>    # 自定义输出
```

## 何时跑

- 上游 schema JSON 升级（罕见）；
- codegen 模板 / transforms 变更（Story-2.4 之后任何调整）；
- 新增文档族（Epic-3 Excel / Epic-4 PPT），切换 `--input` 走同一管线。

## 设计

```
schema JSON
   │
   ├─► transforms/types.ts        ── schema "Type" → TS 表达式 + import
   ├─► transforms/names.ts        ── 解析 "w:CT_X/w:y" 拿元素名 / className → 文件名
   ├─► transforms/namespaces.ts   ── prefix ↔ URI 表
   │
   └─► element-template.ts        ── SchemaType → 一份 .ts 文件字符串
                                       含 banner + import + class + writeTo / applyAttribute / collectAttributes
   │
   └─► generate.ts                ── 串起 IO，写文件
```

## 确定性

两次跑产物字节级一致——同一 schema、同一代码版本永远输出同一份代码。
单测用 `vitest snapshot` 守护这一约束。

## 当前限制（Story-2.4 范围）

- EnumValue 仅退化为 `EnumValue<string>`（Story-2.5 会引入 enum literal 类型）；
- 不生成 `_registry.ts` / `index.ts` 汇总（Story-2.5 加）；
- 跨 namespace 引用的 element/attribute prefix 解析使用 well-known 表，
  未知 namespace 退化到 schema TargetNamespace。
