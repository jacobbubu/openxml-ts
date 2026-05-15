/**
 * `xsd:boolean` 属性值。对位 .NET `BooleanValue` + `OnOffValue`（PRD §FR-2 将两者合并）。
 *
 * 序列化形态：固定 `"1"` / `"0"`（与 Microsoft Office 输出一致）。
 * 反序列化兼容：`"1"`/`"0"`/`"true"`/`"false"`/`"on"`/`"off"`，大小写无关。
 */
export class BooleanValue {
  constructor(public readonly value: boolean) {}

  toString(): string {
    return this.value ? "1" : "0";
  }

  static parse(input: string | undefined): BooleanValue | undefined {
    if (input === undefined) return undefined;
    const normalized = input.trim().toLowerCase();
    if (normalized === "1" || normalized === "true" || normalized === "on") {
      return new BooleanValue(true);
    }
    if (normalized === "0" || normalized === "false" || normalized === "off") {
      return new BooleanValue(false);
    }
    return undefined;
  }
}
