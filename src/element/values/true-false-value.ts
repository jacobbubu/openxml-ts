/**
 * VML `t`/`f` 布尔属性值。对位 .NET `TrueFalseValue`。
 *
 * 接受：`"true"` / `"t"` → true；`"false"` / `"f"` → false。
 * 序列化：`"true"` / `"false"`（与 .NET `GetText` 一致）。
 */
export class TrueFalseValue {
  constructor(public readonly value: boolean) {}

  toString(): string {
    return this.value ? "true" : "false";
  }

  static parse(input: string | undefined): TrueFalseValue | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (v === "true" || v === "t") return new TrueFalseValue(true);
    if (v === "false" || v === "f") return new TrueFalseValue(false);
    return undefined;
  }
}
