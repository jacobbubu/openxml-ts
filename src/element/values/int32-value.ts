/**
 * `xsd:int` 属性值（带符号 32 位整数）。对位 .NET `Int32Value`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

const MIN = -2_147_483_648;
const MAX = 2_147_483_647;

export class Int32Value {
  constructor(public readonly value: number) {
    if (!Number.isInteger(value) || value < MIN || value > MAX) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `Int32Value out of range: ${value}`,
      });
    }
  }

  toString(): string {
    return String(this.value);
  }

  /** 解析失败（非数字 / 越界 / 含小数）→ `undefined`，不抛错。 */
  static parse(input: string | undefined): Int32Value | undefined {
    if (input === undefined) return undefined;
    const trimmed = input.trim();
    if (trimmed.length === 0 || !/^-?\d+$/.test(trimmed)) return undefined;
    const n = Number.parseInt(trimmed, 10);
    if (!Number.isInteger(n) || n < MIN || n > MAX) return undefined;
    return new Int32Value(n);
  }
}
