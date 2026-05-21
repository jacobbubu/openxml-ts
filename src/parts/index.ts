/**
 * `src/parts` 公共入口。
 *
 * 导出所有手写 Part 类 + Epic-77 codegen 生成的 97 个 Part 类。
 * 子系统（word / excel / ppt）的 parts/index.ts 已按需 re-export 各自需要的子集；
 * 此文件提供统一入口供内部模块或高级用户按需引用。
 */

// hand-written parts
export { BinaryPart } from "./binary-part.js";
export { TypedXmlPart, isTypedPartLoading } from "./typed-xml-part.js";
export { ChartPart } from "./chart-part.js";
export { ThemePart } from "./theme-part.js";
export { ImagePart } from "./image-part.js";
export { CorePropertiesPart } from "./core-properties-part.js";
export { CustomFilePropertiesPart } from "./custom-file-properties-part.js";
export { CustomXmlPart } from "./custom-xml-part.js";
export { CustomXmlPropertiesPart } from "./custom-xml-properties-part.js";
export { ExtendedFilePropertiesPart } from "./extended-file-properties-part.js";

// generated parts (Epic-77)
export * from "./generated/index.js";
