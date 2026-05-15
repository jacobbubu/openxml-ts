/**
 * `xsd:decimal` 属性值。对位 .NET `DecimalValue`。
 *
 * JS 无原生 decimal，本实现用 `number`——OOXML 实际用例的精度需求 IEEE 754
 * 双精度可容纳；若未来出现高精度场景再考虑替换为 string 内部表示。
 */

export class DecimalValue {
  constructor(public readonly value: number) {
    if (!Number.isFinite(value)) {
      throw new RangeError(`DecimalValue must be finite, got ${value}`);
    }
  }

  toString(): string {
    return String(this.value);
  }

  static parse(input: string | undefined): DecimalValue | undefined {
    if (input === undefined) return undefined;
    const trimmed = input.trim();
    if (trimmed.length === 0) return undefined;
    if (!/^-?\d+(?:\.\d+)?$/.test(trimmed)) return undefined;
    const n = Number.parseFloat(trimmed);
    if (!Number.isFinite(n)) return undefined;
    return new DecimalValue(n);
  }
}
