/**
 * `xsd:short` 属性值（带符号 16 位整数，-32768 ~ 32767）。对位 .NET `Int16Value`。
 */

export class Int16Value {
  constructor(public readonly value: number) {
    if (!Number.isInteger(value) || value < -32768 || value > 32767) {
      throw new RangeError(`Int16Value out of range: ${value}`);
    }
  }

  toString(): string {
    return String(this.value);
  }

  static parse(input: string | undefined): Int16Value | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (!/^-?\d+$/.test(v)) return undefined;
    const n = Number.parseInt(v, 10);
    if (n < -32768 || n > 32767) return undefined;
    return new Int16Value(n);
  }
}
