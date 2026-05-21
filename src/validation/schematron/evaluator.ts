/**
 * Schematron semantic rule evaluator — Epic-79 Phase 2 + Epic-84 extended categories + Epic-85 cross-part.
 *
 * Evaluates all supported rule kinds against an element tree:
 *   - relationship  : r:id attr vs the part's IRelationshipCollection (2.1/2.2)
 *   - uniqueness    : count(distinct-values(PATH/@attr)) = count(PATH/@attr) (2.3)
 *   - stringLength  : string-length(@attr) <= N / >= M (1.12)
 *   - numericRange  : @attr <= N / >= M (1.3)
 *   - validSet      : @attr must be in enumerated set (1.4)
 *   - invalidSet    : @attr must NOT be in enumerated set (1.10)
 *   - absentWhenEq  : @a must be absent if @b equals one of values (1.14)
 *   - absentWhenNeq : @a must be absent if @b does NOT equal one of values (1.15)
 *   - mutualExcl    : at most one of attrs may be present (1.16)
 *   - attrVsAttr    : @a < (or <=) @b numerically (1.17)
 *   - reqWhenOther  : @a is required when @b equals a value (1.18)
 *   - pattern       : @attr must match a regex (1.2)
 *   - refExist      : Index-of(document('Part:X')//el/@attr, @ref) cross-part attr lookup (3.1)
 *   - indexedRef    : @attr < count(document('Part:X')//el) + N index-based existence (3.2)
 *
 * The evaluator NEVER throws; all errors are collected into a ValidationError[].
 */

import type { OpenXmlElement } from "../../element/element.js";
import { OpenXmlCompositeElement } from "../../element/element.js";
import type { IRelationshipCollection } from "../../packaging/interfaces/relationship.js";
import { relationshipTypeMatches } from "../../parts/relationship-type-match.js";
import type { ValidationError } from "../ValidationError.js";
import type {
  AbsentWhenEqRule,
  AbsentWhenNeqRule,
  AttrPresentRule,
  AttrValueConditionRule,
  AttrVsAttrRule,
  IndexedRefRule,
  InvalidSetRule,
  MutualExclRule,
  NumericRangeRule,
  PatternRule,
  RefExistRule,
  RelationshipRule,
  ReqWhenOtherRule,
  SchematronRule,
  StringLengthRule,
  UniquenessRule,
  ValidSetRule,
} from "./rules.js";

// ---- PartResolver interface ----

/**
 * Resolves a schematron `Part:XxxPart` reference to the root element of the target part.
 *
 * Used by cross-part rule handlers (3.1 refExist, 3.2 indexedRef).
 * If the target part is not available or not modeled, returns undefined (safe skip).
 *
 * `partRef` is the raw string from the schematron test, e.g.:
 *   "Part:FootnotesPart"                — named part relative to current part's owner
 *   "Part:/MainDocumentPart/FootnotesPart" — path-rooted part
 *   "Part:/WorkbookPart/WorkbookStylesPart"
 *   "Part:."                            — current part's own root (same tree as docRoot)
 *   "Part:.."                           — parent part's root
 */
export interface PartResolver {
  /**
   * Resolve `partRef` to the root element of the referenced part.
   * Returns undefined if the part is not found / not modeled (caller skips the check).
   */
  resolve(partRef: string): OpenXmlElement | undefined;
}

// ---- Prefix→namespace resolution ----
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
  ovml: "urn:schemas-microsoft-com:office:powerpoint",
  emma: "http://www.w3.org/2003/04/emma",
  mso14: "http://schemas.microsoft.com/office/2009/07/customui",
  p15: "http://schemas.microsoft.com/office/powerpoint/2012/main",
  thm15: "http://schemas.microsoft.com/office/thememl/2012/main",
  we: "http://schemas.microsoft.com/office/webextensions/webextension/2010/11",
  wne: "http://schemas.microsoft.com/office/word/2006/wordml/custom-b",
  sl2: "http://schemas.openxmlformats.org/schemaLibrary/2006/main",
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
 * Checks extendedAttributes by prefixed form, local form, and namespace match.
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

/**
 * Check if an attribute is present (has a non-undefined, non-null value).
 */
function hasAttr(el: OpenXmlElement, attrQname: string): boolean {
  return getAttr(el, attrQname) !== undefined;
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
interface PathStep {
  readonly ns: string;
  readonly local: string;
}

function parseScopePath(scopePath: string): PathStep[] | null {
  let s = scopePath.trim();
  s = s.replace(/^ancestor::[^/]+\/\//, "//");
  s = s.replace(/^ancestor::[^/]+\//, "//");
  // Handle fn:lower-case wrapper
  s = s.replace(/^fn:lower-case\(/, "").replace(/\)$/, "");

  if (!s.startsWith("//")) return null;
  s = s.slice(2);

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

function makePath(el: OpenXmlElement): string {
  return `/${el.localName}[0]`;
}

// ---- Value comparison ----

/**
 * Compare attribute value against a constraint value.
 * Case-insensitive, trims quotes — mirrors SDK's AttributeValueEquals.
 */
function attrValueEquals(attrValue: string, constraintValue: string): boolean {
  return attrValue.trim().toLowerCase() === constraintValue.trim().toLowerCase();
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
  if (rels === undefined) return;

  const idValue = getAttr(el, rule.attrQname);
  if (idValue === undefined) return;

  let rel: ReturnType<IRelationshipCollection["get"]> | undefined;
  try {
    if (!rels.has(idValue)) {
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
    return;
  }

  if (rel === undefined) return;

  if (rule.requiredType !== undefined && !relationshipTypeMatches(rel.type, rule.requiredType)) {
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
  const steps = parseScopePath(rule.scopePath);
  if (steps === null || steps.length === 0) return;

  const lastStep = steps[steps.length - 1] as PathStep;

  // Strip leading @ from attrQname
  const attrRaw = rule.attrQname.startsWith("@") ? rule.attrQname.slice(1) : rule.attrQname;

  const elems = collectByTag(docRoot, lastStep.ns, lastStep.local);
  if (elems.length === 0) return;

  const seen = new Map<string, OpenXmlElement>();
  for (const elem of elems) {
    const val = getAttr(elem, attrRaw);
    if (val === undefined) continue;
    // Case-insensitive comparison for uniqueness (some rules use fn:lower-case)
    const key = val.toLowerCase();
    if (seen.has(key)) {
      errors.push(
        makeSemanticError(
          "Sch_SemanticUniquenessViolation",
          `Duplicate value '${val}' for attribute '${attrRaw}' on <${elem.qualifiedName}> — violates uniqueness constraint (context '${rule.context}').`,
          elem,
          makePath(elem),
          partUri,
        ),
      );
    } else {
      seen.set(key, elem);
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
  if (Number.isNaN(num)) return;

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

/**
 * 1.4 ValidSet — attribute value must be in the allowed value set.
 * Error if attribute is present but not in values[].
 */
function handleValidSet(
  rule: ValidSetRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  const val = getAttr(el, rule.attrQname);
  if (val === undefined) return; // absent attr is not this rule's concern

  const inSet = rule.values.some((v) => attrValueEquals(val, v));
  if (!inSet) {
    errors.push(
      makeSemanticError(
        "Sem_AttributeValueDataTypeDetailed",
        `Element <${el.qualifiedName}> attribute '${rule.attrQname}' = '${val}': value is not in the allowed set [${rule.values.join(", ")}].`,
        el,
        path,
        partUri,
      ),
    );
  }
}

/**
 * 1.10 InvalidSet — attribute value must NOT be in the prohibited value set.
 * Error if attribute is present and its value IS in values[].
 */
function handleInvalidSet(
  rule: InvalidSetRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  const val = getAttr(el, rule.attrQname);
  if (val === undefined) return;

  const inSet = rule.values.some((v) => attrValueEquals(val, v));
  if (inSet) {
    errors.push(
      makeSemanticError(
        "Sem_AttributeValueDataTypeDetailed",
        `Element <${el.qualifiedName}> attribute '${rule.attrQname}' = '${val}': value is in the prohibited set [${rule.values.join(", ")}].`,
        el,
        path,
        partUri,
      ),
    );
  }
}

/**
 * 1.14 AbsentWhenEq — absentAttr must be absent when condAttr equals one of condValues.
 * Error if absentAttr is present AND condAttr equals one of condValues.
 */
function handleAbsentWhenEq(
  rule: AbsentWhenEqRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  // If the "absent" attr is not present, constraint is satisfied.
  if (!hasAttr(el, rule.absentAttr)) return;

  const condVal = getAttr(el, rule.condAttr);
  if (condVal === undefined) return;

  const condMatches = rule.condValues.some((v) => attrValueEquals(condVal, v));
  if (condMatches) {
    errors.push(
      makeSemanticError(
        "Sem_AttributeAbsentConditionToValue",
        `Element <${el.qualifiedName}> attribute '${rule.absentAttr}' must be absent when '${rule.condAttr}' is '${condVal}'.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

/**
 * 1.15 AbsentWhenNeq — absentAttr must be absent when condAttr does NOT equal any of condValues.
 * Error if absentAttr is present AND condAttr is NOT one of condValues.
 */
function handleAbsentWhenNeq(
  rule: AbsentWhenNeqRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  if (!hasAttr(el, rule.absentAttr)) return;

  const condVal = getAttr(el, rule.condAttr);
  if (condVal === undefined) return;

  const condMatches = rule.condValues.some((v) => attrValueEquals(condVal, v));
  if (!condMatches) {
    // condAttr is not one of the "OK" values — so absentAttr must be absent
    errors.push(
      makeSemanticError(
        "Sem_AttributeAbsentConditionToNonValue",
        `Element <${el.qualifiedName}> attribute '${rule.absentAttr}' must be absent when '${rule.condAttr}' is not one of [${rule.condValues.join(", ")}].`,
        el,
        path,
        partUri,
      ),
    );
  }
}

/**
 * 1.16 MutualExcl — at most one of the listed attributes may be present.
 * Error if ≥ 2 attrs are present simultaneously.
 */
function handleMutualExcl(
  rule: MutualExclRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  const presentAttrs: string[] = [];
  for (const attr of rule.attrs) {
    if (hasAttr(el, attr)) {
      presentAttrs.push(attr);
    }
  }

  if (presentAttrs.length >= 2) {
    errors.push(
      makeSemanticError(
        "Sem_AttributeMutualExclusive",
        `Element <${el.qualifiedName}>: attributes [${presentAttrs.join(", ")}] are mutually exclusive — at most one may be present.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

/**
 * 1.17 AttrVsAttr — value of attrA must be less than (or equal to) attrB.
 * Error if attrA and attrB are both present and the constraint is violated.
 */
function handleAttrVsAttr(
  rule: AttrVsAttrRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  const valA = getAttr(el, rule.attrA);
  if (valA === undefined) return;
  const valB = getAttr(el, rule.attrB);
  if (valB === undefined) return;

  const numA = Number(valA);
  const numB = Number(valB);
  if (Number.isNaN(numA) || Number.isNaN(numB)) return;

  const ok = rule.canEqual ? numA <= numB : numA < numB;
  if (!ok) {
    const op = rule.canEqual ? "<=" : "<";
    errors.push(
      makeSemanticError(
        "Sem_AttributeValueLessEqualToAnother",
        `Element <${el.qualifiedName}>: attribute '${rule.attrA}' = ${numA} must be ${op} '${rule.attrB}' = ${numB}.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

/**
 * 1.18 ReqWhenOther — requiredAttr must be present when condAttr equals one of condValues.
 * Error if requiredAttr is absent AND condAttr equals one of condValues.
 */
function handleReqWhenOther(
  rule: ReqWhenOtherRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  // If required attr is already present, constraint is satisfied.
  if (hasAttr(el, rule.requiredAttr)) return;

  const condVal = getAttr(el, rule.condAttr);
  if (condVal === undefined) return;

  const condMatches = rule.condValues.some((v) => attrValueEquals(condVal, v));
  if (condMatches) {
    errors.push(
      makeSemanticError(
        "Sem_AttributeRequiredConditionToValue",
        `Element <${el.qualifiedName}>: attribute '${rule.requiredAttr}' is required when '${rule.condAttr}' is '${condVal}'.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

/**
 * 1.2 Pattern — attribute value must match a regular expression.
 * The regex is an XPath regex (POSIX-like). We convert known \p{L} patterns to JS-compatible form.
 * Error if attr is present but doesn't match.
 */
function handlePattern(
  rule: PatternRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
  compiledPatterns: Map<string, RegExp | null>,
): void {
  const val = getAttr(el, rule.attrQname);
  if (val === undefined) return;

  const cacheKey = `${rule.context}::${rule.attrQname}::${rule.regex}`;
  let re: RegExp | null | undefined = compiledPatterns.get(cacheKey);

  if (re === undefined) {
    re = compileXPathRegex(rule.regex);
    compiledPatterns.set(cacheKey, re);
  }

  if (re === null) return; // Could not compile — skip safely (no false positive)

  if (!re.test(val)) {
    errors.push(
      makeSemanticError(
        "Sem_AttributeValueDataTypeDetailed",
        `Element <${el.qualifiedName}> attribute '${rule.attrQname}' = '${val}': value does not match pattern '${rule.regex}'.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

/**
 * Convert an XPath/XSD regex to a JS RegExp.
 * Returns null if the pattern uses features we can't safely convert.
 */
function compileXPathRegex(pattern: string): RegExp | null {
  try {
    // Wrap in ^ ... $ anchors (XPath regex is always a full-string match)
    let js = pattern;

    // Skip patterns with Unicode categories \p{...} that JS can't handle (pre-ES2018)
    // In modern V8 (Node 10+), /u flag supports \p{L} etc.
    // Try to convert \p{L} → unicode property escape
    if (js.includes("\\p{") || js.includes("\\P{")) {
      // Use unicode flag — works in V8/Node 12+
      js = js
        // \p{L} → \p{L} (keep as-is with u flag)
        // \P{IsBasicLatin} → \P{ASCII} (approximate — IsBasicLatin = U+0000-U+007F)
        .replace(/\\P\{IsBasicLatin\}/g, "\\P{ASCII}")
        .replace(/\\p\{IsBasicLatin\}/g, "\\p{ASCII}");
      const anchored = `^(?:${js})$`;
      return new RegExp(anchored, "u");
    }

    const anchored = `^(?:${js})$`;
    return new RegExp(anchored);
  } catch {
    // Pattern failed to compile — skip safely
    return null;
  }
}

// ---- 1.1 AttrPresent handler ----

/**
 * 1.1 AttrPresent — attribute must not be omitted (SDK: AttributeCannotOmitConstraint).
 * Error if the required attribute is absent on the element.
 */
function handleAttrPresent(
  rule: AttrPresentRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  if (!hasAttr(el, rule.attrQname)) {
    errors.push(
      makeSemanticError(
        "Sem_MissRequiredAttribute",
        `Element <${el.qualifiedName}> is missing required attribute '${rule.attrQname}'.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

// ---- 1.19 AttrValueCondition handler ----

/**
 * 1.19 AttrValueCondition — SDK's AttributeValueConditionToAnother.
 * Form: when @attrQname is in attrValues, @condAttr must be in condValues.
 * Error if attrQname is present and equals one of attrValues, but condAttr does NOT equal any condValue.
 */
function handleAttrValueCondition(
  rule: AttrValueConditionRule,
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  errors: ValidationError[],
): void {
  const attrVal = getAttr(el, rule.attrQname);
  if (attrVal === undefined) return;

  // Check if attrQname's value is one of attrValues
  const attrMatches = rule.attrValues.some((v) => attrValueEquals(attrVal, v));
  if (!attrMatches) return;

  // attrQname matches — now check condAttr is in condValues
  const condVal = getAttr(el, rule.condAttr);
  if (condVal === undefined) return;

  const condMatches = rule.condValues.some((v) => attrValueEquals(condVal, v));
  if (!condMatches) {
    errors.push(
      makeSemanticError(
        "Sem_AttributeValueConditionToAnother",
        `Element <${el.qualifiedName}> attribute '${rule.attrQname}' = '${attrVal}' requires '${rule.condAttr}' to be one of [${rule.condValues.join(", ")}], but got '${condVal}'.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

// ---- 3.1 RefExist handler ----

/**
 * 3.1 RefExist — Index-of(document('Part:X')//el/@attr, @currentAttr)
 *
 * The current element's refAttr value must exist in the set of targetAttr values
 * on targetNs:targetLocal elements in the target part.
 *
 * Safe skips (no error):
 *   - refAttr is absent on current element
 *   - partResolver is undefined (no package context)
 *   - target part is not found / not modeled
 *   - Part:. (same part) — use docRoot itself
 */
function handleRefExist(
  rule: RefExistRule,
  el: OpenXmlElement,
  docRoot: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  partResolver: PartResolver | undefined,
  errors: ValidationError[],
): void {
  const refValue = getAttr(el, rule.refAttr);
  if (refValue === undefined || refValue === "") return;

  // Resolve the target part root
  let targetRoot: OpenXmlElement | undefined;
  if (rule.partRef === "Part:." || rule.partRef === "Part:..") {
    // Same part or parent part — use current docRoot
    targetRoot = docRoot;
  } else {
    if (partResolver === undefined) return; // no package context — skip safely
    targetRoot = partResolver.resolve(rule.partRef);
    if (targetRoot === undefined) return; // part not modeled — skip safely
  }

  // Collect all targetAttr values from targetNs:targetLocal elements
  const { ns: targetNs, local: targetLocal } = { ns: rule.targetNs, local: rule.targetLocal };
  const { ns: attrNs, local: attrLocal } = resolveQname(rule.targetAttr);

  const allowedValues = new Set<string>();
  visitAll(targetRoot, (candidate) => {
    if (candidate.namespaceUri === targetNs && candidate.localName === targetLocal) {
      // Look for the target attribute
      const val = getAttrByNsLocal(candidate, attrNs, attrLocal);
      if (val !== undefined && val !== "") allowedValues.add(val);
    }
  });

  if (!allowedValues.has(refValue)) {
    errors.push(
      makeSemanticError(
        "Sem_MissingReferenceElement",
        `Element <${el.qualifiedName}> attribute '${rule.refAttr}' = '${refValue}': no matching '${rule.targetAttr}' found in ${rule.partRef}.`,
        el,
        path,
        partUri,
      ),
    );
  }
}

/**
 * Get an attribute value by namespace URI and local name directly.
 */
function getAttrByNsLocal(el: OpenXmlElement, ns: string, local: string): string | undefined {
  // Try extendedAttributes: look for matching ns+local
  for (const [key, value] of el.extendedAttributes) {
    const { ns: kNs, local: kLocal } = resolveQname(key);
    if (kLocal === local && (ns === "" || kNs === ns || kNs === "")) {
      return value;
    }
  }
  return undefined;
}

// ---- 3.2 IndexedRef handler ----

/**
 * 3.2 IndexedRef — @attr < count(document('Part:X')//el) + N
 *
 * The current element's indexAttr value must be less than (count of target elements + indexBase).
 * In other words: if attr >= count + indexBase → error.
 *
 * For indexBase=1: attr < count + 1 means attr <= count (1-based, valid range 0..count-1 or 1..count)
 * For indexBase=0: attr < count + 0 means attr < count (0-based, valid range 0..count-1)
 *
 * Safe skips: attr absent, attr not numeric, partResolver undefined, part not found.
 */
function handleIndexedRef(
  rule: IndexedRefRule,
  el: OpenXmlElement,
  docRoot: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  partResolver: PartResolver | undefined,
  errors: ValidationError[],
): void {
  const indexStr = getAttr(el, rule.indexAttr);
  if (indexStr === undefined || indexStr === "") return;

  const indexValue = Number(indexStr);
  if (!Number.isInteger(indexValue) && Number.isNaN(indexValue)) return;
  if (Number.isNaN(indexValue)) return;

  // Resolve the target part root
  let targetRoot: OpenXmlElement | undefined;
  if (rule.partRef === "Part:." || rule.partRef === "Part:..") {
    targetRoot = docRoot;
  } else {
    if (partResolver === undefined) return;
    targetRoot = partResolver.resolve(rule.partRef);
    if (targetRoot === undefined) return;
  }

  // Count target elements
  const { ns: targetNs, local: targetLocal } = { ns: rule.targetNs, local: rule.targetLocal };
  let count = 0;
  visitAll(targetRoot, (candidate) => {
    if (candidate.namespaceUri === targetNs && candidate.localName === targetLocal) {
      count += 1;
    }
  });

  // Check: @attr < count + indexBase  →  error if @attr >= count + indexBase
  const upperBound = count + rule.indexBase;
  if (indexValue >= upperBound) {
    errors.push(
      makeSemanticError(
        "Sem_MissingIndexedElement",
        `Element <${el.qualifiedName}> attribute '${rule.indexAttr}' = ${indexValue}: index out of bounds (${count} elements in ${rule.partRef}, index base ${rule.indexBase}).`,
        el,
        path,
        partUri,
      ),
    );
  }
}

// ---- Rule index (built once, lazily) ----

interface RuleIndex {
  readonly perElement: ReadonlyMap<string, readonly SchematronRule[]>;
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
    const { ns, local } = parseContext(rule.context);
    const key = `${ns}::${local}`;
    if (!perElement.has(key)) perElement.set(key, []);
    (perElement.get(key) as SchematronRule[]).push(rule);
  }

  _ruleIndex = { perElement, uniqueness };
  return _ruleIndex;
}

// Compiled regex cache (shared across evaluator calls)
const _compiledPatterns = new Map<string, RegExp | null>();

// ---- Public API ----

/**
 * Evaluate all supported schematron rules against an element tree.
 *
 * @param docRoot      Root element of the element tree (the document/part root).
 * @param rules        The full rule array from SCHEMATRON_RULES.
 * @param rels         Optional relationship collection for the part.
 * @param partUri      Optional part URI for error context.
 * @param partResolver Optional resolver for cross-part rule evaluation (3.1 refExist, 3.2 indexedRef).
 *                     When undefined, cross-part rules are safely skipped (no false positives).
 * @returns            Array of Semantic ValidationErrors. Never throws.
 */
export function evaluateSchematron(
  docRoot: OpenXmlElement,
  rules: ReadonlyArray<SchematronRule>,
  rels: IRelationshipCollection | undefined,
  partUri: string | undefined,
  partResolver?: PartResolver,
): ValidationError[] {
  const errors: ValidationError[] = [];

  try {
    const index = getRuleIndex(rules);

    // 1. Apply per-element rules (walk the tree)
    walkForPerElementRules(docRoot, index, rels, partUri, errors, _compiledPatterns, partResolver);

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
  compiledPatterns: Map<string, RegExp | null>,
  partResolver?: PartResolver,
  docRoot?: OpenXmlElement,
): void {
  // docRoot is the top-level element of this part's tree (for same-part Part:. rules)
  const root = docRoot ?? el;

  const key = `${el.namespaceUri}::${el.localName}`;
  const elRules = index.perElement.get(key);

  if (elRules !== undefined) {
    const path = makePath(el);
    for (const rule of elRules) {
      try {
        switch (rule.kind) {
          case "relationship":
            handleRelationship(rule, el, rels, path, partUri, errors);
            break;
          case "stringLength":
            handleStringLength(rule, el, path, partUri, errors);
            break;
          case "numericRange":
            handleNumericRange(rule, el, path, partUri, errors);
            break;
          case "validSet":
            handleValidSet(rule, el, path, partUri, errors);
            break;
          case "invalidSet":
            handleInvalidSet(rule, el, path, partUri, errors);
            break;
          case "absentWhenEq":
            handleAbsentWhenEq(rule, el, path, partUri, errors);
            break;
          case "absentWhenNeq":
            handleAbsentWhenNeq(rule, el, path, partUri, errors);
            break;
          case "mutualExcl":
            handleMutualExcl(rule, el, path, partUri, errors);
            break;
          case "attrVsAttr":
            handleAttrVsAttr(rule, el, path, partUri, errors);
            break;
          case "reqWhenOther":
            handleReqWhenOther(rule, el, path, partUri, errors);
            break;
          case "pattern":
            handlePattern(rule, el, path, partUri, errors, compiledPatterns);
            break;
          case "refExist":
            handleRefExist(rule, el, root, path, partUri, partResolver, errors);
            break;
          case "indexedRef":
            handleIndexedRef(rule, el, root, path, partUri, partResolver, errors);
            break;
          case "attrPresent":
            handleAttrPresent(rule, el, path, partUri, errors);
            break;
          case "attrValueCondition":
            handleAttrValueCondition(rule, el, path, partUri, errors);
            break;
        }
      } catch {
        // Individual rule must not crash the evaluator
      }
    }
  }

  if (el instanceof OpenXmlCompositeElement) {
    for (const child of el.children) {
      walkForPerElementRules(
        child,
        index,
        rels,
        partUri,
        errors,
        compiledPatterns,
        partResolver,
        root,
      );
    }
  }
}

/**
 * Reset the internal rule index (for testing, or after rule set changes).
 */
export function resetRuleIndex(): void {
  _ruleIndex = undefined;
  _compiledPatterns.clear();
}
