/**
 * `xsd:integer` 属性值（带符号 64 位整数）。对位 .NET `IntegerValue`。
 *
 * .NET `IntegerValue` 内部是 `long`（Int64），使用 BigInt 保精度。
 * 与 `Int64Value` 的区别：schema type 标识不同（`IntegerValue` vs `Int64Value`）。
 */

const MIN = -(2n ** 63n);
const MAX = 2n ** 63n - 1n;

export class IntegerValue {
  constructor(public readonly value: bigint) {
    if (value < MIN || value > MAX) {
      throw new RangeError(`IntegerValue out of range: ${value}`);
    }
  }

  toString(): string {
    return this.value.toString();
  }

  static parse(input: string | undefined): IntegerValue | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (v.length === 0 || !/^-?\d+$/.test(v)) return undefined;
    try {
      const n = BigInt(v);
      if (n < MIN || n > MAX) return undefined;
      return new IntegerValue(n);
    } catch {
      return undefined;
    }
  }
}
