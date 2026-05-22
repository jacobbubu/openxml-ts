/**
 * `xsd:float` 属性值（单精度浮点）。对位 .NET `SingleValue`。
 *
 * JS 无原生 float32；内部存 number，parse/toString 与 DoubleValue 规范相同。
 */

const XML_NAN = "NaN";
const XML_POS_INF = "INF";
const XML_NEG_INF = "-INF";

export class SingleValue {
  constructor(public readonly value: number) {}

  toString(): string {
    if (Number.isNaN(this.value)) return XML_NAN;
    if (this.value === Number.POSITIVE_INFINITY) return XML_POS_INF;
    if (this.value === Number.NEGATIVE_INFINITY) return XML_NEG_INF;
    return String(this.value);
  }

  static parse(input: string | undefined): SingleValue | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (v.length === 0) return undefined;
    if (v === XML_NAN) return new SingleValue(Number.NaN);
    if (v === XML_POS_INF) return new SingleValue(Number.POSITIVE_INFINITY);
    if (v === XML_NEG_INF) return new SingleValue(Number.NEGATIVE_INFINITY);
    if (!/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(v)) return undefined;
    const n = Number(v);
    if (Number.isNaN(n)) return undefined;
    return new SingleValue(n);
  }
}
