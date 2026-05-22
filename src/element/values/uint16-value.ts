/**
 * `xsd:unsignedShort` 属性值（0 ~ 65535）。对位 .NET `UInt16Value`。
 */

export class UInt16Value {
  constructor(public readonly value: number) {
    if (!Number.isInteger(value) || value < 0 || value > 65535) {
      throw new RangeError(`UInt16Value out of range: ${value}`);
    }
  }

  toString(): string {
    return String(this.value);
  }

  static parse(input: string | undefined): UInt16Value | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (!/^\d+$/.test(v)) return undefined;
    const n = Number.parseInt(v, 10);
    if (n < 0 || n > 65535) return undefined;
    return new UInt16Value(n);
  }
}
