/**
 * `xsd:token` 属性值（空白规范化字符串）。对位 .NET `TokenValue`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

export class TokenValue {
  constructor(public readonly value: string) {
    // xsd:token collapses whitespace — leading/trailing trimmed, internal runs collapsed
    const normalized = value.trim().replace(/\s+/g, " ");
    if (normalized.length === 0) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: "TokenValue cannot be empty after whitespace normalization.",
      });
    }
    this.value = normalized;
  }

  toString(): string {
    return this.value;
  }

  static fromString(s: string): TokenValue {
    return new TokenValue(s);
  }
}
