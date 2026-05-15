/**
 * 枚举类型属性值。对位 .NET `EnumValue<T>`。
 *
 * `T` 是字面量联合（如 `"start" | "center" | "end"`）；codegen 同时为每个枚举
 * 输出对应的 const tuple 让 runtime 校验有据可查。
 *
 * 示例：
 * ```ts
 * const ALIGN = ["start", "center", "end"] as const;
 * type Align = (typeof ALIGN)[number];
 * const v = EnumValue.parse<Align>("center", ALIGN); // EnumValue<"center">
 * ```
 */

export class EnumValue<T extends string> {
  constructor(public readonly value: T) {}

  toString(): string {
    return this.value;
  }

  /**
   * 未知值返回 `undefined`（不抛）；Required 校验由 setter 注入（Story-2.7）。
   */
  static parse<T extends string>(
    input: string | undefined,
    members: readonly T[],
  ): EnumValue<T> | undefined {
    if (input === undefined) return undefined;
    if (!(members as readonly string[]).includes(input)) return undefined;
    return new EnumValue(input as T);
  }
}
