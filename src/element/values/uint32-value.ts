/**
 * `xsd:unsignedInt` 属性值（0 ~ 2^32-1）。对位 .NET `UInt32Value`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

const MAX = 4_294_967_295;

export class UInt32Value {
  constructor(public readonly value: number) {
    if (!Number.isInteger(value) || value < 0 || value > MAX) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `UInt32Value out of range: ${value}`,
      });
    }
  }

  toString(): string {
    return String(this.value);
  }

  static parse(input: string | undefined): UInt32Value | undefined {
    if (input === undefined) return undefined;
    const trimmed = input.trim();
    if (trimmed.length === 0 || !/^\d+$/.test(trimmed)) return undefined;
    const n = Number.parseInt(trimmed, 10);
    if (!Number.isInteger(n) || n < 0 || n > MAX) return undefined;
    return new UInt32Value(n);
  }
}
