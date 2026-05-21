/**
 * openxml-ts streaming subsystem — Epic-80.
 *
 * SDK 风格流式 API，镜像 .NET DocumentFormat.OpenXml OpenXmlPartReader /
 * OpenXmlPartWriter。
 *
 * 导出：
 *  - `OpenXmlPartReader`    — 前向拉取游标
 *  - `OpenXmlPartWriter`    — 推送式写入器
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
