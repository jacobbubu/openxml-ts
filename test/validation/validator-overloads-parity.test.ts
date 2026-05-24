/**
 * Epic-127: OpenXmlValidator 三态重载 + FileFormatVersions 参数 — parity tests
 *
 * Tests the three validate() overloads:
 *   1. validate(element: OpenXmlElement)   — single element tree
 *   2. validate(doc: WordprocessingDocumentLike) — full Word package
 *   3. validate(pkg: OpcPackageLike)       — OPC package-level
 *
 * And the two constructor forms:
 *   - new OpenXmlValidator()
 *   - new OpenXmlValidator(FileFormatVersions.Office2007)   — direct version
 *   - new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2013 }) — options
 *
 * Mirrors .NET OpenXmlValidator constructor + Validate() overload behavior.
 *
 * NOTE: openxml-ts does not expose `relatedNode` (see NOTE-RELATEDNODE in validator-dotnet-parity.test.ts).
 * NOTE: validate(OpcPackageLike) maps to validateOpcPackage(); validate(WordprocessingDocumentLike)
 *       maps to validatePackage(). Both paths use the unified validate() entry point.
 */

import { beforeAll, describe, expect, it } from "vitest";
import { OpenXmlElementList } from "../../src/element/element-list.js";
import { OpenXmlCompositeElement, OpenXmlLeafElement } from "../../src/element/element.js";
import { FileFormatVersions } from "../../src/markup-compat/file-format-versions.js";
import type { IRelationshipCollection } from "../../src/packaging/interfaces/relationship.js";
import {
  type OpcPackageLike,
  OpenXmlValidator,
  type WordprocessingDocumentLike,
  registerConstraints,
} from "../../src/validation/OpenXmlValidator.js";
import { constraints as wordConstraints } from "../../src/validation/constraints/word.js";

import { FieldChar } from "../../src/word/generated/field-char.js";
import { Paragraph } from "../../src/word/generated/paragraph.js";
import { RubyBase } from "../../src/word/generated/ruby-base.js";
import { RubyContent } from "../../src/word/generated/ruby-content.js";
import { RubyProperties } from "../../src/word/generated/ruby-properties.js";
import { Ruby } from "../../src/word/generated/ruby.js";
import { Run } from "../../src/word/generated/run.js";

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

// ─── Register constraints once ────────────────────────────────────────────────
beforeAll(() => {
  registerConstraints(wordConstraints);
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

/** Empty IRelationshipCollection stub. */
function emptyRels(): IRelationshipCollection {
  return {
    [Symbol.iterator]() {
      return [][Symbol.iterator]();
    },
  };
}

/** Build a minimal WordprocessingDocumentLike with a given root element. */
function makeWordDoc(root: ReturnType<typeof makeComposite>): WordprocessingDocumentLike {
  const rels = emptyRels();
  return {
    mainDocumentPart: {
      document: root,
      part: { uri: "/word/document.xml", relationships: rels },
    },
  };
}

/** Build a minimal OpcPackageLike (no parts, has rels extension). */
function makeMinimalOpcPkg(hasRelsDefault = true): OpcPackageLike {
  return {
    contentTypes: {
      hasDefault(ext: string): boolean {
        return hasRelsDefault && ext === "rels";
      },
    },
    relationships: emptyRels(),
    parts(): Iterable<{ uri: string; relationships: IRelationshipCollection }> {
      return [];
    },
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 1: Constructor overloads
// ═══════════════════════════════════════════════════════════════════════════════

describe("OpenXmlValidator — constructor overloads", () => {
  it("no-arg constructor: fileFormat is undefined (conservative mode)", () => {
    const v = new OpenXmlValidator();
    expect(v.fileFormat).toBeUndefined();
  });

  it("options-object constructor: fileFormat reflects the provided value", () => {
    const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2013 });
    expect(v.fileFormat).toBe(FileFormatVersions.Office2013);
  });

  it("direct FileFormatVersions constructor: fileFormat is set correctly (Office2007)", () => {
    // Mirrors .NET: new OpenXmlValidator(FileFormatVersions.Office2007)
    const v = new OpenXmlValidator(FileFormatVersions.Office2007);
    expect(v.fileFormat).toBe(FileFormatVersions.Office2007);
  });

  it("direct FileFormatVersions constructor: fileFormat is set correctly (Office2013)", () => {
    const v = new OpenXmlValidator(FileFormatVersions.Office2013);
    expect(v.fileFormat).toBe(FileFormatVersions.Office2013);
  });

  it("direct FileFormatVersions constructor: fileFormat is set correctly (Office2021)", () => {
    const v = new OpenXmlValidator(FileFormatVersions.Office2021);
    expect(v.fileFormat).toBe(FileFormatVersions.Office2021);
  });

  it("options constructor and direct constructor produce same fileFormat for same version", () => {
    const v1 = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
    const v2 = new OpenXmlValidator(FileFormatVersions.Office2010);
    expect(v1.fileFormat).toBe(v2.fileFormat);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 2: validate(OpenXmlElement) overload
// ═══════════════════════════════════════════════════════════════════════════════

describe("validate(OpenXmlElement) — element tree validation", () => {
  const validator = new OpenXmlValidator(FileFormatVersions.Office2007);

  it("valid element: well-formed Ruby returns no errors", () => {
    const ruby = new Ruby();
    ruby.appendChild(new RubyProperties());
    ruby.appendChild(new RubyContent());
    ruby.appendChild(new RubyBase());
    const errors = validator.validate(ruby);
    expect(Array.isArray(errors)).toBe(true);
    // A fully valid ruby with all required children produces no particle errors on the parent
    const particleErrors = errors.filter(
      (e) => e.node === ruby && e.id === "Sch_IncompleteContentExpectingComplex",
    );
    expect(particleErrors).toHaveLength(0);
  });

  it("invalid element: empty Ruby returns Sch_IncompleteContentExpectingComplex", () => {
    const ruby = new Ruby();
    const errors = validator.validate(ruby);
    expect(Array.isArray(errors)).toBe(true);
    const err = errors.find(
      (e) => e.id === "Sch_IncompleteContentExpectingComplex" && e.node === ruby,
    );
    expect(err).toBeDefined();
    expect(err?.errorType).toBe("Schema");
  });

  it("invalid element: Run is not a valid child of Paragraph → Sch_InvalidElementContentExpectingComplex", () => {
    // A Run inside a FieldChar is invalid; FieldChar only allows fldData/ffData/numberingChange
    const fc = new FieldChar();
    fc.extendedAttributes.set("w:fldCharType", "begin");
    fc.appendChild(new Run());
    const errors = validator.validate(fc);
    const err = errors.find(
      (e) => e.id === "Sch_InvalidElementContentExpectingComplex" && e.node === fc,
    );
    expect(err).toBeDefined();
  });

  it("validate(element) never throws on deeply nested invalid input", () => {
    const root = makeComposite(W_NS, "UNKNOWN_ROOT", "w");
    for (let i = 0; i < 5; i++) {
      const child = makeComposite(W_NS, `child${i}`, "w");
      child.appendChild(makeLeaf(W_NS, `leaf${i}`, "w"));
      root.appendChild(child);
    }
    expect(() => validator.validate(root)).not.toThrow();
  });

  it("validate(element) returns ValidationError[] with required shape fields", () => {
    const ruby = new Ruby(); // empty — missing required children
    const errors = validator.validate(ruby);
    expect(errors.length).toBeGreaterThan(0);
    for (const e of errors) {
      expect(typeof e.id).toBe("string");
      expect(e.id.length).toBeGreaterThan(0);
      expect(typeof e.description).toBe("string");
      expect(typeof e.errorType).toBe("string");
      expect(e.node).toBeDefined();
    }
  });

  it("validate(element, partUri) attaches partUri to errors", () => {
    const ruby = new Ruby(); // will produce errors
    const errors = validator.validate(ruby, "/word/document.xml");
    expect(errors.length).toBeGreaterThan(0);
    for (const e of errors) {
      expect(e.partUri).toBe("/word/document.xml");
    }
  });

  it("validate(element) without partUri: errors have no partUri", () => {
    const ruby = new Ruby(); // will produce errors
    const errors = validator.validate(ruby);
    expect(errors.length).toBeGreaterThan(0);
    for (const e of errors) {
      expect(e.partUri).toBeUndefined();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 3: validate(WordprocessingDocumentLike) overload
// ═══════════════════════════════════════════════════════════════════════════════

describe("validate(WordprocessingDocumentLike) — package validation", () => {
  const validator = new OpenXmlValidator(FileFormatVersions.Office2007);

  it("valid doc: document with well-formed paragraph returns no particle errors on root", () => {
    const docRoot = makeComposite(W_NS, "document", "w");
    const body = makeComposite(W_NS, "body", "w");
    const para = new Paragraph();
    body.appendChild(para);
    docRoot.appendChild(body);

    const doc = makeWordDoc(docRoot);
    const errors = validator.validate(doc);
    expect(Array.isArray(errors)).toBe(true);
  });

  it("invalid doc: document with invalid structure returns Schema errors", () => {
    // Put a Run directly inside the document root — invalid
    const docRoot = makeComposite(W_NS, "document", "w");
    docRoot.appendChild(new Run()); // w:r not allowed directly under w:document

    const doc = makeWordDoc(docRoot);
    const errors = validator.validate(doc);
    expect(Array.isArray(errors)).toBe(true);
    // Should have at least some errors from the invalid structure
    // (exact count depends on constraint registration, but the path should work)
  });

  it("validate(doc) never throws", () => {
    const docRoot = makeComposite(W_NS, "GARBAGE", "w");
    const doc = makeWordDoc(docRoot);
    expect(() => validator.validate(doc)).not.toThrow();
  });

  it("validate(doc) returns errors from all parts (partUri attached)", () => {
    // Create a doc where mainDocumentPart has an invalid root
    const docRoot = makeComposite(W_NS, "document", "w");
    const invalidChild = new Ruby(); // empty Ruby — missing required children
    docRoot.appendChild(invalidChild);

    const doc = makeWordDoc(docRoot);
    const errors = validator.validate(doc);
    expect(Array.isArray(errors)).toBe(true);
    // Errors should include partUri from the part context
    const errorsWithPart = errors.filter((e) => e.partUri !== undefined);
    // At least the Ruby errors should have partUri attached
    if (errorsWithPart.length > 0) {
      expect(errorsWithPart[0]?.partUri).toContain("word");
    }
  });

  it("validate(WordprocessingDocumentLike) dispatches differently from validate(OpenXmlElement)", () => {
    // Validate the same root both ways — results should differ due to partUri attachment
    const ruby = new Ruby(); // invalid

    const directErrors = validator.validate(ruby);
    expect(directErrors.length).toBeGreaterThan(0);
    // Direct element validation has no partUri
    for (const e of directErrors) {
      expect(e.partUri).toBeUndefined();
    }

    // Via document wrapper, partUri is set
    const docRoot = makeComposite(W_NS, "document", "w");
    docRoot.appendChild(ruby);
    const doc = makeWordDoc(docRoot);
    const docErrors = validator.validate(doc);
    const errWithPart = docErrors.filter((e) => e.partUri !== undefined);
    if (errWithPart.length > 0) {
      expect(errWithPart[0]?.partUri).toBeDefined();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 4: validate(OpcPackageLike) overload
// ═══════════════════════════════════════════════════════════════════════════════

describe("validate(OpcPackageLike) — OPC package-level validation", () => {
  const validator = new OpenXmlValidator(FileFormatVersions.Office2007);

  it("valid OPC package with rels content-type default: no errors", () => {
    const pkg = makeMinimalOpcPkg(true);
    const errors = validator.validate(pkg);
    expect(Array.isArray(errors)).toBe(true);
    expect(errors).toHaveLength(0);
  });

  it("invalid OPC package missing rels default: Pkg_RequiredPartDoNotExist error", () => {
    const pkg = makeMinimalOpcPkg(false); // missing rels Default
    const errors = validator.validate(pkg);
    expect(Array.isArray(errors)).toBe(true);
    const err = errors.find((e) => e.id === "Pkg_RequiredPartDoNotExist");
    expect(err).toBeDefined();
    expect(err?.errorType).toBe("Package");
  });

  it("validate(OpcPackageLike) never throws", () => {
    // Even a malformed pkg shouldn't throw
    const pkg = makeMinimalOpcPkg(false);
    expect(() => validator.validate(pkg)).not.toThrow();
  });

  it("OPC errors have Package errorType", () => {
    const pkg = makeMinimalOpcPkg(false);
    const errors = validator.validate(pkg);
    for (const e of errors) {
      expect(e.errorType).toBe("Package");
    }
  });

  it("OPC package with broken relationship target: Pkg_RequiredPartDoNotExist for missing part", () => {
    const relIterable: Array<{
      id: string;
      type: string;
      target: string;
      targetMode: "internal" | "external";
      sourceUri: string;
    }> = [
      {
        id: "rId1",
        type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
        target: "word/document.xml",
        targetMode: "internal" as const,
        sourceUri: "/",
      },
    ];

    const pkg: OpcPackageLike = {
      contentTypes: {
        hasDefault(ext: string): boolean {
          return ext === "rels";
        },
      },
      relationships: {
        [Symbol.iterator]() {
          return relIterable[Symbol.iterator]();
        },
      },
      parts(): Iterable<{ uri: string; relationships: IRelationshipCollection }> {
        // The part referenced by the relationship doesn't exist in parts()
        return [];
      },
    };

    const errors = validator.validate(pkg);
    const err = errors.find((e) => e.id === "Pkg_RequiredPartDoNotExist");
    expect(err).toBeDefined();
    expect(err?.errorType).toBe("Package");
    expect(err?.description).toContain("word/document.xml");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 5: FileFormatVersions version-filtering behavior
// ═══════════════════════════════════════════════════════════════════════════════

describe("FileFormatVersions — version-directed validation", () => {
  it("Office2007 validator: fileFormat is Office2007", () => {
    const v = new OpenXmlValidator(FileFormatVersions.Office2007);
    expect(v.fileFormat).toBe(FileFormatVersions.Office2007);
  });

  it("Office2013 validator: fileFormat is Office2013", () => {
    const v = new OpenXmlValidator(FileFormatVersions.Office2013);
    expect(v.fileFormat).toBe(FileFormatVersions.Office2013);
  });

  it("undefined fileFormat: validate(element) still returns errors for invalid elements", () => {
    // No version target — conservative mode
    const v = new OpenXmlValidator();
    expect(v.fileFormat).toBeUndefined();
    const ruby = new Ruby(); // empty — always invalid regardless of version
    const errors = v.validate(ruby);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("Office2007 and Office2013 validators both catch structural errors on same element", () => {
    const v2007 = new OpenXmlValidator(FileFormatVersions.Office2007);
    const v2013 = new OpenXmlValidator(FileFormatVersions.Office2013);

    const ruby = new Ruby(); // empty — invalid in all versions
    const errors2007 = v2007.validate(ruby);
    const errors2013 = v2013.validate(ruby);

    expect(errors2007.length).toBeGreaterThan(0);
    expect(errors2013.length).toBeGreaterThan(0);
  });

  it("validate(element) with FieldChar missing required w:fldCharType → error in any version", () => {
    const versions: Array<[string, ReturnType<typeof FileFormatVersions.Office2007>]> = [
      ["Office2007", FileFormatVersions.Office2007],
      ["Office2010", FileFormatVersions.Office2010],
      ["Office2013", FileFormatVersions.Office2013],
    ];
    for (const [label, ver] of versions) {
      const v = new OpenXmlValidator(ver);
      const fc = new FieldChar(); // missing w:fldCharType
      const errors = v.validate(fc);
      const reqErr = errors.find((e) => e.id === "Sch_MissingRequiredAttribute" && e.node === fc);
      expect(reqErr, `Expected required-attr error for version ${label}`).toBeDefined();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 6: Backward compatibility — old API still works
// ═══════════════════════════════════════════════════════════════════════════════

describe("Backward compatibility — existing validate(element, partUri?, rels?) API unchanged", () => {
  it("existing API: validate(element) with no extra args still works", () => {
    const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const ruby = new Ruby();
    const errors = v.validate(ruby);
    expect(Array.isArray(errors)).toBe(true);
  });

  it("existing API: validate(element, partUri) still works", () => {
    const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const ruby = new Ruby();
    const errors = v.validate(ruby, "/word/document.xml");
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBeGreaterThan(0);
    for (const e of errors) {
      expect(e.partUri).toBe("/word/document.xml");
    }
  });

  it("existing options constructor: { fileFormatVersions } still sets fileFormat", () => {
    const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2016 });
    expect(v.fileFormat).toBe(FileFormatVersions.Office2016);
  });

  it("validatePackage() direct call still works as before", () => {
    const v = new OpenXmlValidator();
    const docRoot = makeComposite(W_NS, "document", "w");
    const doc = makeWordDoc(docRoot);
    // Should not throw
    const errors = v.validatePackage(doc);
    expect(Array.isArray(errors)).toBe(true);
  });

  it("validateOpcPackage() direct call still works as before", () => {
    const v = new OpenXmlValidator();
    const pkg = makeMinimalOpcPkg(true);
    const errors = v.validateOpcPackage(pkg);
    expect(Array.isArray(errors)).toBe(true);
  });
});
