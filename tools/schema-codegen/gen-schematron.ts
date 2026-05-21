#!/usr/bin/env -S bun run
/**
 * Schematron rule codegen — Epic-79 Phase 2 + Epic-84 extended categories + Epic-85 cross-part + Epic-90 final.
 *
 * Reads /Users/rongshen/github/Open-XML-SDK/data/schematrons.json (948 rules)
 * and categorises each rule into one of the SDK's 18 semantic categories.
 *
 * Supported categories (faithful port of SDK's Validation/Semantic/*.cs):
 *   1.1  attrPresent        — @attr alone → attribute must not be omitted (AttributeCannotOmitConstraint)
 *   1.2  pattern            — matches(@attr, regex)
 *   1.3  numericRange       — @attr <= N / >= M (constant compare)
 *   1.4  validSet           — @attr = v1 or @attr = v2 ... (must be in set)
 *   1.10 invalidSet         — @attr != v1 and @attr != v2 ... (must not be in set)
 *   1.12 stringLength       — string-length(@attr) <= N / >= M
 *   1.14 absentWhenEq       — @a and (@b=v1 or @b=v2) → error if a present and b equals a value
 *   1.15 absentWhenNeq      — @a and @b!=v → error if a present and b NOT one of values
 *   1.16 mutualExcl         — (@a and @b) or ... → error if ≥2 attrs present
 *   1.17 attrVsAttr         — @a < @b / @a <= @b → error if not satisfied
 *   1.18 reqWhenOther       — (@a and @b=v) or @b!=v → error if a absent and b=v
 *   1.19 attrValueCondition — (@a=v1 and @b=v2) or @b!=v2 → error if @a=v1 but @b is not in condValues (AttributeValueConditionToAnother)
 *   2.2  relType            — document(rels)//.../@Type = 'url' (relationship type check)
 *   2.1  relExist           — document(rels)//... (relationship existence check) → covered by relType handler
 *   2.3  uniqueness         — count(distinct-values(...)) = count(...) (in-part uniqueness)
 *   3.1  refExist           — Index-of(document('Part:X')//ns:el/@attr, @currentAttr) (cross-part attr lookup)
 *   3.2  indexedRef         — @attr < count(document('Part:X')//ns:el) + N (index-based element count)
 *
 * Skipped safely (no false positives):
 *   3.3           — root-attribute unique across package (very rare, needs full package walk)
 *   Complex conditionals not matching the above
 *
 * Emits: src/validation/schematron/rules.ts
 *
 * Usage:
 *   bun run tools/schema-codegen/gen-schematron.ts
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "../..");
const SOURCE_PATH = "/Users/rongshen/github/Open-XML-SDK/data/schematrons.json";
const OUTPUT_PATH = resolve(REPO_ROOT, "src/validation/schematron/rules.ts");

// ---- Input shape ----
interface SchematronEntry {
  readonly Context: string;
  readonly Test: string;
  readonly App: string;
}

// ---- Output rule kinds ----
export interface RelationshipRule {
  readonly kind: "relationship";
  readonly context: string;
  readonly attrQname: string;
  readonly requiredType: string | undefined;
  readonly app: string;
}

export interface UniquenessRule {
  readonly kind: "uniqueness";
  readonly context: string;
  readonly scopePath: string;
  readonly attrQname: string; // includes leading @
  readonly app: string;
}

export interface StringLengthRule {
  readonly kind: "stringLength";
  readonly context: string;
  readonly attrQname: string;
  readonly minLength: number | undefined;
  readonly maxLength: number | undefined;
  readonly app: string;
}

export interface NumericRangeRule {
  readonly kind: "numericRange";
  readonly context: string;
  readonly attrQname: string;
  readonly min: number | undefined;
  readonly max: number | undefined;
  readonly app: string;
}

// ---- New Epic-84 rule kinds ----

export interface ValidSetRule {
  readonly kind: "validSet";
  readonly context: string;
  readonly attrQname: string;
  readonly values: readonly string[]; // attribute must be one of these values
  readonly app: string;
}

export interface InvalidSetRule {
  readonly kind: "invalidSet";
  readonly context: string;
  readonly attrQname: string;
  readonly values: readonly string[]; // attribute must NOT be one of these values
  readonly app: string;
}

export interface AbsentWhenEqRule {
  readonly kind: "absentWhenEq";
  readonly context: string;
  readonly absentAttr: string; // @a — must be absent when condition matches
  readonly condAttr: string; // @b — condition attribute
  readonly condValues: readonly string[]; // values that trigger the rule
  readonly app: string;
}

export interface AbsentWhenNeqRule {
  readonly kind: "absentWhenNeq";
  readonly context: string;
  readonly absentAttr: string; // @a — must be absent when condition NOT matches
  readonly condAttr: string; // @b — condition attribute
  readonly condValues: readonly string[]; // values that would NOT trigger the rule (absent attr OK if cond IS one of these)
  readonly app: string;
}

export interface MutualExclRule {
  readonly kind: "mutualExcl";
  readonly context: string;
  readonly attrs: readonly string[]; // attributes that are mutually exclusive
  readonly app: string;
}

export interface AttrVsAttrRule {
  readonly kind: "attrVsAttr";
  readonly context: string;
  readonly attrA: string; // left attr
  readonly attrB: string; // right attr
  readonly canEqual: boolean; // true = <=, false = <
  readonly app: string;
}

export interface ReqWhenOtherRule {
  readonly kind: "reqWhenOther";
  readonly context: string;
  readonly requiredAttr: string; // @a — must be present when condition matches
  readonly condAttr: string; // @b — condition attribute
  readonly condValues: readonly string[]; // values that trigger requirement
  readonly app: string;
}

export interface PatternRule {
  readonly kind: "pattern";
  readonly context: string;
  readonly attrQname: string;
  readonly regex: string; // XSD/XPath regex (not JS regex)
  readonly app: string;
}

export interface UnsupportedRule {
  readonly kind: "unsupported";
  readonly context: string;
  readonly test: string;
  readonly app: string;
}

/**
 * 1.1 AttrPresent — attribute must not be omitted (AttributeCannotOmitConstraint).
 * Test form: @attr (standalone — attribute presence required).
 */
export interface AttrPresentRule {
  readonly kind: "attrPresent";
  readonly context: string;
  readonly attrQname: string; // attribute that must be present
  readonly app: string;
}

/**
 * 1.19 AttrValueCondition — SDK's AttributeValueConditionToAnother.
 * Form: (@a = v1 and @b = v2) or @b != v2
 * Meaning: when @a is in attrValues, @b must be in condValues; error if @a matches but @b doesn't.
 */
export interface AttrValueConditionRule {
  readonly kind: "attrValueCondition";
  readonly context: string;
  readonly attrQname: string; // @a — the attribute whose value triggers the check
  readonly attrValues: readonly string[]; // v1[, v2, ...] — values of @a that trigger the check
  readonly condAttr: string; // @b — the condition attribute that must satisfy condValues
  readonly condValues: readonly string[]; // values @b must have when @a matches
  readonly app: string;
}

// ---- Epic-85 cross-part rule kinds ----

/**
 * 3.1 RefExist — Index-of(document('Part:XxxPart')//ns:el/@attr, @currentAttr)
 * The current element's refAttr value must exist in the target part's element attribute collection.
 * partRef = "Part:.." means same part (or parent part). partRef = "Part:FootnotesPart" means cross-part.
 */
export interface RefExistRule {
  readonly kind: "refExist";
  readonly context: string;
  readonly refAttr: string; // attribute on current element that holds the reference value
  readonly partRef: string; // "Part:." | "Part:.." | "Part:XxxPart" | "Part:/WorkbookPart/..."
  readonly targetPath: string; // XPath steps after document(), e.g. "//w:footnotes/w:footnote/@w:id"
  readonly targetNs: string; // namespace URI of the target element
  readonly targetLocal: string; // local name of the target element
  readonly targetAttr: string; // attribute on the target element whose values form the allowed set
  readonly app: string;
}

/**
 * 3.2 IndexedRef — @attr < count(document('Part:XxxPart')//ns:el) + N
 * The current element's index attribute (0- or 1-based) must be within bounds of element count in target part.
 */
export interface IndexedRefRule {
  readonly kind: "indexedRef";
  readonly context: string;
  readonly indexAttr: string; // attribute on current element (the index)
  readonly partRef: string; // target part reference
  readonly targetNs: string; // namespace of elements to count
  readonly targetLocal: string; // local name of elements to count
  readonly targetPath: string; // full path after document(), e.g. "//x:cellMetadata/x:bk"
  readonly indexBase: number; // 0 or 1 (added to count: @attr < count + indexBase means valid if attr < count+indexBase, i.e. attr <= count+indexBase-1)
  readonly app: string;
}

export type CategorisedRule =
  | RelationshipRule
  | UniquenessRule
  | StringLengthRule
  | NumericRangeRule
  | ValidSetRule
  | InvalidSetRule
  | AbsentWhenEqRule
  | AbsentWhenNeqRule
  | MutualExclRule
  | AttrVsAttrRule
  | ReqWhenOtherRule
  | PatternRule
  | RefExistRule
  | IndexedRefRule
  | AttrPresentRule
  | AttrValueConditionRule
  | UnsupportedRule;

// ---- Pattern matchers ----

// 2.2 rel type: document(rels)//r:Relationship[@Id = current()/@attr]/@Type = 'url'
const REL_TYPE_RE =
  /document\(rels\)\/\/r:Relationship\[@Id = current\(\)\/@([^\]]+)\]\/@Type = '([^']+)'/;

// 2.1 rel existence: document(rels)//r:Relationship[@Id = current()/@attr]
const REL_EXIST_RE = /document\(rels\)\/\/r:Relationship\[@Id = current\(\)\/@([^\]]+)\]\s*$/;

// 3.1 refExist: Index-of(document('Part:X')//ns:el/@attr, @currentAttr)
const REF_EXIST_RE =
  /^Index-of\(document\('(Part:[^']+)'\)(\/\/[^,]+)\/@([A-Za-z:_][A-Za-z:_0-9]*),\s*@([A-Za-z:_][A-Za-z:_0-9]*)\)$/i;

// 3.2 indexedRef: @attr < count(document('Part:X')//ns:el/...) + N
const INDEXED_REF_RE =
  /^@([A-Za-z:_][A-Za-z:_0-9]*)\s*<\s*count\(document\('(Part:[^']+)'\)(\/\/[^)]+)\)\s*\+\s*(\d+)$/;

// 2.3 uniqueness: count(distinct-values(lower-case?(PATH/@attr))) = count(lower-case?(PATH/@attr))
// Supports optional lower-case() wrapper on both sides.
// We extract the inner path by stripping lower-case(...) if present.
const UNIQUENESS_RE =
  /count\(distinct-values\((?:lower-case\()?([^)]+?)(?:\))?\)\)\s*=\s*count\((?:lower-case\()?([^)]+?)(?:\))?\)/;

// 1.2 pattern: matches(@attr, 'regex') or fn:matches(@attr, 'regex')
// We use a simpler regex extractor - the full test is like: matches(@w:val, ".{1}")
const PATTERN_MAIN_RE =
  /^(?:fn:)?matches\(@([A-Za-z:_][A-Za-z:_0-9-]*),\s*['"](.*)['"](?:,\s*'[^']*')?\)$/;

// 1.12 string-length attributes extractor
const SL_ATTR_RE = /string-length\(@([^)]+)\)/g;

// 1.3 numeric range
const NR_CLAUSE_RE =
  /@([A-Za-z:_][A-Za-z:_0-9-]*)\s*([<>]=?)\s*(-?\d+(?:\.\d+)?(?:[Ee][+-]?\d+)?)/g;

// 1.4 valid set: @attr = v1 or @attr = v2 ...
// First extract attr then extract values (support hyphens in attr names like emma:disjunction-type)
const VALID_SET_ATTR_RE = /^@([A-Za-z:_][A-Za-z:_0-9-]*)\s*=/;
const VALID_SET_VALUE_RE = /=\s*(?:'([^']*)'|([A-Za-z0-9._:@-]*))/g;

// 1.10 invalid set: @attr != v1 and @attr != v2 ...
const INVALID_SET_ATTR_RE = /^@([A-Za-z:_][A-Za-z:_0-9-]*)\s*!=/;
const INVALID_SET_VALUE_RE = /!=\s*(?:'([^']*)'|([A-Za-z0-9._:@-]*))/g;

// 1.14/1.15: @a and @b=v / @a and @b!=v
// Form: @a and @b = v1  or  @a and (@b=v1 or @b=v2)  or  @a and @b != v1
const ABSENT_FORM_RE =
  /^@([A-Za-z:_][A-Za-z:_0-9-]*)\s+and\s+\(?@([A-Za-z:_][A-Za-z:_0-9-]*)\s*(!=|=)\s*(?:'([^']*)'|([A-Za-z0-9._:@-]*))/;

// 1.16 mutual exclusive: (@a and @b) or (@a and @c) ...
// All @attr names in the test
const MUTUAL_EXCL_ATTRS_RE = /@([A-Za-z:_][A-Za-z:_0-9-]*)/g;

// 1.17 attr vs attr: @a < @b or @a <= @b
const ATTR_VS_ATTR_RE =
  /^@([A-Za-z:_][A-Za-z:_0-9-]*)\s*(<=|<|>=|>)\s*@([A-Za-z:_][A-Za-z:_0-9-]*)$/;

// 1.18 req when other: (@a and @b=v) or @b!=v
// Form: (@a and @b=v) or @b!=v  or  (@a and (@b=v1 or @b=v2)) or (@b!=v1 and @b!=v2)
// Simple single-value form only
const REQ_WHEN_OTHER_SIMPLE_RE =
  /^\(\s*@([A-Za-z:_][A-Za-z:_0-9-]*)\s+and\s+@([A-Za-z:_][A-Za-z:_0-9-]*)\s*=\s*(?:'([^']*)'|([A-Za-z0-9._:-]*))\s*\)\s+or\s+@[A-Za-z:_][A-Za-z:_0-9-]*\s*!=\s*(?:'[^']*'|[A-Za-z0-9._:-]*)$/;

// 1.19 attr value condition: (@a=v1 and @b=v2) or @b!=v2
// SDK: AttributeValueConditionToAnother — when @a in attrValues, @b must be in condValues.
// Covers forms like:
//   (@x:type = none or @x:type = all) and (@x:scope = data ...) or @x:scope != ...
//   (@a = v and @b = v2) or @b != v2
// We parse: leading group has @attrQname = v [...] and @condAttr = cv [...] followed by or @condAttr != ...
const ATTR_VALUE_COND_RE =
  /^\(?\(?@([A-Za-z:_][A-Za-z:_0-9-]*)(?:\s*=\s*([A-Za-z0-9._:-]+)(?:\s+or\s+@[A-Za-z:_][A-Za-z:_0-9-]*\s*=\s*[A-Za-z0-9._:-]+)*)?\)?\s+and\s+\(?@([A-Za-z:_][A-Za-z:_0-9-]*)(?:\s*=\s*([A-Za-z0-9._:-]+)(?:\s+or\s+@[A-Za-z:_][A-Za-z:_0-9-]*\s*=\s*[A-Za-z0-9._:-]+)*)?\)?\)\s+or\s+\(?@([A-Za-z:_][A-Za-z:_0-9-]*)\s*!=\s*[A-Za-z0-9._:-]+/;

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Parse the 1.19 AttrValueCondition test form.
 * Returns parsed rule or null if not this form.
 *
 * Handles four sub-forms (all from SDK's AttributeValueConditionToAnother):
 *   1. Simple: (@a = v and @b = v2) or @b != v2
 *   2. Multi-attrValue: ((@a = v1 or @a = v2 ...) and @b = cv) or @b != cv
 *   3. Multi-condValue: ((@a = v1 ...) and (@b = cv1 or @b = cv2)) or (@b != cv1 ...)
 *   4. Mixed: (@a = 0 and (@b = v1 or @b = v2)) or (@b != v1 ...)
 */
function parseAttrValueCondition(
  test: string,
): { attrQname: string; attrValues: string[]; condAttr: string; condValues: string[] } | null {
  const QNAME = "[A-Za-z:_][A-Za-z:_0-9-]*";
  const VAL = "[A-Za-z0-9._:-]+";

  // Form 1: (@a = v and @b = v2) or @b != v2
  const simpleRe = new RegExp(
    `^\\(\\s*@(${QNAME})\\s*=\\s*(${VAL})\\s+and\\s+@(${QNAME})\\s*=\\s*(${VAL})\\s*\\)\\s+or\\s+@(${QNAME})\\s*!=\\s*${VAL}\\s*$`,
  );
  const m1 = simpleRe.exec(test);
  if (m1) {
    return { attrQname: m1[1]!, attrValues: [m1[2]!], condAttr: m1[3]!, condValues: [m1[4]!] };
  }

  // Form 2: ((@a = v1 or @a = v2 ...) and @b = cv) or @b != cv
  const wCompatRe = new RegExp(
    `^\\(\\((.+?)\\)\\s+and\\s+@(${QNAME})\\s*=\\s*(${VAL})\\s*\\)\\s+or\\s+@${QNAME}\\s*!=`,
  );
  const m2 = wCompatRe.exec(test);
  if (m2) {
    const innerPart = m2[1]!;
    const attrM = new RegExp(`^@(${QNAME})`).exec(innerPart.trim());
    if (attrM) {
      const attrQname = attrM[1]!;
      const attrValues: string[] = [];
      for (const vm of innerPart.matchAll(new RegExp(`=\\s*(${VAL})`, "g"))) {
        if (!attrValues.includes(vm[1]!)) attrValues.push(vm[1]!);
      }
      if (attrValues.length > 0) {
        return { attrQname, attrValues, condAttr: m2[2]!, condValues: [m2[3]!] };
      }
    }
  }

  // Form 3: ((@a = v1 or @a = v2) and (@b = cv1 or @b = cv2)) or (@b != cv1 ...)
  const condFmtRe = /^\(\(([^)]+)\)\s+and\s+\(([^)]+)\)\)\s+or\s+\(/;
  const m3 = condFmtRe.exec(test);
  if (m3) {
    const grp1 = m3[1]!;
    const grp2 = m3[2]!;
    const attrM1 = new RegExp(`@(${QNAME})`).exec(grp1);
    const attrM2 = new RegExp(`@(${QNAME})`).exec(grp2);
    if (attrM1 && attrM2) {
      const attrValues = [...grp1.matchAll(new RegExp(`=\\s*(${VAL})`, "g"))].map((m) => m[1]!);
      const condValues = [...grp2.matchAll(new RegExp(`=\\s*(${VAL})`, "g"))].map((m) => m[1]!);
      if (attrValues.length > 0 && condValues.length > 0) {
        return { attrQname: attrM1[1]!, attrValues, condAttr: attrM2[1]!, condValues };
      }
    }
  }

  // Form 4: (@a = v and (@b = cv1 or @b = cv2)) or (@b != cv1 ...)
  const sparkRe = new RegExp(
    `^\\(\\s*@(${QNAME})\\s*=\\s*(${VAL})\\s+and\\s+\\(([^)]+)\\)\\)\\s+or\\s+`,
  );
  const m4 = sparkRe.exec(test);
  if (m4) {
    const grp = m4[3]!;
    const condAttrM = new RegExp(`@(${QNAME})`).exec(grp);
    if (condAttrM) {
      const condValues = [...grp.matchAll(new RegExp(`=\\s*(${VAL})`, "g"))].map((m) => m[1]!);
      if (condValues.length > 0) {
        return { attrQname: m4[1]!, attrValues: [m4[2]!], condAttr: condAttrM[1]!, condValues };
      }
    }
  }

  return null;
}

// Prefix→namespace (subset used for cross-part rule parsing)
const CODEGEN_PREFIX_TO_URI: Readonly<Record<string, string>> = {
  w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  x: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  p: "http://schemas.openxmlformats.org/presentationml/2006/main",
  a: "http://schemas.openxmlformats.org/drawingml/2006/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  v: "urn:schemas-microsoft-com:vml",
  x14: "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main",
  x15: "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main",
  ovml: "urn:schemas-microsoft-com:office:powerpoint",
};

/** Resolve a prefixed element name "ns:local" to {ns, local}. */
function resolveCodegenQname(qname: string): { ns: string; local: string } {
  const c = qname.indexOf(":");
  if (c === -1) return { ns: "", local: qname };
  const prefix = qname.slice(0, c);
  return { ns: CODEGEN_PREFIX_TO_URI[prefix] ?? "", local: qname.slice(c + 1) };
}

/**
 * Parse an XPath path like "//w:footnotes/w:footnote" to extract the last element's ns/local.
 * Returns null if path can't be parsed.
 */
function parseTargetPath(path: string): { ns: string; local: string } | null {
  // Strip leading // or /
  let p = path.trim();
  if (p.startsWith("//")) p = p.slice(2);
  else if (p.startsWith("/")) p = p.slice(1);
  // Get last segment
  const segments = p.split("/").filter((s) => s.length > 0);
  if (segments.length === 0) return null;
  const last = segments[segments.length - 1]!;
  return resolveCodegenQname(last);
}

// ---- Category detector ----

function categorise(rule: SchematronEntry): CategorisedRule[] {
  const { Context: context, Test: test, App: app } = rule;

  // ---- 1.1 attrPresent: @attr alone (SDK: AttributeCannotOmitConstraint) ----
  // These rules check that typed attributes are not null/omitted. Since typed attributes
  // are NOT stored in extendedAttributes (they use the typed property system), we cannot
  // safely check them without typed access. Skip to avoid false positives on real files.
  if (/^@[A-Za-z:_][A-Za-z:_0-9-]*$/.test(test.trim())) {
    return [{ kind: "unsupported", context, test, app }];
  }

  // ---- 2.2 / 2.1 Relationship ----
  const relTypeMatch = REL_TYPE_RE.exec(test);
  if (relTypeMatch) {
    return [
      {
        kind: "relationship",
        context,
        attrQname: relTypeMatch[1]!,
        requiredType: relTypeMatch[2]!,
        app,
      },
    ];
  }
  if (test.includes("document(rels)")) {
    const relExistMatch = REL_EXIST_RE.exec(test);
    if (relExistMatch) {
      return [
        {
          kind: "relationship",
          context,
          attrQname: relExistMatch[1]!,
          requiredType: undefined,
          app,
        },
      ];
    }
  }

  // ---- 3.1/3.2 cross-part reference checks ----
  if (
    test.includes("fn:document") ||
    (test.includes("document(") && !test.includes("document(rels)"))
  ) {
    // 3.1 refExist: Index-of(document('Part:X')//ns:el/@attr, @currentAttr)
    const refExistMatch = REF_EXIST_RE.exec(test);
    if (refExistMatch) {
      const partRef = refExistMatch[1]!;
      const targetXPath = refExistMatch[2]!; // e.g. "//w:footnotes/w:footnote"
      const targetAttr = refExistMatch[3]!; // e.g. "w:id"
      const refAttr = refExistMatch[4]!; // e.g. "w:id"
      const parsed = parseTargetPath(targetXPath);
      if (parsed !== null) {
        return [
          {
            kind: "refExist",
            context,
            refAttr,
            partRef,
            targetPath: targetXPath,
            targetNs: parsed.ns,
            targetLocal: parsed.local,
            targetAttr,
            app,
          },
        ];
      }
    }

    // 3.2 indexedRef: @attr < count(document('Part:X')//ns:el) + N
    const indexedRefMatch = INDEXED_REF_RE.exec(test);
    if (indexedRefMatch) {
      const indexAttr = indexedRefMatch[1]!;
      const partRef = indexedRefMatch[2]!;
      const targetXPath = indexedRefMatch[3]!; // e.g. "//x:cellMetadata/x:bk"
      const indexBase = Number(indexedRefMatch[4]!);
      const parsed = parseTargetPath(targetXPath);
      if (parsed !== null) {
        return [
          {
            kind: "indexedRef",
            context,
            indexAttr,
            partRef,
            targetNs: parsed.ns,
            targetLocal: parsed.local,
            targetPath: targetXPath,
            indexBase,
            app,
          },
        ];
      }
    }

    // 3.3 and other unrecognised cross-part — skip safely (no false positives)
    return [{ kind: "unsupported", context, test, app }];
  }

  // ---- 2.3 uniqueness (count distinct-values, in-part only) ----
  const dvMatch = UNIQUENESS_RE.exec(test);
  if (dvMatch) {
    const lhs = dvMatch[1]!.trim();
    const lastSlash = lhs.lastIndexOf("/");
    if (lastSlash !== -1) {
      const scopePath = lhs.slice(0, lastSlash);
      const attrQname = lhs.slice(lastSlash + 1);
      if (attrQname.startsWith("@") && !attrQname.includes("(")) {
        return [{ kind: "uniqueness", context, scopePath, attrQname, app }];
      }
    }
    return [{ kind: "unsupported", context, test, app }];
  }

  // ---- 1.12 string-length ----
  if (test.includes("string-length(") && !test.includes("count(")) {
    const attrMatches = [...test.matchAll(SL_ATTR_RE)];
    if (attrMatches.length > 0) {
      const seenAttrs = new Set<string>();
      const results: StringLengthRule[] = [];
      for (const am of attrMatches) {
        const attrQname = am[1]!;
        if (seenAttrs.has(attrQname)) continue;
        seenAttrs.add(attrQname);
        const attrSpecific = new RegExp(
          `string-length\\(@${escapeRegex(attrQname)}\\)\\s*(<=|>=)\\s*(\\d+)`,
          "g",
        );
        let minLength: number | undefined;
        let maxLength: number | undefined;
        for (const m of test.matchAll(attrSpecific)) {
          if (m[1] === ">=") minLength = Number(m[2]);
          else if (m[1] === "<=") maxLength = Number(m[2]);
        }
        results.push({ kind: "stringLength", context, attrQname, minLength, maxLength, app });
      }
      if (results.length > 0) return results;
    }
    return [{ kind: "unsupported", context, test, app }];
  }

  // ---- 1.2 pattern: matches(@attr, 'regex') ----
  if (test.startsWith("fn:matches(") || test.startsWith("matches(")) {
    const m = PATTERN_MAIN_RE.exec(test);
    if (m) {
      return [{ kind: "pattern", context, attrQname: m[1]!, regex: m[2]!, app }];
    }
    return [{ kind: "unsupported", context, test, app }];
  }

  // ---- 1.17 attr vs attr: @a < @b ----
  {
    const m = ATTR_VS_ATTR_RE.exec(test.trim());
    if (m) {
      const op = m[2]!;
      const canEqual = op === "<=" || op === ">=";
      // Normalise: if >= then swap a and b (b <= a means a >= b, so attrA <= attrB = attrB >= attrA)
      // SDK's 1.17 is: value of @a must be less than (or equal to) @b
      // We store it as attrA <= attrB (or attrA < attrB)
      let attrA = m[1] ?? "";
      let attrB = m[3] ?? "";
      if (op === ">=" || op === ">") {
        // @a >= @b  means @b <= @a, so swap to maintain a<=b form
        [attrA, attrB] = [attrB, attrA];
      }
      return [{ kind: "attrVsAttr", context, attrA, attrB, canEqual, app }];
    }
  }

  // ---- 1.16 mutual exclusive: (@a and @b) or (@a and @c) ... ----
  // Pattern: the test consists only of "(@x and @y) or ..." pairs
  if (/^\([@(]/.test(test) && test.includes(" and @") && test.includes(" or (")) {
    // Check if it's purely mutual-exclusive pattern: no = or != comparisons with literal values
    if (!/=\s*(?:'|[A-Za-z0-9._-]+(?:\s|$|[,)]))/g.test(test.replace(/!=/g, ""))) {
      const attrNames = [...test.matchAll(MUTUAL_EXCL_ATTRS_RE)].map((m) => m[1]!);
      const uniqueAttrs = [...new Set(attrNames)];
      if (uniqueAttrs.length >= 2) {
        return [{ kind: "mutualExcl", context, attrs: uniqueAttrs, app }];
      }
    }
  }

  // ---- 1.18 req when other: (@a and @b=v) or @b!=v ----
  // Single-value form: (@a and @b = v) or @b != v
  {
    const m = REQ_WHEN_OTHER_SIMPLE_RE.exec(test);
    if (m) {
      const reqAttr = m[1]!;
      const condAttr = m[2]!;
      const condValue = m[3] !== undefined ? m[3] : m[4]!;
      return [
        {
          kind: "reqWhenOther",
          context,
          requiredAttr: reqAttr,
          condAttr,
          condValues: [condValue],
          app,
        },
      ];
    }
  }

  // ---- 1.14/1.15 absent when: @a and (@b=v) or @a and @b!=v ----
  // Pattern: @a and @b = v  or  @a and @b != v  or  @a and @b (just absence)
  // Also: @a and @b (both must be absent — mutual absent)
  {
    const m = ABSENT_FORM_RE.exec(test);
    if (m) {
      const absentAttr = m[1]!;
      const condAttr = m[2]!;
      const op = m[3]!;
      const rawVal = m[4] !== undefined ? m[4] : m[5]!;

      // Collect all values from pattern like @b=v1 or @b=v2 or ...
      // or @b!=v1 and @b!=v2 and ...
      const valRe = new RegExp(
        `@${escapeRegex(condAttr)}\\s*${escapeRegex(op)}\\s*(?:'([^']*)'|([A-Za-z0-9._:@-]*))`,
        "g",
      );
      const values: string[] = [];
      for (const vm of test.matchAll(valRe)) {
        const v = vm[1] !== undefined ? vm[1] : vm[2]!;
        if (v !== "" && !values.includes(v)) values.push(v);
      }
      if (values.length === 0) values.push(rawVal);

      if (op === "=") {
        return [{ kind: "absentWhenEq", context, absentAttr, condAttr, condValues: values, app }];
      }
      return [{ kind: "absentWhenNeq", context, absentAttr, condAttr, condValues: values, app }];
    }

    // Simple: @a and @b (both must not coexist — but without = comparator, treat as mutual exclusion of 2 attrs)
    const simpleAndRe = /^@([A-Za-z:_][A-Za-z:_0-9]*)\s+and\s+@([A-Za-z:_][A-Za-z:_0-9]*)$/.exec(
      test.trim(),
    );
    if (simpleAndRe) {
      return [{ kind: "mutualExcl", context, attrs: [simpleAndRe[1]!, simpleAndRe[2]!], app }];
    }
  }

  // ---- 1.4 valid set: @attr = v1 or @attr = v2 ... ----
  // No functions, no document(), no !=, no conditions
  if (
    !test.includes("fn:") &&
    !test.includes("document(") &&
    !test.includes("(") &&
    !test.includes("!=")
  ) {
    const attrM = VALID_SET_ATTR_RE.exec(test);
    if (attrM) {
      const attrQname = attrM[1]!;
      const values: string[] = [];
      for (const vm of test.matchAll(VALID_SET_VALUE_RE)) {
        const v = vm[1] !== undefined ? vm[1] : vm[2]!;
        if (v !== attrQname && v !== "" && !values.includes(v)) values.push(v);
      }
      if (values.length > 0) {
        return [{ kind: "validSet", context, attrQname, values, app }];
      }
    }
  }

  // ---- 1.10 invalid set: @attr != v1 and @attr != v2 ... ----
  if (!test.includes("fn:") && !test.includes("document(") && !test.includes("(")) {
    const attrM = INVALID_SET_ATTR_RE.exec(test);
    if (attrM) {
      const attrQname = attrM[1]!;
      const values: string[] = [];
      for (const vm of test.matchAll(INVALID_SET_VALUE_RE)) {
        const v = vm[1] !== undefined ? vm[1] : vm[2]!;
        if (v !== attrQname && v !== "" && !values.includes(v)) values.push(v);
      }
      if (values.length > 0) {
        return [{ kind: "invalidSet", context, attrQname, values, app }];
      }
    }
  }

  // ---- 1.3 numeric range: @attr <= N / >= M ----
  // No function calls, no document, no attr-vs-attr
  if (
    !test.includes("count(") &&
    !test.includes("string-length(") &&
    !test.includes("document(") &&
    !test.includes("matches(") &&
    !test.includes("fn:") &&
    (test.includes("<=") || test.includes(">=") || test.includes("< ") || test.includes("> "))
  ) {
    const clauses = [...test.matchAll(NR_CLAUSE_RE)];
    if (clauses.length > 0) {
      const attrs = new Map<string, { min?: number; max?: number }>();
      for (const c of clauses) {
        const attr = c[1]!;
        const op = c[2]!;
        const val = Number(c[3]!);
        if (!attrs.has(attr)) attrs.set(attr, {});
        const entry = attrs.get(attr)!;
        if (op === ">=" || op === ">") {
          if (entry.min === undefined || val > entry.min) entry.min = val;
        } else {
          if (entry.max === undefined || val < entry.max) entry.max = val;
        }
      }
      const results: NumericRangeRule[] = [];
      for (const [attrQname, range] of attrs) {
        results.push({
          kind: "numericRange",
          context,
          attrQname,
          min: range.min,
          max: range.max,
          app,
        });
      }
      if (results.length > 0) return results;
    }
  }

  // ---- 1.19 attrValueCondition: (@a=v1 and @b=v2) or @b!=v2 (SDK: AttributeValueConditionToAnother) ----
  // Must have parentheses and contain both 'and' and 'or' with != operator
  if (
    test.includes("(") &&
    test.includes(" and ") &&
    test.includes(" or ") &&
    test.includes("!=")
  ) {
    const parsed = parseAttrValueCondition(test);
    if (parsed !== null) {
      return [
        {
          kind: "attrValueCondition",
          context,
          attrQname: parsed.attrQname,
          attrValues: parsed.attrValues,
          condAttr: parsed.condAttr,
          condValues: parsed.condValues,
          app,
        },
      ];
    }
  }

  // ---- Fallback: unsupported ----
  return [{ kind: "unsupported", context, test, app }];
}

// ---- Emit helpers ----
function opt(key: string, value: unknown): string {
  if (value === undefined || value === null) return "";
  return `, ${key}: ${JSON.stringify(value)}`;
}

function emitRule(r: CategorisedRule): string {
  switch (r.kind) {
    case "relationship":
      return `  { kind: "relationship", context: ${JSON.stringify(r.context)}, attrQname: ${JSON.stringify(r.attrQname)}${opt("requiredType", r.requiredType)}, app: ${JSON.stringify(r.app)} }`;
    case "uniqueness":
      return `  { kind: "uniqueness", context: ${JSON.stringify(r.context)}, scopePath: ${JSON.stringify(r.scopePath)}, attrQname: ${JSON.stringify(r.attrQname)}, app: ${JSON.stringify(r.app)} }`;
    case "stringLength":
      return `  { kind: "stringLength", context: ${JSON.stringify(r.context)}, attrQname: ${JSON.stringify(r.attrQname)}${opt("minLength", r.minLength)}${opt("maxLength", r.maxLength)}, app: ${JSON.stringify(r.app)} }`;
    case "numericRange":
      return `  { kind: "numericRange", context: ${JSON.stringify(r.context)}, attrQname: ${JSON.stringify(r.attrQname)}${opt("min", r.min)}${opt("max", r.max)}, app: ${JSON.stringify(r.app)} }`;
    case "validSet":
      return `  { kind: "validSet", context: ${JSON.stringify(r.context)}, attrQname: ${JSON.stringify(r.attrQname)}, values: ${JSON.stringify(r.values)}, app: ${JSON.stringify(r.app)} }`;
    case "invalidSet":
      return `  { kind: "invalidSet", context: ${JSON.stringify(r.context)}, attrQname: ${JSON.stringify(r.attrQname)}, values: ${JSON.stringify(r.values)}, app: ${JSON.stringify(r.app)} }`;
    case "absentWhenEq":
      return `  { kind: "absentWhenEq", context: ${JSON.stringify(r.context)}, absentAttr: ${JSON.stringify(r.absentAttr)}, condAttr: ${JSON.stringify(r.condAttr)}, condValues: ${JSON.stringify(r.condValues)}, app: ${JSON.stringify(r.app)} }`;
    case "absentWhenNeq":
      return `  { kind: "absentWhenNeq", context: ${JSON.stringify(r.context)}, absentAttr: ${JSON.stringify(r.absentAttr)}, condAttr: ${JSON.stringify(r.condAttr)}, condValues: ${JSON.stringify(r.condValues)}, app: ${JSON.stringify(r.app)} }`;
    case "mutualExcl":
      return `  { kind: "mutualExcl", context: ${JSON.stringify(r.context)}, attrs: ${JSON.stringify(r.attrs)}, app: ${JSON.stringify(r.app)} }`;
    case "attrVsAttr":
      return `  { kind: "attrVsAttr", context: ${JSON.stringify(r.context)}, attrA: ${JSON.stringify(r.attrA)}, attrB: ${JSON.stringify(r.attrB)}, canEqual: ${r.canEqual}, app: ${JSON.stringify(r.app)} }`;
    case "reqWhenOther":
      return `  { kind: "reqWhenOther", context: ${JSON.stringify(r.context)}, requiredAttr: ${JSON.stringify(r.requiredAttr)}, condAttr: ${JSON.stringify(r.condAttr)}, condValues: ${JSON.stringify(r.condValues)}, app: ${JSON.stringify(r.app)} }`;
    case "pattern":
      return `  { kind: "pattern", context: ${JSON.stringify(r.context)}, attrQname: ${JSON.stringify(r.attrQname)}, regex: ${JSON.stringify(r.regex)}, app: ${JSON.stringify(r.app)} }`;
    case "refExist":
      return `  { kind: "refExist", context: ${JSON.stringify(r.context)}, refAttr: ${JSON.stringify(r.refAttr)}, partRef: ${JSON.stringify(r.partRef)}, targetPath: ${JSON.stringify(r.targetPath)}, targetNs: ${JSON.stringify(r.targetNs)}, targetLocal: ${JSON.stringify(r.targetLocal)}, targetAttr: ${JSON.stringify(r.targetAttr)}, app: ${JSON.stringify(r.app)} }`;
    case "indexedRef":
      return `  { kind: "indexedRef", context: ${JSON.stringify(r.context)}, indexAttr: ${JSON.stringify(r.indexAttr)}, partRef: ${JSON.stringify(r.partRef)}, targetNs: ${JSON.stringify(r.targetNs)}, targetLocal: ${JSON.stringify(r.targetLocal)}, targetPath: ${JSON.stringify(r.targetPath)}, indexBase: ${r.indexBase}, app: ${JSON.stringify(r.app)} }`;
    case "attrPresent":
      return `  { kind: "attrPresent", context: ${JSON.stringify(r.context)}, attrQname: ${JSON.stringify(r.attrQname)}, app: ${JSON.stringify(r.app)} }`;
    case "attrValueCondition":
      return `  { kind: "attrValueCondition", context: ${JSON.stringify(r.context)}, attrQname: ${JSON.stringify(r.attrQname)}, attrValues: ${JSON.stringify(r.attrValues)}, condAttr: ${JSON.stringify(r.condAttr)}, condValues: ${JSON.stringify(r.condValues)}, app: ${JSON.stringify(r.app)} }`;
    case "unsupported":
      return `  { kind: "unsupported", context: ${JSON.stringify(r.context)}, test: ${JSON.stringify(r.test)}, app: ${JSON.stringify(r.app)} }`;
  }
}

// ---- Types header emitted to rules.ts ----
const TYPES_HEADER = `// THIS FILE IS GENERATED BY tools/schema-codegen/gen-schematron.ts. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schematrons.json
//
// Rule coverage summary (Epic-79 + Epic-84 + Epic-85 + Epic-90):
//   attrPresent        — @attr must not be omitted (AttributeCannotOmitConstraint) (1.1)
//   relationship       — relationship type/existence checks via r:id lookups (2.1/2.2)
//   uniqueness         — count(distinct-values(X)) = count(X) attribute uniqueness (2.3)
//   stringLength       — string-length(@attr) <= N / >= M constraints (1.12)
//   numericRange       — @attr <= N / >= M numeric range constraints (1.3)
//   validSet           — @attr must be in enumerated value set (1.4)
//   invalidSet         — @attr must NOT be in enumerated value set (1.10)
//   absentWhenEq       — attribute must be absent if another equals a value (1.14)
//   absentWhenNeq      — attribute must be absent if another does NOT equal a value (1.15)
//   mutualExcl         — at most one of a group of attributes may be present (1.16)
//   attrVsAttr         — value of one attribute must be <= (or <) another (1.17)
//   reqWhenOther       — attribute is required when another equals a value (1.18)
//   attrValueCondition — when @a=v1, @b must be in condValues (AttributeValueConditionToAnother) (1.19)
//   pattern            — attribute value must match a regular expression (1.2)
//   refExist           — Index-of(document('Part:X')//el/@attr, @ref) cross-part attr lookup (3.1)
//   indexedRef         — @attr < count(document('Part:X')//el) + N index-based existence (3.2)
//   unsupported        — rules requiring full package walk or unclassified patterns

export interface RelationshipRule {
  readonly kind: "relationship";
  readonly context: string;
  readonly attrQname: string;
  readonly requiredType?: string;
  readonly app: string;
}

export interface UniquenessRule {
  readonly kind: "uniqueness";
  readonly context: string;
  readonly scopePath: string;
  readonly attrQname: string;
  readonly app: string;
}

export interface StringLengthRule {
  readonly kind: "stringLength";
  readonly context: string;
  readonly attrQname: string;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly app: string;
}

export interface NumericRangeRule {
  readonly kind: "numericRange";
  readonly context: string;
  readonly attrQname: string;
  readonly min?: number;
  readonly max?: number;
  readonly app: string;
}

export interface ValidSetRule {
  readonly kind: "validSet";
  readonly context: string;
  readonly attrQname: string;
  readonly values: readonly string[];
  readonly app: string;
}

export interface InvalidSetRule {
  readonly kind: "invalidSet";
  readonly context: string;
  readonly attrQname: string;
  readonly values: readonly string[];
  readonly app: string;
}

export interface AbsentWhenEqRule {
  readonly kind: "absentWhenEq";
  readonly context: string;
  readonly absentAttr: string;
  readonly condAttr: string;
  readonly condValues: readonly string[];
  readonly app: string;
}

export interface AbsentWhenNeqRule {
  readonly kind: "absentWhenNeq";
  readonly context: string;
  readonly absentAttr: string;
  readonly condAttr: string;
  readonly condValues: readonly string[];
  readonly app: string;
}

export interface MutualExclRule {
  readonly kind: "mutualExcl";
  readonly context: string;
  readonly attrs: readonly string[];
  readonly app: string;
}

export interface AttrVsAttrRule {
  readonly kind: "attrVsAttr";
  readonly context: string;
  readonly attrA: string;
  readonly attrB: string;
  readonly canEqual: boolean;
  readonly app: string;
}

export interface ReqWhenOtherRule {
  readonly kind: "reqWhenOther";
  readonly context: string;
  readonly requiredAttr: string;
  readonly condAttr: string;
  readonly condValues: readonly string[];
  readonly app: string;
}

export interface PatternRule {
  readonly kind: "pattern";
  readonly context: string;
  readonly attrQname: string;
  readonly regex: string;
  readonly app: string;
}

export interface UnsupportedRule {
  readonly kind: "unsupported";
  readonly context: string;
  readonly test: string;
  readonly app: string;
}

export interface AttrPresentRule {
  readonly kind: "attrPresent";
  readonly context: string;
  readonly attrQname: string;
  readonly app: string;
}

export interface AttrValueConditionRule {
  readonly kind: "attrValueCondition";
  readonly context: string;
  readonly attrQname: string;
  readonly attrValues: readonly string[];
  readonly condAttr: string;
  readonly condValues: readonly string[];
  readonly app: string;
}

export interface RefExistRule {
  readonly kind: "refExist";
  readonly context: string;
  readonly refAttr: string;
  readonly partRef: string;
  readonly targetPath: string;
  readonly targetNs: string;
  readonly targetLocal: string;
  readonly targetAttr: string;
  readonly app: string;
}

export interface IndexedRefRule {
  readonly kind: "indexedRef";
  readonly context: string;
  readonly indexAttr: string;
  readonly partRef: string;
  readonly targetNs: string;
  readonly targetLocal: string;
  readonly targetPath: string;
  readonly indexBase: number;
  readonly app: string;
}

export type SchematronRule =
  | RelationshipRule
  | UniquenessRule
  | StringLengthRule
  | NumericRangeRule
  | ValidSetRule
  | InvalidSetRule
  | AbsentWhenEqRule
  | AbsentWhenNeqRule
  | MutualExclRule
  | AttrVsAttrRule
  | ReqWhenOtherRule
  | PatternRule
  | RefExistRule
  | IndexedRefRule
  | AttrPresentRule
  | AttrValueConditionRule
  | UnsupportedRule;

`;

async function main(): Promise<void> {
  const raw = JSON.parse(await readFile(SOURCE_PATH, "utf-8")) as SchematronEntry[];
  process.stdout.write(`Read ${raw.length} schematron rules\n`);

  const allRules: CategorisedRule[] = [];
  for (const r of raw) {
    allRules.push(...categorise(r));
  }

  // Count by kind
  const counts: Record<string, number> = {};
  for (const r of allRules) {
    counts[r.kind] = (counts[r.kind] ?? 0) + 1;
  }
  process.stdout.write(`Expanded to ${allRules.length} rules:\n`);
  for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    process.stdout.write(`  ${k}: ${v}\n`);
  }

  // Sort for determinism: by kind order, then context
  const kindOrder = [
    "relationship",
    "uniqueness",
    "stringLength",
    "numericRange",
    "validSet",
    "invalidSet",
    "absentWhenEq",
    "absentWhenNeq",
    "mutualExcl",
    "attrVsAttr",
    "reqWhenOther",
    "pattern",
    "refExist",
    "indexedRef",
    "attrPresent",
    "attrValueCondition",
    "unsupported",
  ];
  allRules.sort((a, b) => {
    const ki = kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind);
    if (ki !== 0) return ki;
    return a.context.localeCompare(b.context);
  });

  await mkdir(resolve(REPO_ROOT, "src/validation/schematron"), { recursive: true });

  const lines = [TYPES_HEADER, "export const SCHEMATRON_RULES: ReadonlyArray<SchematronRule> = ["];
  for (const r of allRules) {
    lines.push(`${emitRule(r)},`);
  }
  lines.push("];");
  lines.push("");

  const supportedKinds = new Set([
    "relationship",
    "uniqueness",
    "stringLength",
    "numericRange",
    "validSet",
    "invalidSet",
    "absentWhenEq",
    "absentWhenNeq",
    "mutualExcl",
    "attrVsAttr",
    "reqWhenOther",
    "pattern",
    "refExist",
    "indexedRef",
    "attrPresent",
    "attrValueCondition",
  ]);
  const supportedCount = allRules.filter((r) => supportedKinds.has(r.kind)).length;
  const unsupportedCount = allRules.filter((r) => r.kind === "unsupported").length;

  lines.push("/** Total rules in schematrons.json (original, before expansion). */");
  lines.push(`export const SCHEMATRON_SOURCE_COUNT = ${raw.length};`);
  lines.push("/** Rules with recognised patterns (coverable by this evaluator). */");
  lines.push(`export const SCHEMATRON_COVERED_COUNT = ${supportedCount};`);
  lines.push("/** Rules skipped (require full XPath / cross-Part resolution). */");
  lines.push(`export const SCHEMATRON_SKIPPED_COUNT = ${unsupportedCount};`);
  lines.push("");

  await writeFile(OUTPUT_PATH, lines.join("\n"));
  process.stdout.write(`Written to ${OUTPUT_PATH}\n`);
  process.stdout.write(
    `Covered: ${supportedCount}, Skipped: ${unsupportedCount} (of ${raw.length} source rules, ${allRules.length} expanded)\n`,
  );
}

main().catch((err) => {
  process.stderr.write(`gen-schematron failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
