/**
 * `xsd:double` 属性值。对位 .NET `DoubleValue`。
 *
 * 使用 IEEE 754 双精度浮点；序列化遵循 XML 规范（`NaN`/`INF`/`-INF` 支持）。
 */

const XML_NAN = "NaN";
const XML_POS_INF = "INF";
const XML_NEG_INF = "-INF";

export class DoubleValue {
  constructor(public readonly value: number) {}

  toString(): string {
    if (Number.isNaN(this.value)) return XML_NAN;
    if (this.value === Number.POSITIVE_INFINITY) return XML_POS_INF;
    if (this.value === Number.NEGATIVE_INFINITY) return XML_NEG_INF;
    return String(this.value);
  }

  static parse(input: string | undefined): DoubleValue | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (v.length === 0) return undefined;
    if (v === XML_NAN) return new DoubleValue(Number.NaN);
    if (v === XML_POS_INF) return new DoubleValue(Number.POSITIVE_INFINITY);
    if (v === XML_NEG_INF) return new DoubleValue(Number.NEGATIVE_INFINITY);
    if (!/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(v)) return undefined;
    const n = Number(v);
    if (Number.isNaN(n)) return undefined;
    return new DoubleValue(n);
  }
}
