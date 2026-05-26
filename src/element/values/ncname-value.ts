/**
 * `xsd:NCName` 属性值（非冒号 XML 名称）。对位 .NET `NcNameValue`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

const NCNAME_RE = /^[A-Za-z_][\w.-]*$/;

export class NcNameValue {
  constructor(public readonly value: string) {
    if (value.length === 0 || !NCNAME_RE.test(value)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `NcNameValue invalid: "${value}"`,
      });
    }
  }

  toString(): string {
    return this.value;
  }

  static fromString(s: string): NcNameValue {
    return new NcNameValue(s);
  }
}
