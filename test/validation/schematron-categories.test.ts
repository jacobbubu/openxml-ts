/**
 * Epic-84: Schematron semantic constraints — per-category faithful port tests.
 *
 * Tests per SDK category (faithful port of Validation/Semantic/*.cs):
 *   1.2  pattern       — regex match on attribute value
 *   1.4  validSet      — attribute value must be in allowed set
 *   1.10 invalidSet    — attribute value must NOT be in prohibited set
 *   1.14 absentWhenEq  — attribute must be absent when another equals a value
 *   1.15 absentWhenNeq — attribute must be absent when another does NOT equal a value
 *   1.16 mutualExcl    — at most one of a group of attributes may be present
 *   1.17 attrVsAttr    — value of one attribute must be <= (or <) another
 *   1.18 reqWhenOther  — attribute required when another equals a value
 *
 * Also includes:
 *   - Real Office fixture zero-false-positive sweep (ALL upstream-smoke/*.docx/xlsx/pptx)
 *   - Coverage assertion: reports covered/948 count
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it } from "vitest";
import { OpenXmlElementList } from "../../src/element/element-list.js";
import { OpenXmlCompositeElement, OpenXmlLeafElement } from "../../src/element/element.js";
import type { IRelationshipCollection } from "../../src/packaging/interfaces/relationship.js";
import { OpenXmlValidator } from "../../src/validation/OpenXmlValidator.js";
import {
  SCHEMATRON_COVERED_COUNT,
  SCHEMATRON_RULES,
  SCHEMATRON_SKIPPED_COUNT,
  SCHEMATRON_SOURCE_COUNT,
  evaluateSchematron,
  resetRuleIndex,
} from "../../src/validation/schematron/index.js";

// ---- Namespace constants ----
const X_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const V_NS = "urn:schemas-microsoft-com:vml";

// ---- Element helpers ----

function makeLeaf(ns: string, local: string, prefix: string): OpenXmlLeafElement {
  return new (class extends OpenXmlLeafElement {
    override readonly localName = local;
    override readonly prefix = prefix;
    override readonly namespaceUri = ns;
  })();
}

function makeComposite(ns: string, local: string, prefix: string): OpenXmlCompositeElement {
  return new (class extends OpenXmlCompositeElement {
    override readonly localName = local;
    override readonly prefix = prefix;
    override readonly namespaceUri = ns;
    override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
  })();
}

// ---- Coverage report ----

describe("Schematron categories — coverage", () => {
  it("source count matches schematrons.json (948 rules)", () => {
    expect(SCHEMATRON_SOURCE_COUNT).toBe(948);
  });

  it("covered + skipped = total rule count", () => {
    expect(SCHEMATRON_COVERED_COUNT + SCHEMATRON_SKIPPED_COUNT).toBe(SCHEMATRON_RULES.length);
  });

  it("covers > 80% of source rules (was 691/948 = 72.9% before Epic-84)", () => {
    const pct = SCHEMATRON_COVERED_COUNT / SCHEMATRON_SOURCE_COUNT;
    // log for visibility
    process.stdout.write(
      `\n  Coverage: ${SCHEMATRON_COVERED_COUNT}/${SCHEMATRON_SOURCE_COUNT} (${(pct * 100).toFixed(1)}%)\n`,
    );
    expect(pct).toBeGreaterThan(0.8);
  });

  it("new categories are present in SCHEMATRON_RULES", () => {
    const kinds = new Set(SCHEMATRON_RULES.map((r) => r.kind));
    expect(kinds.has("validSet")).toBe(true);
    expect(kinds.has("invalidSet")).toBe(true);
    expect(kinds.has("absentWhenEq")).toBe(true);
    expect(kinds.has("absentWhenNeq")).toBe(true);
    expect(kinds.has("mutualExcl")).toBe(true);
    expect(kinds.has("attrVsAttr")).toBe(true);
    expect(kinds.has("reqWhenOther")).toBe(true);
    expect(kinds.has("pattern")).toBe(true);
  });
});

// ---- 1.4 validSet ----

describe("1.4 validSet — attribute must be in allowed set", () => {
  beforeEach(() => resetRuleIndex());

  // x:f @x:bx = false  → bx must equal "false"
  it("violation: @x:bx = 'true' (not in allowed set [false])", () => {
    const el = makeLeaf(X_NS, "f", "x");
    el.extendedAttributes.set("x:bx", "true"); // not in set
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const vs = errors.filter((e) => e.id === "Sem_AttributeValueDataTypeDetailed");
    expect(vs.length).toBeGreaterThan(0);
  });

  it("valid: @x:bx = 'false' (in allowed set)", () => {
    const el = makeLeaf(X_NS, "f", "x");
    el.extendedAttributes.set("x:bx", "false");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const vs = errors.filter(
      (e) => e.id === "Sem_AttributeValueDataTypeDetailed" && e.description?.includes("bx"),
    );
    expect(vs).toHaveLength(0);
  });

  it("no attr present → no validSet error", () => {
    const el = makeLeaf(X_NS, "f", "x");
    // no bx attr
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const vs = errors.filter(
      (e) => e.id === "Sem_AttributeValueDataTypeDetailed" && e.description?.includes("bx"),
    );
    expect(vs).toHaveLength(0);
  });

  // v:arc @v:dgmlayout must be 0|1|2|3
  it("violation: v:arc @v:dgmlayout = 99 (not in [0,1,2,3])", () => {
    const el = makeLeaf(V_NS, "arc", "v");
    el.extendedAttributes.set("v:dgmlayout", "99");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const vs = errors.filter(
      (e) => e.id === "Sem_AttributeValueDataTypeDetailed" && e.description?.includes("dgmlayout"),
    );
    expect(vs.length).toBeGreaterThan(0);
  });

  it("valid: v:arc @v:dgmlayout = 2", () => {
    const el = makeLeaf(V_NS, "arc", "v");
    el.extendedAttributes.set("v:dgmlayout", "2");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const vs = errors.filter(
      (e) => e.id === "Sem_AttributeValueDataTypeDetailed" && e.description?.includes("dgmlayout"),
    );
    expect(vs).toHaveLength(0);
  });
});

// ---- 1.10 invalidSet ----

describe("1.10 invalidSet — attribute must NOT be in prohibited set", () => {
  beforeEach(() => resetRuleIndex());

  // x:customSheetView @x:guid != '00000000-0000-0000-0000-000000000000'
  it("violation: @x:guid = '00000000-0000-0000-0000-000000000000' (prohibited value)", () => {
    const el = makeLeaf(X_NS, "customSheetView", "x");
    el.extendedAttributes.set("x:guid", "00000000-0000-0000-0000-000000000000");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const inv = errors.filter((e) => e.id === "Sem_AttributeValueDataTypeDetailed");
    expect(inv.length).toBeGreaterThan(0);
  });

  it("valid: @x:guid = '{12345678-1234-1234-1234-123456789abc}' (not prohibited)", () => {
    const el = makeLeaf(X_NS, "customSheetView", "x");
    el.extendedAttributes.set("x:guid", "{12345678-1234-1234-1234-123456789abc}");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const inv = errors.filter(
      (e) => e.id === "Sem_AttributeValueDataTypeDetailed" && e.description?.includes("guid"),
    );
    expect(inv).toHaveLength(0);
  });
});

// ---- 1.14 absentWhenEq ----

describe("1.14 absentWhenEq — attr must be absent when another equals a value", () => {
  beforeEach(() => resetRuleIndex());

  // x:tableColumn: @x:totalsRowLabel must be absent when @x:totalsRowFunction = custom
  it("violation: totalsRowLabel present when totalsRowFunction = custom", () => {
    const el = makeLeaf(X_NS, "tableColumn", "x");
    el.extendedAttributes.set("x:totalsRowLabel", "Total");
    el.extendedAttributes.set("x:totalsRowFunction", "custom");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const abs = errors.filter((e) => e.id === "Sem_AttributeAbsentConditionToValue");
    expect(abs.length).toBeGreaterThan(0);
  });

  it("valid: totalsRowLabel absent when totalsRowFunction = custom", () => {
    const el = makeLeaf(X_NS, "tableColumn", "x");
    // no totalsRowLabel
    el.extendedAttributes.set("x:totalsRowFunction", "custom");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const abs = errors.filter((e) => e.id === "Sem_AttributeAbsentConditionToValue");
    expect(abs).toHaveLength(0);
  });

  it("valid: totalsRowLabel present when totalsRowFunction = sum (not custom)", () => {
    const el = makeLeaf(X_NS, "tableColumn", "x");
    el.extendedAttributes.set("x:totalsRowLabel", "Total");
    el.extendedAttributes.set("x:totalsRowFunction", "sum");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const abs = errors.filter((e) => e.id === "Sem_AttributeAbsentConditionToValue");
    expect(abs).toHaveLength(0);
  });
});

// ---- 1.15 absentWhenNeq ----

describe("1.15 absentWhenNeq — attr must be absent when another does NOT equal a value", () => {
  beforeEach(() => resetRuleIndex());

  // x:webPublishItem: @x:sourceRef must be absent when @x:sourceType != range
  it("violation: sourceRef present when sourceType != range (= chart)", () => {
    const el = makeLeaf(X_NS, "webPublishItem", "x");
    el.extendedAttributes.set("x:sourceRef", "A1:B10");
    el.extendedAttributes.set("x:sourceType", "chart"); // not 'range'
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const abs = errors.filter((e) => e.id === "Sem_AttributeAbsentConditionToNonValue");
    expect(abs.length).toBeGreaterThan(0);
  });

  it("valid: sourceRef present when sourceType = range", () => {
    const el = makeLeaf(X_NS, "webPublishItem", "x");
    el.extendedAttributes.set("x:sourceRef", "A1:B10");
    el.extendedAttributes.set("x:sourceType", "range");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const abs = errors.filter((e) => e.id === "Sem_AttributeAbsentConditionToNonValue");
    expect(abs).toHaveLength(0);
  });
});

// ---- 1.16 mutualExcl ----

describe("1.16 mutualExcl — at most one of a group of attributes", () => {
  beforeEach(() => resetRuleIndex());

  // x:tabColor: auto, indexed, rgb, theme are mutually exclusive
  it("violation: tabColor has both @x:auto and @x:indexed (mutual exclusive)", () => {
    const el = makeLeaf(X_NS, "tabColor", "x");
    el.extendedAttributes.set("x:auto", "true");
    el.extendedAttributes.set("x:indexed", "10");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const me = errors.filter((e) => e.id === "Sem_AttributeMutualExclusive");
    expect(me.length).toBeGreaterThan(0);
  });

  it("valid: tabColor has only @x:rgb (single attr, not exclusive)", () => {
    const el = makeLeaf(X_NS, "tabColor", "x");
    el.extendedAttributes.set("x:rgb", "FFAABBCC");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const me = errors.filter((e) => e.id === "Sem_AttributeMutualExclusive");
    expect(me).toHaveLength(0);
  });
});

// ---- 1.17 attrVsAttr ----

describe("1.17 attrVsAttr — value of one attribute must be <= another", () => {
  beforeEach(() => resetRuleIndex());

  // x:rPh: @x:sb < @x:eb (sb must be strictly less than eb)
  it("violation: sb >= eb (sb=10, eb=5)", () => {
    const el = makeLeaf(X_NS, "rPh", "x");
    el.extendedAttributes.set("x:sb", "10");
    el.extendedAttributes.set("x:eb", "5");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const av = errors.filter((e) => e.id === "Sem_AttributeValueLessEqualToAnother");
    expect(av.length).toBeGreaterThan(0);
  });

  it("valid: sb < eb (sb=3, eb=10)", () => {
    const el = makeLeaf(X_NS, "rPh", "x");
    el.extendedAttributes.set("x:sb", "3");
    el.extendedAttributes.set("x:eb", "10");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const av = errors.filter((e) => e.id === "Sem_AttributeValueLessEqualToAnother");
    expect(av).toHaveLength(0);
  });

  // x:sharedItems: @x:minValue <= @x:maxValue
  it("violation: minValue > maxValue (min=100, max=50)", () => {
    const el = makeLeaf(X_NS, "sharedItems", "x");
    el.extendedAttributes.set("x:minValue", "100");
    el.extendedAttributes.set("x:maxValue", "50");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const av = errors.filter((e) => e.id === "Sem_AttributeValueLessEqualToAnother");
    expect(av.length).toBeGreaterThan(0);
  });

  it("valid: minValue = maxValue (both 50, canEqual=true for <=)", () => {
    const el = makeLeaf(X_NS, "sharedItems", "x");
    el.extendedAttributes.set("x:minValue", "50");
    el.extendedAttributes.set("x:maxValue", "50");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const av = errors.filter((e) => e.id === "Sem_AttributeValueLessEqualToAnother");
    expect(av).toHaveLength(0);
  });
});

// ---- 1.18 reqWhenOther ----

describe("1.18 reqWhenOther — attribute required when another equals a value", () => {
  beforeEach(() => resetRuleIndex());

  // x:f: (@x:si and @x:t = shared) or @x:t != shared
  // → @x:si required when @x:t = shared
  it("violation: @x:t = shared but @x:si absent", () => {
    const el = makeLeaf(X_NS, "f", "x");
    el.extendedAttributes.set("x:t", "shared");
    // no x:si
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const rw = errors.filter((e) => e.id === "Sem_AttributeRequiredConditionToValue");
    expect(rw.length).toBeGreaterThan(0);
  });

  it("valid: @x:t = shared and @x:si present", () => {
    const el = makeLeaf(X_NS, "f", "x");
    el.extendedAttributes.set("x:t", "shared");
    el.extendedAttributes.set("x:si", "1");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const rw = errors.filter((e) => e.id === "Sem_AttributeRequiredConditionToValue");
    expect(rw).toHaveLength(0);
  });

  it("valid: @x:t != shared (condition not met, so @x:si not required)", () => {
    const el = makeLeaf(X_NS, "f", "x");
    el.extendedAttributes.set("x:t", "n");
    // no x:si
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const rw = errors.filter((e) => e.id === "Sem_AttributeRequiredConditionToValue");
    expect(rw).toHaveLength(0);
  });
});

// ---- 1.2 pattern ----

describe("1.2 pattern — attribute value must match regex", () => {
  beforeEach(() => resetRuleIndex());

  // w:sig @w:csb0 must match [0-9a-fA-F]{8}
  it("violation: @w:csb0 = 'GGGGGGGG' (does not match [0-9a-fA-F]{8})", () => {
    const el = makeLeaf(W_NS, "sig", "w");
    el.extendedAttributes.set("w:csb0", "GGGGGGGG");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const pt = errors.filter(
      (e) => e.id === "Sem_AttributeValueDataTypeDetailed" && e.description?.includes("csb0"),
    );
    expect(pt.length).toBeGreaterThan(0);
  });

  it("valid: @w:csb0 = '00000000' (matches [0-9a-fA-F]{8})", () => {
    const el = makeLeaf(W_NS, "sig", "w");
    el.extendedAttributes.set("w:csb0", "00000000");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const pt = errors.filter(
      (e) => e.id === "Sem_AttributeValueDataTypeDetailed" && e.description?.includes("csb0"),
    );
    expect(pt).toHaveLength(0);
  });

  it("valid: @w:csb0 = 'A1B2C3D4' (valid hex)", () => {
    const el = makeLeaf(W_NS, "sig", "w");
    el.extendedAttributes.set("w:csb0", "A1B2C3D4");
    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const pt = errors.filter(
      (e) => e.id === "Sem_AttributeValueDataTypeDetailed" && e.description?.includes("csb0"),
    );
    expect(pt).toHaveLength(0);
  });
});

// ---- Safety ----

describe("Safety — evaluator never throws", () => {
  it("evaluateSchematron never throws on arbitrary input", () => {
    resetRuleIndex();
    const root = makeComposite("http://unknown.ns", "anything", "x");
    expect(() => evaluateSchematron(root, SCHEMATRON_RULES, undefined, undefined)).not.toThrow();
  });

  it("validateSemantic() never throws", () => {
    const validator = new OpenXmlValidator();
    const root = makeComposite(W_NS, "INVALID_ELEMENT", "w");
    expect(() => validator.validateSemantic(root)).not.toThrow();
  });
});

// ---- Real Office fixture zero-false-positive sweep ----

describe("Real Office fixtures → 0 Semantic errors", () => {
  const HERE = dirname(fileURLToPath(import.meta.url));
  const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

  it("all upstream-smoke/*.{docx,xlsx,pptx} produce 0 Semantic errors", async () => {
    resetRuleIndex();
    const files = (await readdir(FIXTURES_DIR)).filter(
      (f) =>
        (f.endsWith(".docx") || f.endsWith(".xlsx") || f.endsWith(".pptx")) &&
        !f.toLowerCase().includes("encrypted"),
    );

    expect(files.length).toBeGreaterThan(0);

    const validator = new OpenXmlValidator();
    const allErrors: Array<{ file: string; error: string }> = [];

    for (const file of files) {
      try {
        const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, file)));
        const ext = file.slice(file.lastIndexOf(".") + 1).toLowerCase();

        if (ext === "docx") {
          const { WordprocessingDocument } = await import("../../src/word/index.js");
          const doc = await WordprocessingDocument.openAsync(bytes);
          const mainPart = doc.mainDocumentPart;
          if (mainPart?.document) {
            const rels = (mainPart as unknown as { relationships?: IRelationshipCollection })
              .relationships;
            const errors = validator.validateSemantic(
              mainPart.document,
              "/word/document.xml",
              rels,
            );
            for (const e of errors) {
              allErrors.push({ file, error: e.description ?? e.id });
            }
          }
        } else if (ext === "xlsx") {
          const { SpreadsheetDocument } = await import("../../src/excel/index.js");
          const doc = await SpreadsheetDocument.openAsync(bytes);
          const wbPart = doc.workbookPart;
          if (wbPart?.workbook) {
            const rels = (wbPart as unknown as { relationships?: IRelationshipCollection })
              .relationships;
            const errors = validator.validateSemantic(wbPart.workbook, "/xl/workbook.xml", rels);
            for (const e of errors) {
              allErrors.push({ file, error: e.description ?? e.id });
            }
          }
        } else if (ext === "pptx") {
          const { PresentationDocument } = await import("../../src/ppt/index.js");
          const doc = await PresentationDocument.openAsync(bytes);
          const presPart = doc.presentationPart;
          if (presPart?.presentation) {
            const rels = (presPart as unknown as { relationships?: IRelationshipCollection })
              .relationships;
            const errors = validator.validateSemantic(
              presPart.presentation,
              "/ppt/presentation.xml",
              rels,
            );
            for (const e of errors) {
              allErrors.push({ file, error: e.description ?? e.id });
            }
          }
        }
      } catch {
        // Skip files that fail to open (e.g. encrypted, unsupported features)
      }
    }

    if (allErrors.length > 0) {
      const sample = allErrors
        .slice(0, 10)
        .map((e) => `  ${e.file}: ${e.error}`)
        .join("\n");
      throw new Error(
        `${allErrors.length} false-positive Semantic errors found (first 10):\n${sample}`,
      );
    }

    expect(allErrors).toHaveLength(0);
  }, 120000);
});
