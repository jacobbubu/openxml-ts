/**
 * Schematron semantic validation — Epic-79 Phase 2.
 *
 * Exports:
 *  - SCHEMATRON_RULES        — full categorised rule array (generated)
 *  - SCHEMATRON_SOURCE_COUNT — original rule count from schematrons.json
 *  - SCHEMATRON_COVERED_COUNT — rules with supported handler kinds
 *  - SCHEMATRON_SKIPPED_COUNT — rules skipped (unsupported XPath)
 *  - evaluateSchematron      — evaluate rules against an element tree
 *  - resetRuleIndex          — reset cached rule index (testing)
 */

export {
  SCHEMATRON_RULES,
  SCHEMATRON_SOURCE_COUNT,
  SCHEMATRON_COVERED_COUNT,
  SCHEMATRON_SKIPPED_COUNT,
} from "./rules.js";
export type {
  SchematronRule,
  RelationshipRule,
  UniquenessRule,
  StringLengthRule,
  NumericRangeRule,
  UnsupportedRule,
} from "./rules.js";
export { evaluateSchematron, resetRuleIndex } from "./evaluator.js";
