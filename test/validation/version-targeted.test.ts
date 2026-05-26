/**
 * Epic-93: OpenXmlValidator version-targeted validation tests.
 *
 * Covers:
 *  1. fileFormat getter returns the configured target version
 *  2. No target → conservative "modern Office" behavior (no regression)
 *  3. Version-conditional required attr: required in Office2007, optional from Office2010
 *  4. Target Office2007 → attr flagged as missing
 *  5. Target Office2010 → attr NOT flagged (it's optional from Office2010)
 *  6. Target Office2013 → attr flagged again (required in Office2013 per schema)
 *  7. Target between versions → correct behavior based on range
 *  8. versionedRequiredAttrs with no matching version → no error
 *  9. Unconditional requiredAttrs unaffected by version targeting
 * 10. Real fixture smoke test with no target → 0 false positives
 * 11. resolveVersionedRequiredAttrs: multiple qnames, mixed required/optional
 * 12. fileFormat undefined when no option given
 * 13. fileFormat property reflects the given FileFormatVersions value
 */

import { beforeAll, describe, expect, it } from "vitest";
import { OpenXmlElementList } from "../../src/element/element-list.js";
import { OpenXmlCompositeElement } from "../../src/element/element.js";
import { FileFormatVersions } from "../../src/markup-compat/file-format-versions.js";
import { OpenXmlValidator, registerConstraints } from "../../src/validation/OpenXmlValidator.js";
import { constraints as wordConstraints } from "../../src/validation/constraints/word.js";
import type { ElementConstraint, VersionedRequiredAttr } from "../../src/validation/types.js";

// Register constraints once
beforeAll(() => {
  registerConstraints(wordConstraints);
});

// ---- Test element helpers ----

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

function makeComposite(ns: string, local: string, prefix: string): OpenXmlCompositeElement {
  return new (class extends OpenXmlCompositeElement {
    override readonly localName = local;
    override readonly prefix = prefix;
    override readonly namespaceUri = ns;
    override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
  })();
}

/**
 * Build a minimal element with a manually injected ElementConstraint that has
 * versionedRequiredAttrs. This lets us test the version logic directly without
 * depending on schema data for a specific element.
 *
 * The element is injected into the CONSTRAINT_MAP via registerConstraints().
 */
function makeConstraintWithVersionedRequired(
  ns: string,
  local: string,
  versionedRequiredAttrs: readonly VersionedRequiredAttr[],
): ElementConstraint {
  return {
    className: `Test_${local}`,
    namespaceUri: ns,
    localName: local,
    versionedRequiredAttrs,
  };
}

// Unique test namespace to avoid collisions with real constraints
const TEST_NS = "http://test.example.com/version-targeted-test";

// Register test constraints before tests run
const testConstraintOffice2007Only: ElementConstraint = makeConstraintWithVersionedRequired(
  TEST_NS,
  "elem2007only",
  [
    // Required only in Office2007
    {
      qname: "t:val",
      minVersion: FileFormatVersions.Office2007,
      maxVersion: FileFormatVersions.Office2007,
    },
    // Optional from Office2010 onward
    { qname: "t:val", minVersion: FileFormatVersions.Office2010, optional: true },
  ],
);

const testConstraintAlwaysRequired: ElementConstraint = makeConstraintWithVersionedRequired(
  TEST_NS,
  "elemAlwaysReq",
  [
    // Required in ALL versions (no optional override)
    { qname: "t:id" },
  ],
);

const testConstraintOffice2013Required: ElementConstraint = makeConstraintWithVersionedRequired(
  TEST_NS,
  "elem2013req",
  [
    // Required in Office2007 and Office2013, optional from Office2010
    {
      qname: "t:val",
      minVersion: FileFormatVersions.Office2007,
      maxVersion: FileFormatVersions.Office2007,
    },
    { qname: "t:val", minVersion: FileFormatVersions.Office2010, optional: true },
    {
      qname: "t:val",
      minVersion: FileFormatVersions.Office2013,
      maxVersion: FileFormatVersions.Office2013,
    },
  ],
);

beforeAll(() => {
  registerConstraints([
    testConstraintOffice2007Only,
    testConstraintAlwaysRequired,
    testConstraintOffice2013Required,
  ]);
});

// ---- Tests ----

describe("OpenXmlValidator — Epic-93 version-targeted validation", () => {
  // ── 1 & 12. fileFormat getter ────────────────────────────────────────────

  it("fileFormat is undefined when no option given", () => {
    const v = new OpenXmlValidator();
    expect(v.fileFormat).toBeUndefined();
  });

  it("fileFormat reflects the configured FileFormatVersions", () => {
    const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2016 });
    expect(v.fileFormat).toBe(FileFormatVersions.Office2016);
  });

  it("fileFormat works for each version value", () => {
    for (const [name, value] of Object.entries(FileFormatVersions)) {
      if (name === "None") continue;
      const v = new OpenXmlValidator({ fileFormatVersions: value as FileFormatVersions });
      expect(v.fileFormat).toBe(value);
    }
  });

  // ── 2. No target → conservative behavior (no regression) ─────────────────

  it("no target: versioned required attr with ANY required entry → required (conservative)", () => {
    // elem2007only: Office2007 required, Office2010 optional.
    // Conservative mode (no target): if ANY version requires it → report as required.
    // This matches the original behavior where all RequiredValidator entries were
    // pushed to requiredAttrs unconditionally before version-awareness was added.
    const el = makeComposite(TEST_NS, "elem2007only", "t");
    // Do NOT set t:val
    const validator = new OpenXmlValidator();
    const errors = validator.validate(el);
    // Conservative mode: anyRequired=true (Office2007 entry requires it) → error
    const missing = errors.filter(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("t:val"),
    );
    expect(missing).toHaveLength(1);
  });

  it("no target: attr with no optional override → still required", () => {
    const el = makeComposite(TEST_NS, "elemAlwaysReq", "t");
    // t:id not set
    const validator = new OpenXmlValidator();
    const errors = validator.validate(el);
    const missing = errors.filter(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("t:id"),
    );
    expect(missing).toHaveLength(1);
  });

  // ── 3-6. Version-targeted behavior ───────────────────────────────────────

  it("target Office2007: attr required in Office2007 → error when missing", () => {
    const el = makeComposite(TEST_NS, "elem2007only", "t");
    // t:val not set
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const errors = validator.validate(el);
    const missing = errors.filter(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("t:val"),
    );
    expect(missing).toHaveLength(1);
  });

  it("target Office2007: attr required in Office2007 → no error when present", () => {
    const el = makeComposite(TEST_NS, "elem2007only", "t");
    el.extendedAttributes.set("t:val", "someValue");
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const errors = validator.validate(el);
    const missing = errors.filter(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("t:val"),
    );
    expect(missing).toHaveLength(0);
  });

  it("target Office2010: attr optional from Office2010 → no error when missing", () => {
    const el = makeComposite(TEST_NS, "elem2007only", "t");
    // t:val not set
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
    const errors = validator.validate(el);
    const missing = errors.filter(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("t:val"),
    );
    expect(missing).toHaveLength(0);
  });

  it("target Office2013: attr required in Office2013 → error when missing", () => {
    // elem2013req: required in 2007, optional in 2010, required again in 2013
    const el = makeComposite(TEST_NS, "elem2013req", "t");
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2013 });
    const errors = validator.validate(el);
    const missing = errors.filter(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("t:val"),
    );
    expect(missing).toHaveLength(1);
  });

  it("target Office2016: no entry for Office2016 → attr not required", () => {
    // elem2007only: required in 2007, optional from 2010 — Office2016 matches the 'optional from 2010' entry
    const el = makeComposite(TEST_NS, "elem2007only", "t");
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2016 });
    const errors = validator.validate(el);
    const missing = errors.filter(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("t:val"),
    );
    expect(missing).toHaveLength(0);
  });

  // ── 9. Unconditional requiredAttrs unaffected by version targeting ────────

  it("unconditional requiredAttrs always enforced regardless of target version", () => {
    // w:abstractNum requires w:abstractNumId unconditionally
    const abstractNum = makeComposite(W_NS, "abstractNum", "w");
    // Do NOT set w:abstractNumId

    // Test with several version targets
    for (const target of [
      FileFormatVersions.Office2007,
      FileFormatVersions.Office2013,
      FileFormatVersions.Office2021,
    ] as FileFormatVersions[]) {
      const validator = new OpenXmlValidator({ fileFormatVersions: target });
      const errors = validator.validate(abstractNum);
      const missing = errors.filter(
        (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("w:abstractNumId"),
      );
      expect(missing).toHaveLength(1);
    }
  });

  it("unconditional requiredAttrs enforced even without a version target", () => {
    const abstractNum = makeComposite(W_NS, "abstractNum", "w");
    const validator = new OpenXmlValidator();
    const errors = validator.validate(abstractNum);
    const missing = errors.filter(
      (e) => e.id === "Sch_MissingRequiredAttribute" && e.description.includes("w:abstractNumId"),
    );
    expect(missing).toHaveLength(1);
  });

  // ── 10. No false positives on real fixture smoke ──────────────────────────
  // This is run inline with limited fixture data (real fixture tests are in upstream-smoke)

  it("known-good element validates to 0 errors regardless of target version", () => {
    // w:abstractNum with required w:abstractNumId present → 0 errors
    const abstractNum = makeComposite(W_NS, "abstractNum", "w");
    abstractNum.extendedAttributes.set("w:abstractNumId", "0");

    for (const target of [
      undefined,
      FileFormatVersions.Office2007,
      FileFormatVersions.Office2010,
      FileFormatVersions.Office2013,
    ] as (FileFormatVersions | undefined)[]) {
      const validator = new OpenXmlValidator({ fileFormatVersions: target });
      const errors = validator.validate(abstractNum);
      const schemaErrors = errors.filter((e) => e.errorType === "Schema");
      expect(schemaErrors, `target=${target}`).toHaveLength(0);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// NamespaceTest — mirrors .NET OpenXmlValidatorTest.NamespaceTest
// Tests Sch_UndeclaredAttribute for version-conditional known attributes.
// ─────────────────────────────────────────────────────────────────────────────

describe("NamespaceTest — Sch_UndeclaredAttribute for version-conditional attrs", () => {
  const _W14_NS = "http://schemas.microsoft.com/office/word/2010/wordml";

  // Inline constraint for a test element: standard attrs declared unconditionally,
  // while w14:paraId is only declared for Office2010+.
  const nsTestConstraint: ElementConstraint = {
    className: "NsTestElement",
    namespaceUri: "http://ns-test.local",
    localName: "custom",
    knownAttrs: ["w:rsidR", "w:rsidRDefault"],
    versionedKnownAttrs: [{ qname: "w14:paraId", initialVersion: "Office2010" }],
  };

  beforeAll(() => {
    registerConstraints([nsTestConstraint]);
  });

  it("O12: w14:paraId (beta namespace) → Sch_UndeclaredAttribute", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const el = new (class extends OpenXmlCompositeElement {
      override readonly className = "NsTestElement";
      override readonly namespaceUri = "http://ns-test.local";
      override readonly localName = "custom";
      override readonly prefix = "";
      override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
      constructor() {
        super();
        this.extendedAttributes.set("w:rsidR", "00A35C47");
        this.extendedAttributes.set("w14:paraId", "017B6C57");
      }
    })();

    const errors = validator.validate(el);
    const undeclared = errors.find((e) => e.id === "Sch_UndeclaredAttribute");
    expect(undeclared).toBeDefined();
    expect(undeclared!.errorType).toBe("Schema");
    expect(undeclared!.node).toBe(el);
    expect(undeclared!.description).toContain("w14:paraId");
  });

  it("O14: w14:paraId is declared → 0 errors", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
    const el = new (class extends OpenXmlCompositeElement {
      override readonly className = "NsTestElement";
      override readonly namespaceUri = "http://ns-test.local";
      override readonly localName = "custom";
      override readonly prefix = "";
      override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
      constructor() {
        super();
        this.extendedAttributes.set("w:rsidR", "00A35C47");
        this.extendedAttributes.set("w14:paraId", "017B6C57");
      }
    })();

    const errors = validator.validate(el);
    expect(errors.length).toBe(0);
  });

  it("undeclared attr from known namespace → Sch_UndeclaredAttribute regardless of version", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const el = new (class extends OpenXmlCompositeElement {
      override readonly className = "NsTestElement";
      override readonly namespaceUri = "http://ns-test.local";
      override readonly localName = "custom";
      override readonly prefix = "";
      override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
      constructor() {
        super();
        this.extendedAttributes.set("w:rsidR", "00A35C47");
        this.extendedAttributes.set("w:completelyUnknown", "value");
      }
    })();

    const errors = validator.validate(el);
    const undeclared = errors.find(
      (e) => e.id === "Sch_UndeclaredAttribute" && e.description.includes("w:completelyUnknown"),
    );
    expect(undeclared).toBeDefined();
  });

  it("declared attr in knownAttrs → no Sch_UndeclaredAttribute", () => {
    const validator = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const el = new (class extends OpenXmlCompositeElement {
      override readonly className = "NsTestElement";
      override readonly namespaceUri = "http://ns-test.local";
      override readonly localName = "custom";
      override readonly prefix = "";
      override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
      constructor() {
        super();
        this.extendedAttributes.set("w:rsidR", "00A35C47");
        this.extendedAttributes.set("w:rsidRDefault", "00F26B31");
      }
    })();

    const errors = validator.validate(el);
    const undeclared = errors.filter((e) => e.id === "Sch_UndeclaredAttribute");
    expect(undeclared).toHaveLength(0);
  });
});
