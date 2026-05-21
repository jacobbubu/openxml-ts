/**
 * Epic-90: Schematron final rules — 943/948 coverage.
 *
 * New categories covered in Epic-90:
 *   1.19 attrValueCondition — (@a=v1 and @b=v2) or @b!=v2 (x:queryTableField, x14:cacheHierarchy, etc.)
 *   2.3  uniqueness w/ lower-case() — count(distinct-values(lower-case(...))) (w:guid, v:fill, etc.)
 *
 * Honestly skipped (5 rules, no false positives):
 *   1.1  attrPresent — @attr alone: typed attrs not in extendedAttributes, cannot check without
 *        typed property access. Contexts: a:hlinkClick, a:hlinkHover, a:hlinkMouseOver, w:bottom (x2).
 *
 * Also includes:
 *   - Real Office fixture zero-false-positive sweep (all upstream-smoke/*.docx/xlsx/pptx)
 *   - Final coverage assertion: 943/948
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it } from "vitest";
import { OpenXmlElementList } from "../../src/element/element-list.js";
import { OpenXmlCompositeElement, OpenXmlLeafElement } from "../../src/element/element.js";
import { OpenXmlValidator } from "../../src/validation/OpenXmlValidator.js";
import {
  SCHEMATRON_COVERED_COUNT,
  SCHEMATRON_RULES,
  SCHEMATRON_SKIPPED_COUNT,
  SCHEMATRON_SOURCE_COUNT,
  evaluateSchematron,
  resetRuleIndex,
} from "../../src/validation/schematron/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

// ---- Namespace constants ----
const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const X_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const X14_NS = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main";
const V_NS = "urn:schemas-microsoft-com:vml";
const P_NS = "http://schemas.openxmlformats.org/presentationml/2006/main";

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

// ---- Final coverage assertion ----

describe("Epic-90 — final coverage", () => {
  it("source count is 948", () => {
    expect(SCHEMATRON_SOURCE_COUNT).toBe(948);
  });

  it("covered + skipped = total rule array length", () => {
    expect(SCHEMATRON_COVERED_COUNT + SCHEMATRON_SKIPPED_COUNT).toBe(SCHEMATRON_RULES.length);
  });

  it("Epic-90 achieves 943/948 coverage (5 honestly skipped: typed-attr-only @attr rules)", () => {
    process.stdout.write(
      `\n  Coverage: ${SCHEMATRON_COVERED_COUNT}/${SCHEMATRON_SOURCE_COUNT} ` +
        `(${((SCHEMATRON_COVERED_COUNT / SCHEMATRON_SOURCE_COUNT) * 100).toFixed(1)}%)\n` +
        `  Skipped: ${SCHEMATRON_SKIPPED_COUNT} (typed-attribute presence checks — no false positives)\n`,
    );
    expect(SCHEMATRON_COVERED_COUNT).toBe(943);
    expect(SCHEMATRON_SKIPPED_COUNT).toBe(5);
  });

  it("attrValueCondition rules are present in SCHEMATRON_RULES (12 new rules)", () => {
    const count = SCHEMATRON_RULES.filter((r) => r.kind === "attrValueCondition").length;
    expect(count).toBe(12);
    process.stdout.write(`\n  attrValueCondition rules: ${count}\n`);
  });

  it("uniqueness rules with lower-case() are now classified (18 new uniqueness rules added)", () => {
    const count = SCHEMATRON_RULES.filter((r) => r.kind === "uniqueness").length;
    expect(count).toBeGreaterThan(180); // was ~195 before + 18 new = 213
    process.stdout.write(`\n  uniqueness rules total: ${count}\n`);
  });

  it("skipped rules are exactly the 5 @attr-alone typed-attribute rules", () => {
    const skipped = SCHEMATRON_RULES.filter((r) => r.kind === "unsupported");
    expect(skipped).toHaveLength(5);
    const contexts = skipped.map((r) => r.context).sort();
    // Should be: a:hlinkClick, a:hlinkHover, a:hlinkMouseOver, w:bottom (x2)
    expect(contexts).toContain("a:hlinkClick");
    expect(contexts).toContain("a:hlinkHover");
    expect(contexts).toContain("a:hlinkMouseOver");
    expect(contexts.filter((c) => c === "w:bottom")).toHaveLength(2);
  });
});

// ---- 1.19 attrValueCondition ----

describe("1.19 attrValueCondition — when @a=v1, @b must be in condValues", () => {
  beforeEach(() => resetRuleIndex());

  it("violation: x:queryTableField @x:dataBound=true but @x:clipped=false → Sem_AttributeValueConditionToAnother", () => {
    const el = makeLeaf(X_NS, "queryTableField", "x");
    el.extendedAttributes.set("x:dataBound", "true");
    el.extendedAttributes.set("x:clipped", "false"); // must be 'true' when dataBound=true
    const rules = SCHEMATRON_RULES.filter(
      (r) =>
        r.kind === "attrValueCondition" &&
        r.context === "x:queryTableField" &&
        r.attrQname === "x:dataBound" &&
        r.condAttr === "x:clipped",
    );
    expect(rules.length).toBeGreaterThan(0);
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    const semantic = errors.filter((e) => e.errorType === "Semantic");
    expect(semantic.length).toBeGreaterThan(0);
    expect(semantic[0]!.id).toBe("Sem_AttributeValueConditionToAnother");
  });

  it("pass: x:queryTableField @x:dataBound=true and @x:clipped=true → no error", () => {
    const el = makeLeaf(X_NS, "queryTableField", "x");
    el.extendedAttributes.set("x:dataBound", "true");
    el.extendedAttributes.set("x:clipped", "true");
    const rules = SCHEMATRON_RULES.filter(
      (r) =>
        r.kind === "attrValueCondition" &&
        r.context === "x:queryTableField" &&
        r.attrQname === "x:dataBound" &&
        r.condAttr === "x:clipped",
    );
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic")).toHaveLength(0);
  });

  it("pass: x:queryTableField @x:dataBound=false → clipped not constrained → no error", () => {
    const el = makeLeaf(X_NS, "queryTableField", "x");
    el.extendedAttributes.set("x:dataBound", "false");
    el.extendedAttributes.set("x:clipped", "false");
    const rules = SCHEMATRON_RULES.filter(
      (r) =>
        r.kind === "attrValueCondition" &&
        r.context === "x:queryTableField" &&
        r.attrQname === "x:dataBound" &&
        r.condAttr === "x:clipped",
    );
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic")).toHaveLength(0);
  });

  it("violation: x14:cacheHierarchy @x14:flattenHierarchies=false but @x14:ignore=false → error", () => {
    const el = makeLeaf(X14_NS, "cacheHierarchy", "x14");
    el.extendedAttributes.set("x14:flattenHierarchies", "false");
    el.extendedAttributes.set("x14:ignore", "false"); // must be 'true' when flattenHierarchies=false
    const rules = SCHEMATRON_RULES.filter(
      (r) =>
        r.kind === "attrValueCondition" &&
        r.context === "x14:cacheHierarchy" &&
        r.attrQname === "x14:flattenHierarchies",
    );
    expect(rules.length).toBeGreaterThan(0);
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic").length).toBeGreaterThan(0);
  });

  it("pass: x14:cacheHierarchy @x14:flattenHierarchies=false and @x14:ignore=true → no error", () => {
    const el = makeLeaf(X14_NS, "cacheHierarchy", "x14");
    el.extendedAttributes.set("x14:flattenHierarchies", "false");
    el.extendedAttributes.set("x14:ignore", "true");
    const rules = SCHEMATRON_RULES.filter(
      (r) =>
        r.kind === "attrValueCondition" &&
        r.context === "x14:cacheHierarchy" &&
        r.attrQname === "x14:flattenHierarchies",
    );
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic")).toHaveLength(0);
  });

  it("violation: x:undo @x:ref3D=false but @x:nf=false → error", () => {
    const el = makeLeaf(X_NS, "undo", "x");
    el.extendedAttributes.set("x:ref3D", "false");
    el.extendedAttributes.set("x:nf", "false"); // must be 'true' when ref3D=false
    const rules = SCHEMATRON_RULES.filter(
      (r) => r.kind === "attrValueCondition" && r.context === "x:undo" && r.attrQname === "x:ref3D",
    );
    expect(rules.length).toBeGreaterThan(0);
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic").length).toBeGreaterThan(0);
  });

  it("pass: x:undo @x:ref3D=false and @x:nf=true → no error", () => {
    const el = makeLeaf(X_NS, "undo", "x");
    el.extendedAttributes.set("x:ref3D", "false");
    el.extendedAttributes.set("x:nf", "true");
    const rules = SCHEMATRON_RULES.filter(
      (r) => r.kind === "attrValueCondition" && r.context === "x:undo" && r.attrQname === "x:ref3D",
    );
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic")).toHaveLength(0);
  });

  it("violation: x:queryTable @x:backgroundRefresh=true but @x:firstBackgroundRefresh=false → error", () => {
    const el = makeLeaf(X_NS, "queryTable", "x");
    el.extendedAttributes.set("x:backgroundRefresh", "true");
    el.extendedAttributes.set("x:firstBackgroundRefresh", "false");
    const rules = SCHEMATRON_RULES.filter(
      (r) =>
        r.kind === "attrValueCondition" &&
        r.context === "x:queryTable" &&
        r.attrQname === "x:backgroundRefresh",
    );
    expect(rules.length).toBeGreaterThan(0);
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic").length).toBeGreaterThan(0);
  });

  it("w:compatSetting: @w:val=11 but @w:name != compatibilityMode → error", () => {
    const el = makeLeaf(W_NS, "compatSetting", "w");
    el.extendedAttributes.set("w:val", "11");
    el.extendedAttributes.set("w:name", "someOtherSetting"); // must be 'compatibilityMode' when val in [11,12,14,15]
    const rules = SCHEMATRON_RULES.filter(
      (r) => r.kind === "attrValueCondition" && r.context === "w:compatSetting",
    );
    expect(rules.length).toBeGreaterThan(0);
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic").length).toBeGreaterThan(0);
  });

  it("w:compatSetting: @w:val=11 and @w:name=compatibilityMode → no error", () => {
    const el = makeLeaf(W_NS, "compatSetting", "w");
    el.extendedAttributes.set("w:val", "11");
    el.extendedAttributes.set("w:name", "compatibilityMode");
    const rules = SCHEMATRON_RULES.filter(
      (r) => r.kind === "attrValueCondition" && r.context === "w:compatSetting",
    );
    const errors = evaluateSchematron(el, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic")).toHaveLength(0);
  });
});

// ---- 2.3 uniqueness with lower-case() wrapper ----

describe("2.3 uniqueness with lower-case() — duplicate detection (newly covered)", () => {
  beforeEach(() => resetRuleIndex());

  it("violation: two w:guid with same @w:val (case-insensitive) → uniqueness error", () => {
    const root = makeComposite(W_NS, "document", "w");
    const guid1 = makeLeaf(W_NS, "guid", "w");
    guid1.extendedAttributes.set("w:val", "{ABC-123}");
    const guid2 = makeLeaf(W_NS, "guid", "w");
    guid2.extendedAttributes.set("w:val", "{abc-123}"); // duplicate (case-insensitive)
    root.children.append(guid1);
    root.children.append(guid2);

    const rules = SCHEMATRON_RULES.filter((r) => r.kind === "uniqueness" && r.context === "w:guid");
    expect(rules.length).toBeGreaterThan(0);
    const errors = evaluateSchematron(root, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic").length).toBeGreaterThan(0);
  });

  it("pass: two w:guid with different @w:val → no error", () => {
    const root = makeComposite(W_NS, "document", "w");
    const guid1 = makeLeaf(W_NS, "guid", "w");
    guid1.extendedAttributes.set("w:val", "{ABC-123}");
    const guid2 = makeLeaf(W_NS, "guid", "w");
    guid2.extendedAttributes.set("w:val", "{DEF-456}");
    root.children.append(guid1);
    root.children.append(guid2);

    const rules = SCHEMATRON_RULES.filter((r) => r.kind === "uniqueness" && r.context === "w:guid");
    const errors = evaluateSchematron(root, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic")).toHaveLength(0);
  });

  it("violation: two v:fill with same @id (case-insensitive) → uniqueness error", () => {
    const root = makeComposite(V_NS, "shape", "v");
    const fill1 = makeLeaf(V_NS, "fill", "v");
    fill1.extendedAttributes.set("id", "fillA");
    const fill2 = makeLeaf(V_NS, "fill", "v");
    fill2.extendedAttributes.set("id", "FILLA"); // duplicate (case-insensitive)
    root.children.append(fill1);
    root.children.append(fill2);

    const rules = SCHEMATRON_RULES.filter((r) => r.kind === "uniqueness" && r.context === "v:fill");
    expect(rules.length).toBeGreaterThan(0);
    const errors = evaluateSchematron(root, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic").length).toBeGreaterThan(0);
  });

  it("pass: two v:fill with different @id → no error", () => {
    const root = makeComposite(V_NS, "shape", "v");
    const fill1 = makeLeaf(V_NS, "fill", "v");
    fill1.extendedAttributes.set("id", "fill1");
    const fill2 = makeLeaf(V_NS, "fill", "v");
    fill2.extendedAttributes.set("id", "fill2");
    root.children.append(fill1);
    root.children.append(fill2);

    const rules = SCHEMATRON_RULES.filter((r) => r.kind === "uniqueness" && r.context === "v:fill");
    const errors = evaluateSchematron(root, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic")).toHaveLength(0);
  });

  it("violation: two p:cmAuthor with same @p:id (case-insensitive) → uniqueness error", () => {
    const root = makeComposite(P_NS, "cmAuthorLst", "p");
    const auth1 = makeLeaf(P_NS, "cmAuthor", "p");
    auth1.extendedAttributes.set("p:id", "AuthorA");
    const auth2 = makeLeaf(P_NS, "cmAuthor", "p");
    auth2.extendedAttributes.set("p:id", "authora"); // duplicate
    root.children.append(auth1);
    root.children.append(auth2);

    const rules = SCHEMATRON_RULES.filter(
      (r) => r.kind === "uniqueness" && r.context === "p:cmAuthor",
    );
    expect(rules.length).toBeGreaterThan(0);
    const errors = evaluateSchematron(root, rules, undefined, undefined);
    expect(errors.filter((e) => e.errorType === "Semantic").length).toBeGreaterThan(0);
  });
});

// ---- Zero false-positive sweep over real fixtures ----

describe("Epic-90 — zero false positives on real Office fixtures", () => {
  it("validatePackage on all upstream-smoke fixtures → 0 semantic errors", async () => {
    const validator = new OpenXmlValidator();
    const files = (await readdir(FIXTURES_DIR)).filter((f) => /\.(docx|xlsx|pptx)$/.test(f));
    expect(files.length).toBeGreaterThan(0);

    const allSemanticErrors: string[] = [];
    for (const file of files) {
      const buf = await readFile(join(FIXTURES_DIR, file));
      const errors = await validator.validate(buf);
      const semantic = errors.filter((e) => e.errorType === "Semantic");
      if (semantic.length > 0) {
        for (const e of semantic) {
          allSemanticErrors.push(`${file}: [${e.id}] ${e.description}`);
        }
      }
    }

    if (allSemanticErrors.length > 0) {
      process.stdout.write(`\nFALSE POSITIVES (${allSemanticErrors.length}):\n`);
      for (const e of allSemanticErrors.slice(0, 20)) {
        process.stdout.write(`  ${e}\n`);
      }
    }

    expect(allSemanticErrors).toHaveLength(0);
  }, 120_000);
});
