/**
 * `xsd:anyURI` 属性值。对位 .NET `AnyUriValue`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

export class AnyUriValue {
  constructor(public readonly value: string) {
    if (value.length === 0) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: "AnyUriValue cannot be empty.",
      });
    }
  }

  toString(): string {
    return this.value;
  }

  static fromString(s: string): AnyUriValue {
    return new AnyUriValue(s);
  }
}
