/**
 * openxml-ts markup-compat subsystem — Epic-81.
 *
 * 实现 ISO/IEC 29500 Part 3 规定的 Markup Compatibility (MC) 协商处理。
 *
 * 导出：
 *  - `FileFormatVersions`                   — Office 版本枚举（位掩码）
 *  - `NAMESPACE_VERSION_MAP`                — 命名空间 URI → 最低版本映射
 *  - `isNamespaceUnderstood`                — 版本理解判断辅助函数
 *  - `MarkupCompatibilityProcessSettings`   — MC 处理设置（type）
 *  - `McProcessMode`                        — 处理模式联合类型（type）
 *  - `MarkupCompatibilityError`             — mc:MustUnderstand 违例错误
 *  - `processMarkupCompatibility`           — 主处理函数（纯树变换）
 */

export {
  FileFormatVersions,
  NAMESPACE_VERSION_MAP,
  isNamespaceUnderstood,
} from "./file-format-versions.js";

export type { FileFormatVersions as FileFormatVersionsType } from "./file-format-versions.js";

export {
  MarkupCompatibilityError,
  processMarkupCompatibility,
} from "./mc-processor.js";

export type {
  MarkupCompatibilityProcessSettings,
  McProcessMode,
} from "./mc-processor.js";
