/**
 * 空格分隔的列表属性值。对位 .NET `ListValue<T>`。
 *
 * `T` 是列表项的类型（如 `StringValue`）；每一项通过 `parse` 函数解析，
 * 序列化时用空格连接各项的 `toString()`。
 *
 * 示例：
 * ```ts
 * const v = ListValue.parse("foo bar baz", StringValue.parse);
 * v?.items // [StringValue("foo"), StringValue("bar"), StringValue("baz")]
 * ```
 */

export class ListValue<T extends { toString(): string }> {
  constructor(public readonly items: readonly T[]) {}

  toString(): string {
    return this.items.map((item) => item.toString()).join(" ");
  }

  /**
   * 按空白拆分后逐项调用 `parseItem`；任一项解析失败 → 整体返回 `undefined`。
   * 空字符串或仅空白 → 空列表。
   */
  static parse<T extends { toString(): string }>(
    input: string | undefined,
    parseItem: (s: string | undefined) => T | undefined,
  ): ListValue<T> | undefined {
    if (input === undefined) return undefined;
    const trimmed = input.trim();
    if (trimmed.length === 0) return new ListValue<T>([]);
    const parts = trimmed.split(/\s+/);
    const items: T[] = [];
    for (const part of parts) {
      const item = parseItem(part);
      if (item === undefined) return undefined;
      items.push(item);
    }
    return new ListValue(items);
  }
}
