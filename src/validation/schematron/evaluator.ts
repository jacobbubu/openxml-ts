/**
 * Schematron semantic rule evaluator — Epic-79 Phase 2.
 *
 * Evaluates the four supported rule kinds against an element tree:
 *   - relationship  : checks r:id (or similar) attr against the part's IRelationshipCollection
 *   - uniqueness    : count(distinct-values(PATH/@attr)) = count(PATH/@attr) uniqueness in scope
 *   - stringLength  : string-length(@attr) <= N / >= M
 *   - numericRange  : @attr <= N / >= M
 *
 * The evaluator NEVER throws; all errors are collected into a ValidationError[].
 */

import type { OpenXmlElement } from "../../element/element.js";
import { OpenXmlCompositeElement } from "../../element/element.js";
import type { IRelationshipCollection } from "../../packaging/interfaces/relationship.js";
import type { ValidationError } from "../ValidationError.js";
import type {
  NumericRangeRule,
  RelationshipRule,
  SchematronRule,
  StringLengthRule,
  UniquenessRule,
} from "./rules.js";

// ---- Prefix→namespace resolution ----
// Must match the same PREFIX_TO_URI table used in gen-constraints.ts (from schematron Context prefixes).
const PREFIX_TO_URI: Readonly<Record<string, string>> = {
  w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  a: "http://schemas.openxmlformats.org/drawingml/2006/main",
  p: "http://schemas.openxmlformats.org/presentationml/2006/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
  wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
  pic: "http://schemas.openxmlformats.org/drawingml/2006/picture",
  x: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  v: "urn:schemas-microsoft-com:vml",
  o: "urn:schemas-microsoft-com:office:office",
  xvml: "urn:schemas-microsoft-com:office:excel",
  w10: "urn:schemas-microsoft-com:office:word",
  pvml: "urn:schemas-microsoft-com:office:powerpoint",
  m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
  w14: "http://schemas.microsoft.com/office/word/2010/wordml",
  w15: "http://schemas.microsoft.com/office/word/2012/wordml",
  c: "http://schemas.openxmlformats.org/drawingml/2006/chart",
  xdr: "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
  cdr: "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing",
  ap: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  op: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  b: "http://schemas.openxmlformats.org/officeDocument/2006/bibliography",
  ds: "http://schemas.openxmlformats.org/officeDocument/2006/customXml",
  sl: "http://schemas.openxmlformats.org/schemaLibrary/2006/main",
  lc: "http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas",
  comp: "http://schemas.openxmlformats.org/drawingml/2006/compatibility",
  dgm: "http://schemas.openxmlformats.org/drawingml/2006/diagram",
  cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
  x14: "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main",
  x15: "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main",
  p14: "http://schemas.microsoft.com/office/powerpoint/2010/main",
  a14: "http://schemas.microsoft.com/office/drawing/2010/main",
  wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
  wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
  wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
  wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
  wetp: "http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11",
};

/** Resolve a prefixed qname ("w:id", "r:embed", "id") to { ns, local }. */
function resolveQname(qname: string): { ns: string; local: string } {
  const colon = qname.indexOf(":");
  if (colon === -1) return { ns: "", local: qname };
  const prefix = qname.slice(0, colon);
  const local = qname.slice(colon + 1);
  return { ns: PREFIX_TO_URI[prefix] ?? "", local };
}

/** Parse schematron Context like "w:paragraph" into { ns, local }. */
function parseContext(context: string): { ns: string; local: string } {
  return resolveQname(context);
}

/** Match element against context (ns+local). */
function elementMatchesContext(el: OpenXmlElement, ns: string, local: string): boolean {
  return el.localName === local && el.namespaceUri === ns;
}

// ---- Attribute access ----

/**
 * Get a string attribute value from an element.
 * Tries both the prefixed form (e.g. "w:id") and the local-only form via extendedAttributes.
 * Also checks namespaced lookups.
 */
function getAttr(el: OpenXmlElement, attrQname: string): string | undefined {
  const { ns, local } = resolveQname(attrQname);
  const colon = attrQname.indexOf(":");

  // Try exact key "prefix:local" as stored in extendedAttributes
  if (el.extendedAttributes.has(attrQname)) {
    return el.extendedAttributes.get(attrQname);
  }

  // Try local only (no-prefix attributes like "id")
  if (colon === -1 && el.extendedAttributes.has(local)) {
    return el.extendedAttributes.get(local);
  }

  // Try all keys to find one whose local part and namespace match
  for (const [key, value] of el.extendedAttributes) {
    const { ns: kNs, local: kLocal } = resolveQname(key);
    if (kLocal === local && (ns === "" || kNs === ns)) {
      return value;
    }
  }

  return undefined;
}

// ---- Tree traversal ----

/** Collect all descendants of `root` that match ns:local (including root itself). */
function collectByTag(root: OpenXmlElement, ns: string, local: string): OpenXmlElement[] {
  const results: OpenXmlElement[] = [];
  visitAll(root, (el) => {
    if (elementMatchesContext(el, ns, local)) results.push(el);
  });
  return results;
}

function visitAll(el: OpenXmlElement, visitor: (e: OpenXmlElement) => void): void {
  visitor(el);
  if (el instanceof OpenXmlCompositeElement) {
    for (const child of el.children) {
      visitAll(child, visitor);
    }
  }
}

// ---- Scope path parser ----
// Parses XPath-like scope paths from uniqueness rules.
// Supported forms:
//   //prefix:elem                   — global search from root
//   //prefix:parent/prefix:elem     — global search within parent
//   ancestor::prefix:ancestor//prefix:elem  — scoped (treated as global search — conservative but safe)
//
// Returns a list of (ns, local) steps to walk: the FINAL step is the element to find.
// We simplify: collect all elements matching the LAST component anywhere in the tree.
interface PathStep {
  readonly ns: string;
  readonly local: string;
}

function parseScopePath(scopePath: string): PathStep[] | null {
  // Strip leading // or ancestor:: prefixes and split on /
  let s = scopePath.trim();

  // Remove ancestor::X// prefix (treat as global)
  s = s.replace(/^ancestor::[^/]+\/\//, "//");
  // Remove ancestor::X/ prefix
  s = s.replace(/^ancestor::[^/]+\//, "//");

  if (!s.startsWith("//")) return null;
  s = s.slice(2);

  // Split remaining on /
  const parts = s.split("/").filter((p) => p.length > 0);
  const steps: PathStep[] = [];
  for (const part of parts) {
    const { ns, local } = resolveQname(part);
    steps.push({ ns, local });
  }
  return steps.length > 0 ? steps : null;
}

// ---- Error builder ----

function makeSemanticError(
  id: string,
  description: string,
  node: OpenXmlElement,
  path: string,
  partUri: string | undefined,
): ValidationError {
  const base = {
    id,
    description,
    errorType: "Semantic" as const,
    node,
    path,
  };
  if (partUri !== undefined) return { ...base, partUri };
  return base;
}

// ---- Path helper (mirrors the one in OpenXmlValidator) ----
function makePath(el: OpenXmlElement): string {
  return `/${el.localName}[0]`;
}

// ---- Handler implementations ----

function handleRelationship(
  rule: RelationshipRule,
  el: OpenXmlElement,
  rels: IRelationshipCollection | undefined,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  if (rels === undefined) return; // cannot check without relationships

  const idValue = getAttr(el, rule.attrQname);
  if (idValue === undefined) return; // attribute absent — not this rule's job to flag

  let rel: ReturnType<IRelationshipCollection["get"]> | undefined;
  try {
    if (!rels.has(idValue)) {
      // The id doesn't exist in the relationships
      errors.push(
        makeSemanticError(
          "Sch_SemanticRelationshipMissing",
          `Element <${el.qualifiedName}> attribute '${rule.attrQname}' = '${idValue}': no relationship with this id found in the part.`,
          el,
          path,
          partUri,
        ),
      );
      return;
    }
    rel = rels.get(idValue);
  } catch {
    return; // rels.get can throw; treat as cannot check
  }

  if (rel === undefined) return;

  if (rule.requiredType !== undefined && rel.type !== rule.requiredType) {
    errors.push(
      makeSemanticError(
        "Sch_SemanticRelationshipType",
        `Element <${el.qualifiedName}> attribute '${rule.attrQname}' = '${idValue}': relationship type '${rel.type}' does not match expected '${rule.requiredType}'.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

function handleUniqueness(
  rule: UniquenessRule,
  docRoot: OpenXmlElement,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  // Parse the scope path to find the target element
  // scopePath: e.g. "//w:endnotes/w:endnote"  attrQname: "@w:id"
  const steps = parseScopePath(rule.scopePath);
  if (steps === null || steps.length === 0) return;

  // The LAST step is the target element. We collect all elements matching the last step in the tree.
  // This is a conservative interpretation of the XPath (ignores intermediate path constraints)
  // which is safe for correctness: false positives not false negatives.
  const lastStep = steps[steps.length - 1] as PathStep;

  // Strip leading @ from attrQname
  const attrRaw = rule.attrQname.startsWith("@") ? rule.attrQname.slice(1) : rule.attrQname;

  const elems = collectByTag(docRoot, lastStep.ns, lastStep.local);
  if (elems.length === 0) return;

  const seen = new Map<string, OpenXmlElement>();
  for (const elem of elems) {
    const val = getAttr(elem, attrRaw);
    if (val === undefined) continue;
    if (seen.has(val)) {
      errors.push(
        makeSemanticError(
          "Sch_SemanticUniquenessViolation",
          `Duplicate value '${val}' for attribute '${attrRaw}' on <${elem.qualifiedName}> — violates uniqueness constraint (count(distinct-values) rule for context '${rule.context}').`,
          elem,
          makePath(elem),
          partUri,
        ),
      );
    } else {
      seen.set(val, elem);
    }
  }
}

function handleStringLength(
  rule: StringLengthRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  const val = getAttr(el, rule.attrQname);
  if (val === undefined) return;

  if (rule.minLength !== undefined && val.length < rule.minLength) {
    errors.push(
      makeSemanticError(
        "Sch_SemanticStringLengthMin",
        `Element <${el.qualifiedName}> attribute '${rule.attrQname}': string length ${val.length} is less than minimum ${rule.minLength}.`,
        el,
        path,
        partUri,
      ),
    );
  }
  if (rule.maxLength !== undefined && val.length > rule.maxLength) {
    errors.push(
      makeSemanticError(
        "Sch_SemanticStringLengthMax",
        `Element <${el.qualifiedName}> attribute '${rule.attrQname}': string length ${val.length} exceeds maximum ${rule.maxLength}.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

function handleNumericRange(
  rule: NumericRangeRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  const val = getAttr(el, rule.attrQname);
  if (val === undefined) return;

  const num = Number(val);
  if (Number.isNaN(num)) return; // non-numeric attribute value — skip

  if (rule.min !== undefined && num < rule.min) {
    errors.push(
      makeSemanticError(
        "Sch_SemanticNumericRangeMin",
        `Element <${el.qualifiedName}> attribute '${rule.attrQname}': value ${num} is less than minimum ${rule.min}.`,
        el,
        path,
        partUri,
      ),
    );
  }
  if (rule.max !== undefined && num > rule.max) {
    errors.push(
      makeSemanticError(
        "Sch_SemanticNumericRangeMax",
        `Element <${el.qualifiedName}> attribute '${rule.attrQname}': value ${num} exceeds maximum ${rule.max}.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

// ---- Rule index (built once, lazily) ----

/**
 * Index structure for fast dispatch:
 * - per-element rules (relationship, stringLength, numericRange): keyed by "ns::local"
 * - uniqueness rules: stored separately (applied at doc level, not per-element)
 */
interface RuleIndex {
  /** Per-element rules keyed by "ns::local" of the context element. */
  readonly perElement: ReadonlyMap<string, readonly SchematronRule[]>;
  /** Uniqueness rules (applied once per validateSemantic call). */
  readonly uniqueness: readonly UniquenessRule[];
}

let _ruleIndex: RuleIndex | undefined;

function getRuleIndex(rules: ReadonlyArray<SchematronRule>): RuleIndex {
  if (_ruleIndex !== undefined) return _ruleIndex;

  const perElement = new Map<string, SchematronRule[]>();
  const uniqueness: UniquenessRule[] = [];

  for (const rule of rules) {
    if (rule.kind === "unsupported") continue;
    if (rule.kind === "uniqueness") {
      uniqueness.push(rule);
      continue;
    }
    // relationship, stringLength, numericRange — keyed by context element
    const { ns, local } = parseContext(rule.context);
    const key = `${ns}::${local}`;
    if (!perElement.has(key)) perElement.set(key, []);
    (perElement.get(key) as SchematronRule[]).push(rule);
  }

  _ruleIndex = { perElement, uniqueness };
  return _ruleIndex;
}

// ---- Public API ----

/**
 * Evaluate all supported schematron rules against an element tree.
 *
 * @param docRoot   Root element of the element tree (the document/part root).
 * @param rules     The full rule array from SCHEMATRON_RULES.
 * @param rels      Optional relationship collection for the part (enables relationship checks).
 * @param partUri   Optional part URI for error context.
 * @returns         Array of Semantic ValidationErrors. Never throws.
 */
export function evaluateSchematron(
  docRoot: OpenXmlElement,
  rules: ReadonlyArray<SchematronRule>,
  rels: IRelationshipCollection | undefined,
  partUri: string | undefined,
): ValidationError[] {
  const errors: ValidationError[] = [];

  try {
    const index = getRuleIndex(rules);

    // 1. Apply per-element rules (walk the tree)
    walkForPerElementRules(docRoot, index, rels, partUri, errors);

    // 2. Apply uniqueness rules (once per tree)
    for (const rule of index.uniqueness) {
      handleUniqueness(rule, docRoot, partUri, errors);
    }
  } catch {
    // Safety net — evaluator must never propagate exceptions
  }

  return errors;
}

function walkForPerElementRules(
  el: OpenXmlElement,
  index: RuleIndex,
  rels: IRelationshipCollection | undefined,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  const key = `${el.namespaceUri}::${el.localName}`;
  const elRules = index.perElement.get(key);

  if (elRules !== undefined) {
    const path = makePath(el);
    for (const rule of elRules) {
      try {
        if (rule.kind === "relationship") {
          handleRelationship(rule, el, rels, path, partUri, errors);
        } else if (rule.kind === "stringLength") {
          handleStringLength(rule, el, path, partUri, errors);
        } else if (rule.kind === "numericRange") {
          handleNumericRange(rule, el, path, partUri, errors);
        }
      } catch {
        // Individual rule must not crash the evaluator
      }
    }
  }

  if (el instanceof OpenXmlCompositeElement) {
    for (const child of el.children) {
      walkForPerElementRules(child, index, rels, partUri, errors);
    }
  }
}

/**
 * Reset the internal rule index (for testing, or after rule set changes).
 * Not needed in production; the index is built once from SCHEMATRON_RULES.
 */
export function resetRuleIndex(): void {
  _ruleIndex = undefined;
}
