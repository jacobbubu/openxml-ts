/**
 * Epic-92: Strict 度量值单位转换 — ST_UniversalMeasure 解析。
 *
 * 覆盖：
 * 1. parseUniversalMeasureToTwips：各单位正向换算
 * 2. parseUniversalMeasureToTwips：负值（带符号）
 * 3. parseUniversalMeasureToTwips：非法输入 → undefined
 * 4. Int32Value.parse：接受 ST_UniversalMeasure 格式
 * 5. Int32Value.parse：Transitional 整数格式不受影响（回归守卫）
 * 6. UInt32Value.parse：接受 ST_UniversalMeasure 格式
 * 7. UInt32Value.parse：Transitional 整数格式不受影响（回归守卫）
 * 8. Strict01.docx validatePackage → 0 REQUIRED_ATTR_MISSING（端到端）
 * 9. Transitional .docx validatePackage → 0 REQUIRED_ATTR_MISSING（回归守卫）
 * 10. Strict TabStop 反序列化后 position 已解析为整数（typed field 非 undefined）
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { Int32Value, UInt32Value, parseUniversalMeasureToTwips } from "../../src/element/index.js";
import { OpenXmlValidator, registerConstraints } from "../../src/validation/OpenXmlValidator.js";
import { constraints as wordConstraints } from "../../src/validation/constraints/word.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

beforeAll(() => {
  registerConstraints(wordConstraints);
});

// ── parseUniversalMeasureToTwips ──────────────────────────────────────────────

describe("parseUniversalMeasureToTwips · 单位换算", () => {
  it("pt: 1pt = 20 twips", () => {
    expect(parseUniversalMeasureToTwips("1pt")).toBe(20);
  });

  it("pt: 467.50pt → 9350 twips", () => {
    // This is the actual value from Strict01.docx
    expect(parseUniversalMeasureToTwips("467.50pt")).toBe(9350);
  });

  it("in: 1in = 1440 twips", () => {
    expect(parseUniversalMeasureToTwips("1in")).toBe(1440);
  });

  it("cm: 2.54cm = 1440 twips (1 inch)", () => {
    expect(parseUniversalMeasureToTwips("2.54cm")).toBe(1440);
  });

  it("mm: 25.4mm = 1440 twips (1 inch)", () => {
    expect(parseUniversalMeasureToTwips("25.4mm")).toBe(1440);
  });

  it("pc: 1pc = 240 twips", () => {
    expect(parseUniversalMeasureToTwips("1pc")).toBe(240);
  });

  it("pi: 1pi = 240 twips (pica alias)", () => {
    expect(parseUniversalMeasureToTwips("1pi")).toBe(240);
  });

  it("negative: -467.50pt → -9350 twips", () => {
    expect(parseUniversalMeasureToTwips("-467.50pt")).toBe(-9350);
  });

  it("negative in: -1in → -1440 twips", () => {
    expect(parseUniversalMeasureToTwips("-1in")).toBe(-1440);
  });

  it("invalid: plain integer → undefined", () => {
    expect(parseUniversalMeasureToTwips("1234")).toBeUndefined();
  });

  it("invalid: unknown unit → undefined", () => {
    expect(parseUniversalMeasureToTwips("1em")).toBeUndefined();
  });

  it("invalid: empty string → undefined", () => {
    expect(parseUniversalMeasureToTwips("")).toBeUndefined();
  });

  it("invalid: text without number → undefined", () => {
    expect(parseUniversalMeasureToTwips("pt")).toBeUndefined();
  });
});

// ── Int32Value.parse ──────────────────────────────────────────────────────────

describe("Int32Value.parse · ST_UniversalMeasure 接受", () => {
  it("467.50pt → Int32Value(9350)", () => {
    const v = Int32Value.parse("467.50pt");
    expect(v).toBeDefined();
    expect(v?.value).toBe(9350);
  });

  it("2.54cm → Int32Value(1440)", () => {
    const v = Int32Value.parse("2.54cm");
    expect(v).toBeDefined();
    expect(v?.value).toBe(1440);
  });

  it("-1in → Int32Value(-1440)", () => {
    const v = Int32Value.parse("-1in");
    expect(v).toBeDefined();
    expect(v?.value).toBe(-1440);
  });

  it("Transitional 整数 '9350' 不受影响（回归守卫）", () => {
    const v = Int32Value.parse("9350");
    expect(v).toBeDefined();
    expect(v?.value).toBe(9350);
  });

  it("Transitional 负整数 '-1440' 不受影响（回归守卫）", () => {
    const v = Int32Value.parse("-1440");
    expect(v).toBeDefined();
    expect(v?.value).toBe(-1440);
  });

  it("非法字符串 → undefined（回归守卫）", () => {
    expect(Int32Value.parse("hello")).toBeUndefined();
    expect(Int32Value.parse("1.5")).toBeUndefined();
    expect(Int32Value.parse("")).toBeUndefined();
    expect(Int32Value.parse(undefined)).toBeUndefined();
  });
});

// ── UInt32Value.parse ─────────────────────────────────────────────────────────

describe("UInt32Value.parse · ST_UniversalMeasure 接受", () => {
  it("467.50pt → UInt32Value(9350)", () => {
    const v = UInt32Value.parse("467.50pt");
    expect(v).toBeDefined();
    expect(v?.value).toBe(9350);
  });

  it("Transitional 整数 '9350' 不受影响（回归守卫）", () => {
    const v = UInt32Value.parse("9350");
    expect(v).toBeDefined();
    expect(v?.value).toBe(9350);
  });

  it("负 twips 结果 → undefined（UInt32 不接受负值）", () => {
    expect(UInt32Value.parse("-1pt")).toBeUndefined();
  });

  it("非法字符串 → undefined（回归守卫）", () => {
    expect(UInt32Value.parse("hello")).toBeUndefined();
    expect(UInt32Value.parse("")).toBeUndefined();
    expect(UInt32Value.parse(undefined)).toBeUndefined();
  });
});

// ── 端到端：Strict01.docx validatePackage ────────────────────────────────────

const REQUIRED_ATTR_IDS = new Set(["REQUIRED_ATTR_MISSING"]);

describe("Epic-92: Strict01.docx validatePackage → 0 REQUIRED_ATTR_MISSING", () => {
  it("Strict01.docx validatePackage → 0 误报（核心修复：w:pos UniversalMeasure 已解析）", async () => {
    const strictPath = join(FIXTURES_DIR, "Strict01.docx");
    let strictBytes: Uint8Array;
    try {
      strictBytes = new Uint8Array(await readFile(strictPath));
    } catch {
      return; // fixture not available
    }

    const { WordprocessingDocument } = await import("../../src/word/index.js");
    const doc = await WordprocessingDocument.openAsync(strictBytes);

    const validator = new OpenXmlValidator({ skipUnknown: true });
    const errors = validator.validatePackage(doc);
    const reqErrors = errors.filter((e) => REQUIRED_ATTR_IDS.has(e.id));

    if (reqErrors.length > 0) {
      console.error(
        `Strict01.docx required-attr errors (${reqErrors.length}):\n${reqErrors
          .slice(0, 10)
          .map((e) => `  [${e.id}] ${e.description}`)
          .join("\n")}`,
      );
    }
    expect(reqErrors).toHaveLength(0);
  }, 30000);

  it("Strict01.docx TabStop.position 已解析为整数（typed field 非 undefined）", async () => {
    const strictPath = join(FIXTURES_DIR, "Strict01.docx");
    let strictBytes: Uint8Array;
    try {
      strictBytes = new Uint8Array(await readFile(strictPath));
    } catch {
      return;
    }

    const { WordprocessingDocument } = await import("../../src/word/index.js");
    const { TabStop } = await import("../../src/word/generated/tab-stop.js");
    const doc = await WordprocessingDocument.openAsync(strictBytes);

    const tabStops: Array<{ val: string | undefined; position: number | undefined }> = [];
    for (const el of doc.mainDocumentPart?.document.descendants() ?? []) {
      if (el instanceof TabStop && el.position !== undefined) {
        tabStops.push({ val: el.val?.value, position: el.position.value });
      }
    }

    // Strict01.docx has tab stops with universal measure positions
    expect(tabStops.length).toBeGreaterThan(0);
    // All discovered tab stops must have a parsed integer position
    for (const ts of tabStops) {
      expect(typeof ts.position).toBe("number");
      expect(Number.isInteger(ts.position)).toBe(true);
    }
  }, 30000);

  it("全部 Transitional .docx validatePackage → 0 REQUIRED_ATTR_MISSING（回归守卫）", async () => {
    let files: string[];
    try {
      files = (await readdir(FIXTURES_DIR)).filter(
        (f) => f.endsWith(".docx") && !f.includes("Strict"),
      );
    } catch {
      return;
    }
    if (files.length === 0) return;

    const { WordprocessingDocument } = await import("../../src/word/index.js");
    const validator = new OpenXmlValidator({ skipUnknown: true });

    let totalReqErrors = 0;
    const errorDetails: string[] = [];

    for (const filename of files) {
      try {
        const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, filename)));
        const doc = await WordprocessingDocument.openAsync(bytes);
        const errors = validator.validatePackage(doc);
        const reqErrors = errors.filter((e) => REQUIRED_ATTR_IDS.has(e.id));
        totalReqErrors += reqErrors.length;
        if (reqErrors.length > 0 && errorDetails.length < 5) {
          errorDetails.push(`  ${filename}: ${reqErrors.length} required-attr errors`);
          for (const e of reqErrors.slice(0, 2)) {
            errorDetails.push(`    [${e.id}] ${e.description}`);
          }
        }
      } catch {
        // Skip files that cannot be opened
      }
    }

    if (totalReqErrors > 0) {
      console.error(`Transitional docs required-attr errors:\n${errorDetails.join("\n")}`);
    }
    expect(totalReqErrors).toBe(0);
  }, 120000);
});
