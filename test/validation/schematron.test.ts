/**
 * Epic-79: OpenXmlValidator Phase 2 — Schematron semantic rule tests.
 *
 * Covers:
 *  (a) Relationship type mismatch → Semantic error
 *  (b) Relationship existence check (id not in rels) → Semantic error
 *  (c) Correct relationship type → no error
 *  (d) Duplicate id (uniqueness violation) → Semantic error
 *  (e) Unique ids → no error
 *  (f) String-length min violation → Semantic error
 *  (g) String-length max violation → Semantic error
 *  (h) Numeric range violation → Semantic error
 *  (i) Valid attributes → no Semantic errors
 *  (j) Covered/skipped rule counts are reported
 *  (k) validateSemantic() never throws
 *  (l) Real Office fixture → 0 Semantic errors
 *  (m) validate() with includeSemantic:true combines both error types
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { OpenXmlElementList } from "../../src/element/element-list.js";
import { OpenXmlCompositeElement, OpenXmlLeafElement } from "../../src/element/element.js";
import type {
  IPackageRelationship,
  IRelationshipCollection,
} from "../../src/packaging/interfaces/relationship.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";
import { OpenXmlValidator } from "../../src/validation/OpenXmlValidator.js";
import {
  SCHEMATRON_COVERED_COUNT,
  SCHEMATRON_RULES,
  SCHEMATRON_SKIPPED_COUNT,
  SCHEMATRON_SOURCE_COUNT,
  evaluateSchematron,
} from "../../src/validation/schematron/index.js";

// ---- Minimal element helpers ----

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const X_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

function makeLeaf(ns: string, local: string, prefix: string): OpenXmlLeafElement {
  return new (class extends OpenXmlLeafElement {
    override readonly localName = local;
    override readonly prefix = prefix;
    override readonly namespaceUri = ns;
  })();
}

function makeComposite(ns: string, local: string, prefix: string): OpenXmlCompositeElement {
  const inst = new (class extends OpenXmlCompositeElement {
    override readonly localName = local;
    override readonly prefix = prefix;
    override readonly namespaceUri = ns;
    override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
  })();
  return inst;
}

// ---- Minimal IRelationshipCollection stub ----

function makeRels(entries: Array<{ id: string; type: string }>): IRelationshipCollection {
  const map = new Map<string, IPackageRelationship>(
    entries.map((e) => [
      e.id,
      {
        id: e.id,
        type: e.type,
        sourceUri: "/word/document.xml" as PartUri,
        targetMode: "internal" as const,
        target: "",
      },
    ]),
  );
  return {
    get count() {
      return map.size;
    },
    has(id: string) {
      return map.has(id);
    },
    get(id: string) {
      const r = map.get(id);
      if (!r) throw new Error(`Not found: ${id}`);
      return r;
    },
    create() {
      throw new Error("not implemented");
    },
    remove() {
      // noop
    },
    [Symbol.iterator]() {
      return map.values();
    },
  };
}

// ---- Tests ----

describe("Schematron Phase 2 — rule counts", () => {
  it("(j) SCHEMATRON_SOURCE_COUNT matches original schematrons.json rule count", () => {
    expect(SCHEMATRON_SOURCE_COUNT).toBe(948);
  });

  it("(j) SCHEMATRON_COVERED_COUNT + SCHEMATRON_SKIPPED_COUNT = expanded rule count", () => {
    const total = SCHEMATRON_RULES.length;
    expect(SCHEMATRON_COVERED_COUNT + SCHEMATRON_SKIPPED_COUNT).toBe(total);
  });

  it("(j) covered rules are a substantial portion (>60%) of source rules", () => {
    expect(SCHEMATRON_COVERED_COUNT).toBeGreaterThan(SCHEMATRON_SOURCE_COUNT * 0.6);
  });

  it("(j) skipped rules have kind=unsupported in SCHEMATRON_RULES", () => {
    const unsupportedCount = SCHEMATRON_RULES.filter((r) => r.kind === "unsupported").length;
    expect(unsupportedCount).toBe(SCHEMATRON_SKIPPED_COUNT);
  });
});

describe("Schematron Phase 2 — relationship checks", () => {
  // w:attachedTemplate uses @r:id and requires type=attachedTemplate
  // w:hyperlink uses @r:id (existence check)

  it("(a) wrong relationship type → Semantic error with Sch_SemanticRelationshipType", () => {
    // Simulate w:attachedTemplate with wrong rel type
    const el = makeLeaf(W_NS, "attachedTemplate", "w");
    el.extendedAttributes.set("r:id", "rId1");

    const rels = makeRels([
      {
        id: "rId1",
        // Wrong type — should be attachedTemplate
        type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
      },
    ]);

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, rels, "/word/settings.xml");
    const typeErrors = errors.filter((e) => e.id === "Sch_SemanticRelationshipType");
    expect(typeErrors.length).toBeGreaterThan(0);
    expect(typeErrors[0]?.errorType).toBe("Semantic");
    expect(typeErrors[0]?.description).toContain("attachedTemplate");
  });

  it("(b) relationship id not in rels collection → Semantic error with Sch_SemanticRelationshipMissing", () => {
    const el = makeLeaf(W_NS, "hyperlink", "w");
    el.extendedAttributes.set("r:id", "rId99"); // does not exist in rels

    const rels = makeRels([{ id: "rId1", type: "http://example.com/rel" }]);

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, rels, "/word/document.xml");
    const missingErrors = errors.filter((e) => e.id === "Sch_SemanticRelationshipMissing");
    expect(missingErrors.length).toBeGreaterThan(0);
    expect(missingErrors[0]?.errorType).toBe("Semantic");
  });

  it("(c) correct relationship type → no Semantic relationship errors", () => {
    const el = makeLeaf(W_NS, "attachedTemplate", "w");
    el.extendedAttributes.set("r:id", "rId1");

    const rels = makeRels([
      {
        id: "rId1",
        type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/attachedTemplate",
      },
    ]);

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, rels, "/word/settings.xml");
    const relErrors = errors.filter(
      (e) => e.id === "Sch_SemanticRelationshipType" || e.id === "Sch_SemanticRelationshipMissing",
    );
    expect(relErrors).toHaveLength(0);
  });

  it("(c) no rels provided → no relationship errors (cannot check)", () => {
    const el = makeLeaf(W_NS, "hyperlink", "w");
    el.extendedAttributes.set("r:id", "rId1");

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, "/word/document.xml");
    const relErrors = errors.filter(
      (e) => e.id === "Sch_SemanticRelationshipType" || e.id === "Sch_SemanticRelationshipMissing",
    );
    expect(relErrors).toHaveLength(0);
  });
});

describe("Schematron Phase 2 — uniqueness checks", () => {
  // w:endnote in w:endnotes — @w:id must be unique
  // w:footnote in w:footnotes — @w:id must be unique

  it("(d) duplicate @w:id on w:endnote siblings → Semantic uniqueness error", () => {
    const root = makeComposite(W_NS, "endnotes", "w");
    const e1 = makeComposite(W_NS, "endnote", "w");
    e1.extendedAttributes.set("w:id", "1");
    const e2 = makeComposite(W_NS, "endnote", "w");
    e2.extendedAttributes.set("w:id", "1"); // duplicate!
    root.appendChild(e1);
    root.appendChild(e2);

    const errors = evaluateSchematron(root, SCHEMATRON_RULES, undefined, undefined);
    const uniqueErrors = errors.filter((e) => e.id === "Sch_SemanticUniquenessViolation");
    expect(uniqueErrors.length).toBeGreaterThan(0);
    expect(uniqueErrors[0]?.errorType).toBe("Semantic");
    expect(uniqueErrors[0]?.description).toContain("1");
  });

  it("(e) unique @w:id on w:endnote siblings → no uniqueness error", () => {
    const root = makeComposite(W_NS, "endnotes", "w");
    const e1 = makeComposite(W_NS, "endnote", "w");
    e1.extendedAttributes.set("w:id", "1");
    const e2 = makeComposite(W_NS, "endnote", "w");
    e2.extendedAttributes.set("w:id", "2");
    root.appendChild(e1);
    root.appendChild(e2);

    const errors = evaluateSchematron(root, SCHEMATRON_RULES, undefined, undefined);
    const uniqueErrors = errors.filter((e) => e.id === "Sch_SemanticUniquenessViolation");
    expect(uniqueErrors).toHaveLength(0);
  });
});

describe("Schematron Phase 2 — string-length checks", () => {
  // x:fileSharing: string-length(@x:userName) >= 1 and string-length(@x:userName) <= 54
  // x:fileVersion: string-length(@x:appName) <= 65535

  it("(f) @x:userName empty string (< minLength 1) → Semantic string-length min error", () => {
    const el = makeLeaf(X_NS, "fileSharing", "x");
    el.extendedAttributes.set("x:userName", ""); // length 0, min is 1

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const slErrors = errors.filter((e) => e.id === "Sch_SemanticStringLengthMin");
    expect(slErrors.length).toBeGreaterThan(0);
    expect(slErrors[0]?.errorType).toBe("Semantic");
  });

  it("(g) @x:userName exceeds 54 chars → Semantic string-length max error", () => {
    const el = makeLeaf(X_NS, "fileSharing", "x");
    el.extendedAttributes.set("x:userName", "a".repeat(55)); // length 55, max is 54

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const slErrors = errors.filter((e) => e.id === "Sch_SemanticStringLengthMax");
    expect(slErrors.length).toBeGreaterThan(0);
    expect(slErrors[0]?.errorType).toBe("Semantic");
  });

  it("(i) valid @x:userName → no string-length error", () => {
    const el = makeLeaf(X_NS, "fileSharing", "x");
    el.extendedAttributes.set("x:userName", "Alice"); // length 5, valid 1..54

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const slErrors = errors.filter(
      (e) => e.id === "Sch_SemanticStringLengthMin" || e.id === "Sch_SemanticStringLengthMax",
    );
    expect(slErrors).toHaveLength(0);
  });
});

describe("Schematron Phase 2 — numeric range checks", () => {
  // x:customWorkbookView: @x:tabRatio <= 1000
  // x:customWorkbookView: @x:activeSheetId >= 1 and <= 65534

  it("(h) @x:tabRatio > 1000 → Semantic numeric range max error", () => {
    const el = makeLeaf(X_NS, "customWorkbookView", "x");
    el.extendedAttributes.set("x:tabRatio", "1001");

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const nrErrors = errors.filter((e) => e.id === "Sch_SemanticNumericRangeMax");
    expect(nrErrors.length).toBeGreaterThan(0);
    expect(nrErrors[0]?.errorType).toBe("Semantic");
  });

  it("(h) @x:activeSheetId = 0 (< min 1) → Semantic numeric range min error", () => {
    const el = makeLeaf(X_NS, "customWorkbookView", "x");
    el.extendedAttributes.set("x:activeSheetId", "0");

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const nrErrors = errors.filter((e) => e.id === "Sch_SemanticNumericRangeMin");
    expect(nrErrors.length).toBeGreaterThan(0);
  });

  it("(i) valid @x:tabRatio = 500 → no numeric range error", () => {
    const el = makeLeaf(X_NS, "customWorkbookView", "x");
    el.extendedAttributes.set("x:tabRatio", "500");

    const errors = evaluateSchematron(el, SCHEMATRON_RULES, undefined, undefined);
    const nrErrors = errors.filter(
      (e) => e.id === "Sch_SemanticNumericRangeMax" || e.id === "Sch_SemanticNumericRangeMin",
    );
    expect(nrErrors).toHaveLength(0);
  });
});

describe("Schematron Phase 2 — safety and integration", () => {
  it("(k) evaluateSchematron never throws on arbitrary input", () => {
    const root = makeComposite("http://unknown.ns", "anything", "x");
    expect(() => evaluateSchematron(root, SCHEMATRON_RULES, undefined, undefined)).not.toThrow();
  });

  it("(k) OpenXmlValidator.validateSemantic() never throws", () => {
    const validator = new OpenXmlValidator();
    const root = makeComposite(W_NS, "INVALID_ELEMENT", "w");
    expect(() => validator.validateSemantic(root)).not.toThrow();
  });

  it("(m) validate() with includeSemantic:true includes Semantic errors", () => {
    const validator = new OpenXmlValidator({ includeSemantic: true });
    const el = makeLeaf(X_NS, "fileSharing", "x");
    el.extendedAttributes.set("x:userName", ""); // violates minLength 1

    const errors = validator.validate(el);
    const semanticErrors = errors.filter((e) => e.errorType === "Semantic");
    expect(semanticErrors.length).toBeGreaterThan(0);
  });

  it("(m) validate() without includeSemantic (default) does not include Semantic errors", () => {
    const validator = new OpenXmlValidator(); // default: includeSemantic=false
    const el = makeLeaf(X_NS, "fileSharing", "x");
    el.extendedAttributes.set("x:userName", ""); // violates minLength 1

    const errors = validator.validate(el);
    const semanticErrors = errors.filter((e) => e.errorType === "Semantic");
    expect(semanticErrors).toHaveLength(0);
  });
});

describe("Schematron Phase 2 — real Office fixtures produce 0 Semantic errors", () => {
  const HERE = dirname(fileURLToPath(import.meta.url));
  const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

  it("(l) 5Errors.docx → 0 Semantic errors from semantic validator", async () => {
    const { WordprocessingDocument } = await import("../../src/word/index.js");
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "5Errors.docx")));
    const doc = await WordprocessingDocument.openAsync(bytes);
    const mainPart = doc.mainDocumentPart;
    expect(mainPart).toBeDefined();
    if (mainPart === undefined) return;

    const docEl = mainPart.document;
    const validator = new OpenXmlValidator();

    // Run semantic validation with relationships from the main document part
    const partRels = (mainPart as unknown as { relationships?: IRelationshipCollection })
      .relationships;
    const errors = validator.validateSemantic(docEl, "/word/document.xml", partRels);

    expect(errors.filter((e) => e.errorType === "Semantic")).toHaveLength(0);
  }, 30000);
});
