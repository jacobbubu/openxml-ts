/**
 * Schema `Type` 字段 → TypeScript 类型 + 所需 import。
 *
 * 对位 Story-2.2 已落地的 9 个值类（StringValue / BooleanValue / Int32Value / ...）。
 * 未知或 EnumValue 暂时退化（见 fallthroughs）——Story-2.5 会扩展为查 enum 注册表。
 */

export interface TsTypeRef {
  /** 表达式形态，例如 `"HexBinaryValue"` 或 `"ListValue<StringValue>"`。 */
  readonly expr: string;
  /** 从根 `src/element/index.js` 还是其它路径 import 的具名。可重复。 */
  readonly imports: readonly string[];
  /**
   * 可选：覆盖默认 `${expr}.parse(value)` 的完整 parse 调用表达式。
   * 用于 `ListValue<T>` 等需要额外参数的类型。
   * 占位符 `VALUE` 会被替换为实际变量名（通常为 `"value"`）。
   */
  readonly parseExpr?: string;
}

const SIMPLE_VALUE_TYPES: Readonly<Record<string, string>> = {
  StringValue: "StringValue",
  BooleanValue: "BooleanValue",
  Int32Value: "Int32Value",
  Int64Value: "Int64Value",
  UInt32Value: "UInt32Value",
  DecimalValue: "DecimalValue",
  HexBinaryValue: "HexBinaryValue",
  DateTimeValue: "DateTimeValue",
  // Epic-94: 补齐 13 个缺失值类
  OnOffValue: "OnOffValue",
  TrueFalseValue: "TrueFalseValue",
  TrueFalseBlankValue: "TrueFalseBlankValue",
  DoubleValue: "DoubleValue",
  SingleValue: "SingleValue",
  Base64BinaryValue: "Base64BinaryValue",
  ByteValue: "ByteValue",
  SByteValue: "SByteValue",
  Int16Value: "Int16Value",
  UInt16Value: "UInt16Value",
  UInt64Value: "UInt64Value",
  IntegerValue: "IntegerValue",
};

const ENUM_RE = /^EnumValue<(?:DocumentFormat\.OpenXml\.[^>]+)>$/;
// Matches "ListValue<StringValue>", "ListValue<UInt32Value>", etc.
const LIST_VALUE_RE = /^ListValue<([A-Za-z0-9]+)>$/;

export function mapSchemaType(schemaType: string): TsTypeRef {
  if (SIMPLE_VALUE_TYPES[schemaType] !== undefined) {
    const name = SIMPLE_VALUE_TYPES[schemaType] as string;
    return { expr: name, imports: [name] };
  }
  // ListValue<T> — resolve inner type recursively
  const listMatch = LIST_VALUE_RE.exec(schemaType);
  if (listMatch !== null) {
    const innerName = listMatch[1] as string;
    const innerType = SIMPLE_VALUE_TYPES[innerName] ?? "StringValue";
    return {
      expr: `ListValue<${innerType}>`,
      imports: ["ListValue", innerType],
      // ListValue.parse requires a second argument: the item parser function
      parseExpr: `ListValue.parse(VALUE, ${innerType}.parse)`,
    };
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
