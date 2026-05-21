/**
 * openxml-ts validation subsystem — Epic-78 Phase 1 + Epic-79 Phase 2.
 *
 * Exports:
 *  - `OpenXmlValidator`         — structural + attribute + (optional) semantic validator
 *  - `ValidationError`          — error model (type only)
 *  - `ValidationErrorType`      — error classification enum (type only)
 *  - `registerConstraints`      — low-level constraint registration
 *  - `registerWordConstraints`  — register word namespace constraints (lazy)
 *  - `registerExcelConstraints` — register excel namespace constraints (lazy)
 *  - `registerPptConstraints`   — register ppt namespace constraints (lazy)
 *  - `registerDrawingConstraints` — register drawing namespace constraints (lazy)
 *  - `registerAllConstraints`   — register all 4 core namespaces at once
 *  - `evaluateSchematron`       — Phase 2 schematron semantic evaluator (direct access)
 *  - `SCHEMATRON_RULES`         — generated rule array (948 rules categorised)
 *  - `SCHEMATRON_SOURCE_COUNT`  — original rule count
 *  - `SCHEMATRON_COVERED_COUNT` — rules with supported handlers
 *  - `SCHEMATRON_SKIPPED_COUNT` — rules requiring full XPath (skipped)
 *
 * Phase 2 semantic rules covered:
 *  - Relationship type/existence (r:id lookups)
 *  - Attribute uniqueness (count(distinct-values) patterns)
 *  - String-length attribute constraints
 *  - Numeric range attribute constraints
 */

export type { ValidationError, ValidationErrorType } from "./ValidationError.js";
export type {
  ElementConstraint,
  AttrConstraint,
  NormalizedParticle,
  ParticleNode,
  ParticleLeaf,
  ParticleComposite,
} from "./types.js";
export {
  OpenXmlValidator,
  registerConstraints,
  type OpenXmlValidatorOptions,
} from "./OpenXmlValidator.js";
export {
  evaluateSchematron,
  resetRuleIndex,
  SCHEMATRON_RULES,
  SCHEMATRON_SOURCE_COUNT,
  SCHEMATRON_COVERED_COUNT,
  SCHEMATRON_SKIPPED_COUNT,
} from "./schematron/index.js";
export type {
  SchematronRule,
  RelationshipRule,
  UniquenessRule,
  StringLengthRule,
  NumericRangeRule,
  UnsupportedRule,
} from "./schematron/index.js";

// Lazy registration helpers — each function imports the constraint data once
// and registers it into the global constraint map. Calling multiple times is safe
// (idempotent due to first-registration-wins in registerConstraints).

let wordRegistered = false;
/** Register word (wordprocessingml/2006/main) namespace constraints. */
export async function registerWordConstraints(): Promise<void> {
  if (wordRegistered) return;
  wordRegistered = true;
  const { constraints } = await import("./constraints/word.js");
  const { registerConstraints } = await import("./OpenXmlValidator.js");
  registerConstraints(constraints);
}

let excelRegistered = false;
/** Register excel (spreadsheetml/2006/main) namespace constraints. */
export async function registerExcelConstraints(): Promise<void> {
  if (excelRegistered) return;
  excelRegistered = true;
  const { constraints } = await import("./constraints/excel.js");
  const { registerConstraints } = await import("./OpenXmlValidator.js");
  registerConstraints(constraints);
}

let pptRegistered = false;
/** Register ppt (presentationml/2006/main) namespace constraints. */
export async function registerPptConstraints(): Promise<void> {
  if (pptRegistered) return;
  pptRegistered = true;
  const { constraints } = await import("./constraints/ppt.js");
  const { registerConstraints } = await import("./OpenXmlValidator.js");
  registerConstraints(constraints);
}

let drawingRegistered = false;
/** Register drawing (drawingml/2006/main) namespace constraints. */
export async function registerDrawingConstraints(): Promise<void> {
  if (drawingRegistered) return;
  drawingRegistered = true;
  const { constraints } = await import("./constraints/drawing.js");
  const { registerConstraints } = await import("./OpenXmlValidator.js");
  registerConstraints(constraints);
}

/** Register all 4 core namespace constraints (word, excel, ppt, drawing). */
export async function registerAllConstraints(): Promise<void> {
  await Promise.all([
    registerWordConstraints(),
    registerExcelConstraints(),
    registerPptConstraints(),
    registerDrawingConstraints(),
  ]);
}
