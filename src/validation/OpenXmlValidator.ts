/**
 * OpenXmlValidator — Phase 1 structural + attribute validation + Phase 2 schematron semantic
 * + Phase 3 OPC package-level validation.
 *
 * Mirrors .NET `DocumentFormat.OpenXml.Validation.OpenXmlValidator`.
 *
 * Phase 1 checks:
 *  (a) Every child element is allowed under its parent (Particle membership)
 *  (b) Cardinality (min/max occurs) is respected
 *  (c) Sequence order is respected
 *  (d) Required attributes are present (RequiredValidator)
 *  (e) Attribute value constraints (string length / number range) are satisfied
 *
 * Phase 2 checks (schematron semantic rules):
 *  (f) Relationship type/existence via r:id attributes
 *  (g) Attribute uniqueness (count(distinct-values) rules)
 *  (h) String-length attribute constraints
 *  (i) Numeric range attribute constraints
 *
 * Phase 3 checks (OPC package-level, via validateOpcPackage):
 *  (j) [Content_Types].xml has required Default entries (e.g. Extension="rels")
 *  (k) All internal relationship targets resolve to existing parts
 *  (l) Main document part is reachable from the package root relationships
 *
 * The validator NEVER throws on invalid input — it returns a diagnostics list.
 */

import { OpenXmlCompositeElement, type OpenXmlElement } from "../element/element.js";
import { FileFormatVersions } from "../markup-compat/file-format-versions.js";
import type { IRelationshipCollection } from "../packaging/interfaces/relationship.js";
import type { ValidationError } from "./ValidationError.js";
import { validateMcElement } from "./mc-validator.js";
import type { PartResolver } from "./schematron/evaluator.js";
import { SCHEMATRON_RULES, evaluateSchematron } from "./schematron/index.js";
import type {
  AttrConstraint,
  ElementConstraint,
  NormalizedParticle,
  ParticleComposite,
  ParticleNode,
  VersionedRequiredAttr,
} from "./types.js";

// ---- Runtime type guards for validate() overload dispatch ----

/** Returns true if the value is an OpenXmlElement (has localName + namespaceUri). */
function isOpenXmlElement(value: unknown): value is OpenXmlElement {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as Record<string, unknown>).localName === "string" &&
    typeof (value as Record<string, unknown>).namespaceUri === "string"
  );
}

/** Returns true if the value is an OpcPackageLike (has contentTypes + parts method). */
function isOpcPackageLike(value: unknown): value is OpcPackageLike {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as Record<string, unknown>).contentTypes === "object" &&
    typeof (value as Record<string, unknown>).parts === "function"
  );
}

/** Returns true if the value is a WordprocessingDocumentLike (has mainDocumentPart or other Word part props). */
function isWordprocessingDocumentLike(value: unknown): value is WordprocessingDocumentLike {
  if (value === null || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  // Must have at least one of the expected Word document part properties
  return (
    "mainDocumentPart" in obj ||
    "commentsPart" in obj ||
    "footnotesPart" in obj ||
    "stylesPart" in obj ||
    "numberingPart" in obj
  );
}

// ---- Error builders (handles exactOptionalPropertyTypes) ----
function makeError(
  id: string,
  description: string,
  node: OpenXmlElement,
  path: string,
  partUri: string | undefined,
  relatedNode?: OpenXmlElement,
): ValidationError {
  const base = { id, description, errorType: "Schema" as const, node, path };
  if (partUri !== undefined) {
    if (relatedNode !== undefined) return { ...base, partUri, relatedNode };
    return { ...base, partUri };
  }
  if (relatedNode !== undefined) return { ...base, relatedNode };
  return base;
}

/** Build a package-level (OPC) error. These have no associated element node or path. */
function makeOpcError(id: string, description: string): ValidationError {
  return {
    id,
    description,
    errorType: "Package" as const,
    // Package-level errors have no associated element node.
    // Use a sentinel undefined-cast to satisfy the interface — consumers should check errorType.
    node: undefined as unknown as OpenXmlElement,
    path: "",
  };
}

/**
 * Check if a string is valid base64-encoded using strict canonical round-trip.
 * Matches .NET behavior: the decoded-and-re-encoded value must equal the input.
 */
function isValidBase64(value: string): boolean {
  if (value.length === 0) return false;
  try {
    const reencoded = Buffer.from(value, "base64").toString("base64");
    return reencoded === value;
  } catch {
    return false;
  }
}

// ---- Constraint registry ----
// Maps (namespaceUri + "::" + localName) → ElementConstraint.
// Populated lazily when constraint data is registered.
const CONSTRAINT_MAP = new Map<string, ElementConstraint>();
// Class-specific constraints keyed by className::namespaceUri::localName.
// Looked up first; when not found, falls back to tag-based CONSTRAINT_MAP.
const CLASS_CONSTRAINT_MAP = new Map<string, ElementConstraint>();

/** Register constraint data for a namespace. Call once per namespace array. */
export function registerConstraints(data: ReadonlyArray<ElementConstraint>): void {
  for (const c of data) {
    const tagKey = `${c.namespaceUri}::${c.localName}`;
    const classKey = `${c.className}::${c.namespaceUri}::${c.localName}`;
    // First registration wins (more specific takes priority)
    if (!CONSTRAINT_MAP.has(tagKey)) {
      CONSTRAINT_MAP.set(tagKey, c);
    }
    if (!CLASS_CONSTRAINT_MAP.has(classKey)) {
      CLASS_CONSTRAINT_MAP.set(classKey, c);
    }
  }
}

function lookupConstraint(el: OpenXmlElement): ElementConstraint | undefined {
  // Try class-specific constraint first, fall back to tag-based
  const classKey = `${el.constructor.name}::${el.namespaceUri}::${el.localName}`;
  const found = CLASS_CONSTRAINT_MAP.get(classKey);
  if (found) return found;
  return CONSTRAINT_MAP.get(`${el.namespaceUri}::${el.localName}`);
}

// ---- Path helper ----
function makePath(parentPath: string, el: OpenXmlElement, index: number): string {
  const segment = `${el.localName}[${index}]`;
  return parentPath.length === 0 ? `/${segment}` : `${parentPath}/${segment}`;
}

// ---- Particle validation helpers ----

/**
 * Collect all leaf qnames allowed under a particle node (recursively).
 * Returns a set of "ns::local" strings.
 */
function collectAllowedLeaves(node: ParticleNode): Set<string> {
  const result = new Set<string>();
  collectLeaves(node, result);
  return result;
}

function collectLeaves(node: ParticleNode, out: Set<string>): void {
  if (node.kind === "leaf") {
    out.add(`${node.ns}::${node.local}`);
    return;
  }
  if (node.kind === "any") return; // wildcard — no specific leaf keys
  for (const item of node.items) {
    collectLeaves(item, out);
  }
}

/** Collect expected class names for leaves: key → expectedClassName (only when set). */
function collectExpectedClassNames(node: ParticleNode): Map<string, string> {
  const result = new Map<string, string>();
  collectExpectedClassNameEntries(node, result);
  return result;
}

function collectExpectedClassNameEntries(node: ParticleNode, out: Map<string, string>): void {
  if (node.kind === "leaf") {
    if (node.expectedClassName) {
      out.set(`${node.ns}::${node.local}`, node.expectedClassName);
    }
    return;
  }
  if (node.kind === "any") return;
  for (const item of node.items) {
    collectExpectedClassNameEntries(item, out);
  }
}

/**
 * Validate cardinality for Sequence particles.
 * Returns error descriptions for any violated min/max occurs.
 */
interface CardinalityError {
  readonly key: string; // "ns::local"
  readonly local: string;
  readonly ns: string;
  readonly actual: number;
  readonly min: number;
  readonly max: number | "unbounded";
}

function countChildren(children: readonly OpenXmlElement[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const child of children) {
    const key = `${child.namespaceUri}::${child.localName}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function checkCardinalityNode(
  node: ParticleNode,
  counts: Map<string, number>,
  unmatchedCount?: number,
  ancMaxMul = 1,
): CardinalityError[] {
  const errors: CardinalityError[] = [];

  if (node.kind === "any") {
    const actual = unmatchedCount ?? 0;
    if (actual < node.min) {
      errors.push({
        key: "##any",
        local: "(any)",
        ns: "##any",
        actual,
        min: node.min,
        max: node.max,
      });
    }
    return errors;
  }

  if (node.kind === "leaf") {
    const key = `${node.ns}::${node.local}`;
    const actual = counts.get(key) ?? 0;
    if (actual < node.min) {
      errors.push({ key, local: node.local, ns: node.ns, actual, min: node.min, max: node.max });
    }
    // Max check respects ancestor multiplier: if the parent sequence repeats
    // unbounded, the leaf's effective max is also unbounded.
    const effMax =
      node.max === "unbounded" || ancMaxMul >= Number.POSITIVE_INFINITY
        ? Number.POSITIVE_INFINITY
        : node.max;
    if (effMax < Number.POSITIVE_INFINITY && actual > effMax) {
      errors.push({ key, local: node.local, ns: node.ns, actual, min: node.min, max: node.max });
    }
    return errors;
  }

  // For composite nodes, recurse into items with updated ancestor multiplier.
  // When this node's max is unbounded, its children can repeat infinitely.
  const nodeMax = node.max === "unbounded" ? Number.POSITIVE_INFINITY : node.max;
  const newMul =
    ancMaxMul >= Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : ancMaxMul * nodeMax;
  for (const item of node.items) {
    errors.push(...checkCardinalityNode(item, counts, unmatchedCount, newMul));
  }
  return errors;
}

interface SequenceOrderError {
  readonly outOfOrderChild: string;
  readonly expectedAfter: string;
}

/**
 * Smart sequence order check that mirrors .NET SequenceParticleValidator behavior:
 * a child is out-of-sequence when it appears before all required preceding siblings
 * have been satisfied — not just when positions are non-monotonic.
 */
function checkSequenceOrder(
  sequenceNode: ParticleComposite,
  children: readonly OpenXmlElement[],
): SequenceOrderError[] {
  const numSlots = sequenceNode.items.length;
  if (numSlots === 0) return [];

  // Effective min: a slot is only "required" if it has at least one required
  // descendant leaf. Nested wrapper sequences with all-optional children are
  // trivially satisfiable even when their own min=1.
  const computeEffectiveMin = (item: ParticleNode): number => {
    if (item.kind === "any") return item.min;
    if (item.kind === "leaf") return item.min;
    const maxChildMin = Math.max(0, ...item.items.map((c) => computeEffectiveMin(c)));
    return maxChildMin > 0 ? item.min : 0;
  };

  // Build: key → slot index, mins/maxs per slot
  const keyToSlot = new Map<string, number>();
  const slotMins: number[] = [];
  const slotEffectiveMins: number[] = [];
  const slotMaxs: (number | "unbounded")[] = [];

  for (let i = 0; i < numSlots; i++) {
    const item = sequenceNode.items[i];
    const leaves = collectAllowedLeaves(item);
    for (const leaf of leaves) {
      keyToSlot.set(leaf, i);
    }
    slotMins.push(item.min);
    slotEffectiveMins.push(computeEffectiveMin(item));
    slotMaxs.push(item.max);
  }

  const totalPerSlot = new Array<number>(numSlots).fill(0);
  for (const child of children) {
    const key = `${child.namespaceUri}::${child.localName}`;
    const slot = keyToSlot.get(key);
    if (slot !== undefined) totalPerSlot[slot]++;
  }

  const outOfOrder = new Set<string>();
  let currentSlot = 0;
  const runningPerSlot = new Array<number>(numSlots).fill(0);

  // Advance past trivially-satisfiable empty slots
  while (
    currentSlot < numSlots &&
    slotEffectiveMins[currentSlot] === 0 &&
    totalPerSlot[currentSlot] === 0
  ) {
    currentSlot++;
  }

  for (const child of children) {
    const key = `${child.namespaceUri}::${child.localName}`;
    const slot = keyToSlot.get(key);
    if (slot === undefined) continue; // unknown child — reported elsewhere

    if (slot < currentSlot) {
      // Going backwards — child from a slot we already passed
      outOfOrder.add(key);
    } else if (slot === currentSlot) {
      // Same slot — always fine; cardinality check handles excess
      runningPerSlot[slot]++;
    } else {
      // slot > currentSlot — skipping ahead.
      // Only allow if all required slots between current and slot-1 are satisfied.
      let canAdvance = true;
      for (let i = currentSlot; i < slot; i++) {
        if (runningPerSlot[i] < slotEffectiveMins[i]) {
          canAdvance = false;
          break;
        }
      }
      if (canAdvance) {
        currentSlot = slot;
        runningPerSlot[slot]++;
      } else {
        outOfOrder.add(key);
      }
    }
  }

  const errors: SequenceOrderError[] = [];
  for (const key of outOfOrder) {
    errors.push({ outOfOrderChild: key, expectedAfter: "" });
  }
  return errors;
}

/** Check whether the current format version meets or exceeds a required initial version. */
function meetsInitialVersion(
  currentVersion: number | undefined,
  requiredVersion: string | undefined,
): boolean {
  if (!requiredVersion || !currentVersion) return true;
  const versionMap: Record<string, number> = {
    Office2007: 1,
    Office2010: 2,
    Office2013: 4,
    Office2016: 8,
    Office2019: 16,
    Office2021: 32,
    Microsoft365: 64,
  };
  const required = versionMap[requiredVersion];
  return required === undefined || currentVersion >= required;
}

/**
 * Recursively remove particle items whose initialVersion is not met by the current format version.
 * Returns null if the entire node should be removed.
 */
function filterParticleByVersion(
  node: ParticleNode,
  version: number | undefined,
): ParticleNode | null {
  if (!version) return node;
  if (node.kind === "any") return node; // wildcard — no version filtering
  if (node.kind === "leaf") {
    return meetsInitialVersion(version, node.initialVersion) ? node : null;
  }
  if (!meetsInitialVersion(version, node.initialVersion)) return null;
  const filteredItems = node.items
    .map((item) => filterParticleByVersion(item, version))
    .filter((item): item is ParticleNode => item !== null);
  // Cast needed: filtered items satisfy the readonly array type
  return { ...node, items: filteredItems as unknown as readonly ParticleNode[] };
}

/**
 * Detect duplicate elements in an xsd:all particle (each allowed child may appear at most once).
 * Returns a set of "ns::local" keys that appear more than once.
 *
 * Mirrors .NET AllParticleValidator: when a child with an already-visited type is encountered,
 * emit Sch_AllElement.
 */
function detectAllDuplicates(
  allNode: ParticleComposite,
  children: readonly OpenXmlElement[],
): Set<string> {
  // Collect the set of element keys that are declared in the xsd:all particle
  const declaredInAll = collectAllowedLeaves(allNode);

  // Track which declared elements have been seen
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const child of children) {
    const key = `${child.namespaceUri}::${child.localName}`;
    if (!declaredInAll.has(key)) continue; // not an all-member; reported elsewhere
    if (seen.has(key)) {
      duplicates.add(key);
    } else {
      seen.add(key);
    }
  }

  return duplicates;
}

/**
 * Build the "allowed children" message for error descriptions.
 * Lists all leaf elements permitted under the given particle node.
 */
function buildExpectedChildrenMsg(node: ParticleNode): string {
  const leaves = collectAllowedLeaves(node);
  // Include "any element" hint if there's a wildcard particle
  const hasAny = hasAnyParticle(node);
  if (leaves.size === 0) return hasAny ? "(any element)" : "(none)";
  const names = [...leaves].map((k) => {
    const colonPos = k.indexOf("::");
    return colonPos >= 0 ? k.slice(colonPos + 2) : k;
  });
  if (hasAny) names.push("(any element)");
  return names.join(", ");
}

/** Check whether a particle tree contains an xsd:any wildcard. */
function hasAnyParticle(node: ParticleNode): boolean {
  if (node.kind === "any") return true;
  if (node.kind === "leaf") return false;
  return node.items.some((item) => hasAnyParticle(item));
}

// ---- Version-conditional required attribute resolution ----

/**
 * Resolve which qnames are actually required given the versioned required attr entries
 * and the target FileFormatVersions.
 *
 * Semantics (mirroring .NET SDK RequiredValidator with Version):
 *
 * Each entry represents a "from this version onward" declaration of the required state.
 * The `minVersion` field is the version at which this declaration takes effect.
 * `maxVersion` when set means the declaration only applies up to that version.
 *
 * - Without a target (undefined): conservative "modern Office" mode.
 *   An attr is required only if no entry declares it optional (IsRequired=False).
 *   This matches Epic-91's "IsRequired=False collapse" behavior.
 *
 * - With a target: for each qname, find the entry whose minVersion is the highest
 *   value that is still <= target. That "most recent applicable" entry determines
 *   the required state. If it says optional → not required. If it says required → required.
 *   If no entry has minVersion <= target → not required (attribute didn't exist yet).
 */
function resolveVersionedRequiredAttrs(
  entries: readonly VersionedRequiredAttr[],
  target: FileFormatVersions | undefined,
): string[] {
  // Group entries by qname
  const byQname = new Map<string, VersionedRequiredAttr[]>();
  for (const entry of entries) {
    const existing = byQname.get(entry.qname);
    if (existing === undefined) {
      byQname.set(entry.qname, [entry]);
    } else {
      existing.push(entry);
    }
  }

  const result: string[] = [];

  for (const [qname, qnameEntries] of byQname) {
    if (target === undefined) {
      // Conservative mode (no version target): an attribute is required if ANY entry
      // declares it required — even if another entry relaxes it later.
      // This matches the original behavior where all RequiredValidator entries were
      // pushed to requiredAttrs unconditionally.
      //
      // Rationale: without a target, we don't know which version to validate against,
      // so we apply the most conservative (strictest) interpretation. If the schema
      // ever required it, we report it missing. Tools targeting modern Office should
      // pass a specific FileFormatVersions target to get relaxed behavior.
      const anyRequired = qnameEntries.some((e) => e.optional !== true);
      if (anyRequired) {
        result.push(qname);
      }
    } else {
      // Version-targeted mode: find the most recently applicable entry.
      // Each entry with minVersion set applies when target >= minVersion.
      // Among all applicable entries, pick the one with the highest minVersion
      // (most specific / most recent) — that entry's optional flag determines the state.
      //
      // Entries without minVersion (unversioned) are treated as version 0 (always applies).
      const applicable = qnameEntries.filter((e) => {
        const minV = e.minVersion ?? 0;
        return target >= minV;
      });

      if (applicable.length === 0) {
        // No entry applies for this version → attribute didn't exist yet → not required
        continue;
      }

      // Sort by minVersion descending to get the most recent applicable entry first
      const sorted = [...applicable].sort((a, b) => (b.minVersion ?? 0) - (a.minVersion ?? 0));
      const mostRecent = sorted[0] as VersionedRequiredAttr;

      // The most recent applicable entry determines the required state
      if (mostRecent.optional !== true) {
        result.push(qname);
      }
    }
  }

  return result;
}

// ---- Main validator engine ----

/**
 * Options for `OpenXmlValidator`.
 */
export interface OpenXmlValidatorOptions {
  /**
   * If true, skip validation of elements whose namespaceUri+localName
   * has no registered constraint. Default: true (lenient mode for unknown elements).
   */
  readonly skipUnknown?: boolean;

  /**
   * If true, include Phase 2 schematron semantic validation in `validate()`.
   * Default: false (Phase 1 only, for backwards compatibility).
   */
  readonly includeSemantic?: boolean;

  /**
   * Target Office version for version-directed validation.
   *
   * When set, version-conditional constraints (e.g. an attribute required only in
   * Office2007 but optional from Office2010) are evaluated against this target.
   * When unset, the validator uses the conservative "modern Office" default behavior
   * (equivalent to .NET's `OpenXmlValidator()` no-arg constructor).
   *
   * Mirrors .NET `OpenXmlValidator(FileFormatVersions fileFormat)` constructor.
   */
  readonly fileFormatVersions?: FileFormatVersions;

  /**
   * Maximum number of validation errors to collect.
   * Once this limit is reached, further errors are silently dropped.
   * Default: 1000 (mirrors .NET SDK default).
   */
  readonly maxNumberOfErrors?: number;
}

/**
 * OpenXml structural + attribute validator (Phase 1).
 *
 * Mirrors .NET `DocumentFormat.OpenXml.Validation.OpenXmlValidator`.
 *
 * ## Constructors
 *
 * ```ts
 * // Options object (original API — backward compatible)
 * const v1 = new OpenXmlValidator({ fileFormatVersions: FileFormatVersions.Office2013 });
 *
 * // Direct FileFormatVersions parameter (mirrors .NET constructor)
 * const v2 = new OpenXmlValidator(FileFormatVersions.Office2013);
 *
 * // No-arg (conservative "modern Office" default, mirrors .NET no-arg)
 * const v3 = new OpenXmlValidator();
 * ```
 *
 * ## Three-mode validate() overloads
 *
 * ```ts
 * // Validate a single element tree (Phase 1 + optional Phase 2)
 * const errors1 = validator.validate(paragraphElement);
 *
 * // Validate a WordprocessingDocument (all parts)
 * const errors2 = validator.validate(wordDoc);
 *
 * // Validate an OPC package (package-level OPC constraints)
 * const errors3 = validator.validate(opcPackage);
 * ```
 */
export class OpenXmlValidator {
  private readonly skipUnknown: boolean;
  private readonly includeSemantic: boolean;
  private readonly _fileFormat: FileFormatVersions | undefined;
  private _maxNumberOfErrors: number;

  /**
   * Creates an OpenXmlValidator with an options object.
   * @param options Validation options (fileFormatVersions, skipUnknown, includeSemantic).
   */
  constructor(options?: OpenXmlValidatorOptions);

  /**
   * Creates an OpenXmlValidator targeting a specific Office version.
   *
   * Mirrors .NET `OpenXmlValidator(FileFormatVersions fileFormat)` constructor.
   * Defaults to `FileFormatVersions.Office2007` when called with no arguments.
   *
   * @param fileFormat Target Office version for version-directed validation.
   */
  constructor(fileFormat?: FileFormatVersions);

  constructor(optionsOrFileFormat?: OpenXmlValidatorOptions | FileFormatVersions) {
    // Determine if the argument is a FileFormatVersions number or an options object
    let options: OpenXmlValidatorOptions;
    if (typeof optionsOrFileFormat === "number") {
      // Direct FileFormatVersions value — mirrors .NET constructor
      options = { fileFormatVersions: optionsOrFileFormat };
    } else {
      options = optionsOrFileFormat ?? {};
    }
    this.skipUnknown = options.skipUnknown ?? true;
    this.includeSemantic = options.includeSemantic ?? false;
    this._fileFormat = options.fileFormatVersions;
    this._maxNumberOfErrors = options.maxNumberOfErrors ?? 1000;
  }

  /**
   * The target Office version for version-directed validation.
   *
   * Mirrors .NET `OpenXmlValidator.FileFormat` property.
   * Returns undefined when no target was specified (conservative "modern Office" mode).
   */
  get fileFormat(): FileFormatVersions | undefined {
    return this._fileFormat;
  }

  /**
   * Maximum number of validation errors to collect before stopping.
   * Mirrors .NET `OpenXmlValidator.MaxNumberOfErrors`.
   * Default: 1000.
   */
  get maxNumberOfErrors(): number {
    return this._maxNumberOfErrors;
  }

  set maxNumberOfErrors(value: number) {
    this._maxNumberOfErrors = value;
  }

  /**
   * Validate a single element tree recursively (Phase 1: structural + attribute).
   * If `includeSemantic` option is true, also runs Phase 2 schematron checks.
   *
   * Mirrors .NET `OpenXmlValidator.Validate(OpenXmlElement)`.
   */
  validate(
    root: OpenXmlElement,
    partUri?: string,
    rels?: IRelationshipCollection,
  ): ValidationError[];

  /**
   * Validate a WordprocessingDocument package (all parts + cross-part semantic rules).
   *
   * Mirrors .NET `OpenXmlValidator.Validate(OpenXmlPackage)`.
   * Delegates to `validatePackage()` internally.
   */
  validate(doc: WordprocessingDocumentLike): ValidationError[];

  /**
   * Validate an OPC package for package-level (Pkg_*) constraints.
   *
   * Mirrors .NET `OpenXmlValidator.Validate(OpenXmlPackage)` at the OPC level.
   * Delegates to `validateOpcPackage()` internally.
   */
  validate(pkg: OpcPackageLike): ValidationError[];

  /**
   * Unified validate() implementation.
   * Dispatches to the appropriate internal method based on the argument type.
   */
  validate(
    rootOrDocOrPkg: OpenXmlElement | WordprocessingDocumentLike | OpcPackageLike,
    partUri?: string,
    rels?: IRelationshipCollection,
  ): ValidationError[] {
    // Dispatch based on runtime type
    if (isOpenXmlElement(rootOrDocOrPkg)) {
      return this._validateElement(rootOrDocOrPkg, partUri, rels);
    }
    if (isOpcPackageLike(rootOrDocOrPkg)) {
      return this.validateOpcPackage(rootOrDocOrPkg);
    }
    if (isWordprocessingDocumentLike(rootOrDocOrPkg)) {
      return this.validatePackage(rootOrDocOrPkg);
    }
    // Fallback: treat as element if nothing else matched
    return [];
  }

  /**
   * Internal element validation (Phase 1: structural + attribute).
   * Called by the unified validate() overload when the argument is an OpenXmlElement.
   *
   * @param root    Root element of the tree to validate.
   * @param partUri Optional part URI for error context (e.g. "/word/document.xml").
   * @param rels    Optional relationship collection for the part (enables Phase 2 relationship checks).
   */
  private _validateElement(
    root: OpenXmlElement,
    partUri?: string,
    rels?: IRelationshipCollection,
  ): ValidationError[] {
    const errors: ValidationError[] = [];
    try {
      // Strict-format documents are canonicalized to Transitional namespace URIs
      // at deserialization time (Epic-89), so they go through the same full
      // validation path as Transitional documents — no skip needed.
      this.walkElement(root, makePath("", root, 0), errors, partUri);
    } catch {
      // Safety net: validation must never throw
    }
    if (this.includeSemantic) {
      const semanticErrors = this.validateSemantic(root, partUri, rels);
      errors.push(...semanticErrors);
    }
    return errors.slice(0, this._maxNumberOfErrors);
  }

  private _enforceLimit(errors: ValidationError[]): ValidationError[] {
    if (errors.length > this._maxNumberOfErrors) {
      return errors.slice(0, this._maxNumberOfErrors);
    }
    return errors;
  }

  /**
   * Run Phase 2 schematron semantic validation only.
   * Returns Semantic ValidationErrors. Never throws.
   *
   * @param root         Root element of the tree to validate.
   * @param partUri      Optional part URI for error context.
   * @param rels         Optional relationship collection for relationship-type checks.
   * @param partResolver Optional cross-part resolver for 3.1/3.2 category rules.
   */
  validateSemantic(
    root: OpenXmlElement,
    partUri?: string,
    rels?: IRelationshipCollection,
    partResolver?: PartResolver,
  ): ValidationError[] {
    try {
      return evaluateSchematron(root, SCHEMATRON_RULES, rels, partUri, partResolver);
    } catch {
      // Safety net
      return [];
    }
  }

  private walkElement(
    el: OpenXmlElement,
    path: string,
    errors: ValidationError[],
    partUri: string | undefined,
  ): void {
    // MC (Markup Compatibility) validation — CompatibilityRuleAttributes + AlternateContent.
    // Runs for every element, independent of schema constraint lookup.
    errors.push(...validateMcElement(el, path, partUri));

    const constraint = lookupConstraint(el);

    // Sch_InvalidChildinLeafElement: an element that is known to be a leaf
    // (no particle in its constraint) must not contain children.
    // Mirrors .NET DocumentValidator.LeafElementValidateTest.
    if (
      constraint !== undefined &&
      constraint.particle === undefined &&
      el instanceof OpenXmlCompositeElement &&
      el.children.count > 0
    ) {
      errors.push(
        makeError(
          "Sch_InvalidChildinLeafElement",
          `The element <${el.qualifiedName}> is a leaf element and cannot contain children.`,
          el,
          path,
          partUri,
        ),
      );
    }

    // --- Attribute validation ---
    // Strict-format documents are canonicalized to Transitional URIs at
    // deserialization (Epic-89), so they follow the same full validation path.
    if (constraint !== undefined) {
      this.validateAttributes(el, constraint, path, errors, partUri);
    } else {
      // Fall back to codegen's validateRequired() if available
      this.validateRequiredViaCodegen(el, path, errors, partUri);
    }

    // --- Structural (particle) validation for composite elements ---
    if (el instanceof OpenXmlCompositeElement) {
      const children = [...el.children];

      if (constraint?.particle !== undefined) {
        this.validateParticle(el, constraint.particle, children, path, errors, partUri);
      }

      // Recurse into children
      let i = 0;
      for (const child of children) {
        this.walkElement(child, makePath(path, child, i), errors, partUri);
        i += 1;
      }
    }
  }

  private validateAttributes(
    el: OpenXmlElement,
    constraint: ElementConstraint,
    path: string,
    errors: ValidationError[],
    partUri: string | undefined,
  ): void {
    // (d) Required attributes (unconditional)
    for (const qname of constraint.requiredAttrs ?? []) {
      if (!this.attrIsPresent(el, qname)) {
        errors.push(
          makeError(
            "Sch_MissingRequiredAttribute",
            `Required attribute '${qname}' is missing on element <${el.qualifiedName}>.`,
            el,
            path,
            partUri,
          ),
        );
      }
    }

    // (d2) Version-conditional required attributes
    if (
      constraint.versionedRequiredAttrs !== undefined &&
      constraint.versionedRequiredAttrs.length > 0
    ) {
      const requiredQnames = resolveVersionedRequiredAttrs(
        constraint.versionedRequiredAttrs,
        this._fileFormat,
      );
      for (const qname of requiredQnames) {
        if (!this.attrIsPresent(el, qname)) {
          errors.push(
            makeError(
              "Sch_MissingRequiredAttribute",
              `Required attribute '${qname}' is missing on element <${el.qualifiedName}>.`,
              el,
              path,
              partUri,
            ),
          );
        }
      }
    }

    // (e) Attribute value constraints + type-specific validation
    // Group by qname for union-aware processing
    const constraintGroups = this.groupAttrConstraints(constraint.attrConstraints);
    for (const [, attrs] of constraintGroups) {
      const first = attrs[0];
      if (first === undefined) continue;
      const value = this.getAttrStringValue(el, first.qname);
      if (value === undefined) continue;

      // Evaluate all constraints for this attribute
      // If ANY passes (union semantics), the attribute is valid
      const attrErrors: ValidationError[] = [];
      let anyPassed = false;

      for (const ac of attrs) {
        const ev = this.evaluateSingleConstraint(el, ac, value, path, partUri);
        if (ev.length === 0) {
          anyPassed = true;
          break;
        }
        attrErrors.push(...ev);
      }

      if (anyPassed) continue; // Union or simple pass

      // All constraints failed: report at most one error
      const firstError = attrErrors[0];
      if (firstError !== undefined) {
        errors.push(firstError);
      }
    }

    // (g) Sch_UndeclaredAttribute: attributes present on the element but not
    // declared for this element at the current target version.
    // Only runs when knownAttrs is present on the constraint.
    if (constraint.knownAttrs !== undefined) {
      // Normalize qname: schema uses ":localName" for unprefixed attributes,
      // but extendedAttributes stores them without the leading colon.
      const normalizeQname = (q: string): string => (q.startsWith(":") ? q.slice(1) : q);

      const declaredSet = new Set(constraint.knownAttrs.map(normalizeQname));
      if (constraint.versionedKnownAttrs !== undefined) {
        for (const vk of constraint.versionedKnownAttrs) {
          if (meetsInitialVersion(this._fileFormat, vk.initialVersion)) {
            declaredSet.add(normalizeQname(vk.qname));
          }
        }
      }
      for (const ac of constraint.attrConstraints ?? []) declaredSet.add(normalizeQname(ac.qname));
      for (const ra of constraint.requiredAttrs ?? []) declaredSet.add(normalizeQname(ra));
      for (const vra of constraint.versionedRequiredAttrs ?? [])
        declaredSet.add(normalizeQname(vra.qname));

      for (const [key] of el.extendedAttributes) {
        if (key === "xmlns" || key.startsWith("xmlns:")) continue;
        if (key.startsWith("mc:")) continue;
        if (!declaredSet.has(key)) {
          errors.push(
            makeError(
              "Sch_UndeclaredAttribute",
              `The attribute '${key}' is not declared for element <${el.qualifiedName}>.`,
              el,
              path,
              partUri,
            ),
          );
        }
      }
    }
  }

  /**
   * Group attrConstraints by qname, preserving order within each group.
   */
  private groupAttrConstraints(
    attrs: readonly AttrConstraint[] | undefined,
  ): Map<string, AttrConstraint[]> {
    const groups = new Map<string, AttrConstraint[]>();
    for (const ac of attrs ?? []) {
      const arr = groups.get(ac.qname);
      if (arr === undefined) {
        groups.set(ac.qname, [ac]);
      } else {
        arr.push(ac);
      }
    }
    return groups;
  }

  /**
   * Evaluate a single AttrConstraint. Returns errors on failure, empty array on pass.
   */
  private evaluateSingleConstraint(
    el: OpenXmlElement,
    ac: AttrConstraint,
    value: string,
    path: string,
    partUri: string | undefined,
  ): ValidationError[] {
    const errs: ValidationError[] = [];
    const qname = ac.qname;
    const qn = el.qualifiedName;

    // ---- Version-aware: hexBinary + enumMembers (StylePaneSortMethods style) ----
    // When a constraint has both typeHint "hexBinary" and non-empty enumMembers,
    // the check is version-aware: hexBinary for Office2007, enum for Office2010+.
    if (ac.typeHint === "hexBinary" && ac.enumMembers !== undefined && ac.enumMembers.length > 0) {
      if (this._fileFormat === FileFormatVersions.Office2007) {
        // hexBinary check (Office2007 mode)
        if (!/^(?:[0-9a-fA-F]{2})*$/.test(value)) {
          errs.push(
            makeError(
              "Sch_AttributeValueDataTypeDetailed",
              `Attribute '${qname}' on <${qn}>: '${value}' is not a valid hexBinary value.`,
              el,
              path,
              partUri,
            ),
          );
        } else if (ac.length !== undefined && value.length !== ac.length * 2) {
          errs.push(
            makeError(
              "Sch_AttributeValueDataTypeDetailed",
              `Attribute '${qname}' on <${qn}>: hexBinary length ${value.length} does not match expected length ${ac.length * 2}.`,
              el,
              path,
              partUri,
            ),
          );
        }
      } else {
        // Enum check (Office2010+ mode, or conservative/undefined mode)
        if (!ac.enumMembers.includes(value)) {
          errs.push(
            makeError(
              "Sch_AttributeValueDataTypeDetailed",
              `Attribute '${qname}' on <${qn}>: value '${value}' is not valid (Enumeration constraint failed).`,
              el,
              path,
              partUri,
            ),
          );
        }
      }
      return errs; // Version-aware constraint handled; exit early
    }

    // ---- String length checks ----
    if (ac.maxLength !== undefined && value.length > ac.maxLength) {
      errs.push(
        makeError(
          "Sch_AttributeValueDataTypeDetailed",
          `Attribute '${qname}' on <${qn}>: string length ${value.length} exceeds MaxLength ${ac.maxLength}.`,
          el,
          path,
          partUri,
        ),
      );
    }
    if (ac.minLength !== undefined && value.length < ac.minLength) {
      errs.push(
        makeError(
          "Sch_AttributeValueDataTypeDetailed",
          `Attribute '${qname}' on <${qn}>: string length ${value.length} is less than MinLength ${ac.minLength}.`,
          el,
          path,
          partUri,
        ),
      );
    }

    // ---- Numeric range checks ----
    if (ac.maxValue !== undefined || ac.minValue !== undefined) {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        if (ac.minValue !== undefined && num < ac.minValue) {
          errs.push(
            makeError(
              "Sch_AttributeValueDataTypeDetailed",
              `Attribute '${qname}' on <${qn}>: value ${num} is less than MinInclusive ${ac.minValue}.`,
              el,
              path,
              partUri,
            ),
          );
        }
        if (ac.maxValue !== undefined && num > ac.maxValue) {
          errs.push(
            makeError(
              "Sch_AttributeValueDataTypeDetailed",
              `Attribute '${qname}' on <${qn}>: value ${num} exceeds MaxInclusive ${ac.maxValue}.`,
              el,
              path,
              partUri,
            ),
          );
        }
      }
    }

    // ---- Type-specific validation ----
    if (ac.typeHint !== undefined) {
      switch (ac.typeHint) {
        case "hexBinary": {
          if (!/^(?:[0-9a-fA-F]{2})*$/.test(value)) {
            errs.push(
              makeError(
                "Sch_AttributeValueDataTypeDetailed",
                `Attribute '${qname}' on <${qn}>: '${value}' is not a valid hexBinary value.`,
                el,
                path,
                partUri,
              ),
            );
          } else if (ac.length !== undefined && value.length !== ac.length * 2) {
            errs.push(
              makeError(
                "Sch_AttributeValueDataTypeDetailed",
                `Attribute '${qname}' on <${qn}>: hexBinary length ${value.length} does not match expected length ${ac.length * 2}.`,
                el,
                path,
                partUri,
              ),
            );
          }
          break;
        }
        case "base64Binary": {
          if (!isValidBase64(value)) {
            errs.push(
              makeError(
                "Sch_AttributeValueDataTypeDetailed",
                `Attribute '${qname}' on <${qn}>: '${value}' is not a valid base64Binary value.`,
                el,
                path,
                partUri,
              ),
            );
          }
          break;
        }
        case "enum": {
          if (ac.enumMembers !== undefined && !ac.enumMembers.includes(value)) {
            errs.push(
              makeError(
                "Sch_AttributeValueDataTypeDetailed",
                `Attribute '${qname}' on <${qn}>: value '${value}' is not valid (Enumeration constraint failed).`,
                el,
                path,
                partUri,
              ),
            );
          }
          break;
        }
        case "uint32": {
          const num = Number(value);
          if (
            Number.isNaN(num) ||
            !Number.isInteger(num) ||
            num < 0 ||
            num > 4294967295 ||
            !/^\d+$/.test(value)
          ) {
            errs.push(
              makeError(
                "Sch_AttributeValueDataTypeDetailed",
                `Attribute '${qname}' on <${qn}>: '${value}' is not a valid UInt32 value.`,
                el,
                path,
                partUri,
              ),
            );
          }
          break;
        }
        case "onOff": {
          if (!/^(?:true|false|on|off|1|0)$/i.test(value)) {
            errs.push(
              makeError(
                "Sch_AttributeValueDataTypeDetailed",
                `Attribute '${qname}' on <${qn}>: '${value}' is not a valid onOff value (expected true/false/on/off/1/0).`,
                el,
                path,
                partUri,
              ),
            );
          }
          break;
        }
        case "list": {
          // Basic list validation: check for empty items
          // Full item type validation requires schema type info not currently available
          if (value.split(/\s+/).some((item) => item.length === 0)) {
            errs.push(
              makeError(
                "Sch_AttributeValueDataTypeDetailed",
                `Attribute '${qname}' on <${qn}>: '${value}' contains empty items.`,
                el,
                path,
                partUri,
              ),
            );
          }
          break;
        }
      }
    }

    return errs;
  }

  /** Check attribute presence: extendedAttributes OR typed prop (via collectAttributes). */
  private attrIsPresent(el: OpenXmlElement, qname: string): boolean {
    const normalizedKey = qname.startsWith(":") ? qname.slice(1) : qname;
    if (el.extendedAttributes.has(normalizedKey)) return true;

    // For typed (codegen) elements, attributes are stored in typed properties rather than
    // extendedAttributes. The protected collectAttributes() method on each element returns
    // the union of typed props + extendedAttributes as [qname, value] pairs.
    // We access it via unknown to work around the TypeScript protected access guard.
    const asUnknown = el as unknown as { collectAttributes?: () => Array<[string, string]> };
    if (typeof asUnknown.collectAttributes === "function") {
      const attrs = asUnknown.collectAttributes.call(el);
      for (const [k] of attrs) {
        if (k === normalizedKey || k === qname) return true;
      }
    }

    return false;
  }

  /** Get string value of an attribute for constraint checking. */
  private getAttrStringValue(el: OpenXmlElement, qname: string): string | undefined {
    const normalizedKey = qname.startsWith(":") ? qname.slice(1) : qname;
    return el.extendedAttributes.get(normalizedKey);
  }

  /** Fallback: use codegen's validateRequired() for elements without registered constraints. */
  private validateRequiredViaCodegen(
    el: OpenXmlElement,
    path: string,
    errors: ValidationError[],
    partUri: string | undefined,
  ): void {
    const validate = (el as { validateRequired?: () => void }).validateRequired;
    if (typeof validate !== "function") return;
    try {
      validate.call(el);
    } catch (err) {
      const code = (err as { code?: string }).code ?? "REQUIRED_ATTR_MISSING";
      const message = (err as Error).message ?? String(err);
      errors.push(makeError(code, message, el, path, partUri));
    }
  }

  private validateParticle(
    parent: OpenXmlElement,
    particle: NormalizedParticle,
    children: OpenXmlElement[],
    path: string,
    errors: ValidationError[],
    partUri: string | undefined,
  ): void {
    // Apply version filter: remove particle items whose initialVersion is not met
    const filteredRoot = filterParticleByVersion(particle.root, this._fileFormat);
    const root =
      filteredRoot ??
      ({
        kind: "sequence",
        min: 1,
        max: 1,
        items: [],
      } as ParticleComposite);
    const allowed = collectAllowedLeaves(root);
    const expectedMsg = buildExpectedChildrenMsg(root);
    const hasAny = hasAnyParticle(root);
    const expectedClassNameByKey = collectExpectedClassNames(root);

    // --- xsd:all duplicate detection ---
    // Mirrors .NET AllParticleValidator.EmitInvalidElementError:
    // when a child whose type was already matched is encountered → Sch_AllElement.
    let allDuplicates: Set<string> | undefined;
    if (root.kind === "all") {
      allDuplicates = detectAllDuplicates(root as ParticleComposite, children);
    }

    // --- Sequence order pre-computation ---
    // For sequence particles, compute which children are out-of-order so we can emit
    // Sch_UnexpectedElementContentExpectingComplex per-child (mirrors .NET EmitInvalidElementError
    // which distinguishes "element IS known but wrong position" from "unknown element").
    let outOfSequenceKeys: Set<string> | undefined;
    if (root.kind === "sequence") {
      const orderErrors = checkSequenceOrder(root as ParticleComposite, children);
      if (orderErrors.length > 0) {
        outOfSequenceKeys = new Set(orderErrors.map((e) => e.outOfOrderChild));
      }
    }

    // (a) Per-child membership and position checks
    let ci = 0;
    const reportedAllDups = new Set<string>(); // avoid double-reporting xsd:all duplicates

    const mcNs = "http://schemas.openxmlformats.org/markup-compatibility/2006";

    for (const child of children) {
      // mc:* elements (AlternateContent, Choice, Fallback) are resolved by
      // the markup compatibility layer — invisible to schema particle validation.
      if (child.namespaceUri === mcNs) continue;

      const key = `${child.namespaceUri}::${child.localName}`;

      if (root.kind === "all" && allDuplicates?.has(key)) {
        // Sch_AllElement: element appears more than once in xsd:all.
        // Mirrors .NET AllParticleValidator.EmitInvalidElementError Partial/Matched case.
        if (!reportedAllDups.has(key)) {
          reportedAllDups.add(key);
          errors.push(
            makeError(
              "Sch_AllElement",
              `Element <${child.qualifiedName}> appears more than once under <${parent.qualifiedName}>; xsd:all allows at most one occurrence.`,
              parent,
              makePath(path, child, ci),
              partUri,
              child,
            ),
          );
        }
      } else if (hasAny) {
        // Skipped — accepted by xsd:any wildcard particle
      } else if (expectedClassNameByKey.has(key)) {
        const expectedCls = expectedClassNameByKey.get(key);
        // Only reject typed elements that don't match; generic/anonymous elements pass through.
        // A typed child whose class differs from expected → Sch_InvalidElementContentWrongType.
        // A generic child (anonymous class, OpenXmlUnknownElement, etc.) → accepted.
        const childClass = child.constructor.name;
        if (
          expectedCls !== undefined &&
          expectedCls !== childClass &&
          childClass.length > 0 &&
          childClass !== "OpenXmlUnknownElement"
        ) {
          errors.push(
            makeError(
              "Sch_InvalidElementContentWrongType",
              `Element <${child.qualifiedName}> appears under <${parent.qualifiedName}> but has wrong type '${child.constructor.name}' (expected '${expectedCls}').`,
              parent,
              makePath(path, child, ci),
              partUri,
              child,
            ),
          );
        }
        // Even when type matches, still check position (rPr after t in Run, etc.)
        if (outOfSequenceKeys?.has(key)) {
          errors.push(
            makeError(
              "Sch_UnexpectedElementContentExpectingComplex",
              `Element <${child.qualifiedName}> appears out of order under <${parent.qualifiedName}>. Expected: ${expectedMsg}.`,
              parent,
              makePath(path, child, ci),
              partUri,
              child,
            ),
          );
        }
      } else if (!allowed.has(key)) {
        // Sch_InvalidElementContentExpectingComplex: element tag not declared under parent at all.
        // Mirrors .NET EmitInvalidElementError: !element.CanContainChild(child) path.
        errors.push(
          makeError(
            "Sch_InvalidElementContentExpectingComplex",
            `Element <${child.qualifiedName}> is not allowed as a child of <${parent.qualifiedName}>. Expected: ${expectedMsg}.`,
            parent,
            makePath(path, child, ci),
            partUri,
            child,
          ),
        );
      } else if (outOfSequenceKeys?.has(key)) {
        // Sch_UnexpectedElementContentExpectingComplex: element IS declared under parent
        // but appears in the wrong sequence position.
        // Mirrors .NET EmitInvalidElementError: element.CanContainChild(child) path.
        errors.push(
          makeError(
            "Sch_UnexpectedElementContentExpectingComplex",
            `Element <${child.qualifiedName}> appears out of order under <${parent.qualifiedName}>. Expected: ${expectedMsg}.`,
            parent,
            makePath(path, child, ci),
            partUri,
            child,
          ),
        );
      }
      ci += 1;
    }

    // (b) Cardinality check (min/max occurs)
    const counts = countChildren(children);
    // Count unmatched children for any particles (children not matching any explicit leaf)
    let unmatchedCount = 0;
    if (hasAny) {
      for (const child of children) {
        const key = `${child.namespaceUri}::${child.localName}`;
        if (!allowed.has(key)) unmatchedCount++;
      }
    }
    const cardErrors = checkCardinalityNode(root, counts, unmatchedCount);
    for (const ce of cardErrors) {
      const maxStr = ce.max === "unbounded" ? "unbounded" : String(ce.max);
      if (ce.actual < ce.min) {
        // Missing required child: mirrors .NET Sch_IncompleteContentExpectingComplex
        const description = `Element <${parent.qualifiedName}> is missing required child element <${ce.local}> (expected at least ${ce.min}, found ${ce.actual}).`;
        errors.push(
          makeError("Sch_IncompleteContentExpectingComplex", description, parent, path, partUri),
        );
      } else {
        // Excess child (actual > max): mirrors .NET Sch_MinOccursInvalidElement
        const description = `Element <${parent.qualifiedName}> must contain at most ${maxStr} occurrence(s) of <${ce.local}> (found ${ce.actual}).`;
        errors.push(makeError("Sch_MinOccursInvalidElement", description, parent, path, partUri));
      }
    }
  }

  /**
   * Validate a WordprocessingDocument package (all parts + cross-part semantic rules).
   *
   * Mirrors .NET SDK's `OpenXmlValidator.Validate(OpenXmlPackage)`.
   * Runs Phase 1 structural + Phase 2 schematron (including 3.1 refExist and 3.2 indexedRef
   * cross-part categories) across all modeled parts of the document.
   *
   * Cross-part rules that reference parts not modeled in openxml-ts (e.g. Excel-specific
   * parts, EndnotesPart) are safely skipped — no false positives.
   *
   * @param doc WordprocessingDocument (or any object with a `getValidatableParts()` shape).
   * @returns   All validation errors found. Never throws.
   */
  validatePackage(doc: WordprocessingDocumentLike): ValidationError[] {
    const errors: ValidationError[] = [];
    try {
      const { parts, namedRoots } = getWordParts(doc);
      const partResolver = buildWordPartResolver(namedRoots);

      for (const entry of parts) {
        try {
          // Phase 1: structural validation
          const structural = this.validate(entry.root, entry.partUri);
          errors.push(...structural);

          // Phase 2: schematron semantic (including cross-part rules via partResolver)
          if (this.includeSemantic) {
            const semantic = this.validateSemantic(
              entry.root,
              entry.partUri,
              entry.rels,
              partResolver,
            );
            errors.push(...semantic);
          } else {
            // Always run semantic for validatePackage regardless of includeSemantic option
            const semantic = evaluateSchematron(
              entry.root,
              SCHEMATRON_RULES,
              entry.rels,
              entry.partUri,
              partResolver,
            );
            errors.push(...semantic);
          }
        } catch {
          // Individual part must not crash the whole validation
        }
      }
    } catch {
      // Safety net
    }
    return this._enforceLimit(errors);
  }

  /**
   * Validate an OPC package for package-level (Pkg_*) constraints.
   *
   * Mirrors .NET SDK's package-level validation that catches `Pkg_RequiredPartDoNotExist`
   * and related OPC spec violations.
   *
   * Checks:
   *  (j) [Content_Types].xml has a Default entry for "rels" extension — required by OPC spec
   *  (k) All internal relationship targets resolve to parts that actually exist in the package
   *  (l) The package root relationships include at least one internal relationship pointing to
   *      an existing main document part (officeDocument, presentation, workbook, etc.)
   *
   * @param pkg An OPC package exposed via the OpcPackageLike structural interface.
   * @returns   All package-level validation errors found. Never throws.
   */
  validateOpcPackage(pkg: OpcPackageLike): ValidationError[] {
    const errors: ValidationError[] = [];
    try {
      const partUris = new Set<string>();
      for (const part of pkg.parts()) {
        partUris.add(part.uri.toLowerCase());
      }

      // (j) [Content_Types].xml must have Default for "rels" extension
      if (!pkg.contentTypes.hasDefault("rels")) {
        errors.push(
          makeOpcError(
            "Pkg_RequiredPartDoNotExist",
            'The [Content_Types].xml is missing a required <Default Extension="rels"> entry. ' +
              "All OPC packages must declare a content type for .rels relationship parts.",
          ),
        );
      }

      // (k) + (l) Check all relationship collections (package root + each part)
      this.checkRelationshipTargets(pkg.relationships, partUris, errors);
      for (const part of pkg.parts()) {
        try {
          this.checkRelationshipTargets(part.relationships, partUris, errors);
        } catch {
          // Part relationship read must not crash the validator
        }
      }
    } catch {
      // Safety net
    }
    return this._enforceLimit(errors);
  }

  /** Check that all internal relationship targets exist in the package. */
  private checkRelationshipTargets(
    rels: IRelationshipCollection,
    partUris: Set<string>,
    errors: ValidationError[],
  ): void {
    for (const rel of rels) {
      if (rel.targetMode !== "internal") continue;
      // Skip fragment-only targets (e.g. "#_Bookmark1") — these are same-part anchors,
      // not references to separate parts in the package.
      if (rel.target.startsWith("#")) continue;
      // Resolve the relationship target to an absolute part URI.
      // OPC §9.3: targets are either absolute (start with "/") or relative to the
      // source part's "base URI" (the directory of the source part URI).
      // Strip fragment (anchor) from the target before lookup — a target like
      // "document.xml#section1" refers to the part "document.xml".
      const rawTarget = rel.target.includes("#")
        ? rel.target.slice(0, rel.target.indexOf("#"))
        : rel.target;
      if (rawTarget.length === 0) continue; // pure anchor (e.g. "#bookmark"), skip
      const targetUri = resolveOpcTarget(rel.sourceUri, rawTarget);
      if (!partUris.has(targetUri.toLowerCase())) {
        errors.push(
          makeOpcError(
            "Pkg_RequiredPartDoNotExist",
            `The part '${targetUri}' referenced by relationship '${rel.id}' (type: ${rel.type}) does not exist in the package.`,
          ),
        );
      }
    }
  }
}

// ---- OPC package validation interface ----

/**
 * Minimal structural interface that an OPC package must satisfy for `validateOpcPackage`.
 *
 * Both `MemoryOpenXmlPackage` and `ZipOpenXmlPackage` satisfy this interface structurally
 * (they expose `contentTypes`, `relationships`, and `parts()`).
 */
export interface OpcPackageLike {
  /**
   * Content-types manifest. Exposes `hasDefault(extension)` to check for required entries.
   * Structurally compatible with `ContentTypeManifest`.
   */
  readonly contentTypes: {
    hasDefault(extension: string): boolean;
  };

  /**
   * Package-root relationship collection (`/_rels/.rels`).
   * Structurally compatible with `IRelationshipCollection`.
   */
  readonly relationships: IRelationshipCollection;

  /**
   * Enumerate all parts in the package.
   * Each part exposes `uri` and `relationships`.
   */
  parts(): Iterable<{
    readonly uri: string;
    readonly relationships: IRelationshipCollection;
  }>;
}

// ---- Package-level validation helpers ----

/** Minimal interface for a typed Word part entry used by validatePackage. */
interface PartEntry {
  readonly root: OpenXmlElement;
  readonly partUri: string;
  readonly rels: IRelationshipCollection | undefined;
}

/**
 * Minimal interface that `WordprocessingDocument` must satisfy for `validatePackage`.
 * Using a structural interface keeps the validator decoupled from the word package.
 */
export interface WordprocessingDocumentLike {
  /** Main document part root element (w:document) and its part URI */
  readonly mainDocumentPart?:
    | {
        readonly document: OpenXmlElement;
        readonly part: { readonly uri: string; readonly relationships: IRelationshipCollection };
      }
    | undefined;
  /** Comments part (w:comments root) */
  readonly commentsPart?:
    | {
        readonly comments: OpenXmlElement;
        readonly part: { readonly uri: string; readonly relationships: IRelationshipCollection };
      }
    | undefined;
  /** Footnotes part (w:footnotes root) */
  readonly footnotesPart?:
    | {
        readonly footnotes: OpenXmlElement;
        readonly part: { readonly uri: string; readonly relationships: IRelationshipCollection };
      }
    | undefined;
  /** Styles part (w:styles root) */
  readonly stylesPart?:
    | {
        readonly styles: OpenXmlElement;
        readonly part: { readonly uri: string; readonly relationships: IRelationshipCollection };
      }
    | undefined;
  /** Numbering part (w:numbering root) */
  readonly numberingPart?:
    | {
        readonly numbering: OpenXmlElement;
        readonly part: { readonly uri: string; readonly relationships: IRelationshipCollection };
      }
    | undefined;
}

/**
 * Named part roots extracted from a WordprocessingDocument.
 * Used internally by buildWordPartResolver to map SDK Part references
 * to actual loaded part roots.
 */
interface WordPartRoots {
  commentsPart?: OpenXmlElement;
  footnotesPart?: OpenXmlElement;
}

/** Collect all loaded Word parts into PartEntry[] and a named-root map. */
function getWordParts(doc: WordprocessingDocumentLike): {
  parts: PartEntry[];
  namedRoots: WordPartRoots;
} {
  const parts: PartEntry[] = [];

  const add = (
    root: OpenXmlElement | undefined,
    partData: { uri: string; relationships: IRelationshipCollection } | undefined,
  ) => {
    if (root === undefined || partData === undefined) return;
    parts.push({ root, partUri: partData.uri, rels: partData.relationships });
  };

  add(doc.mainDocumentPart?.document, doc.mainDocumentPart?.part);
  add(doc.commentsPart?.comments, doc.commentsPart?.part);
  add(doc.footnotesPart?.footnotes, doc.footnotesPart?.part);
  add(doc.stylesPart?.styles, doc.stylesPart?.part);
  add(doc.numberingPart?.numbering, doc.numberingPart?.part);

  const namedRoots: WordPartRoots = {};
  if (doc.commentsPart?.comments !== undefined) namedRoots.commentsPart = doc.commentsPart.comments;
  if (doc.footnotesPart?.footnotes !== undefined)
    namedRoots.footnotesPart = doc.footnotesPart.footnotes;

  return { parts, namedRoots };
}

/** Build a PartResolver that maps SDK Part references to loaded part roots. */
function buildWordPartResolver(namedRoots: WordPartRoots): PartResolver {
  return {
    resolve(partRef: string): OpenXmlElement | undefined {
      // Part:. and Part:.. are handled inline by the walker (same-tree)
      if (partRef === "Part:." || partRef === "Part:..") return undefined;

      // Comments part (SDK names for Word comments)
      if (partRef === "Part:WordprocessingCommentsPart" || partRef === "Part:CommentsPart") {
        return namedRoots.commentsPart;
      }

      // Footnotes part (SDK names for Word footnotes)
      if (partRef === "Part:FootnotesPart" || partRef === "Part:/MainDocumentPart/FootnotesPart") {
        return namedRoots.footnotesPart;
      }

      // Endnotes part — not currently modeled in openxml-ts → skip safely (no false positive)
      if (partRef === "Part:/MainDocumentPart/EndnotesPart") {
        return undefined;
      }

      // All other part references (Excel, PPT, etc.) — not modeled → skip safely
      return undefined;
    },
  };
}

// ---- OPC URI resolution helper ----

/**
 * Resolve an OPC relationship target to an absolute part URI.
 *
 * OPC §9.3: A relative target is resolved against the "base URI" of the source part,
 * which is the directory portion of the source part's URI (i.e. everything up to
 * and including the last "/" in the source URI).
 *
 * For the package root ("/"), the base URI is "/".
 *
 * Examples:
 *   source="/", target="word/document.xml"          → "/word/document.xml"
 *   source="/word/document.xml", target="../styles.xml" → "/styles.xml"
 *   source="/ppt/slides/slide1.xml", target="../slideMasters/slideMaster1.xml"
 *                                                    → "/ppt/slideMasters/slideMaster1.xml"
 *   source="/", target="/slides/slide1.xml"         → "/slides/slide1.xml"  (already absolute)
 */
function resolveOpcTarget(sourceUri: string, target: string): string {
  // Absolute target — nothing to resolve
  if (target.startsWith("/")) return target;

  // Determine base directory of the source URI
  const lastSlash = sourceUri.lastIndexOf("/");
  const baseDir = lastSlash <= 0 ? "/" : sourceUri.slice(0, lastSlash + 1);

  // Combine base + relative target and normalize "." / ".." segments
  const combined = baseDir + target;

  // Normalize path segments
  const segments: string[] = [];
  for (const seg of combined.split("/")) {
    if (seg === "" || seg === ".") {
      // skip empty segments (except leading "/") and "." segments
    } else if (seg === "..") {
      segments.pop();
    } else {
      segments.push(seg);
    }
  }
  return `/${segments.join("/")}`;
}
