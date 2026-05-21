#!/usr/bin/env -S bun run
/**
 * Schematron rule codegen — Epic-79 Phase 2 + Epic-84 extended categories.
 *
 * Reads /Users/rongshen/github/Open-XML-SDK/data/schematrons.json (948 rules)
 * and categorises each rule into one of the SDK's 18 semantic categories.
 *
 * Supported categories (faithful port of SDK's Validation/Semantic/*.cs):
 *   1.2  pattern       — matches(@attr, regex)
 *   1.3  numericRange  — @attr <= N / >= M (constant compare)
 *   1.4  validSet      — @attr = v1 or @attr = v2 ... (must be in set)
 *   1.10 invalidSet    — @attr != v1 and @attr != v2 ... (must not be in set)
 *   1.12 stringLength  — string-length(@attr) <= N / >= M
 *   1.14 absentWhenEq  — @a and (@b=v1 or @b=v2) → error if a present and b equals a value
 *   1.15 absentWhenNeq — @a and @b!=v → error if a present and b NOT one of values
 *   1.16 mutualExcl    — (@a and @b) or ... → error if ≥2 attrs present
 *   1.17 attrVsAttr    — @a < @b / @a <= @b → error if not satisfied
 *   1.18 reqWhenOther  — (@a and @b=v) or @b!=v → error if a absent and b=v
 *   2.2  relType       — document(rels)//.../@Type = 'url' (relationship type check)
 *   2.1  relExist      — document(rels)//... (relationship existence check) → covered by relType handler
 *   2.3  uniqueness    — count(distinct-values(...)) = count(...) (in-part uniqueness)
 *
 * Skipped safely (no false positives):
 *   3.1/3.2/3.3  — cross-Part reference checks (need part resolver)
 *   1.1          — @attr alone (typed attrs not in extendedAttributes; cannot check without typed access)
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
  | UnsupportedRule;

// ---- Pattern matchers ----

// 2.2 rel type: document(rels)//r:Relationship[@Id = current()/@attr]/@Type = 'url'
const REL_TYPE_RE =
  /document\(rels\)\/\/r:Relationship\[@Id = current\(\)\/@([^\]]+)\]\/@Type = '([^']+)'/;

// 2.1 rel existence: document(rels)//r:Relationship[@Id = current()/@attr]
const REL_EXIST_RE = /document\(rels\)\/\/r:Relationship\[@Id = current\(\)\/@([^\]]+)\]\s*$/;

// 2.3 uniqueness: count(distinct-values(PATH/@attr)) = count(PATH/@attr)
const UNIQUENESS_RE = /count\(distinct-values\(([^)]+)\)\)\s*=\s*count\(([^)]+)\)/;

// 1.2 pattern: matches(@attr, 'regex') or fn:matches(@attr, 'regex')
// We use a simpler regex extractor - the full test is like: matches(@w:val, ".{1}")
const PATTERN_MAIN_RE =
  /^(?:fn:)?matches\(@([A-Za-z:_][A-Za-z:_0-9]*),\s*['"](.*)['"](?:,\s*'[^']*')?\)$/;

// 1.12 string-length attributes extractor
const SL_ATTR_RE = /string-length\(@([^)]+)\)/g;

// 1.3 numeric range
const NR_CLAUSE_RE = /@([A-Za-z:_][A-Za-z:_0-9]*)\s*([<>]=?)\s*(-?\d+(?:\.\d+)?(?:[Ee][+-]?\d+)?)/g;

// 1.4 valid set: @attr = v1 or @attr = v2 ...
// First extract attr then extract values
const VALID_SET_ATTR_RE = /^@([A-Za-z:_][A-Za-z:_0-9]*)\s*=/;
const VALID_SET_VALUE_RE = /=\s*(?:'([^']*)'|([A-Za-z0-9._:@-]*))/g;

// 1.10 invalid set: @attr != v1 and @attr != v2 ...
const INVALID_SET_ATTR_RE = /^@([A-Za-z:_][A-Za-z:_0-9]*)\s*!=/;
const INVALID_SET_VALUE_RE = /!=\s*(?:'([^']*)'|([A-Za-z0-9._:@-]*))/g;

// 1.14/1.15: @a and @b=v / @a and @b!=v
// Form: @a and @b = v1  or  @a and (@b=v1 or @b=v2)  or  @a and @b != v1
const ABSENT_FORM_RE =
  /^@([A-Za-z:_][A-Za-z:_0-9]*)\s+and\s+\(?@([A-Za-z:_][A-Za-z:_0-9]*)\s*(!=|=)\s*(?:'([^']*)'|([A-Za-z0-9._:@-]*))/;

// 1.16 mutual exclusive: (@a and @b) or (@a and @c) ...
// All @attr names in the test
const MUTUAL_EXCL_ATTRS_RE = /@([A-Za-z:_][A-Za-z:_0-9]*)/g;

// 1.17 attr vs attr: @a < @b or @a <= @b
const ATTR_VS_ATTR_RE = /^@([A-Za-z:_][A-Za-z:_0-9]*)\s*(<=|<|>=|>)\s*@([A-Za-z:_][A-Za-z:_0-9]*)$/;

// 1.18 req when other: (@a and @b=v) or @b!=v
// Form: (@a and @b=v) or @b!=v  or  (@a and (@b=v1 or @b=v2)) or (@b!=v1 and @b!=v2)
// Simple single-value form only
const REQ_WHEN_OTHER_SIMPLE_RE =
  /^\(\s*@([A-Za-z:_][A-Za-z:_0-9]*)\s+and\s+@([A-Za-z:_][A-Za-z:_0-9]*)\s*=\s*(?:'([^']*)'|([A-Za-z0-9._:-]*))\s*\)\s+or\s+@[A-Za-z:_][A-Za-z:_0-9]*\s*!=\s*(?:'[^']*'|[A-Za-z0-9._:-]*)$/;

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---- Category detector ----

function categorise(rule: SchematronEntry): CategorisedRule[] {
  const { Context: context, Test: test, App: app } = rule;

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

  // ---- 3.1/3.2/3.3 cross-part — skip safely ----
  if (
    test.includes("fn:document") ||
    (test.includes("document(") && !test.includes("document(rels)"))
  ) {
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
    case "unsupported":
      return `  { kind: "unsupported", context: ${JSON.stringify(r.context)}, test: ${JSON.stringify(r.test)}, app: ${JSON.stringify(r.app)} }`;
  }
}

// ---- Types header emitted to rules.ts ----
const TYPES_HEADER = `// THIS FILE IS GENERATED BY tools/schema-codegen/gen-schematron.ts. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schematrons.json
//
// Rule coverage summary (Epic-79 + Epic-84):
//   relationship  — relationship type/existence checks via r:id lookups (2.1/2.2)
//   uniqueness    — count(distinct-values(X)) = count(X) attribute uniqueness (2.3)
//   stringLength  — string-length(@attr) <= N / >= M constraints (1.12)
//   numericRange  — @attr <= N / >= M numeric range constraints (1.3)
//   validSet      — @attr must be in enumerated value set (1.4)
//   invalidSet    — @attr must NOT be in enumerated value set (1.10)
//   absentWhenEq  — attribute must be absent if another equals a value (1.14)
//   absentWhenNeq — attribute must be absent if another does NOT equal a value (1.15)
//   mutualExcl    — at most one of a group of attributes may be present (1.16)
//   attrVsAttr    — value of one attribute must be <= (or <) another (1.17)
//   reqWhenOther  — attribute is required when another equals a value (1.18)
//   pattern       — attribute value must match a regular expression (1.2)
//   unsupported   — rules requiring cross-Part refs or unclassified patterns

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
