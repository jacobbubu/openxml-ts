/**
 * Property type validation tests — mirrors .NET OpenXmlValidatorTest attribute type coverage.
 *
 * .NET covers 35 XSD types via individual [Fact] methods.
 * This file tests our typeHint-based system across all supported typeHints
 * using inline constraints.
 */

import { beforeAll, describe, expect, it } from "vitest";
import { OpenXmlElementList } from "../../src/element/element-list.js";
import { OpenXmlCompositeElement } from "../../src/element/element.js";
import { FileFormatVersions } from "../../src/markup-compat/file-format-versions.js";
import { OpenXmlValidator, registerConstraints } from "../../src/validation/OpenXmlValidator.js";
import type { ElementConstraint } from "../../src/validation/types.js";

const NS = "http://test.type-validation.local";

// ── hexBinary ───────────────────────────────────────────────────────────────

const hexConstraint: ElementConstraint = {
  className: "HexTest",
  namespaceUri: NS,
  localName: "hexEl",
  knownAttrs: ["x:val"],
  attrConstraints: [{ qname: "x:val", typeHint: "hexBinary", length: 4 }],
};

// ── base64Binary ────────────────────────────────────────────────────────────

const b64Constraint: ElementConstraint = {
  className: "B64Test",
  namespaceUri: NS,
  localName: "b64El",
  knownAttrs: ["x:data"],
  attrConstraints: [{ qname: "x:data", typeHint: "base64Binary" }],
};

// ── onOff ───────────────────────────────────────────────────────────────────

const onOffConstraint: ElementConstraint = {
  className: "OnOffTest",
  namespaceUri: NS,
  localName: "onOffEl",
  knownAttrs: ["x:flag"],
  attrConstraints: [{ qname: "x:flag", typeHint: "onOff" }],
};

// ── enumMembers ─────────────────────────────────────────────────────────────

const enumConstraint: ElementConstraint = {
  className: "EnumTest",
  namespaceUri: NS,
  localName: "enumEl",
  knownAttrs: ["x:font"],
  attrConstraints: [{ qname: "x:font", typeHint: "enum", enumMembers: ["auto", "manual", "none"] }],
};

// ── uint32 ─────────────────────────────────────────────────────────────────

const uint32Constraint: ElementConstraint = {
  className: "U32Test",
  namespaceUri: NS,
  localName: "u32El",
  knownAttrs: ["x:count"],
  attrConstraints: [{ qname: "x:count", typeHint: "uint32" }],
};

// ── list ────────────────────────────────────────────────────────────────────

const listConstraint: ElementConstraint = {
  className: "ListTest",
  namespaceUri: NS,
  localName: "listEl",
  knownAttrs: ["x:cells"],
  attrConstraints: [{ qname: "x:cells", typeHint: "list" }],
};

// ── String length ───────────────────────────────────────────────────────────

const strLenConstraint: ElementConstraint = {
  className: "StrLenTest",
  namespaceUri: NS,
  localName: "strLenEl",
  knownAttrs: ["x:name"],
  attrConstraints: [{ qname: "x:name", minLength: 1, maxLength: 40 }],
};

// ── Numeric range ──────────────────────────────────────────────────────────

const numConstraint: ElementConstraint = {
  className: "NumRangeTest",
  namespaceUri: NS,
  localName: "numEl",
  knownAttrs: ["x:level"],
  attrConstraints: [{ qname: "x:level", minValue: 0, maxValue: 9 }],
};

// ── Version-aware hexBinary ↔ enum (StylePaneSortMethods pattern) ──────────

const versionHexEnumConstraint: ElementConstraint = {
  className: "VerHexEnumTest",
  namespaceUri: NS,
  localName: "verHexEl",
  knownAttrs: ["x:sort"],
  attrConstraints: [
    {
      qname: "x:sort",
      typeHint: "hexBinary",
      length: 2,
      enumMembers: ["alpha", "beta", "gamma"],
    },
  ],
};

// ── Register ─────────────────────────────────────────────────────────────────

beforeAll(() => {
  registerConstraints([
    hexConstraint,
    b64Constraint,
    onOffConstraint,
    enumConstraint,
    uint32Constraint,
    listConstraint,
    strLenConstraint,
    numConstraint,
    versionHexEnumConstraint,
  ]);
});

// ── Test helpers ────────────────────────────────────────────────────────────

function makeComposite(className: string, localName: string): OpenXmlCompositeElement {
  return new (class extends OpenXmlCompositeElement {
    override readonly className = className;
    override readonly namespaceUri = NS;
    override readonly localName = localName;
    override readonly prefix = "";
    override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
  })();
}

// ── Tests ───────────────────────────────────────────────────────────────────

describe("Property type validation — hexBinary", () => {
  const v = new OpenXmlValidator();

  it("valid hexBinary (8 hex chars = 4 bytes) → 0 errors", () => {
    const el = makeComposite("HexTest", "hexEl");
    el.extendedAttributes.set("x:val", "a1b2c3d4");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("invalid hexBinary (non-hex chars) → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("HexTest", "hexEl");
    el.extendedAttributes.set("x:val", "a1b2c3g4");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("hexBinary");
  });

  it("hexBinary wrong length → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("HexTest", "hexEl");
    el.extendedAttributes.set("x:val", "a1b2");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("length");
  });

  it("hexBinary odd length → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("HexTest", "hexEl");
    el.extendedAttributes.set("x:val", "a1b");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
  });
});

describe("Property type validation — base64Binary", () => {
  const v = new OpenXmlValidator();

  it("valid base64 → 0 errors", () => {
    const el = makeComposite("B64Test", "b64El");
    el.extendedAttributes.set("x:data", "dGVzdA==");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("invalid base64 → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("B64Test", "b64El");
    el.extendedAttributes.set("x:data", "!!! invalid !!!");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("base64Binary");
  });
});

describe("Property type validation — onOff", () => {
  const v = new OpenXmlValidator();

  it.each([["true"], ["false"], ["1"], ["0"], ["on"], ["off"]])(
    "valid onOff value '%s' → 0 errors",
    (val) => {
      const el = makeComposite("OnOffTest", "onOffEl");
      el.extendedAttributes.set("x:flag", val);
      const errors = v.validate(el);
      expect(errors).toHaveLength(0);
    },
  );

  it("invalid onOff → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("OnOffTest", "onOffEl");
    el.extendedAttributes.set("x:flag", "maybe");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("onOff");
  });
});

describe("Property type validation — enumMembers", () => {
  const v = new OpenXmlValidator();

  it.each(["auto", "manual", "none"])("valid enum value '%s' → 0 errors", (val) => {
    const el = makeComposite("EnumTest", "enumEl");
    el.extendedAttributes.set("x:font", val);
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("invalid enum value → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("EnumTest", "enumEl");
    el.extendedAttributes.set("x:font", "wingdings");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("Enumeration");
  });
});

describe("Property type validation — uint32", () => {
  const v = new OpenXmlValidator();

  it("valid uint32 → 0 errors", () => {
    const el = makeComposite("U32Test", "u32El");
    el.extendedAttributes.set("x:count", "42");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("uint32 max value (4294967295) → 0 errors", () => {
    const el = makeComposite("U32Test", "u32El");
    el.extendedAttributes.set("x:count", "4294967295");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("negative value → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("U32Test", "u32El");
    el.extendedAttributes.set("x:count", "-1");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("UInt32");
  });

  it("non-numeric → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("U32Test", "u32El");
    el.extendedAttributes.set("x:count", "Foo");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("UInt32");
  });

  it("overflow (>4294967295) → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("U32Test", "u32El");
    el.extendedAttributes.set("x:count", "5000000000");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("UInt32");
  });
});

describe("Property type validation — string length", () => {
  const v = new OpenXmlValidator();

  it("string within length range → 0 errors", () => {
    const el = makeComposite("StrLenTest", "strLenEl");
    el.extendedAttributes.set("x:name", "validName");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("string too long (> maxLength 40) → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("StrLenTest", "strLenEl");
    el.extendedAttributes.set("x:name", "a".repeat(41));
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("MaxLength 40");
  });

  it("string too short (< minLength 1) → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("StrLenTest", "strLenEl");
    el.extendedAttributes.set("x:name", "");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("MinLength 1");
  });
});

describe("Property type validation — numeric range", () => {
  const v = new OpenXmlValidator();

  it("number within range → 0 errors", () => {
    const el = makeComposite("NumRangeTest", "numEl");
    el.extendedAttributes.set("x:level", "5");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("number at min boundary → 0 errors", () => {
    const el = makeComposite("NumRangeTest", "numEl");
    el.extendedAttributes.set("x:level", "0");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("number at max boundary → 0 errors", () => {
    const el = makeComposite("NumRangeTest", "numEl");
    el.extendedAttributes.set("x:level", "9");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("number below minValue → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("NumRangeTest", "numEl");
    el.extendedAttributes.set("x:level", "-1");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("MinInclusive 0");
  });

  it("number above maxValue → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("NumRangeTest", "numEl");
    el.extendedAttributes.set("x:level", "10");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("MaxInclusive 9");
  });
});

describe("Property type validation — version-aware hexBinary ↔ enum", () => {
  it("Office2007: hexBinary check applies", () => {
    const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const el = makeComposite("VerHexEnumTest", "verHexEl");
    el.extendedAttributes.set("x:sort", "a1b2");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("Office2007: invalid hex → Sch_AttributeValueDataTypeDetailed", () => {
    const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2007 });
    const el = makeComposite("VerHexEnumTest", "verHexEl");
    el.extendedAttributes.set("x:sort", "zzzz");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
  });

  it("Office2010: enum check applies", () => {
    const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
    const el = makeComposite("VerHexEnumTest", "verHexEl");
    el.extendedAttributes.set("x:sort", "alpha");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("Office2010: invalid enum → Sch_AttributeValueDataTypeDetailed", () => {
    const v = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2010 });
    const el = makeComposite("VerHexEnumTest", "verHexEl");
    el.extendedAttributes.set("x:sort", "unknown");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
    expect(typeErr?.description).toContain("Enumeration");
  });
});

// ── Union attribute checks ──────────────────────────────────────────────────

const unionConstraint: ElementConstraint = {
  className: "UnionTest",
  namespaceUri: NS,
  localName: "unionEl",
  knownAttrs: ["x:color"],
  attrConstraints: [
    { qname: "x:color", typeHint: "hexBinary", length: 3 },
    { qname: "x:color", typeHint: "enum", enumMembers: ["auto"] },
  ],
};

beforeAll(() => {
  registerConstraints([unionConstraint]);
});

describe("Property type validation — union attributes", () => {
  const v = new OpenXmlValidator();

  it("passes first constraint (hexBinary) → 0 errors", () => {
    const el = makeComposite("UnionTest", "unionEl");
    el.extendedAttributes.set("x:color", "a1b2c3");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("passes second constraint (enum 'auto') → 0 errors", () => {
    const el = makeComposite("UnionTest", "unionEl");
    el.extendedAttributes.set("x:color", "auto");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("fails all constraints → Sch_AttributeValueDataTypeDetailed", () => {
    const el = makeComposite("UnionTest", "unionEl");
    el.extendedAttributes.set("x:color", "invalid");
    const errors = v.validate(el);
    const typeErr = errors.find((e) => e.id === "Sch_AttributeValueDataTypeDetailed");
    expect(typeErr).toBeDefined();
  });
});

// ── Sch_UndeclaredAttribute interaction ─────────────────────────────────────

describe("Property type validation — undeclared attrs with typeHint constraints", () => {
  it("declared attr with valid value → 0 errors", () => {
    const v = new OpenXmlValidator();
    const el = makeComposite("OnOffTest", "onOffEl");
    el.extendedAttributes.set("x:flag", "true");
    const errors = v.validate(el);
    expect(errors).toHaveLength(0);
  });

  it("undeclared attr on element with knownAttrs → Sch_UndeclaredAttribute", () => {
    const v = new OpenXmlValidator();
    const el = makeComposite("OnOffTest", "onOffEl");
    el.extendedAttributes.set("x:flag", "true");
    el.extendedAttributes.set("x:unknownAttr", "value");
    const errors = v.validate(el);
    const undeclared = errors.find((e) => e.id === "Sch_UndeclaredAttribute");
    expect(undeclared).toBeDefined();
    expect(undeclared?.description).toContain("x:unknownAttr");
  });
});
