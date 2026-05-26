/**
 * `xsd:nonNegativeInteger` 属性值（≥ 0 的整数）。对位 .NET `NonNegativeIntegerValue`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

const MIN_SAFE = 0;
const MAX_SAFE = 9_007_199_254_740_991; // Number.MAX_SAFE_INTEGER

export class NonNegativeIntegerValue {
  constructor(public readonly value: number) {
    if (!Number.isInteger(value) || value < MIN_SAFE || value > MAX_SAFE) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `NonNegativeIntegerValue out of range: ${value}`,
      });
    }
  }

  toString(): string {
    return String(this.value);
  }

  static fromString(s: string): NonNegativeIntegerValue {
    const v = Number(s);
    if (Number.isNaN(v)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `NonNegativeIntegerValue invalid: "${s}"`,
      });
    }
    return new NonNegativeIntegerValue(v);
  }
}
