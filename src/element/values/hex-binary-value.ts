/**
 * `xsd:hexBinary` 属性值（OOXML 大量 `rsid*` 字段就是这个）。对位 .NET `HexBinaryValue`。
 *
 * 内部存大写归一化的十六进制字符串；提供与 `Uint8Array` 的双向辅助。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

const HEX_RE = /^(?:[0-9a-fA-F]{2})*$/;

export class HexBinaryValue {
  /** 大写归一化字符串。 */
  public readonly value: string;

  constructor(hex: string) {
    if (!HEX_RE.test(hex)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `HexBinaryValue must be even-length hex, got "${hex}"`,
      });
    }
    this.value = hex.toUpperCase();
  }

  toString(): string {
    return this.value;
  }

  /** 解码为字节流。 */
  toBytes(): Uint8Array {
    const out = new Uint8Array(this.value.length / 2);
    for (let i = 0; i < out.length; i += 1) {
      out[i] = Number.parseInt(this.value.slice(i * 2, i * 2 + 2), 16);
    }
    return out;
  }

  static parse(input: string | undefined): HexBinaryValue | undefined {
    if (input === undefined) return undefined;
    const trimmed = input.trim();
    if (!HEX_RE.test(trimmed)) return undefined;
    return new HexBinaryValue(trimmed);
  }

  static fromBytes(bytes: Uint8Array): HexBinaryValue {
    let s = "";
    for (let i = 0; i < bytes.length; i += 1) {
      const b = bytes[i] ?? 0;
      s += b.toString(16).padStart(2, "0").toUpperCase();
    }
    return new HexBinaryValue(s);
  }
}
