/**
 * Markup Compatibility (MC) validator.
 *
 * Ported from .NET Open XML SDK:
 *   AlternateContentValidator.cs
 *   CompatibilityRuleAttributesValidator.cs
 *
 * Reference: ECMA-376 Part 5: Markup Compatibility and Extensibility.
 */

import { OpenXmlCompositeElement, type OpenXmlElement } from "../element/element.js";
import type { ValidationError } from "./ValidationError.js";

const MC_NS = "http://schemas.openxmlformats.org/markup-compatibility/2006";

// ── Context for threading path/partUri ──────────────────────────────────────

interface McContext {
  path: string;
  partUri: string | undefined;
  errors: ValidationError[];
}

function push(ctx: McContext, id: string, description: string, node: OpenXmlElement): void {
  ctx.errors.push({
    id,
    description,
    errorType: "MarkupCompatibility",
    node,
    path: ctx.path,
    partUri: ctx.partUri,
  });
}

// ── Namespace resolution ────────────────────────────────────────────────────

function lookupNamespace(el: OpenXmlElement, prefix: string): string | undefined {
  for (let cur: OpenXmlElement | null = el; cur !== null; cur = cur.parent ?? null) {
    const key = prefix.length === 0 ? "xmlns" : `xmlns:${prefix}`;
    const val = cur.extendedAttributes.get(key);
    if (val !== undefined) {
      return val.length > 0 ? val : undefined;
    }
  }
  return undefined;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function parsePrefixList(value: string | undefined): string[] {
  if (value === undefined || value.trim().length === 0) return [];
  return value.trim().split(/\s+/);
}

function buildIgnorableSet(el: OpenXmlElement): Set<string> | undefined {
  const ignorable = el.extendedAttributes.get("mc:Ignorable");
  const prefixes = parsePrefixList(ignorable);
  if (prefixes.length === 0) return undefined;
  const set = new Set<string>();
  for (const prefix of prefixes) {
    const ns = lookupNamespace(el, prefix);
    if (ns !== undefined) set.add(ns);
  }
  return set.size > 0 ? set : undefined;
}

function validateQNameList(
  el: OpenXmlElement,
  qnameList: string,
  ignorableUris: Set<string>,
): string | undefined {
  const qnames = qnameList.trim().split(/\s+/);
  for (const qname of qnames) {
    if (qname.length === 0) continue;
    const colonIdx = qname.indexOf(":");
    if (colonIdx <= 0) return qname;
    const prefix = qname.substring(0, colonIdx);
    const ns = lookupNamespace(el, prefix);
    if (ns === undefined) return qname;
    if (!ignorableUris.has(ns)) return qname;
  }
  return undefined;
}

// ── MC attribute validation ─────────────────────────────────────────────────

function validateMcAttrs(el: OpenXmlElement, ctx: McContext): void {
  const ignorableVal = el.extendedAttributes.get("mc:Ignorable");

  if (ignorableVal !== undefined) {
    const prefixes = parsePrefixList(ignorableVal);
    for (const prefix of prefixes) {
      const ns = lookupNamespace(el, prefix);
      if (ns === undefined) {
        push(
          ctx,
          "MC_InvalidIgnorableAttribute",
          `The Ignorable attribute is invalid — the value '${ignorableVal}' contains an invalid prefix that is not defined.`,
          el,
        );
        break;
      }
    }
  }

  const ignorableUris = buildIgnorableSet(el);

  const preserveElements = el.extendedAttributes.get("mc:PreserveElements");
  if (preserveElements !== undefined && preserveElements.trim().length > 0) {
    if (ignorableUris === undefined || ignorableUris.size === 0) {
      push(
        ctx,
        "MC_InvalidPreserveElementsAttribute",
        `The PreserveElements attribute is invalid — the value '${preserveElements}' references elements that are not in the Ignorable list.`,
        el,
      );
    } else {
      const bad = validateQNameList(el, preserveElements, ignorableUris);
      if (bad !== undefined) {
        push(
          ctx,
          "MC_InvalidPreserveElementsAttribute",
          `The PreserveElements attribute is invalid — '${bad}' is not defined or not in the Ignorable list.`,
          el,
        );
      }
    }
  }

  const preserveAttrs = el.extendedAttributes.get("mc:PreserveAttributes");
  if (preserveAttrs !== undefined && preserveAttrs.trim().length > 0) {
    if (ignorableUris === undefined || ignorableUris.size === 0) {
      push(
        ctx,
        "MC_InvalidPreserveAttributesAttribute",
        `The PreserveAttributes attribute is invalid — the value '${preserveAttrs}' references attributes that are not in the Ignorable list.`,
        el,
      );
    } else {
      const bad = validateQNameList(el, preserveAttrs, ignorableUris);
      if (bad !== undefined) {
        push(
          ctx,
          "MC_InvalidPreserveAttributesAttribute",
          `The PreserveAttributes attribute is invalid — '${bad}' is not defined or not in the Ignorable list.`,
          el,
        );
      }
    }
  }

  const processContent = el.extendedAttributes.get("mc:ProcessContent");
  if (processContent !== undefined && processContent.trim().length > 0) {
    if (ignorableUris === undefined || ignorableUris.size === 0) {
      push(
        ctx,
        "MC_InvalidProcessContentAttribute",
        `The ProcessContent attribute is invalid — the value '${processContent}' references elements that are not in the Ignorable list.`,
        el,
      );
    } else {
      const bad = validateQNameList(el, processContent, ignorableUris);
      if (bad !== undefined) {
        push(
          ctx,
          "MC_InvalidProcessContentAttribute",
          `The ProcessContent attribute is invalid — '${bad}' is not defined or not in the Ignorable list.`,
          el,
        );
      }
    }

    for (const [k] of el.extendedAttributes) {
      if (k === "xml:space" || k === "xml:lang") {
        push(
          ctx,
          "MC_InvalidXmlAttributeWithProcessContent",
          "An element with ProcessContent should not have an xml:lang or xml:space attribute.",
          el,
        );
      }
    }
  }

  const mustUnderstand = el.extendedAttributes.get("mc:MustUnderstand");
  if (mustUnderstand !== undefined && mustUnderstand.trim().length > 0) {
    const prefixes = parsePrefixList(mustUnderstand);
    for (const prefix of prefixes) {
      const ns = lookupNamespace(el, prefix);
      if (ns === undefined) {
        push(
          ctx,
          "MC_InvalidMustUnderstandAttribute",
          `The MustUnderstand attribute is invalid — the value '${mustUnderstand}' contains an invalid prefix that is not defined.`,
          el,
        );
        break;
      }
    }
  }
}

// ── AlternateContent structure validation ───────────────────────────────────

function validateChoice(el: OpenXmlElement, ctx: McContext): void {
  validateMcAttrs(el, ctx);

  for (const [k] of el.extendedAttributes) {
    if (k === "xml:lang" || k === "xml:space") {
      push(
        ctx,
        "MC_InvalidXmlAttribute",
        "The Choice element should not have an xml:lang or xml:space attribute.",
        el,
      );
    }
  }

  const requires =
    el.extendedAttributes.get("Requires") ?? el.extendedAttributes.get("mc:Requires");
  if (requires === undefined || requires.trim().length === 0) {
    push(
      ctx,
      "MC_MissedRequiresAttribute",
      "All Choice elements must have a Requires attribute whose value contains a whitespace delimited list of namespace prefixes.",
      el,
    );
  } else {
    const prefixes = parsePrefixList(requires);
    for (const p of prefixes) {
      if (lookupNamespace(el, p) === undefined) {
        push(
          ctx,
          "MC_InvalidRequiresAttribute",
          `The Requires attribute is invalid - The value '${requires}' contains an invalid prefix that is not defined.`,
          el,
        );
        break;
      }
    }
  }
}

function validateFallback(el: OpenXmlElement, ctx: McContext): void {
  validateMcAttrs(el, ctx);

  for (const [k] of el.extendedAttributes) {
    if (k === "xml:lang" || k === "xml:space") {
      push(
        ctx,
        "MC_InvalidXmlAttribute",
        "The Fallback element should not have an xml:lang or xml:space attribute.",
        el,
      );
    }
  }
}

function validateAcb(el: OpenXmlElement, ctx: McContext): void {
  validateMcAttrs(el, ctx);

  for (const [k] of el.extendedAttributes) {
    if (k === "xml:lang" || k === "xml:space") {
      push(
        ctx,
        "MC_InvalidXmlAttribute",
        "The AlternateContent element should not have an xml:lang or xml:space attribute.",
        el,
      );
    }
  }

  // Filter to direct mc:* children only (non-mc children may exist)
  const mcChildren =
    el instanceof OpenXmlCompositeElement
      ? el.children.toArray().filter((c) => c.namespaceUri === MC_NS)
      : [];

  if (mcChildren.length === 0) {
    push(
      ctx,
      "Sch_IncompleteContentExpectingComplex",
      "An AlternateContent element shall contain one or more Choice child elements.",
      el,
    );
    return;
  }

  let status: 0 | 1 | 2 = 0; // 0=expect-first-choice, 1=in-choices, 2=had-fallback
  let _hasChoice = false;

  for (const child of mcChildren) {
    const local = child.localName;

    if (local === "AlternateContent") {
      push(
        ctx,
        "Sch_InvalidElementContentExpectingComplex",
        "An AlternateContent element shall not be the child of an AlternateContent element.",
        el,
      );
      continue;
    }

    if (local === "Choice") {
      _hasChoice = true;
      if (status === 2) {
        push(
          ctx,
          "Sch_InvalidElementContentExpectingComplex",
          "An AlternateContent element contains a Choice after a Fallback child element.",
          el,
        );
      }
      status = 1;
      validateChoice(child, ctx);
    } else if (local === "Fallback") {
      if (status === 0) {
        // Fallback before any Choice
        push(
          ctx,
          "Sch_IncompleteContentExpectingComplex",
          "An AlternateContent element shall contain one or more Choice child elements.",
          el,
        );
      }
      if (status === 2) {
        push(
          ctx,
          "Sch_InvalidElementContentExpectingComplex",
          "An AlternateContent element shall contain at most one Fallback child element.",
          el,
        );
      }
      status = 2;
      validateFallback(child, ctx);
    } else {
      // Unknown mc child
      if (status === 0) {
        push(
          ctx,
          "Sch_IncompleteContentExpectingComplex",
          "An AlternateContent element shall contain one or more Choice child elements.",
          el,
        );
      } else {
        push(
          ctx,
          "Sch_InvalidElementContentExpectingComplex",
          `Element <mc:${child.localName}> is not allowed as a child of AlternateContent.`,
          el,
        );
      }
    }
  }
}

// ── Public entry point ──────────────────────────────────────────────────────

export function validateMcElement(
  el: OpenXmlElement,
  path: string,
  partUri: string | undefined,
): ValidationError[] {
  const ctx: McContext = { path, partUri, errors: [] };

  // MC attribute validation on any element that has mc:* attributes
  let hasMcAttrs = false;
  for (const [k] of el.extendedAttributes) {
    if (k.startsWith("mc:")) {
      hasMcAttrs = true;
      break;
    }
  }
  if (hasMcAttrs) {
    validateMcAttrs(el, ctx);
  }

  // AlternateContent structure validation
  if (el.namespaceUri === MC_NS && el.localName === "AlternateContent") {
    validateAcb(el, ctx);
  }

  return ctx.errors;
}
