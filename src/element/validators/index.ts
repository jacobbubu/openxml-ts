/**
 * 属性级 Validators（Story-2.7）。
 *
 * Schema JSON 的 `Attributes[*].Validators[]` 由 codegen 翻译成对这里的
 * `assertXxx(...)` 调用，落在 `applyAttribute` switch case 内 + 每类
 * `validateRequired()` 方法里。
 */

import { OpenXmlPackageError } from "../../packaging/errors.js";

export interface ValidationContext {
  /** 受违例的 schema 属性 qname（如 `"w:author"`）。 */
  readonly attribute: string;
  /** 所在 element 类名。 */
  readonly elementClass: string;
}

/**
 * RequiredValidator：值必须不为 `undefined`。
 *
 * 通常 codegen 把这条注入到生成类的 `validateRequired()` 方法，由调用方在
 * 「想确认数据完整」时显式调用——open-time 强校验留给 Story-2.10 的 release
 * 阶段，避免破坏性变更早期 baseline。
 */
export function assertRequired<T>(
  value: T | undefined,
  context: ValidationContext,
): asserts value is T {
  if (value === undefined) {
    throw new OpenXmlPackageError({
      code: "REQUIRED_ATTR_MISSING",
      message: `Required attribute "${context.attribute}" missing on <${context.elementClass}>`,
      attribute: context.attribute,
      elementClass: context.elementClass,
    });
  }
}

export interface StringValidatorOptions {
  readonly maxLength?: number;
  readonly minLength?: number;
}

/** StringValidator：字符串长度上下界（schema 中常见 MaxLength=255 之类）。 */
export function assertString(
  value: { value: string } | undefined,
  options: StringValidatorOptions,
  context: ValidationContext,
): void {
  if (value === undefined) return;
  const len = value.value.length;
  if (options.maxLength !== undefined && len > options.maxLength) {
    throw new OpenXmlPackageError({
      code: "STRING_TOO_LONG",
      message: `Attribute "${context.attribute}" on <${context.elementClass}>: length ${len} > MaxLength ${options.maxLength}`,
      attribute: context.attribute,
      elementClass: context.elementClass,
    });
  }
  if (options.minLength !== undefined && len < options.minLength) {
    throw new OpenXmlPackageError({
      code: "STRING_TOO_LONG",
      message: `Attribute "${context.attribute}" on <${context.elementClass}>: length ${len} < MinLength ${options.minLength}`,
      attribute: context.attribute,
      elementClass: context.elementClass,
    });
  }
}

export interface NumberValidatorOptions {
  readonly min?: number;
  readonly max?: number;
}

/**
 * NumberValidator：数字闭区间校验。值类型对接 Int32Value / Int64Value /
 * UInt32Value / DecimalValue —— 它们都暴露 `.value`（数字或 BigInt）。
 */
export function assertNumber(
  value: { value: number | bigint } | undefined,
  options: NumberValidatorOptions,
  context: ValidationContext,
): void {
  if (value === undefined) return;
  const n = typeof value.value === "bigint" ? Number(value.value) : value.value;
  if (options.min !== undefined && n < options.min) {
    throw new OpenXmlPackageError({
      code: "NUMBER_OUT_OF_RANGE",
      message: `Attribute "${context.attribute}" on <${context.elementClass}>: ${n} < min ${options.min}`,
      attribute: context.attribute,
      elementClass: context.elementClass,
    });
  }
  if (options.max !== undefined && n > options.max) {
    throw new OpenXmlPackageError({
      code: "NUMBER_OUT_OF_RANGE",
      message: `Attribute "${context.attribute}" on <${context.elementClass}>: ${n} > max ${options.max}`,
      attribute: context.attribute,
      elementClass: context.elementClass,
    });
  }
}

/**
 * EnumValidator：检查值是否属于给定 literal tuple。
 *
 * Story-2.7 阶段 EnumValue codegen 仍退化为 StringValue（Story-2.5 的限制），
 * 因此 assertEnum 也接受 `{ value: string }` 形态。
 */
export function assertEnum<T extends string>(
  value: { value: string } | undefined,
  members: readonly T[],
  context: ValidationContext,
): void {
  if (value === undefined) return;
  if (!(members as readonly string[]).includes(value.value)) {
    throw new OpenXmlPackageError({
      code: "ENUM_VALUE_INVALID",
      message: `Attribute "${context.attribute}" on <${context.elementClass}>: "${value.value}" not in [${members.join(", ")}]`,
      attribute: context.attribute,
      elementClass: context.elementClass,
    });
  }
}
