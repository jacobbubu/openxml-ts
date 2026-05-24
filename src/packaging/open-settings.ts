/**
 * OpenSettings — 打开文档时的设置容器。
 *
 * 对位 .NET `DocumentFormat.OpenXml.Packaging.OpenSettings`。
 * 控制文档打开行为：MC 协商处理、AutoSave、最大字符数限制、兼容性级别。
 *
 * 用法示例：
 * ```ts
 * const settings = new OpenSettings({
 *   autoSave: false,
 *   markupCompatibilityProcessSettings: {
 *     processMode: "ProcessAllParts",
 *     targetFileFormatVersions: FileFormatVersions.Office2019,
 *   },
 * });
 * const doc = await WordprocessingDocument.openAsync(bytes, settings);
 * ```
 *
 * @see DocumentFormat.OpenXml.Packaging.OpenSettings
 */

import type { FileFormatVersions } from "../markup-compat/file-format-versions.js";
import type {
  MarkupCompatibilityProcessSettings,
  McProcessMode,
} from "../markup-compat/mc-processor.js";

export type { McProcessMode, MarkupCompatibilityProcessSettings };

/**
 * SDK 版本兼容性级别枚举。
 *
 * 控制 SDK 在处理历史 .docx / .xlsx / .pptx 文件时采用的行为版本。
 * 对位 .NET `DocumentFormat.OpenXml.Packaging.CompatibilityLevel`。
 *
 * 说明：
 * - `"Default"` — 使用最新 SDK 行为（等同于 Version_3_0）
 * - `"Version_2_20"` — 尽量维持与 .NET v2.20 的兼容行为
 * - `"Version_3_0"` — 尽量维持与 .NET v3.0 的兼容行为（默认）
 *
 * 注意：TS 端当前未实现历史 schema 变体识别；此字段作为占位保留，
 * 影响行为的扩展在后续 Epic 中落地。详见 follow-up issue #364。
 */
export type CompatibilityLevel = "Default" | "Version_2_20" | "Version_3_0";

export const CompatibilityLevel = {
  /** 使用最新 SDK 行为（默认等同于 Version_3_0）。 */
  Default: "Default",
  /** 维持与 .NET v2.20 的兼容行为。 */
  Version_2_20: "Version_2_20",
  /** 维持与 .NET v3.0 的兼容行为（推荐默认值）。 */
  Version_3_0: "Version_3_0",
} as const satisfies Record<string, CompatibilityLevel>;

/**
 * `OpenSettings` 构造参数。所有字段均可选，省略时使用默认值。
 */
export interface OpenSettingsInit {
  /**
   * 是否自动保存文档修改。默认 `true`。
   *
   * 对位 .NET `OpenSettings.AutoSave`。
   */
  readonly autoSave?: boolean;

  /**
   * Markup Compatibility (MC) 协商处理设置。
   * 省略时（或 processMode 为 `"NoProcess"`）不执行任何 MC 处理，现有行为完全不变。
   *
   * 对位 .NET `OpenSettings.MarkupCompatibilityProcessSettings`。
   */
  readonly markupCompatibilityProcessSettings?: MarkupCompatibilityProcessSettings;

  /**
   * 每个 Part 允许的最大字符数。`0` 表示不限制。默认 `0`。
   *
   * 用于防御 Zip bomb / 超大文档 DoS。
   * 对位 .NET `OpenSettings.MaxCharactersInPart`。
   */
  readonly maxCharactersInPart?: number;

  /**
   * SDK 版本兼容性级别。默认 `"Default"`（行为等同于 `"Version_3_0"`）。
   *
   * 对位 .NET `OpenSettings.CompatibilityLevel`。
   */
  readonly compatibilityLevel?: CompatibilityLevel;
}

/**
 * 打开文档时的设置容器。
 *
 * 对位 .NET `DocumentFormat.OpenXml.Packaging.OpenSettings`。
 */
export class OpenSettings {
  /** 是否自动保存文档修改。默认 `true`。 */
  readonly autoSave: boolean;

  /**
   * Markup Compatibility 处理设置。
   * 默认值：`{ processMode: "NoProcess", targetFileFormatVersions: FileFormatVersions.Office2007 }`。
   */
  readonly markupCompatibilityProcessSettings: MarkupCompatibilityProcessSettings;

  /**
   * 每个 Part 允许的最大字符数。`0` 表示不限制。
   */
  readonly maxCharactersInPart: number;

  /**
   * SDK 版本兼容性级别。`"Default"` 在运行时等同于 `"Version_3_0"`。
   */
  readonly compatibilityLevel: CompatibilityLevel;

  /**
   * 创建具有默认值的 `OpenSettings` 实例。
   */
  constructor(init?: OpenSettingsInit) {
    this.autoSave = init?.autoSave ?? true;
    this.markupCompatibilityProcessSettings =
      init?.markupCompatibilityProcessSettings ?? OpenSettings.defaultMcSettings;
    this.maxCharactersInPart = init?.maxCharactersInPart ?? 0;
    this.compatibilityLevel = init?.compatibilityLevel ?? "Default";
  }

  /**
   * 解析后的兼容性级别：将 `"Default"` 映射到 `"Version_3_0"`，与 .NET 行为一致。
   */
  get resolvedCompatibilityLevel(): Exclude<CompatibilityLevel, "Default"> {
    return this.compatibilityLevel === "Default" ? "Version_3_0" : this.compatibilityLevel;
  }

  /** 默认 MC 设置（NoProcess）。 */
  static readonly defaultMcSettings: MarkupCompatibilityProcessSettings = {
    processMode: "NoProcess",
    targetFileFormatVersions: 1 satisfies FileFormatVersions, // FileFormatVersions.Office2007
  };

  /**
   * 从另一个 `OpenSettings` 实例或 `OpenSettingsInit` 对象复制，构造新实例。
   * 对位 .NET 内部 `OpenSettings(OpenSettings? other)` 复制构造函数。
   */
  static from(other: OpenSettings | OpenSettingsInit | undefined | null): OpenSettings {
    if (other == null) {
      return new OpenSettings();
    }
    if (other instanceof OpenSettings) {
      return new OpenSettings({
        autoSave: other.autoSave,
        markupCompatibilityProcessSettings: other.markupCompatibilityProcessSettings,
        maxCharactersInPart: other.maxCharactersInPart,
        compatibilityLevel: other.compatibilityLevel,
      });
    }
    return new OpenSettings(other);
  }
}
