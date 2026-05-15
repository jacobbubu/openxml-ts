/**
 * `xsd:long` 属性值（带符号 64 位整数）。对位 .NET `Int64Value`。
 *
 * 使用 BigInt 保证 53-bit 之上的整数不丢精度。
 */

const MIN = -(2n ** 63n);
const MAX = 2n ** 63n - 1n;

export class Int64Value {
  constructor(public readonly value: bigint) {
    if (value < MIN || value > MAX) {
      throw new RangeError(`Int64Value out of range: ${value}`);
    }
  }

  toString(): string {
    return this.value.toString();
  }

  static parse(input: string | undefined): Int64Value | undefined {
    if (input === undefined) return undefined;
    const trimmed = input.trim();
    if (trimmed.length === 0 || !/^-?\d+$/.test(trimmed)) return undefined;
    try {
      const n = BigInt(trimmed);
      if (n < MIN || n > MAX) return undefined;
      return new Int64Value(n);
    } catch {
      return undefined;
    }
  }
}
