/**
 * Schema 强类型属性值集合（Story-2.2 + Epic-94）。对位 .NET
 * `DocumentFormat.OpenXml.OpenXmlSimpleValue<T>` 子类家族（22 个值类）。
 */

export { StringValue } from "./string-value.js";
export { BooleanValue } from "./boolean-value.js";
export { Int32Value } from "./int32-value.js";
export { UInt32Value } from "./uint32-value.js";
export { Int64Value } from "./int64-value.js";
export { DecimalValue } from "./decimal-value.js";
export { HexBinaryValue } from "./hex-binary-value.js";
export { DateTimeValue } from "./date-time-value.js";
export { EnumValue } from "./enum-value.js";
// Epic-94: 补齐 13 个缺失值类
export { OnOffValue } from "./on-off-value.js";
export { TrueFalseValue } from "./true-false-value.js";
export { TrueFalseBlankValue } from "./true-false-blank-value.js";
export { DoubleValue } from "./double-value.js";
export { SingleValue } from "./single-value.js";
export { Base64BinaryValue } from "./base64-binary-value.js";
export { ByteValue } from "./byte-value.js";
export { SByteValue } from "./sbyte-value.js";
export { Int16Value } from "./int16-value.js";
export { UInt16Value } from "./uint16-value.js";
export { UInt64Value } from "./uint64-value.js";
export { IntegerValue } from "./integer-value.js";
export { ListValue } from "./list-value.js";
export { parseUniversalMeasureToTwips } from "./universal-measure.js";
