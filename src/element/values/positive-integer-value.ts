/**
 * `xsd:positiveInteger` 属性值（≥ 1 的整数）。对位 .NET `PositiveIntegerValue`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

const MIN_SAFE = 1;
const MAX_SAFE = 9_007_199_254_740_991; // Number.MAX_SAFE_INTEGER

export class PositiveIntegerValue {
  constructor(public readonly value: number) {
    if (!Number.isInteger(value) || value < MIN_SAFE || value > MAX_SAFE) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `PositiveIntegerValue out of range: ${value}`,
      });
    }
  }

  toString(): string {
    return String(this.value);
  }

  static fromString(s: string): PositiveIntegerValue {
    const v = Number(s);
    if (Number.isNaN(v)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `PositiveIntegerValue invalid: "${s}"`,
      });
    }
    return new PositiveIntegerValue(v);
  }
}
