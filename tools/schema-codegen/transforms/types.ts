/**
 * Schema `Type` 字段 → TypeScript 类型 + 所需 import。
 *
 * 对位 Story-2.2 已落地的 9 个值类（StringValue / BooleanValue / Int32Value / ...）。
 * 未知或 EnumValue 暂时退化（见 fallthroughs）——Story-2.5 会扩展为查 enum 注册表。
 */

export interface TsTypeRef {
  /** 表达式形态，例如 `"HexBinaryValue"` 或 `"EnumValue<string>"`。 */
  readonly expr: string;
  /** 从根 `src/element/index.js` 还是其它路径 import 的具名。可重复。 */
  readonly imports: readonly string[];
}

const SIMPLE_VALUE_TYPES: Readonly<Record<string, string>> = {
  StringValue: "StringValue",
  BooleanValue: "BooleanValue",
  OnOffValue: "BooleanValue", // PRD §FR-2 合并
  Int32Value: "Int32Value",
  Int64Value: "Int64Value",
  UInt32Value: "UInt32Value",
  DecimalValue: "DecimalValue",
  HexBinaryValue: "HexBinaryValue",
  DateTimeValue: "DateTimeValue",
};

const ENUM_RE = /^EnumValue<(?:DocumentFormat\.OpenXml\.[^>]+)>$/;

export function mapSchemaType(schemaType: string): TsTypeRef {
  if (SIMPLE_VALUE_TYPES[schemaType] !== undefined) {
    const name = SIMPLE_VALUE_TYPES[schemaType] as string;
    return { expr: name, imports: [name] };
  }
  if (ENUM_RE.test(schemaType)) {
    // Story-2.4 占位：EnumValue 的成员 literal tuple 需要 Story-2.5 抽取 schema enum
    // 才能生成；在此之前退化为 StringValue 保证产物可编译。
    // TODO(Story-2.5): 引入 enum literal 类型并改为 `EnumValue<MyEnum>` 形态。
    return { expr: "StringValue", imports: ["StringValue"] };
  }
  // 未知 schema type 退化为 StringValue（与 .NET fallback 一致）
  return { expr: "StringValue", imports: ["StringValue"] };
}
