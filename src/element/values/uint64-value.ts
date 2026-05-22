/**
 * `xsd:unsignedLong` 属性值（0 ~ 2^64-1）。对位 .NET `UInt64Value`。
 *
 * 使用 BigInt 保证 53-bit 之上的整数不丢精度。
 */

const MAX = 2n ** 64n - 1n;

export class UInt64Value {
  constructor(public readonly value: bigint) {
    if (value < 0n || value > MAX) {
      throw new RangeError(`UInt64Value out of range: ${value}`);
    }
  }

  toString(): string {
    return this.value.toString();
  }

  static parse(input: string | undefined): UInt64Value | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (v.length === 0 || !/^\d+$/.test(v)) return undefined;
    try {
      const n = BigInt(v);
      if (n < 0n || n > MAX) return undefined;
      return new UInt64Value(n);
    } catch {
      return undefined;
    }
  }
}
