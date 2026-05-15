/**
 * `xsd:dateTime` 属性值。对位 .NET `DateTimeValue`。
 *
 * 内部存 `Date`；序列化走 `toISOString`（OOXML 用 ISO 8601）。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

export class DateTimeValue {
  constructor(public readonly value: Date) {
    if (Number.isNaN(value.getTime())) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: "DateTimeValue requires a valid Date",
      });
    }
  }

  toString(): string {
    return this.value.toISOString();
  }

  static parse(input: string | undefined): DateTimeValue | undefined {
    if (input === undefined) return undefined;
    const trimmed = input.trim();
    if (trimmed.length === 0) return undefined;
    const date = new Date(trimmed);
    if (Number.isNaN(date.getTime())) return undefined;
    return new DateTimeValue(date);
  }
}
