/**
 * VML/Office `on`/`off` 布尔属性值。对位 .NET `OnOffValue`。
 *
 * 接受：`"true"` / `"1"` / `"on"` → true；`"false"` / `"0"` / `"off"` → false。
 * 序列化：`"true"` / `"false"`（与 .NET `GetText` 一致）。
 */
export class OnOffValue {
  constructor(public readonly value: boolean) {}

  toString(): string {
    return this.value ? "true" : "false";
  }

  static parse(input: string | undefined): OnOffValue | undefined {
    if (input === undefined) return undefined;
    const v = input.trim();
    if (v === "true" || v === "1" || v === "on") return new OnOffValue(true);
    if (v === "false" || v === "0" || v === "off") return new OnOffValue(false);
    return undefined;
  }
}
