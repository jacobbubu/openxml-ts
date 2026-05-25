/**
 * ValidationError model for Epic-78 OpenXmlValidator Phase 1.
 *
 * Mirrors the .NET SDK's `OpenXmlValidator` / `ValidationErrorInfo` shape:
 * @see DocumentFormat.OpenXml.Validation.ValidationErrorInfo
 *
 * Phase 1: Schema (structural + attribute) errors only.
 * Phase 2 (future): Semantic (Schematron XPath rules) errors.
 */

import type { OpenXmlElement } from "../element/element.js";

/**
 * Classification of the validation error, mirroring .NET SDK.
 *
 * - `Schema`              — structural constraint violated (particle / attribute)
 * - `Semantic`            — Schematron rule violated (Phase 2, not yet implemented)
 * - `Package`             — OPC packaging constraint violated
 * - `MarkupCompatibility` — mc:AlternateContent / mc:Ignorable constraint violated
 */
export type ValidationErrorType = "Schema" | "Semantic" | "Package" | "MarkupCompatibility";

/**
 * A single validation error, returned from `OpenXmlValidator.validate()`.
 *
 * The validator never throws; all errors are collected and returned as an array.
 */
export interface ValidationError {
  /**
   * Short machine-readable error code, e.g.:
   *   `"Sch_InvalidElementContentExpectingComplex"`
   *   `"Sch_MissingRequiredAttribute"`
   *   `"Sch_UndeclaredAttribute"`
   */
  readonly id: string;

  /** Human-readable description of the error. */
  readonly description: string;

  /** Error classification (Schema / Semantic / Package / MarkupCompatibility). */
  readonly errorType: ValidationErrorType;

  /**
   * The element that caused the error.
   * For child-position errors, this is the *parent* element.
   * For attribute errors, this is the element owning the attribute.
   */
  readonly node: OpenXmlElement;

  /**
   * XPath-like path to the node for diagnostic display, e.g. `/document/body/p[0]/r[1]`.
   */
  readonly path: string;

  /**
   * The related part URI if the error was found while validating a specific package part.
   * Absent when validating a detached element tree.
   */
  readonly partUri?: string | undefined;

  /**
   * The related node that caused the error (mirrors .NET ErrorInfo.RelatedNode).
   * For child-position errors (Sch_UnexpectedElementContentExpectingComplex etc.),
   * this is the offending child element; `node` is the parent.
   */
  readonly relatedNode?: OpenXmlElement | undefined;
}
