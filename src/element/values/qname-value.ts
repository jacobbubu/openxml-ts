/**
 * `xsd:QName` 属性值（带可选前缀的限定名）。对位 .NET `QNameValue`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

const QNAME_RE = /^([A-Za-z_][\w.-]*:)?[A-Za-z_][\w.-]*$/;

export class QNameValue {
  constructor(public readonly value: string) {
    if (value.length === 0 || !QNAME_RE.test(value)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `QNameValue invalid: "${value}"`,
      });
    }
  }

  toString(): string {
    return this.value;
  }

  static fromString(s: string): QNameValue {
    return new QNameValue(s);
  }
}
