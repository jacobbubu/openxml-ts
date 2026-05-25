/**
 * Epic-130: Particle Automaton Validator — .NET Parity Tests
 *
 * Validates that the TS particle validator produces the same error codes as the
 * .NET SDK's particle automaton (DocumentFormat.OpenXml.Framework/Validation/Schema/).
 *
 * ## Key error codes aligned with .NET EmitInvalidElementError:
 *
 *   Sch_UnexpectedElementContentExpectingComplex
 *     → element IS declared under the parent (CanContainChild=true) but appears in the wrong
 *       sequence position. Mirrors .NET CompositeParticleValidator.EmitInvalidElementError
 *       when element.CanContainChild(child) is true.
 *
 *   Sch_InvalidElementContentExpectingComplex
 *     → element is NOT declared under the parent at all (CanContainChild=false).
 *       Mirrors .NET EmitInvalidElementError when CanContainChild(child) is false.
 *
 *   Sch_AllElement
 *     → element appears more than once in an xsd:all particle (each member may appear ≤1 time).
 *       Mirrors .NET AllParticleValidator.EmitInvalidElementError Partial/Matched case.
 *
 *   Sch_IncompleteContentExpectingComplex
 *     → required child element is missing (minOccurs > 0 but count = 0).
 *
 *   Sch_MinOccursInvalidElement
 *     → child element appears more times than maxOccurs allows.
 *
 * ## Source .NET tests ported here (from Epic-130 Phase 0 research):
 *   - AllParticleValidatorTest.cs (2 [Fact]) — partially portable
 *   - SequenceParticleValidatorTest.cs — Sch_UnexpectedElementContentExpectingComplex cases
 *   - ChoiceParticleValidatorTest.cs — choice membership, partial match
 *   - CompositeParticleTests.cs (17 [Fact]) — NOT-APPLICABLE (DOM mutation API, not validation)
 *
 * ## Schema data used:
 *   - w:ruby (Sequence: rubyPr[1,1], rt[1,1], rubyBase[1,1]) — sequence tests
 *   - w:fieldMapData (All: type, name, mappedName, column, lid, dynamicAddress all [0,1]) — xsd:all tests
 *   - w:abstractNum (Sequence with mixed required/optional) — choice tests
 */

import { beforeAll, describe, expect, it } from "vitest";
import { OpenXmlElementList } from "../../src/element/element-list.js";
import { OpenXmlCompositeElement } from "../../src/element/element.js";
import { OpenXmlValidator, registerConstraints } from "../../src/validation/OpenXmlValidator.js";
import type { ValidationError } from "../../src/validation/ValidationError.js";
import { constraints as wordConstraints } from "../../src/validation/constraints/word.js";

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

function makeComposite(ns: string, local: string, prefix = "w"): OpenXmlCompositeElement {
  return new (class extends OpenXmlCompositeElement {
    override readonly localName = local;
    override readonly prefix = prefix;
    override readonly namespaceUri = ns;
    override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
  })();
}

/** Filter errors by id and optionally by node identity. */
function errorsById(
  errors: ValidationError[],
  id: string,
  node?: OpenXmlCompositeElement,
): ValidationError[] {
  return errors.filter((e) => e.id === id && (node === undefined || e.node === node));
}

// ── Test setup ────────────────────────────────────────────────────────────────

let validator: OpenXmlValidator;

beforeAll(() => {
  registerConstraints(wordConstraints);
  validator = new OpenXmlValidator();
});

// ═════════════════════════════════════════════════════════════════════════════
// Sch_UnexpectedElementContentExpectingComplex
// Mirrors .NET EmitInvalidElementError when element.CanContainChild(child) is true
// (the element tag IS declared under the parent, but wrong sequence position).
// ═════════════════════════════════════════════════════════════════════════════

describe("Sch_UnexpectedElementContentExpectingComplex — sequence order violations", () => {
  // w:ruby particle: Sequence [rubyPr(1,1), rt(1,1), rubyBase(1,1)]
  // All three children are allowed; the violation is their order.

  it("rt before rubyPr → Sch_UnexpectedElementContentExpectingComplex (not Sch_Invalid)", () => {
    // rt appears at position 0 but should be at position 1 (after rubyPr)
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "rt")); // wrong: should come after rubyPr
    ruby.appendChild(makeComposite(W_NS, "rubyPr"));
    ruby.appendChild(makeComposite(W_NS, "rubyBase"));

    const errors = validator.validate(ruby);

    // Must produce Sch_UnexpectedElementContentExpectingComplex (element IS known, wrong order)
    const unexpected = errorsById(errors, "Sch_UnexpectedElementContentExpectingComplex", ruby);
    expect(unexpected.length).toBeGreaterThanOrEqual(1);

    // Must NOT produce Sch_InvalidElementContentExpectingComplex for the out-of-order child
    // (it IS a valid child, just wrong position)
    const invalid = errorsById(errors, "Sch_InvalidElementContentExpectingComplex", ruby);
    expect(invalid.length).toBe(0);
  });

  it("rubyBase before rubyPr and rt → Sch_UnexpectedElementContentExpectingComplex", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "rubyBase")); // should be last
    ruby.appendChild(makeComposite(W_NS, "rubyPr"));
    ruby.appendChild(makeComposite(W_NS, "rt"));

    const errors = validator.validate(ruby);

    const unexpected = errorsById(errors, "Sch_UnexpectedElementContentExpectingComplex", ruby);
    expect(unexpected.length).toBeGreaterThanOrEqual(1);
    expect(unexpected[0]?.description).toMatch(/ruby/);
  });

  it("error description mentions the parent element name", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "rt")); // out of order
    ruby.appendChild(makeComposite(W_NS, "rubyPr"));
    ruby.appendChild(makeComposite(W_NS, "rubyBase"));

    const errors = validator.validate(ruby);
    const err = errors.find((e) => e.id === "Sch_UnexpectedElementContentExpectingComplex");
    expect(err).toBeDefined();
    expect(err?.description).toMatch(/ruby/);
  });

  it("error node is the PARENT element, not the out-of-order child", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "rt")); // wrong order
    ruby.appendChild(makeComposite(W_NS, "rubyPr"));
    ruby.appendChild(makeComposite(W_NS, "rubyBase"));

    const errors = validator.validate(ruby);
    const err = errors.find((e) => e.id === "Sch_UnexpectedElementContentExpectingComplex");
    // .NET reports the error on the parent (not the child)
    expect(err?.node).toBe(ruby);
  });

  it("correct order → no Sch_UnexpectedElementContentExpectingComplex", () => {
    // Build rubyPr with its required children first, then attach to ruby in correct order
    const rubyPr = makeComposite(W_NS, "rubyPr");
    rubyPr.appendChild(makeComposite(W_NS, "rubyAlign"));
    rubyPr.appendChild(makeComposite(W_NS, "hps"));
    rubyPr.appendChild(makeComposite(W_NS, "hpsRaise"));
    rubyPr.appendChild(makeComposite(W_NS, "hpsBaseText"));
    rubyPr.appendChild(makeComposite(W_NS, "lid"));

    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(rubyPr);
    ruby.appendChild(makeComposite(W_NS, "rt"));
    ruby.appendChild(makeComposite(W_NS, "rubyBase"));

    const errors = validator.validate(ruby);
    const unexpected = errorsById(errors, "Sch_UnexpectedElementContentExpectingComplex", ruby);
    expect(unexpected.length).toBe(0);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// Sch_InvalidElementContentExpectingComplex
// Mirrors .NET EmitInvalidElementError when element.CanContainChild(child) is false
// (element tag NOT declared under parent at all).
// ═════════════════════════════════════════════════════════════════════════════

describe("Sch_InvalidElementContentExpectingComplex — unknown element under parent", () => {
  it("completely unknown element under w:ruby → Sch_InvalidElementContentExpectingComplex", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "INVALID_UNKNOWN_TAG"));

    const errors = validator.validate(ruby);
    const invalid = errorsById(errors, "Sch_InvalidElementContentExpectingComplex", ruby);
    expect(invalid.length).toBeGreaterThanOrEqual(1);
  });

  it("element from different namespace → Sch_InvalidElementContentExpectingComplex", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite("http://example.com/other", "p", "x"));

    const errors = validator.validate(ruby);
    const invalid = errorsById(errors, "Sch_InvalidElementContentExpectingComplex", ruby);
    expect(invalid.length).toBeGreaterThanOrEqual(1);
  });

  it("error description contains expected child names", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "INVALID_TAG"));

    const errors = validator.validate(ruby);
    const err = errorsById(errors, "Sch_InvalidElementContentExpectingComplex", ruby)[0];
    expect(err).toBeDefined();
    // Description should mention what was expected (rubyPr, rt, rubyBase)
    expect(err?.description).toMatch(/rubyPr|rt|rubyBase/);
  });

  it("valid-sibling-only element under wrong parent → Sch_InvalidElementContentExpectingComplex", () => {
    // w:body doesn't allow w:rubyPr as a direct child
    const body = makeComposite(W_NS, "body");
    body.appendChild(makeComposite(W_NS, "rubyPr")); // rubyPr only valid under ruby

    const errors = validator.validate(body);
    const invalid = errorsById(errors, "Sch_InvalidElementContentExpectingComplex", body);
    expect(invalid.length).toBeGreaterThanOrEqual(1);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// Sch_AllElement — xsd:all duplicate detection
// Mirrors .NET AllParticleValidator.EmitInvalidElementError Partial/Matched case.
// ═════════════════════════════════════════════════════════════════════════════

describe("Sch_AllElement — xsd:all duplicate child elements", () => {
  // w:fieldMapData has particle: { kind: "all", items: [type, name, mappedName, column, lid, dynamicAddress] }
  // All members are min=0, max=1 — each may appear at most once in any order.

  it("duplicate w:type under w:fieldMapData → Sch_AllElement", () => {
    const fmd = makeComposite(W_NS, "fieldMapData");
    fmd.appendChild(makeComposite(W_NS, "type")); // first occurrence — OK
    fmd.appendChild(makeComposite(W_NS, "type")); // second — ERROR

    const errors = validator.validate(fmd);
    const allErr = errorsById(errors, "Sch_AllElement", fmd);
    expect(allErr.length).toBeGreaterThanOrEqual(1);
  });

  it("duplicate w:name under w:fieldMapData → Sch_AllElement", () => {
    const fmd = makeComposite(W_NS, "fieldMapData");
    fmd.appendChild(makeComposite(W_NS, "name"));
    fmd.appendChild(makeComposite(W_NS, "name")); // duplicate

    const errors = validator.validate(fmd);
    const allErr = errorsById(errors, "Sch_AllElement", fmd);
    expect(allErr.length).toBeGreaterThanOrEqual(1);
  });

  it("Sch_AllElement error mentions the duplicated element name", () => {
    const fmd = makeComposite(W_NS, "fieldMapData");
    fmd.appendChild(makeComposite(W_NS, "column"));
    fmd.appendChild(makeComposite(W_NS, "column")); // duplicate

    const errors = validator.validate(fmd);
    const err = errorsById(errors, "Sch_AllElement", fmd)[0];
    expect(err).toBeDefined();
    expect(err?.description).toMatch(/column/);
  });

  it("Sch_AllElement error node is the PARENT element", () => {
    const fmd = makeComposite(W_NS, "fieldMapData");
    fmd.appendChild(makeComposite(W_NS, "lid"));
    fmd.appendChild(makeComposite(W_NS, "lid")); // duplicate

    const errors = validator.validate(fmd);
    const err = errorsById(errors, "Sch_AllElement", fmd)[0];
    expect(err?.node).toBe(fmd);
  });

  it("each unique member of xsd:all in any order → no Sch_AllElement", () => {
    // xsd:all: elements can appear in ANY order, as long as each appears at most once
    const fmd = makeComposite(W_NS, "fieldMapData");
    fmd.appendChild(makeComposite(W_NS, "mappedName"));
    fmd.appendChild(makeComposite(W_NS, "type"));
    fmd.appendChild(makeComposite(W_NS, "name"));

    const errors = validator.validate(fmd);
    const allErr = errorsById(errors, "Sch_AllElement", fmd);
    expect(allErr.length).toBe(0);
  });

  it("unknown element under xsd:all → Sch_InvalidElementContentExpectingComplex, NOT Sch_AllElement", () => {
    const fmd = makeComposite(W_NS, "fieldMapData");
    fmd.appendChild(makeComposite(W_NS, "NONEXISTENT")); // not in all particle

    const errors = validator.validate(fmd);
    const allErr = errorsById(errors, "Sch_AllElement", fmd);
    const invalidErr = errorsById(errors, "Sch_InvalidElementContentExpectingComplex", fmd);

    // Should report invalid (not in all), not all-duplicate
    expect(allErr.length).toBe(0);
    expect(invalidErr.length).toBeGreaterThanOrEqual(1);
  });

  it("empty xsd:all (all members optional, min=0) → no errors", () => {
    // fieldMapData particle has min:1,max:1 for the all node, but all items have min:0
    // An empty element is valid (no required children).
    const fmd = makeComposite(W_NS, "fieldMapData");

    const errors = validator.validate(fmd);
    const allErr = errorsById(errors, "Sch_AllElement", fmd);
    const incompleteErr = errorsById(errors, "Sch_IncompleteContentExpectingComplex", fmd);
    expect(allErr.length).toBe(0);
    expect(incompleteErr.length).toBe(0);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// Sch_IncompleteContentExpectingComplex — missing required children
// ═════════════════════════════════════════════════════════════════════════════

describe("Sch_IncompleteContentExpectingComplex — missing required children", () => {
  it("empty w:ruby → Sch_IncompleteContentExpectingComplex (rubyPr missing)", () => {
    const ruby = makeComposite(W_NS, "ruby");
    const errors = validator.validate(ruby);
    const incomplete = errorsById(errors, "Sch_IncompleteContentExpectingComplex", ruby);
    expect(incomplete.length).toBeGreaterThanOrEqual(1);
  });

  it("w:ruby with only rubyPr → Sch_IncompleteContentExpectingComplex (rt missing)", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "rubyPr"));
    const errors = validator.validate(ruby);
    const incomplete = errorsById(errors, "Sch_IncompleteContentExpectingComplex", ruby);
    expect(incomplete.length).toBeGreaterThanOrEqual(1);
  });

  it("incomplete error mentions the missing element", () => {
    const ruby = makeComposite(W_NS, "ruby");
    const errors = validator.validate(ruby);
    const err = errorsById(errors, "Sch_IncompleteContentExpectingComplex", ruby)[0];
    expect(err?.description).toMatch(/ruby/);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// Sch_MinOccursInvalidElement — max-occurs exceeded
// ═════════════════════════════════════════════════════════════════════════════

describe("Sch_MinOccursInvalidElement — max-occurs exceeded", () => {
  it("two w:rubyPr in w:ruby (max=1) → Sch_MinOccursInvalidElement", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "rubyPr"));
    ruby.appendChild(makeComposite(W_NS, "rubyPr")); // max=1 exceeded
    ruby.appendChild(makeComposite(W_NS, "rt"));
    ruby.appendChild(makeComposite(W_NS, "rubyBase"));

    const errors = validator.validate(ruby);
    const maxErr = errorsById(errors, "Sch_MinOccursInvalidElement", ruby);
    expect(maxErr.length).toBeGreaterThanOrEqual(1);
    expect(maxErr[0]?.description).toMatch(/at most 1/);
  });

  it("Sch_MinOccursInvalidElement error node is the PARENT element", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "rubyPr"));
    ruby.appendChild(makeComposite(W_NS, "rubyPr")); // duplicate

    const errors = validator.validate(ruby);
    const err = errorsById(errors, "Sch_MinOccursInvalidElement", ruby)[0];
    expect(err?.node).toBe(ruby);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// Error-code exclusivity: verify no confusion between codes
// ═════════════════════════════════════════════════════════════════════════════

describe("Error code exclusivity — no code confusion", () => {
  it("out-of-order known child → ONLY Sch_Unexpected, NOT Sch_Invalid", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "rubyBase")); // rubyBase is known but should come last
    ruby.appendChild(makeComposite(W_NS, "rubyPr"));
    ruby.appendChild(makeComposite(W_NS, "rt"));

    const errors = validator.validate(ruby);
    const unexpected = errorsById(errors, "Sch_UnexpectedElementContentExpectingComplex", ruby);
    const invalid = errorsById(errors, "Sch_InvalidElementContentExpectingComplex", ruby);

    // rubyBase IS known under ruby — must not be reported as "invalid"
    expect(unexpected.length).toBeGreaterThanOrEqual(1);
    expect(invalid.length).toBe(0);
  });

  it("truly unknown child → ONLY Sch_Invalid, NOT Sch_Unexpected", () => {
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "UNKNOWN_ELEMENT")); // never valid under ruby

    const errors = validator.validate(ruby);
    const unexpected = errorsById(errors, "Sch_UnexpectedElementContentExpectingComplex", ruby);
    const invalid = errorsById(errors, "Sch_InvalidElementContentExpectingComplex", ruby);

    // UNKNOWN_ELEMENT is never valid under ruby → Sch_Invalid
    expect(invalid.length).toBeGreaterThanOrEqual(1);
    expect(unexpected.length).toBe(0);
  });

  it("xsd:all duplicate → ONLY Sch_AllElement, NOT Sch_Invalid", () => {
    const fmd = makeComposite(W_NS, "fieldMapData");
    fmd.appendChild(makeComposite(W_NS, "type"));
    fmd.appendChild(makeComposite(W_NS, "type")); // duplicate

    const errors = validator.validate(fmd);
    const allErr = errorsById(errors, "Sch_AllElement", fmd);
    const invalidErr = errorsById(errors, "Sch_InvalidElementContentExpectingComplex", fmd);

    // type IS valid under fieldMapData — duplicate should be Sch_AllElement
    expect(allErr.length).toBeGreaterThanOrEqual(1);
    expect(invalidErr.length).toBe(0);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// Edge cases and robustness
// ═════════════════════════════════════════════════════════════════════════════

describe("Edge cases", () => {
  it("element with no registered constraint → no errors (skipUnknown=true default)", () => {
    const unknown = makeComposite("http://unknown.example.com/ns", "unknownRoot");
    unknown.appendChild(makeComposite("http://unknown.example.com/ns", "child"));
    const errors = validator.validate(unknown);
    // No constraint registered → validator skips (lenient mode)
    expect(errors.length).toBe(0);
  });

  it("validator never throws on deeply nested invalid tree", () => {
    const ruby = makeComposite(W_NS, "ruby");
    const nested = makeComposite(W_NS, "rt");
    ruby.appendChild(nested); // wrong position

    let errors: ValidationError[] = [];
    expect(() => {
      errors = validator.validate(ruby);
    }).not.toThrow();
    expect(Array.isArray(errors)).toBe(true);
  });

  it("multiple error types can coexist in one element (out-of-order + missing required)", () => {
    // ruby with out-of-order children AND missing rubyBase
    const ruby = makeComposite(W_NS, "ruby");
    ruby.appendChild(makeComposite(W_NS, "rt")); // out of order (rubyPr should come first)
    ruby.appendChild(makeComposite(W_NS, "rubyPr"));
    // rubyBase is missing (min=1)

    const errors = validator.validate(ruby);
    const unexpected = errorsById(errors, "Sch_UnexpectedElementContentExpectingComplex", ruby);
    const incomplete = errorsById(errors, "Sch_IncompleteContentExpectingComplex", ruby);

    // Both types of errors can fire simultaneously
    expect(unexpected.length).toBeGreaterThanOrEqual(1);
    expect(incomplete.length).toBeGreaterThanOrEqual(1);
  });
});
