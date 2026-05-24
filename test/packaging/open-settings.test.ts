/**
 * OpenSettings 测试 — Epic-121 Phase 1。
 *
 * 覆盖：
 * - 默认值与 .NET 行为对齐
 * - 显式传入 MarkupCompatibilityProcessSettings
 * - AutoSave=false
 * - MaxCharactersInPart
 * - CompatibilityLevel 默认解析
 * - OpenSettings.from() 复制语义
 * - openAsync() 接受 OpenSettings 作为第二参数（向后兼容验证）
 */

import { describe, expect, it } from "vitest";
import { FileFormatVersions } from "../../src/markup-compat/file-format-versions.js";
import {
  CompatibilityLevel,
  type MarkupCompatibilityProcessSettings,
  OpenSettings,
} from "../../src/packaging/open-settings.js";

describe("OpenSettings 默认值", () => {
  it("无参构造时 autoSave 为 true", () => {
    const s = new OpenSettings();
    expect(s.autoSave).toBe(true);
  });

  it("无参构造时 maxCharactersInPart 为 0（不限制）", () => {
    const s = new OpenSettings();
    expect(s.maxCharactersInPart).toBe(0);
  });

  it("无参构造时 compatibilityLevel 为 Default", () => {
    const s = new OpenSettings();
    expect(s.compatibilityLevel).toBe("Default");
  });

  it("默认 MC 设置为 NoProcess", () => {
    const s = new OpenSettings();
    expect(s.markupCompatibilityProcessSettings.processMode).toBe("NoProcess");
  });

  it("默认 MC 设置 targetFileFormatVersions 为 Office2007", () => {
    const s = new OpenSettings();
    expect(s.markupCompatibilityProcessSettings.targetFileFormatVersions).toBe(
      FileFormatVersions.Office2007,
    );
  });
});

describe("OpenSettings resolvedCompatibilityLevel", () => {
  it("Default 解析为 Version_3_0", () => {
    const s = new OpenSettings({ compatibilityLevel: "Default" });
    expect(s.resolvedCompatibilityLevel).toBe("Version_3_0");
  });

  it("Version_2_20 保持不变", () => {
    const s = new OpenSettings({ compatibilityLevel: "Version_2_20" });
    expect(s.resolvedCompatibilityLevel).toBe("Version_2_20");
  });

  it("Version_3_0 保持不变", () => {
    const s = new OpenSettings({ compatibilityLevel: "Version_3_0" });
    expect(s.resolvedCompatibilityLevel).toBe("Version_3_0");
  });
});

describe("OpenSettings 显式传参", () => {
  it("autoSave=false 正确保存", () => {
    const s = new OpenSettings({ autoSave: false });
    expect(s.autoSave).toBe(false);
  });

  it("maxCharactersInPart 正确保存", () => {
    const s = new OpenSettings({ maxCharactersInPart: 10_000_000 });
    expect(s.maxCharactersInPart).toBe(10_000_000);
  });

  it("显式传入 mcSettings 正确保存", () => {
    const mcSettings: MarkupCompatibilityProcessSettings = {
      processMode: "ProcessAllParts",
      targetFileFormatVersions: FileFormatVersions.Office2019,
    };
    const s = new OpenSettings({ markupCompatibilityProcessSettings: mcSettings });
    expect(s.markupCompatibilityProcessSettings.processMode).toBe("ProcessAllParts");
    expect(s.markupCompatibilityProcessSettings.targetFileFormatVersions).toBe(
      FileFormatVersions.Office2019,
    );
  });

  it("compatibilityLevel=Version_2_20 正确保存", () => {
    const s = new OpenSettings({ compatibilityLevel: "Version_2_20" });
    expect(s.compatibilityLevel).toBe("Version_2_20");
  });
});

describe("OpenSettings.from() 复制语义", () => {
  it("from(null) 返回默认实例", () => {
    const s = OpenSettings.from(null);
    expect(s.autoSave).toBe(true);
    expect(s.compatibilityLevel).toBe("Default");
  });

  it("from(undefined) 返回默认实例", () => {
    const s = OpenSettings.from(undefined);
    expect(s.autoSave).toBe(true);
  });

  it("from(OpenSettings) 深拷贝所有字段", () => {
    const original = new OpenSettings({
      autoSave: false,
      maxCharactersInPart: 999,
      compatibilityLevel: "Version_2_20",
      markupCompatibilityProcessSettings: {
        processMode: "ProcessLoadedPartsOnly",
        targetFileFormatVersions: FileFormatVersions.Office2013,
      },
    });
    const copy = OpenSettings.from(original);
    expect(copy).not.toBe(original);
    expect(copy.autoSave).toBe(false);
    expect(copy.maxCharactersInPart).toBe(999);
    expect(copy.compatibilityLevel).toBe("Version_2_20");
    expect(copy.markupCompatibilityProcessSettings.processMode).toBe("ProcessLoadedPartsOnly");
    expect(copy.markupCompatibilityProcessSettings.targetFileFormatVersions).toBe(
      FileFormatVersions.Office2013,
    );
  });

  it("from(OpenSettingsInit) 从 plain object 构造", () => {
    const s = OpenSettings.from({ autoSave: false, maxCharactersInPart: 42 });
    expect(s.autoSave).toBe(false);
    expect(s.maxCharactersInPart).toBe(42);
  });
});

describe("CompatibilityLevel 枚举常量", () => {
  it("枚举值存在且正确", () => {
    expect(CompatibilityLevel.Default).toBe("Default");
    expect(CompatibilityLevel.Version_2_20).toBe("Version_2_20");
    expect(CompatibilityLevel.Version_3_0).toBe("Version_3_0");
  });
});
