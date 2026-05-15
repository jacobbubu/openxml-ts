/**
 * `xsd:string` 属性值。对位 .NET `StringValue`。
 *
 * 不做长度限制——具体上限由 codegen 注入的 `StringValidator` 在 setter 处理（Story-2.7）。
 */
export class StringValue {
  constructor(public readonly value: string) {}

  toString(): string {
    return this.value;
  }

  static parse(input: string | undefined): StringValue | undefined {
    return input === undefined ? undefined : new StringValue(input);
  }
}
