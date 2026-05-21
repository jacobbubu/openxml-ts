/**
 * `xsd:int` 属性值（带符号 32 位整数）。对位 .NET `Int32Value`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";
import { parseUniversalMeasureToTwips } from "./universal-measure.js";

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

  /**
   * 解析失败（非数字 / 越界 / 含小数）→ `undefined`，不抛错。
   *
   * 同时接受 ST_UniversalMeasure 格式（如 `467.50pt`、`2.54cm`）——
   * OOXML Strict 文档用该格式表示度量值，转换为 twips 后存入整数字段。
   */
  static parse(input: string | undefined): Int32Value | undefined {
    if (input === undefined) return undefined;
    const trimmed = input.trim();
    if (trimmed.length === 0) return undefined;
    // Fast path: plain integer
    if (/^-?\d+$/.test(trimmed)) {
      const n = Number.parseInt(trimmed, 10);
      if (!Number.isInteger(n) || n < MIN || n > MAX) return undefined;
      return new Int32Value(n);
    }
    // Fallback: ST_UniversalMeasure (e.g. "467.50pt") → twips
    const twips = parseUniversalMeasureToTwips(trimmed);
    if (twips === undefined) return undefined;
    if (twips < MIN || twips > MAX) return undefined;
    return new Int32Value(twips);
  }
}
