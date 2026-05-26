/**
 * `xsd:ID` 属性值（XML 标识符）。对位 .NET `IdStringValue`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

const ID_RE = /^[A-Za-z_][\w.-]*$/;

export class IdValue {
  constructor(public readonly value: string) {
    if (value.length === 0 || !ID_RE.test(value)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `IdValue invalid: "${value}"`,
      });
    }
  }

  toString(): string {
    return this.value;
  }

  static fromString(s: string): IdValue {
    return new IdValue(s);
  }
}
