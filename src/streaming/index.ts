/**
 * openxml-ts streaming subsystem — Epic-80 / Epic-97.
 *
 * SDK 风格流式 API，镜像 .NET DocumentFormat.OpenXml OpenXmlPartReader /
 * OpenXmlPartWriter / OpenXmlDomReader。
 *
 * 导出：
 *  - `OpenXmlPartReader`    — 前向拉取游标（支持 string / IPackagePart 构造，Epic-97）
 *  - `OpenXmlPartWriter`    — 推送式写入器（支持 IPackagePart 构造 + closeAsync，Epic-97）
 *  - `OpenXmlDomReader`     — DOM 树遍历游标（Epic-97）
 *  - `ReaderAttribute`      — 属性描述（type）
 *  - `ReaderNodeType`       — 节点类型枚举（type）
 *  - `WriterAttributeDescriptor` — 写入器属性描述（type）
 *  - `StartElementDescriptor`    — writeStartElement 描述符（type）
 *  - `OpenXmlPartReaderOptions`  — reader 构造选项（type）
 */

export { OpenXmlPartReader } from "./openxml-part-reader.js";
export type {
  ReaderAttribute,
  ReaderNodeType,
  OpenXmlPartReaderOptions,
} from "./openxml-part-reader.js";

export { OpenXmlPartWriter } from "./openxml-part-writer.js";
export type {
  WriterAttributeDescriptor,
  StartElementDescriptor,
} from "./openxml-part-writer.js";

export { OpenXmlDomReader } from "./openxml-dom-reader.js";
