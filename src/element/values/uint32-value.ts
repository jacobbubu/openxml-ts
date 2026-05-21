/**
 * `xsd:unsignedInt` 属性值（0 ~ 2^32-1）。对位 .NET `UInt32Value`。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";
import { parseUniversalMeasureToTwips } from "./universal-measure.js";

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

  /**
   * 同时接受 ST_UniversalMeasure 格式（如 `467.50pt`、`2.54cm`）——
   * OOXML Strict 文档用该格式表示度量值，转换为 twips 后存入整数字段。
   * 负值结果（负 twips）不被 UInt32Value 接受，返回 `undefined`。
   */
  static parse(input: string | undefined): UInt32Value | undefined {
    if (input === undefined) return undefined;
    const trimmed = input.trim();
    if (trimmed.length === 0) return undefined;
    // Fast path: plain non-negative integer
    if (/^\d+$/.test(trimmed)) {
      const n = Number.parseInt(trimmed, 10);
      if (!Number.isInteger(n) || n < 0 || n > MAX) return undefined;
      return new UInt32Value(n);
    }
    // Fallback: ST_UniversalMeasure (e.g. "12.50pt") → twips
    const twips = parseUniversalMeasureToTwips(trimmed);
    if (twips === undefined || twips < 0 || twips > MAX) return undefined;
    return new UInt32Value(twips);
  }
}
