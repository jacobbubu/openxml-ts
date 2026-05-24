/**
 * Epic-122: Strict↔Transitional 元素/属性翻译完整移植。
 *
 * 1:1 端口 .NET Open-XML-SDK 以下测试文件（每个 Theory 的每条 InlineData 对应一个 it）：
 *   - ConditionalFormatStyleTests.cs  (§14.4.9/§14.11.9)
 *   - DocumentTests.cs                (§14.11.1)
 *   - IndentationTests.cs             (§14.3.1.2)
 *   - JustificationTests.cs           (§14.11.2)
 *   - StylePaneSortMethodsTests.cs    (§14.11.5)
 *   - TableJustificationTests.cs      (§14.11.3)
 *   - TableLookTests.cs               (§14.4.11)
 *   - TabStopTests.cs                 (§14.11.6)
 *   - TextDirectionTests.cs           (§14.11.7)
 *
 * Phase 0 发现：上游 Wordprocessing/ 目录共 11 个 .cs 文件。
 * 其中包含 Strict↔Transitional 属性翻译 Theory 的有 9 个（与复盘预估一致）；
 * TableRowTest.cs 和 TableTests.cs 为普通 API 测试，不含翻译逻辑，未端口。
 *
 * 测试策略：
 * - 每条 .NET [InlineData] 对应一个 it.each() 行，或独立 it()；
 * - 直接调用 element.applyAttribute(prefixedQname, value) 模拟 deserializer 路径；
 * - 不使用 OuterXml=xml（.NET 特有）——TS 端通过 applyAttribute 触发翻译。
 */

import { describe, expect, it } from "vitest";
import { ConditionalFormatStyle } from "../../src/word/generated/conditional-format-style.js";
import { Document } from "../../src/word/generated/document.js";
import { Indentation } from "../../src/word/generated/indentation.js";
import { Justification } from "../../src/word/generated/justification.js";
import { StylePaneSortMethods } from "../../src/word/generated/style-pane-sort-methods.js";
import { TabStop } from "../../src/word/generated/tab-stop.js";
import { TableJustification } from "../../src/word/generated/table-justification.js";
import { TableLook } from "../../src/word/generated/table-look.js";
import { TextDirection } from "../../src/word/generated/text-direction.js";

// ── Helper ────────────────────────────────────────────────────────────────────

/**
 * Simulate setting OuterXml by calling applyAttribute for a single attribute.
 * In the .NET tests, `element.OuterXml = xml` triggers `StrictTranslateAttribute`
 * which routes through `applyAttribute` in TS.
 */
function applyOne(
  el: { applyAttribute(q: string, v: string): void },
  localName: string,
  value: string,
): void {
  el.applyAttribute(`w:${localName}`, value);
}

// ── §14.11.2 Justification ────────────────────────────────────────────────────

describe("Justification: Strict→Transitional value translation (§14.11.2)", () => {
  it.each([
    ["val", "start", "left"],
    ["val", "end", "right"],
    ["val", "other", "other"],
  ])("w:%s=%s → val=%s", (localName, value, newValue) => {
    const element = new Justification();
    applyOne(element, localName, value);
    expect(element.val?.toString()).toBe(newValue);
  });
});

// ── §14.11.3 TableJustification ───────────────────────────────────────────────

describe("TableJustification: Strict→Transitional value translation (§14.11.3)", () => {
  it.each([
    ["val", "start", "left"],
    ["val", "end", "right"],
    ["val", "other", "other"],
  ])("w:%s=%s → val=%s", (localName, value, newValue) => {
    const element = new TableJustification();
    applyOne(element, localName, value);
    expect(element.val?.toString()).toBe(newValue);
  });
});

// ── §14.11.6 TabStop ──────────────────────────────────────────────────────────

describe("TabStop: Strict→Transitional value translation (§14.11.6)", () => {
  it.each([
    ["val", "start", "left"],
    ["val", "end", "right"],
    ["val", "other", "other"],
  ])("w:%s=%s → val=%s", (localName, value, newValue) => {
    const element = new TabStop();
    applyOne(element, localName, value);
    expect(element.val?.toString()).toBe(newValue);
  });
});

// ── §14.11.7 TextDirection ────────────────────────────────────────────────────

describe("TextDirection: Strict→Transitional value translation (§14.11.7)", () => {
  it.each([
    ["val", "lr", "btLr"],
    ["val", "tb", "lrTb"],
    ["val", "tbV", "lrTbV"],
    ["val", "lrV", "tbLrV"],
    ["val", "rl", "tbRl"],
    ["val", "rlV", "tbRlV"],
  ])("w:%s=%s → val=%s", (localName, value, newValue) => {
    const element = new TextDirection();
    applyOne(element, localName, value);
    expect(element.val?.toString()).toBe(newValue);
  });
});

// ── §14.11.5 StylePaneSortMethods ────────────────────────────────────────────

describe("StylePaneSortMethods: Strict→Transitional value translation (§14.11.5)", () => {
  it.each([
    ["val", "name", "0000"],
    ["val", "priority", "0001"],
    ["val", "default", "0002"],
    ["val", "font", "0003"],
    ["val", "basedOn", "0004"],
    ["val", "type", "0005"],
  ])("w:%s=%s → val=%s", (localName, value, newValue) => {
    const element = new StylePaneSortMethods();
    applyOne(element, localName, value);
    expect(element.val?.toString()).toBe(newValue);
  });
});

// ── §14.3.1.2 Indentation ─────────────────────────────────────────────────────
//
// The .NET test sets an attribute with the Strict name (e.g. "left") and expects
// the round-trip result to use the Transitional name (e.g. "start"), preserving
// the original value string unchanged. For string-typed attributes (start/end),
// the typed field holds the value. For int-typed attributes (startChars/endChars),
// non-numeric values like "something" cannot be parsed, so the verification is via
// collectAttributes() which uses the translated qname.

describe("Indentation: Strict→Transitional attribute name translation (§14.3.1.2)", () => {
  it.each([
    ["left", "something", "start"],
    ["left", "other", "start"],
    ["right", "something", "end"],
    ["right", "other", "end"],
  ] as [string, string, string][])(
    "string attribute w:%s=%s → stored as w:%s (string field)",
    (localName, value, targetField) => {
      const element = new Indentation();
      applyOne(element, localName, value);
      // String-typed fields (start/end) hold the translated value
      switch (targetField) {
        case "start":
          expect(element.start?.toString()).toBe(value);
          break;
        case "end":
          expect(element.end?.toString()).toBe(value);
          break;
      }
      // collectAttributes outputs translated qname, not original
      const attrs = (
        element as unknown as { collectAttributes(): [string, string][] }
      ).collectAttributes();
      const names = attrs.map(([k]) => k);
      expect(names).toContain(`w:${targetField}`);
      expect(names).not.toContain(`w:${localName}`);
    },
  );

  it.each([
    ["leftChars", "100", "startChars"],
    ["leftChars", "200", "startChars"],
    ["rightChars", "100", "endChars"],
    ["rightChars", "200", "endChars"],
  ] as [string, string, string][])(
    "int attribute w:%s=%s → stored as w:%s (int field)",
    (localName, value, targetField) => {
      const element = new Indentation();
      applyOne(element, localName, value);
      // Int-typed fields (startCharacters/endCharacters) hold the translated value
      switch (targetField) {
        case "startChars":
          expect(element.startCharacters?.toString()).toBe(value);
          break;
        case "endChars":
          expect(element.endCharacters?.toString()).toBe(value);
          break;
      }
      // collectAttributes outputs translated qname, not original
      const attrs = (
        element as unknown as { collectAttributes(): [string, string][] }
      ).collectAttributes();
      const names = attrs.map(([k]) => k);
      expect(names).toContain(`w:${targetField}`);
      expect(names).not.toContain(`w:${localName}`);
    },
  );
});

// ── Document: conformance="strict" removal ────────────────────────────────────

describe("Document: conformance attribute translation", () => {
  it("conformance=strict is dropped (removed)", () => {
    const doc = new Document();
    doc.applyAttribute("conformance", "strict");
    // Should NOT appear in extendedAttributes
    expect(doc.extendedAttributes.has("conformance")).toBe(false);
  });

  it("conformance=anything-else is kept", () => {
    const doc = new Document();
    doc.applyAttribute("conformance", "anything");
    expect(doc.extendedAttributes.get("conformance")).toBe("anything");
  });

  it("conformance='' is kept", () => {
    const doc = new Document();
    doc.applyAttribute("conformance", "");
    expect(doc.extendedAttributes.get("conformance")).toBe("");
  });

  it("unrelated attribute is kept", () => {
    const doc = new Document();
    doc.applyAttribute("anything", "something");
    expect(doc.extendedAttributes.get("anything")).toBe("something");
  });
});

// ── §14.4.11 TableLook (bit-mask) ─────────────────────────────────────────────

describe("TableLook: Strict→Transitional boolean→hex bitmask translation (§14.4.11)", () => {
  it.each([
    ["firstRow", "true", 0x0020],
    ["firstRow", "1", 0x0020],
    ["firstRow", "false", 0x0000],
    ["lastRow", "true", 0x0040],
    ["lastRow", "1", 0x0040],
    ["lastRow", "false", 0x0000],
    ["firstColumn", "true", 0x0080],
    ["firstColumn", "1", 0x0080],
    ["firstColumn", "false", 0x0000],
    ["lastColumn", "true", 0x0100],
    ["lastColumn", "1", 0x0100],
    ["lastColumn", "false", 0x0000],
    ["noHBand", "true", 0x0200],
    ["noHBand", "1", 0x0200],
    ["noHBand", "false", 0x0000],
    ["noVBand", "true", 0x0400],
    ["noVBand", "1", 0x0400],
    ["noVBand", "false", 0x0000],
  ] as [string, string, number][])("w:%s=%s → val=%s", (localName, value, expectedInt) => {
    const element = new TableLook();
    applyOne(element, localName, value);
    const expected = expectedInt.toString(16).padStart(4, "0");
    expect(element.val?.toString()).toBe(expected);
  });

  it("multiple boolean attributes accumulate in val bitmask", () => {
    const element = new TableLook();
    applyOne(element, "firstRow", "true"); // 0x0020
    applyOne(element, "lastRow", "true"); // 0x0040
    applyOne(element, "firstColumn", "true"); // 0x0080
    const expected = (0x0020 | 0x0040 | 0x0080).toString(16).padStart(4, "0");
    expect(element.val?.toString()).toBe(expected);
  });

  it("false clears the bit from accumulated val", () => {
    const element = new TableLook();
    applyOne(element, "firstRow", "true"); // 0x0020
    applyOne(element, "lastRow", "true"); // 0x0040
    applyOne(element, "firstRow", "false"); // clear 0x0020
    const expected = (0x0040).toString(16).padStart(4, "0");
    expect(element.val?.toString()).toBe(expected);
  });
});

// ── §14.4.9/§14.11.9 ConditionalFormatStyle (12-bit binary bitmask) ───────────

describe("ConditionalFormatStyle: Strict→Transitional boolean→binary bitmask translation (§14.11.9)", () => {
  it.each([
    ["firstRow", "true", 1 << 11],
    ["firstRow", "1", 1 << 11],
    ["firstRow", "false", 0],
    ["lastRow", "true", 1 << 10],
    ["lastRow", "1", 1 << 10],
    ["lastRow", "false", 0],
    ["firstColumn", "true", 1 << 9],
    ["firstColumn", "1", 1 << 9],
    ["firstColumn", "false", 0],
    ["lastColumn", "true", 1 << 8],
    ["lastColumn", "1", 1 << 8],
    ["lastColumn", "false", 0],
    ["oddVBand", "true", 1 << 7],
    ["oddVBand", "1", 1 << 7],
    ["oddVBand", "false", 0],
    ["evenVBand", "true", 1 << 6],
    ["evenVBand", "1", 1 << 6],
    ["evenVBand", "false", 0],
    ["oddHBand", "true", 1 << 5],
    ["oddHBand", "1", 1 << 5],
    ["oddHBand", "false", 0],
    ["evenHBand", "true", 1 << 4],
    ["evenHBand", "1", 1 << 4],
    ["evenHBand", "false", 0],
    ["firstRowLastColumn", "true", 1 << 3],
    ["firstRowLastColumn", "1", 1 << 3],
    ["firstRowLastColumn", "false", 0],
    ["firstRowFirstColumn", "true", 1 << 2],
    ["firstRowFirstColumn", "1", 1 << 2],
    ["firstRowFirstColumn", "false", 0],
    ["lastRowFirstColumn", "true", 1 << 1],
    ["lastRowFirstColumn", "1", 1 << 1],
    ["lastRowFirstColumn", "false", 0],
    ["lastRowLastColumn", "true", 1],
    ["lastRowLastColumn", "1", 1],
    ["lastRowLastColumn", "false", 0],
  ] as [string, string, number][])(
    "w:%s=%s → val contains bit %i",
    (localName, value, expectedBit) => {
      const element = new ConditionalFormatStyle();
      applyOne(element, localName, value);
      const expected = expectedBit.toString(2).padStart(12, "0");
      expect(element.val?.toString()).toBe(expected);
    },
  );

  it("multiple boolean attributes accumulate in 12-bit binary val", () => {
    const element = new ConditionalFormatStyle();
    applyOne(element, "firstRow", "true"); // bit 11 = 0x800
    applyOne(element, "lastRow", "true"); // bit 10 = 0x400
    const expected = ((1 << 11) | (1 << 10)).toString(2).padStart(12, "0");
    expect(element.val?.toString()).toBe(expected);
  });

  it("false clears the bit from accumulated val", () => {
    const element = new ConditionalFormatStyle();
    applyOne(element, "firstRow", "true");
    applyOne(element, "lastRow", "true");
    applyOne(element, "firstRow", "false");
    const expected = (1 << 10).toString(2).padStart(12, "0");
    expect(element.val?.toString()).toBe(expected);
  });
});
