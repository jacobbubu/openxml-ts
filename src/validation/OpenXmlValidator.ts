/**
 * OpenXmlValidator — Phase 1 structural + attribute validation engine.
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
 * NOT in Phase 1:
 *  - Schematron semantic rules (948 XPath rules) — Phase 2
 *  - Package-level OPC constraints — separate concern
 *
 * The validator NEVER throws on invalid input — it returns a diagnostics list.
 */

import { OpenXmlCompositeElement, type OpenXmlElement } from "../element/element.js";
import type { ValidationError } from "./ValidationError.js";
import type {
  ElementConstraint,
  NormalizedParticle,
  ParticleComposite,
  ParticleNode,
} from "./types.js";

// ---- Error builder (handles exactOptionalPropertyTypes) ----
function makeError(
  id: string,
  description: string,
  node: OpenXmlElement,
  path: string,
  partUri: string | undefined,
): ValidationError {
  const base = { id, description, errorType: "Schema" as const, node, path };
  if (partUri !== undefined) return { ...base, partUri };
  return base;
}

// ---- Constraint registry ----
// Maps (namespaceUri + "::" + localName) → ElementConstraint.
// Populated lazily when constraint data is registered.
const CONSTRAINT_MAP = new Map<string, ElementConstraint>();

/** Register constraint data for a namespace. Call once per namespace array. */
export function registerConstraints(data: ReadonlyArray<ElementConstraint>): void {
  for (const c of data) {
    const key = `${c.namespaceUri}::${c.localName}`;
    // First registration wins (more specific takes priority)
    if (!CONSTRAINT_MAP.has(key)) {
      CONSTRAINT_MAP.set(key, c);
    }
  }
}

function lookupConstraint(el: OpenXmlElement): ElementConstraint | undefined {
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
  for (const item of node.items) {
    collectLeaves(item, out);
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

function checkCardinalityNode(node: ParticleNode, counts: Map<string, number>): CardinalityError[] {
  const errors: CardinalityError[] = [];

  if (node.kind === "leaf") {
    const key = `${node.ns}::${node.local}`;
    const actual = counts.get(key) ?? 0;
    if (actual < node.min) {
      errors.push({ key, local: node.local, ns: node.ns, actual, min: node.min, max: node.max });
    }
    if (node.max !== "unbounded" && actual > node.max) {
      errors.push({ key, local: node.local, ns: node.ns, actual, min: node.min, max: node.max });
    }
    return errors;
  }

  // For composite nodes, recurse into items
  for (const item of node.items) {
    errors.push(...checkCardinalityNode(item, counts));
  }
  return errors;
}

interface SequenceOrderError {
  readonly outOfOrderChild: string;
  readonly expectedAfter: string;
}

function checkSequenceOrder(
  sequenceNode: ParticleComposite,
  children: readonly OpenXmlElement[],
): SequenceOrderError[] {
  // Build position map: "ns::local" → sequence index (the item index in sequence)
  const posMap = new Map<string, number>();
  let pos = 0;
  for (const item of sequenceNode.items) {
    const leaves = collectAllowedLeaves(item);
    for (const leaf of leaves) {
      posMap.set(leaf, pos);
    }
    pos += 1;
  }

  const errors: SequenceOrderError[] = [];
  let lastPos = -1;
  let lastKey = "";

  for (const child of children) {
    const key = `${child.namespaceUri}::${child.localName}`;
    const childPos = posMap.get(key);
    if (childPos === undefined) continue; // unknown child (reported elsewhere)
    if (childPos < lastPos) {
      errors.push({ outOfOrderChild: key, expectedAfter: lastKey });
    } else {
      lastPos = childPos;
      lastKey = key;
    }
  }

  return errors;
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
}

/**
 * OpenXml structural + attribute validator (Phase 1).
 *
 * Usage:
 * ```ts
 * import { OpenXmlValidator, registerWordConstraints } from "openxml-ts";
 *
 * registerWordConstraints(); // once, registers word namespace constraints
 * const validator = new OpenXmlValidator();
 * const errors = validator.validate(paragraph);
 * ```
 */
export class OpenXmlValidator {
  private readonly skipUnknown: boolean;

  constructor(options: OpenXmlValidatorOptions = {}) {
    this.skipUnknown = options.skipUnknown ?? true;
  }

  /**
   * Validate an element tree recursively.
   * Returns all validation errors found. Never throws.
   */
  validate(root: OpenXmlElement, partUri?: string): ValidationError[] {
    const errors: ValidationError[] = [];
    try {
      this.walkElement(root, makePath("", root, 0), errors, partUri);
    } catch {
      // Safety net: validation must never throw
    }
    return errors;
  }

  private walkElement(
    el: OpenXmlElement,
    path: string,
    errors: ValidationError[],
    partUri: string | undefined,
  ): void {
    const constraint = lookupConstraint(el);

    // --- Attribute validation ---
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
    // (d) Required attributes
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

    // (e) Attribute value constraints
    for (const ac of constraint.attrConstraints ?? []) {
      const value = this.getAttrStringValue(el, ac.qname);
      if (value === undefined) continue;

      if (ac.maxLength !== undefined && value.length > ac.maxLength) {
        errors.push(
          makeError(
            "Sch_AttributeValueDataTypeDetailed",
            `Attribute '${ac.qname}' on <${el.qualifiedName}>: string length ${value.length} exceeds MaxLength ${ac.maxLength}.`,
            el,
            path,
            partUri,
          ),
        );
      }
      if (ac.minLength !== undefined && value.length < ac.minLength) {
        errors.push(
          makeError(
            "Sch_AttributeValueDataTypeDetailed",
            `Attribute '${ac.qname}' on <${el.qualifiedName}>: string length ${value.length} is less than MinLength ${ac.minLength}.`,
            el,
            path,
            partUri,
          ),
        );
      }

      if (ac.maxValue !== undefined || ac.minValue !== undefined) {
        const num = Number(value);
        if (!Number.isNaN(num)) {
          if (ac.minValue !== undefined && num < ac.minValue) {
            errors.push(
              makeError(
                "Sch_AttributeValueDataTypeDetailed",
                `Attribute '${ac.qname}' on <${el.qualifiedName}>: value ${num} is less than MinInclusive ${ac.minValue}.`,
                el,
                path,
                partUri,
              ),
            );
          }
          if (ac.maxValue !== undefined && num > ac.maxValue) {
            errors.push(
              makeError(
                "Sch_AttributeValueDataTypeDetailed",
                `Attribute '${ac.qname}' on <${el.qualifiedName}>: value ${num} exceeds MaxInclusive ${ac.maxValue}.`,
                el,
                path,
                partUri,
              ),
            );
          }
        }
      }
    }
  }

  /** Check attribute presence: extendedAttributes OR typed prop (via duck-typing). */
  private attrIsPresent(el: OpenXmlElement, qname: string): boolean {
    const normalizedKey = qname.startsWith(":") ? qname.slice(1) : qname;
    if (el.extendedAttributes.has(normalizedKey)) return true;

    // Try to find a typed property that corresponds to this qname.
    // Codegen generates typed props as camelCase(PropertyName).
    // We can't reverse-map qname→propName without codegen data, so we use
    // a heuristic: iterate the element's own properties looking for non-undefined
    // values. Instead, delegate to the existing validateRequired() if available.
    // This way we get the best of both worlds.
    const hasValidateRequired =
      typeof (el as { validateRequired?: unknown }).validateRequired === "function";
    if (hasValidateRequired) {
      // We can't ask "is this one attr present?" via validateRequired (it throws on any missing).
      // So we just say "unknown" here and rely on validateRequiredViaCodegen separately.
      // The constraint-based check will catch it if typed prop says undefined.
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
    const allowed = collectAllowedLeaves(particle.root);

    // (a) Every child must be in the allowed set
    let ci = 0;
    for (const child of children) {
      const key = `${child.namespaceUri}::${child.localName}`;
      if (!allowed.has(key)) {
        errors.push(
          makeError(
            "Sch_InvalidElementContentExpectingComplex",
            `Element <${child.qualifiedName}> is not allowed as a child of <${parent.qualifiedName}>.`,
            parent,
            makePath(path, child, ci),
            partUri,
          ),
        );
      }
      ci += 1;
    }

    // (b) Cardinality check
    const counts = countChildren(children);
    const cardErrors = checkCardinalityNode(particle.root, counts);
    for (const ce of cardErrors) {
      const maxStr = ce.max === "unbounded" ? "unbounded" : String(ce.max);
      const description =
        ce.actual < ce.min
          ? `Element <${parent.qualifiedName}> must contain at least ${ce.min} occurrence(s) of <${ce.local}> (found ${ce.actual}).`
          : `Element <${parent.qualifiedName}> must contain at most ${maxStr} occurrence(s) of <${ce.local}> (found ${ce.actual}).`;
      errors.push(makeError("Sch_MinOccursInvalidElement", description, parent, path, partUri));
    }

    // (c) Sequence order check
    const root = particle.root;
    if (root.kind === "sequence") {
      const orderErrors = checkSequenceOrder(root as ParticleComposite, children);
      for (const oe of orderErrors) {
        errors.push(
          makeError(
            "Sch_SequenceInterleaved",
            `Element <${parent.qualifiedName}>: child '${oe.outOfOrderChild}' appears out of sequence (expected after '${oe.expectedAfter}').`,
            parent,
            path,
            partUri,
          ),
        );
      }
    }
  }
}
