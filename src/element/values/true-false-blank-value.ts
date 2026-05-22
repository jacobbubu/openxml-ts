/**
 * VML `t`/`f`/空串 布尔属性值。对位 .NET `TrueFalseBlankValue`。
 *
 * 接受：`"true"` / `"t"` → true；`"false"` / `"f"` / `""` → false。
 * 序列化：`"true"` / `"false"`（与 .NET `GetText` 一致）。
 */
export class TrueFalseBlankValue {
  constructor(public readonly value: boolean) {}

  toString(): string {
    return this.value ? "true" : "false";
  }

  static parse(input: string | undefined): TrueFalseBlankValue | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (v === "true" || v === "t") return new TrueFalseBlankValue(true);
    if (v === "false" || v === "f" || v === "") return new TrueFalseBlankValue(false);
    return undefined;
  }
}
