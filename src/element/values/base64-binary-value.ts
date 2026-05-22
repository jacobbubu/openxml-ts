/**
 * `xsd:base64Binary` 属性值。对位 .NET `Base64BinaryValue`。
 *
 * 内部存 base64 字符串（原样保留，不归一化空白）；提供与 `Uint8Array` 的双向辅助。
 */

export class Base64BinaryValue {
  constructor(public readonly value: string) {}

  toString(): string {
    return this.value;
  }

  /** 解码为字节流。若字符串非合法 base64 则抛 `DOMException` / `Error`。 */
  toBytes(): Uint8Array {
    const binary = atob(this.value);
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      out[i] = binary.charCodeAt(i);
    }
    return out;
  }

  /**
   * 解析 base64 字符串。非法 base64 → `undefined`（不抛）。
   * 空字符串是合法的空 base64 值。
   */
  static parse(input: string | undefined): Base64BinaryValue | undefined {
    if (input === undefined) return undefined;
    // Allow empty string (zero-length binary)
    if (input.length === 0) return new Base64BinaryValue("");
    try {
      atob(input);
      return new Base64BinaryValue(input);
    } catch {
      return undefined;
    }
  }

  /** 将字节流编码为 base64 并包装。 */
  static fromBytes(bytes: Uint8Array): Base64BinaryValue {
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i] ?? 0);
    }
    return new Base64BinaryValue(btoa(binary));
  }
}
