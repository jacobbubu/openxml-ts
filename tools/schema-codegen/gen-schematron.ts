#!/usr/bin/env -S bun run
/**
 * Schematron rule codegen for Epic-79 OpenXmlValidator Phase 2.
 *
 * Reads /Users/rongshen/github/Open-XML-SDK/data/schematrons.json (948 rules)
 * and categorises each rule into one of four handler kinds:
 *
 *   relationship  — document(rels)//r:Relationship[@Id = current()/@attr]/@Type = 'url'
 *                   document(rels)//r:Relationship[@Id = current()/@attr]   (existence)
 *   uniqueness    — count(distinct-values(PATH/@attr)) = count(PATH/@attr)
 *   stringLength  — string-length(@attr) <= N  /  >= M and <= N
 *   numericRange  — @attr <= N  /  >= M  (simple constant comparisons)
 *   unsupported   — everything else (cross-Part XPath, matches(), attr-vs-attr, etc.)
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
interface SchematronRule {
  readonly Context: string; // e.g. "w:control" or "x:sheet"
  readonly Test: string; // XPath expression
  readonly App: string; // "All" | "Word" | "Excel" | ...
}

// ---- Output rule kinds ----
export interface RelationshipRule {
  readonly kind: "relationship";
  readonly context: string;
  readonly attrQname: string; // e.g. "w:id", "r:id"
  readonly requiredType: string | undefined; // undefined = existence-only check
  readonly app: string;
}

export interface UniquenessRule {
  readonly kind: "uniqueness";
  readonly context: string;
  /**
   * XPath-like scope path, e.g. "//w:endnotes/w:endnote" or "ancestor::x:cellWatches//x:cellWatch"
   * The final /@attr is stripped and stored in attrQname.
   */
  readonly scopePath: string;
  readonly attrQname: string; // e.g. "@w:id"
  readonly app: string;
}

export interface StringLengthRule {
  readonly kind: "stringLength";
  readonly context: string;
  readonly attrQname: string; // e.g. "x:userName"
  readonly minLength: number | undefined;
  readonly maxLength: number | undefined;
  readonly app: string;
}

export interface NumericRangeRule {
  readonly kind: "numericRange";
  readonly context: string;
  readonly attrQname: string; // e.g. "x:windowWidth"
  readonly min: number | undefined;
  readonly max: number | undefined;
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
  | UnsupportedRule;

// ---- Regex patterns ----

// Relationship type check: document(rels)//r:Relationship[@Id = current()/@attr]/@Type = 'url'
const REL_TYPE_RE =
  /document\(rels\)\/\/r:Relationship\[@Id = current\(\)\/@([^\]]+)\]\/@Type = '([^']+)'/;
// Relationship existence check: document(rels)//r:Relationship[@Id = current()/@attr]
const REL_EXIST_RE = /document\(rels\)\/\/r:Relationship\[@Id = current\(\)\/@([^\]]+)\]\s*$/;

// Uniqueness: count(distinct-values(PATH)) = count(PATH)
// PATH ends in /@attr
const UNIQUENESS_RE = /count\(distinct-values\(([^)]+)\)\)\s*=\s*count\(([^)]+)\)/;

// String-length: string-length(@attr) <= N or >= M
const SL_ATTR_RE = /string-length\(@([^)]+)\)/g;
const SL_MAX_RE = /string-length\(@[^)]+\)\s*<=\s*(\d+)/;
const SL_MIN_RE = /string-length\(@[^)]+\)\s*>=\s*(\d+)/;

// Numeric range: @attr >= N and @attr <= M  (may appear multiple times)
const NR_CLAUSE_RE = /@([A-Za-z:_][A-Za-z:_0-9]*)\s*([<>]=?)\s*(-?\d+(?:\.\d+)?)/g;

function categorise(rule: SchematronRule): CategorisedRule {
  const { Context: context, Test: test, App: app } = rule;

  // 1. Relationship type check
  const relTypeMatch = REL_TYPE_RE.exec(test);
  if (relTypeMatch) {
    return {
      kind: "relationship",
      context,
      attrQname: relTypeMatch[1],
      requiredType: relTypeMatch[2],
      app,
    };
  }

  // 2. Relationship existence check
  if (test.includes("document(rels)")) {
    const relExistMatch = REL_EXIST_RE.exec(test);
    if (relExistMatch) {
      return {
        kind: "relationship",
        context,
        attrQname: relExistMatch[1],
        requiredType: undefined,
        app,
      };
    }
  }

  // 3. Uniqueness (count distinct-values)
  const dvMatch = UNIQUENESS_RE.exec(test);
  if (dvMatch) {
    const lhs = dvMatch[1].trim();
    // lhs is like "//prefix:elem/@attr" or "ancestor::X//elem/@attr"
    // Split on last / to get scope path and attr
    const lastSlash = lhs.lastIndexOf("/");
    if (lastSlash !== -1) {
      const scopePath = lhs.slice(0, lastSlash);
      const attrQname = lhs.slice(lastSlash + 1); // includes the @
      // Only handle if attrQname starts with @ and has no inner expressions
      if (attrQname.startsWith("@") && !attrQname.includes("(")) {
        return { kind: "uniqueness", context, scopePath, attrQname, app };
      }
    }
  }

  // 4. String-length constraints
  // Check string-length without count() or document() in the test
  if (
    test.includes("string-length(") &&
    !test.includes("count(") &&
    !test.includes("document(")
  ) {
    // Extract the attribute name(s)
    const attrMatches = [...test.matchAll(SL_ATTR_RE)];
    if (attrMatches.length > 0) {
      // Take the first attribute (most rules use one attr; multi-attr handled per-attr)
      // For rules with multiple attrs (like "string-length(@a) >= 1 and string-length(@b) <= 54")
      // we emit one rule per attribute.
      const results: StringLengthRule[] = [];
      const seenAttrs = new Set<string>();

      for (const am of attrMatches) {
        const attrQname = am[1];
        if (seenAttrs.has(attrQname)) continue;
        seenAttrs.add(attrQname);

        // Extract min/max for this specific attr
        const attrSpecific = new RegExp(
          `string-length\\(@${escapeRegex(attrQname)}\\)\\s*(<=|>=)\\s*(\\d+)`,
          "g",
        );
        let minLength: number | undefined;
        let maxLength: number | undefined;

        for (const m of test.matchAll(attrSpecific)) {
          const op = m[1];
          const val = Number(m[2]);
          if (op === ">=") minLength = val;
          else if (op === "<=") maxLength = val;
        }

        results.push({ kind: "stringLength", context, attrQname, minLength, maxLength, app });
      }

      if (results.length === 1) return results[0];
      // Multiple attrs: return first as representative — caller iterates all rules so duplicates don't matter.
      // Actually emit all as separate rules in the output array is handled in the loop below.
      // For now return the first; the loop handles multi-attr by emitting duplicate rules.
      // Actually we want them all emitted — see main loop below.
      if (results.length > 0) {
        // We'll return a sentinel object that carries multiple — not ideal.
        // Better: just return the first one. The generator loop handles multi-attr by
        // checking all attrs in the test, not just one. But since we generate individual
        // rules per element-attr pair, returning one is fine; the generator will emit one per.
        return results[0];
      }
    }
  }

  // 5. Numeric range (simple @attr <= N / >= M / < N / > M, no count/string-length/document)
  if (
    !test.includes("count(") &&
    !test.includes("string-length(") &&
    !test.includes("document(") &&
    !test.includes("matches(") &&
    (test.includes("<=") || test.includes(">=") || test.includes("< ") || test.includes("> "))
  ) {
    const clauses = [...test.matchAll(NR_CLAUSE_RE)];
    if (clauses.length > 0) {
      // Group by attr name
      const attrs = new Map<string, { min?: number; max?: number }>();
      for (const c of clauses) {
        const attr = c[1];
        const op = c[2];
        const val = Number(c[3]);
        if (!attrs.has(attr)) attrs.set(attr, {});
        const entry = attrs.get(attr)!;
        if (op === ">=" || op === ">") entry.min = entry.min === undefined ? val : Math.min(entry.min, val);
        else if (op === "<=" || op === "<") entry.max = entry.max === undefined ? val : Math.max(entry.max, val);
      }

      // Return first attr's rule (generator handles multi-attr similarly)
      const [firstAttr, firstRange] = attrs.entries().next().value as [
        string,
        { min?: number; max?: number },
      ];
      return {
        kind: "numericRange",
        context,
        attrQname: firstAttr,
        min: firstRange.min,
        max: firstRange.max,
        app,
      };
    }
  }

  return { kind: "unsupported", context, test, app };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---- Multi-rule expansion ----
// Some rules have multiple attrs (e.g. two string-length clauses for different attrs).
// Expand them into one CategorisedRule per attr.
function expandRule(rule: SchematronRule): CategorisedRule[] {
  const { Context: context, Test: test, App: app } = rule;

  // String-length: may have multiple attrs
  if (
    test.includes("string-length(") &&
    !test.includes("count(") &&
    !test.includes("document(")
  ) {
    const attrMatches = [...test.matchAll(/string-length\(@([^)]+)\)/g)];
    const seenAttrs = new Set<string>();
    const results: StringLengthRule[] = [];
    for (const am of attrMatches) {
      const attrQname = am[1];
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

  // Numeric range: may have multiple attrs
  if (
    !test.includes("count(") &&
    !test.includes("string-length(") &&
    !test.includes("document(") &&
    !test.includes("matches(") &&
    (test.includes("<=") || test.includes(">=") || test.includes("< ") || test.includes("> "))
  ) {
    const clauses = [...test.matchAll(/@([A-Za-z:_][A-Za-z:_0-9]*)\s*([<>]=?)\s*(-?\d+(?:\.\d+)?)/g)];
    if (clauses.length > 0) {
      const attrs = new Map<string, { min?: number; max?: number }>();
      for (const c of clauses) {
        const attr = c[1];
        const op = c[2];
        const val = Number(c[3]);
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
      return results;
    }
  }

  // Everything else — single rule
  return [categorise(rule)];
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
    case "unsupported":
      return `  { kind: "unsupported", context: ${JSON.stringify(r.context)}, test: ${JSON.stringify(r.test)}, app: ${JSON.stringify(r.app)} }`;
  }
}

// ---- Types emitted to rules.ts ----
const TYPES_HEADER = `// THIS FILE IS GENERATED BY tools/schema-codegen/gen-schematron.ts. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schematrons.json
//
// Rule coverage summary:
//   relationship  — relationship type/existence checks via r:id lookups
//   uniqueness    — count(distinct-values(X)) = count(X) attribute uniqueness
//   stringLength  — string-length(@attr) <= N / >= M constraints
//   numericRange  — @attr <= N / >= M numeric range constraints
//   unsupported   — rules requiring full XPath engine (cross-Part refs, regex, attr-vs-attr)

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
  | UnsupportedRule;

`;

async function main(): Promise<void> {
  const raw = JSON.parse(await readFile(SOURCE_PATH, "utf-8")) as SchematronRule[];
  process.stdout.write(`Read ${raw.length} schematron rules\n`);

  const allRules: CategorisedRule[] = [];
  for (const r of raw) {
    allRules.push(...expandRule(r));
  }

  // Count by kind
  const counts: Record<string, number> = {};
  for (const r of allRules) {
    counts[r.kind] = (counts[r.kind] ?? 0) + 1;
  }
  process.stdout.write(`Expanded to ${allRules.length} rules:\n`);
  for (const [k, v] of Object.entries(counts)) {
    process.stdout.write(`  ${k}: ${v}\n`);
  }

  // Sort for determinism: by kind, then context, then stable attributes
  const kindOrder = ["relationship", "uniqueness", "stringLength", "numericRange", "unsupported"];
  allRules.sort((a, b) => {
    const ki = kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind);
    if (ki !== 0) return ki;
    return a.context.localeCompare(b.context);
  });

  await mkdir(resolve(REPO_ROOT, "src/validation/schematron"), { recursive: true });

  const lines = [
    TYPES_HEADER,
    `export const SCHEMATRON_RULES: ReadonlyArray<SchematronRule> = [`,
  ];

  for (const r of allRules) {
    lines.push(emitRule(r) + ",");
  }
  lines.push("];");
  lines.push("");

  // Emit summary constants for test assertions
  const supportedKinds = ["relationship", "uniqueness", "stringLength", "numericRange"] as const;
  const supportedCount = allRules.filter((r) => r.kind !== "unsupported").length;
  const unsupportedCount = allRules.filter((r) => r.kind === "unsupported").length;

  lines.push(`/** Total rules in schematrons.json (original, before expansion). */`);
  lines.push(`export const SCHEMATRON_SOURCE_COUNT = ${raw.length};`);
  lines.push(`/** Rules with recognised patterns (coverable by this evaluator). */`);
  lines.push(`export const SCHEMATRON_COVERED_COUNT = ${supportedCount};`);
  lines.push(`/** Rules skipped (require full XPath / cross-Part resolution). */`);
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
