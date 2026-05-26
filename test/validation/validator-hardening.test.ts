/**
 * Epic-101: OpenXmlValidator hardening tests.
 *
 * Verifies the three categories of previously-missed errors are now detected:
 *  1. Pkg_RequiredPartDoNotExist — OPC package-level validation
 *  2. Sch_IncompleteContentExpectingComplex — missing required child elements
 *  3. Sch_MissingRequiredAttribute — required attribute detection on typed elements
 *
 * Also confirms the zero-false-positives guarantee on real upstream fixtures.
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { OpenXmlElementList } from "../../src/element/element-list.js";
import { OpenXmlCompositeElement, OpenXmlLeafElement } from "../../src/element/element.js";
import { createInMemory } from "../../src/packaging/factories.js";
import { OpenXmlValidator, registerConstraints } from "../../src/validation/OpenXmlValidator.js";
import type { OpcPackageLike } from "../../src/validation/OpenXmlValidator.js";
import { constraints as drawingConstraints } from "../../src/validation/constraints/drawing.js";
import { constraints as excelConstraints } from "../../src/validation/constraints/excel.js";
import { constraints as pptConstraints } from "../../src/validation/constraints/ppt.js";
import { constraints as wordConstraints } from "../../src/validation/constraints/word.js";

// Register all constraint data once before tests
beforeAll(() => {
  registerConstraints(wordConstraints);
  registerConstraints(excelConstraints);
  registerConstraints(pptConstraints);
  registerConstraints(drawingConstraints);
});

// ---- Element stubs for structural tests ----

const P_NS = "http://schemas.openxmlformats.org/presentationml/2006/main";
const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

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

// ---- OPC package helpers ----

/**
 * Build a minimal OpcPackageLike from a MemoryOpenXmlPackage that satisfies
 * the structural interface. Since MemoryOpenXmlPackage exposes contentTypes,
 * relationships, and parts(), it already matches OpcPackageLike.
 */
function makeOpcPackage(): ReturnType<typeof createInMemory> & OpcPackageLike {
  return createInMemory() as ReturnType<typeof createInMemory> & OpcPackageLike;
}

const validator = new OpenXmlValidator();

// ---- 1. OPC Package-level validation (Pkg_RequiredPartDoNotExist) ----

describe("OPC package validation (Pkg_* errors)", () => {
  it("[Content_Types].xml missing Default 'rels' → Pkg_RequiredPartDoNotExist", () => {
    const pkg = makeOpcPackage();
    // Fresh empty package has no Default entries at all
    const errors = validator.validateOpcPackage(pkg);
    const pkgErr = errors.find((e) => e.id === "Pkg_RequiredPartDoNotExist");
    expect(pkgErr).toBeDefined();
    expect(pkgErr?.errorType).toBe("Package");
    expect(pkgErr?.description).toMatch(/rels/i);
  });

  it("package with rels Default entry → no rels-missing error", () => {
    const pkg = makeOpcPackage();
    // Add the required Default entry for .rels files
    pkg.contentTypes.addDefault("rels", "application/vnd.openxmlformats-package.relationships+xml");
    const errors = validator.validateOpcPackage(pkg);
    const relsErr = errors.find(
      (e) => e.id === "Pkg_RequiredPartDoNotExist" && e.description.match(/rels/i),
    );
    expect(relsErr).toBeUndefined();
  });

  it("internal relationship pointing to non-existent part → Pkg_RequiredPartDoNotExist", () => {
    const pkg = makeOpcPackage();
    pkg.contentTypes.addDefault("rels", "application/vnd.openxmlformats-package.relationships+xml");
    // Add a relationship pointing to a part that does NOT exist
    pkg.relationships.create({
      id: "rId1",
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      target: "/word/document.xml",
      targetMode: "internal",
    });
    const errors = validator.validateOpcPackage(pkg);
    const missingPart = errors.find(
      (e) => e.id === "Pkg_RequiredPartDoNotExist" && e.description.includes("/word/document.xml"),
    );
    expect(missingPart).toBeDefined();
    expect(missingPart?.errorType).toBe("Package");
  });

  it("relationship pointing to existing part → no missing-part error", () => {
    const pkg = makeOpcPackage();
    pkg.contentTypes.addDefault("rels", "application/vnd.openxmlformats-package.relationships+xml");
    // Create the part first, then add the relationship to it
    pkg.createPart(
      "/word/document.xml" as Parameters<typeof pkg.createPart>[0],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    );
    pkg.relationships.create({
      id: "rId1",
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      target: "/word/document.xml",
      targetMode: "internal",
    });
    const errors = validator.validateOpcPackage(pkg);
    const missingPart = errors.find(
      (e) => e.id === "Pkg_RequiredPartDoNotExist" && e.description.includes("/word/document.xml"),
    );
    expect(missingPart).toBeUndefined();
  });

  it("external relationship target is not checked (no false positive)", () => {
    const pkg = makeOpcPackage();
    pkg.contentTypes.addDefault("rels", "application/vnd.openxmlformats-package.relationships+xml");
    // External hyperlink — target is a URL, not a part
    pkg.relationships.create({
      id: "rId1",
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
      target: "https://example.com",
      targetMode: "external",
    });
    const errors = validator.validateOpcPackage(pkg);
    // Only the missing-rels default is expected — not an error about the external target
    const externalErr = errors.find((e) => e.description.includes("example.com"));
    expect(externalErr).toBeUndefined();
  });

  it("validateOpcPackage never throws", () => {
    const pkg = makeOpcPackage();
    expect(() => validator.validateOpcPackage(pkg)).not.toThrow();
  });

  it("part with self-referencing relationship → Pkg_PartIsNotAllowed", () => {
    const pkg = makeOpcPackage();
    pkg.contentTypes.addDefault("rels", "application/vnd.openxmlformats-package.relationships+xml");
    const part = pkg.createPart(
      "/word/document.xml",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    );
    // Self-referencing: the part has a relationship to itself
    part.relationships.create({
      id: "rIdSelf",
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      target: "/word/document.xml",
      targetMode: "internal",
    });
    const errors = validator.validateOpcPackage(pkg);
    const selfRef = errors.find((e) => e.id === "Pkg_PartIsNotAllowed");
    expect(selfRef).toBeDefined();
    expect(selfRef?.errorType).toBe("Package");
  });

  it("part with no self-reference → no Pkg_PartIsNotAllowed", () => {
    const pkg = makeOpcPackage();
    pkg.contentTypes.addDefault("rels", "application/vnd.openxmlformats-package.relationships+xml");
    const mainPart = pkg.createPart(
      "/word/document.xml",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    );
    const comments = pkg.createPart(
      "/word/comments.xml",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml",
    );
    mainPart.relationships.create({
      id: "rId1",
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
      target: "/word/comments.xml",
      targetMode: "internal",
    });
    const errors = validator.validateOpcPackage(pkg);
    const selfRef = errors.find((e) => e.id === "Pkg_PartIsNotAllowed");
    expect(selfRef).toBeUndefined();
  });
});

// ---- 2. Missing required child element (Sch_IncompleteContentExpectingComplex) ----

describe("missing required child element detection", () => {
  it("p:nvSpPr missing p:cNvPr → Sch_IncompleteContentExpectingComplex", () => {
    // nvSpPr requires cNvPr (min=1), cNvSpPr (min=1), nvPr (min=1)
    const nvSpPr = makeComposite(P_NS, "nvSpPr", "p");
    // Leave it empty — all three required children are missing
    const errors = validator.validate(nvSpPr);
    const incompleteErr = errors.find(
      (e) => e.id === "Sch_IncompleteContentExpectingComplex" && e.description.includes("nvSpPr"),
    );
    expect(incompleteErr).toBeDefined();
    expect(incompleteErr?.description).toMatch(/cNvPr|required child/i);
  });

  it("p:nvSpPr with all required children → 0 Sch_IncompleteContentExpectingComplex errors on the parent", () => {
    const nvSpPr = makeComposite(P_NS, "nvSpPr", "p");
    nvSpPr.appendChild(makeComposite(P_NS, "cNvPr", "p"));
    nvSpPr.appendChild(makeComposite(P_NS, "cNvSpPr", "p"));
    nvSpPr.appendChild(makeComposite(P_NS, "nvPr", "p"));
    const errors = validator.validate(nvSpPr);
    // Only check errors on nvSpPr itself (not recursed children — they may have their own requirements)
    const incompleteOnParent = errors.filter(
      (e) => e.id === "Sch_IncompleteContentExpectingComplex" && e.node === nvSpPr,
    );
    expect(incompleteOnParent).toHaveLength(0);
  });

  it("w:ruby missing w:rubyPr → Sch_IncompleteContentExpectingComplex", () => {
    // ruby sequence requires: rubyPr(min=1), rt(min=1), rubyBase(min=1)
    const ruby = makeComposite(W_NS, "ruby", "w");
    // Add only rt and rubyBase — rubyPr is missing
    ruby.appendChild(makeComposite(W_NS, "rt", "w"));
    ruby.appendChild(makeComposite(W_NS, "rubyBase", "w"));
    const errors = validator.validate(ruby);
    const incompleteErr = errors.find(
      (e) => e.id === "Sch_IncompleteContentExpectingComplex" && e.description.includes("ruby"),
    );
    expect(incompleteErr).toBeDefined();
    expect(incompleteErr?.errorType).toBe("Schema");
  });

  it("empty composite with all-optional children → 0 incomplete-content errors", () => {
    // w:numPr has all optional children (min=0)
    const numPr = makeComposite(W_NS, "numPr", "w");
    const errors = validator.validate(numPr);
    const incomplete = errors.filter((e) => e.id === "Sch_IncompleteContentExpectingComplex");
    expect(incomplete).toHaveLength(0);
  });

  it("max-occurs violation still uses Sch_MinOccursInvalidElement (not incomplete-content)", () => {
    // Put 2 rubyPr children in ruby (max=1)
    const ruby = makeComposite(W_NS, "ruby", "w");
    ruby.appendChild(makeComposite(W_NS, "rubyPr", "w"));
    ruby.appendChild(makeComposite(W_NS, "rubyPr", "w")); // extra!
    ruby.appendChild(makeComposite(W_NS, "rt", "w"));
    ruby.appendChild(makeComposite(W_NS, "rubyBase", "w"));
    const errors = validator.validate(ruby);
    const maxErr = errors.find((e) => e.id === "Sch_MinOccursInvalidElement");
    expect(maxErr).toBeDefined();
    expect(maxErr?.description).toMatch(/at most 1/);
  });
});

// ---- 3. Required attribute detection on typed elements ----

describe("required attribute detection (typed elements)", () => {
  it("leaf element missing required attrs → Sch_MissingRequiredAttribute", () => {
    // w:bookmarkStart requires w:name and w:id
    const bm = makeLeaf(W_NS, "bookmarkStart", "w");
    const errors = validator.validate(bm);
    const reqErr = errors.find((e) => e.id === "Sch_MissingRequiredAttribute");
    expect(reqErr).toBeDefined();
  });

  it("leaf element with required attrs in extendedAttributes → no attr error", () => {
    const bm = makeLeaf(W_NS, "bookmarkStart", "w");
    bm.extendedAttributes.set("w:name", "bookmark1");
    bm.extendedAttributes.set("w:id", "1");
    const errors = validator.validate(bm);
    const reqErrs = errors.filter((e) => e.id === "Sch_MissingRequiredAttribute");
    expect(reqErrs).toHaveLength(0);
  });

  it("typed SheetView element with workbookViewId set as typed prop → no false-positive attr error", async () => {
    // Import SheetView which is a typed element with workbookViewId as typed prop
    const { SheetView } = await import("../../src/excel/generated/sheet-view.js");
    const { UInt32Value } = await import("../../src/element/index.js");
    const sv = new SheetView();
    // Set workbookViewId via the typed property (not extendedAttributes)
    sv.workbookViewId = UInt32Value.parse("0");
    const errors = validator.validate(sv);
    const attrErrs = errors.filter(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("workbookViewId"),
    );
    // Should NOT report workbookViewId as missing — it's set as typed prop
    expect(attrErrs).toHaveLength(0);
  });

  it("typed SheetView element with no workbookViewId → reports Sch_MissingRequiredAttribute", async () => {
    const { SheetView } = await import("../../src/excel/generated/sheet-view.js");
    const sv = new SheetView();
    // workbookViewId NOT set — leave it undefined
    const errors = validator.validate(sv);
    const attrErr = errors.find(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("workbookViewId"),
    );
    expect(attrErr).toBeDefined();
  });
});

// ---- 4. Real fixture sweep — zero false positives ----

describe("real Office fixture documents → 0 false positives", () => {
  const HERE = dirname(fileURLToPath(import.meta.url));
  const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

  // Files to skip for OPC validation: either encrypted or intentionally malformed
  // (named "Invalid*" or "missing*" — these are test fixtures for the .NET reference tests,
  // designed to be broken; our validator correctly detects their errors but we exclude them
  // from the "zero false positives on good files" sweep).
  const SKIP_LIST = new Set([
    "encrypted_pptx.pptx",
    // Intentionally malformed fixtures (they ARE broken — we skip them here because
    // the "real fixture sweep" tests that GOOD files produce 0 errors, not that bad files
    // are correctly flagged — the latter is covered by the positive test cases above).
    "InvalidDocProps.docx",
    "missingcalcchainpart.xlsx",
  ]);

  it("fixture directory accessible with ≥1 fixture", async () => {
    const files = await readdir(FIXTURES_DIR);
    const officeDocs = files.filter((f) =>
      [".docx", ".xlsx", ".pptx"].includes(extname(f).toLowerCase()),
    );
    expect(officeDocs.length).toBeGreaterThan(0);
  });

  it("validateOpcPackage on all real fixture packages → 0 errors", async () => {
    const { openAsync } = await import("../../src/packaging/factories.js");
    const files = await readdir(FIXTURES_DIR);
    const officeDocs = files
      .filter(
        (f) => [".docx", ".xlsx", ".pptx"].includes(extname(f).toLowerCase()) && !SKIP_LIST.has(f),
      )
      .sort();

    const failures: { file: string; errors: string[] }[] = [];

    for (const file of officeDocs) {
      const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, file)));
      const pkg = await openAsync(bytes);
      const errors = validator.validateOpcPackage(pkg as unknown as OpcPackageLike);
      if (errors.length > 0) {
        failures.push({
          file,
          errors: errors.map((e) => `[${e.id}] ${e.description.slice(0, 100)}`),
        });
      }
    }

    if (failures.length > 0) {
      const detail = failures
        .map((f) => `  ${f.file}:\n${f.errors.map((e) => `    ${e}`).join("\n")}`)
        .join("\n");
      throw new Error(`False positives on real fixtures:\n${detail}`);
    }

    expect(failures).toHaveLength(0);
  }, 30000);

  it("validate element trees from real Word fixtures does not throw", async () => {
    const { WordprocessingDocument } = await import("../../src/word/index.js");
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "Document.docx")));
    const doc = await WordprocessingDocument.openAsync(bytes);
    const mainPart = doc.mainDocumentPart;
    expect(mainPart).toBeDefined();
    if (mainPart !== undefined) {
      // Validation must not throw on real documents
      expect(() => validator.validate(mainPart.document)).not.toThrow();
    }
  }, 30000);
});
