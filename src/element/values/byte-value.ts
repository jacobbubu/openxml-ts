/**
 * `xsd:unsignedByte` 属性值（0 ~ 255）。对位 .NET `ByteValue`。
 */

export class ByteValue {
  constructor(public readonly value: number) {
    if (!Number.isInteger(value) || value < 0 || value > 255) {
      throw new RangeError(`ByteValue out of range: ${value}`);
    }
  }

  toString(): string {
    return String(this.value);
  }

  static parse(input: string | undefined): ByteValue | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (!/^\d+$/.test(v)) return undefined;
    const n = Number.parseInt(v, 10);
    if (n < 0 || n > 255) return undefined;
    return new ByteValue(n);
  }
}
