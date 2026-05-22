/**
 * `xsd:byte` 属性值（带符号 8 位整数，-128 ~ 127）。对位 .NET `SByteValue`。
 */

export class SByteValue {
  constructor(public readonly value: number) {
    if (!Number.isInteger(value) || value < -128 || value > 127) {
      throw new RangeError(`SByteValue out of range: ${value}`);
    }
  }

  toString(): string {
    return String(this.value);
  }

  static parse(input: string | undefined): SByteValue | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (!/^-?\d+$/.test(v)) return undefined;
    const n = Number.parseInt(v, 10);
    if (n < -128 || n > 127) return undefined;
    return new SByteValue(n);
  }
}
