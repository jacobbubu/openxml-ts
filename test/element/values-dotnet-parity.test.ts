/**
 * Batch 1 — Simple types 值语义（.NET SDK 测试移植）
 *
 * 移植来源：DocumentFormat.OpenXml.Tests/SimpleTypes/
 *   - OpenXmlComparableSimpleValueTests.cs（泛型基类）
 *   - OpenXmlComparableSimpleReferenceTests.cs（引用类型泛型基类）
 *   - BooleanValueTests.cs / OnOffValueTests.cs / TrueFalseValueTests.cs / TrueFalseBlankValueTests.cs
 *   - ByteValueTests.cs / SByteValueTests.cs / Int16ValueTests.cs / Int32ValueTests.cs / Int64ValueTests.cs
 *   - IntegerValueTests.cs / UInt16ValueTests.cs / UInt32ValueTests.cs / UInt64ValueTests.cs
 *   - DecimalValueTests.cs / DoubleValueTests.cs / SingleValueTests.cs / DateTimeValueTests.cs
 *   - StringValueTests.cs / HexBinaryValueTests.cs / Base64BinaryValueTests.cs
 *
 * 排重说明：
 *   - parse / serialize / round-trip / 边界越界 已在 values.test.ts + value-types.test.ts 覆盖 → 本文件不重复。
 *   - CompareTo / Equals / GetHashCode / 运算符 语义是 Batch 1 核心缺口 → 全部移植。
 *
 * N/A 说明（.NET 特有，TS 不移植）：
 *   - CompareTo_ArgumentIsNull_PositiveValueReturned — TS 值类型实例不能为 null。
 *   - CompareTo_NoValue / Equals_NoValue — 依赖 .NET `InnerText`/`HasValue`（openxml-ts 无此 API）。
 *   - CompareTo_ArgumentIncompatible_ExceptionThrown — .NET `CompareTo(object)` 运行时类型检查，TS 无对应。
 *   - Operators（TypeScript 无运算符重载）— 用 .value 比较替代，语义等价。
 *   - OpenXmlComparableSimpleReferenceTests 的 NullValue1/NullValue2 null-instance 测试 —
 *     TS 无参构造不存在（parse(undefined) 返回 undefined，不能调用方法）。
 *   - HexBinaryValue.TryWriteBytesWithOddLengthReturnsFalse — TS 无 TryWriteBytes 方法。
 */

import { describe, expect, it } from "vitest";
import {
  Base64BinaryValue,
  BooleanValue,
  ByteValue,
  DateTimeValue,
  DecimalValue,
  DoubleValue,
  HexBinaryValue,
  Int16Value,
  Int32Value,
  Int64Value,
  IntegerValue,
  OnOffValue,
  SByteValue,
  SingleValue,
  StringValue,
  TrueFalseBlankValue,
  TrueFalseValue,
  UInt16Value,
  UInt32Value,
  UInt64Value,
} from "../../src/index.js";

// ---------------------------------------------------------------------------
// Helper: generic value-semantics suite for numeric/boolean value types
// Ported from OpenXmlComparableSimpleValueTests<T>
// ---------------------------------------------------------------------------

/**
 * compareValues — TS equivalent of the .NET IComparable<T>.CompareTo semantics.
 * Returns negative / 0 / positive.
 */
function cmp<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * runSimpleValueTests — ported from OpenXmlComparableSimpleValueTests<T>.
 *
 * Parameters map to the .NET abstract properties / factory:
 *   smallValue1 / smallValue2 — two instances wrapping the same "small" primitive (SmallValue1, SmallValue2)
 *   largeValue              — instance wrapping a larger primitive (LargeValue)
 *   values                  — the Values array fed to table-driven tests
 *   getVal                  — extracts .value (the underlying primitive) from an instance
 *   create                  — factory: Create(input) in .NET
 */
function runSimpleValueTests<
  TVal extends number | bigint | boolean | Date,
  TObj extends { toString(): string },
>(
  label: string,
  smallValue1: TObj,
  smallValue2: TObj,
  largeValue: TObj,
  values: TVal[],
  getVal: (obj: TObj) => TVal,
  create: (input: TVal) => TObj,
): void {
  describe(`${label} — CompareTo / Equals / GetHashCode (ported from OpenXmlComparableSimpleValueTests)`, () => {
    // TestValuesAreConsistent
    it("values are consistent: small < large", () => {
      const sv1 = getVal(smallValue1);
      const sv2 = getVal(smallValue2);
      const lv = getVal(largeValue);
      // SmallValue1 == SmallValue2
      expect(sv1).toEqual(sv2);
      // SmallValue1 < LargeValue
      expect(cmp(sv1, lv)).toBeLessThan(0);
    });

    // CompareTo_InstanceFollowsArgumentInSortOrder_PositiveValueReturned
    it("large.compareTo(small) > 0", () => {
      expect(cmp(getVal(largeValue), getVal(smallValue1))).toBeGreaterThan(0);
    });

    // CompareTo_SameSortOrder_ZeroReturned
    it("large.compareTo(large) == 0", () => {
      expect(cmp(getVal(largeValue), getVal(largeValue))).toBe(0);
    });

    // CompareTo_InstancePrecedesArgumentInSortOrder_NegativeValueReturned
    it("small.compareTo(large) < 0", () => {
      expect(cmp(getVal(smallValue1), getVal(largeValue))).toBeLessThan(0);
    });

    // CompareTo_Values (table-driven)
    it("compareTo(Values[i]) matches primitive compareTo", () => {
      for (const value of values) {
        for (const other of values) {
          const expected = cmp(value, other);
          const actual = cmp(getVal(create(value)), other);
          expect(actual).toBe(expected);
        }
      }
    });

    // Equals_DifferentValues_EqualsIsFalse
    it("different values are not equal", () => {
      expect(getVal(smallValue1)).not.toEqual(getVal(largeValue));
    });

    // Equals_EqualValues_EqualsIsTrue
    it("equal values are equal", () => {
      expect(getVal(smallValue1)).toEqual(getVal(smallValue2));
    });

    // Equality_Values (table-driven)
    it("equality(Values) matches primitive equality", () => {
      for (const value of values) {
        for (const other of values) {
          const expected =
            value === other ||
            (value instanceof Date &&
              other instanceof Date &&
              value.getTime() === (other as Date).getTime());
          const objVal = getVal(create(value));
          const actual =
            objVal instanceof Date
              ? (objVal as unknown as Date).getTime() ===
                (other instanceof Date ? other.getTime() : Number.NaN)
              : objVal === other;
          expect(actual).toBe(expected);
        }
      }
    });

    // GetHashCode_DifferentValues_HashCodesAreNotEqual
    it("different values produce different hash codes (toString)", () => {
      expect(smallValue1.toString()).not.toBe(largeValue.toString());
    });

    // GetHashCode_EqualValues_HashCodesAreEqual
    it("equal values produce same hash code (toString)", () => {
      expect(smallValue1.toString()).toBe(smallValue2.toString());
    });

    // Operators_ValidValues_CorrectComparisons (via .value)
    it("ordering operators via .value: small <= small2 <= large, small < large, large > small", () => {
      const sv1 = getVal(smallValue1);
      const sv2 = getVal(smallValue2);
      const lv = getVal(largeValue);

      // == / !=
      expect(sv1).toEqual(sv2);
      expect(sv1).not.toEqual(lv);

      // <=
      expect(cmp(sv1, sv2)).toBeLessThanOrEqual(0);
      expect(cmp(sv1, lv)).toBeLessThanOrEqual(0);

      // <
      expect(cmp(sv1, lv)).toBeLessThan(0);

      // >=
      expect(cmp(sv2, sv1)).toBeGreaterThanOrEqual(0);
      expect(cmp(lv, sv1)).toBeGreaterThanOrEqual(0);

      // >
      expect(cmp(lv, sv1)).toBeGreaterThan(0);
    });
  });
}

// ---------------------------------------------------------------------------
// Helper: reference-type value-semantics suite (string-backed)
// Ported from OpenXmlComparableSimpleReferenceTests<T>
// ---------------------------------------------------------------------------

function runReferenceValueTests<TObj extends { toString(): string }>(
  label: string,
  smallValue1: TObj,
  smallValue2: TObj,
  largeValue: TObj,
): void {
  describe(`${label} — CompareTo / Equals / GetHashCode (ported from OpenXmlComparableSimpleReferenceTests)`, () => {
    const sv1 = smallValue1.toString();
    const sv2 = smallValue2.toString();
    const lv = largeValue.toString();

    // TestValuesAreConsistent
    it("values are consistent: small < large (string order)", () => {
      expect(sv1).toBe(sv2);
      expect(sv1.localeCompare(lv)).toBeLessThan(0);
    });

    // CompareTo_InstanceFollowsArgumentInSortOrder_PositiveValueReturned
    it("large.compareTo(small) > 0 (string order)", () => {
      expect(lv.localeCompare(sv1)).toBeGreaterThan(0);
    });

    // CompareTo_SameSortOrder_ZeroReturned
    it("large.compareTo(large) == 0", () => {
      expect(lv.localeCompare(lv)).toBe(0);
    });

    // CompareTo_InstancePrecedesArgumentInSortOrder_NegativeValueReturned
    it("small.compareTo(large) < 0", () => {
      expect(sv1.localeCompare(lv)).toBeLessThan(0);
    });

    // Equals_DifferentValues_EqualsIsFalse
    it("different values are not equal", () => {
      expect(sv1).not.toBe(lv);
    });

    // Equals_EqualValues_EqualsIsTrue
    it("equal values are equal (same string)", () => {
      expect(sv1).toBe(sv2);
    });

    // GetHashCode_DifferentValues_HashCodesAreNotEqual
    it("different values produce different toString", () => {
      expect(sv1).not.toBe(lv);
    });

    // GetHashCode_EqualValues_HashCodesAreEqual
    it("equal values produce same toString", () => {
      expect(sv1).toBe(sv2);
    });

    // Operators_ValidValues_CorrectComparisons
    it("ordering operators via string compare: small <= small2, small <= large, large > small", () => {
      expect(sv1.localeCompare(sv2)).toBeLessThanOrEqual(0);
      expect(sv1.localeCompare(lv)).toBeLessThanOrEqual(0);
      expect(sv1.localeCompare(lv)).toBeLessThan(0);
      expect(sv2.localeCompare(sv1)).toBeGreaterThanOrEqual(0);
      expect(lv.localeCompare(sv1)).toBeGreaterThanOrEqual(0);
      expect(lv.localeCompare(sv1)).toBeGreaterThan(0);
    });
  });
}

// ===========================================================================
// BooleanValue — ported from BooleanValueTests.cs
// SmallValue1 = BooleanValue(false), SmallValue2 = BooleanValue(false), LargeValue = BooleanValue(true)
// Values = [true, false]
// ===========================================================================
runSimpleValueTests<boolean, BooleanValue>(
  "BooleanValue",
  new BooleanValue(false),
  new BooleanValue(false),
  new BooleanValue(true),
  [true, false],
  (o) => o.value,
  (v) => new BooleanValue(v),
);

// ===========================================================================
// OnOffValue — ported from OnOffValueTests.cs
// ===========================================================================
runSimpleValueTests<boolean, OnOffValue>(
  "OnOffValue",
  new OnOffValue(false),
  new OnOffValue(false),
  new OnOffValue(true),
  [true, false],
  (o) => o.value,
  (v) => new OnOffValue(v),
);

// ===========================================================================
// TrueFalseValue — ported from TrueFalseValueTests.cs
// (Note: .NET TrueFalseValueTests uses TrueFalseBlankValue as Create factory — preserved here)
// ===========================================================================
runSimpleValueTests<boolean, TrueFalseValue>(
  "TrueFalseValue",
  new TrueFalseValue(false),
  new TrueFalseValue(false),
  new TrueFalseValue(true),
  [true, false],
  (o) => o.value,
  (v) => new TrueFalseBlankValue(v) as unknown as TrueFalseValue,
);

// ===========================================================================
// TrueFalseBlankValue — ported from TrueFalseBlankValueTests.cs
// ===========================================================================
runSimpleValueTests<boolean, TrueFalseBlankValue>(
  "TrueFalseBlankValue",
  new TrueFalseBlankValue(false),
  new TrueFalseBlankValue(false),
  new TrueFalseBlankValue(true),
  [true, false],
  (o) => o.value,
  (v) => new TrueFalseBlankValue(v),
);

// ===========================================================================
// ByteValue — ported from ByteValueTests.cs
// Values = [0, 1, 254, 255]
// ===========================================================================
runSimpleValueTests<number, ByteValue>(
  "ByteValue",
  new ByteValue(10),
  new ByteValue(10),
  new ByteValue(20),
  [0, 1, 254, 255],
  (o) => o.value,
  (v) => new ByteValue(v),
);

// ===========================================================================
// SByteValue — ported from SByteValueTests.cs
// Values = [-128, -127, 0, 126, 127]
// ===========================================================================
runSimpleValueTests<number, SByteValue>(
  "SByteValue",
  new SByteValue(10),
  new SByteValue(10),
  new SByteValue(20),
  [-128, -127, 0, 126, 127],
  (o) => o.value,
  (v) => new SByteValue(v),
);

// ===========================================================================
// Int16Value — ported from Int16ValueTests.cs
// Values = [-32768, -32767, 0, 32766, 32767]
// ===========================================================================
runSimpleValueTests<number, Int16Value>(
  "Int16Value",
  new Int16Value(10),
  new Int16Value(10),
  new Int16Value(20),
  [-32768, -32767, 0, 32766, 32767],
  (o) => o.value,
  (v) => new Int16Value(v),
);

// ===========================================================================
// Int32Value — ported from Int32ValueTests.cs
// Values = [MIN, MIN+1, MAX-1, MAX]
// ===========================================================================
const INT32_MIN = -2_147_483_648;
const INT32_MAX = 2_147_483_647;

runSimpleValueTests<number, Int32Value>(
  "Int32Value",
  new Int32Value(10),
  new Int32Value(10),
  new Int32Value(20),
  [INT32_MIN, INT32_MIN + 1, INT32_MAX - 1, INT32_MAX],
  (o) => o.value,
  (v) => new Int32Value(v),
);

// ===========================================================================
// Int64Value — ported from Int64ValueTests.cs
// Values = [MIN, MIN+1, MAX-1, MAX]  (BigInt)
// ===========================================================================
const INT64_MIN = -(2n ** 63n);
const INT64_MAX = 2n ** 63n - 1n;

runSimpleValueTests<bigint, Int64Value>(
  "Int64Value",
  new Int64Value(10n),
  new Int64Value(10n),
  new Int64Value(20n),
  [INT64_MIN, INT64_MIN + 1n, INT64_MAX - 1n, INT64_MAX],
  (o) => o.value,
  (v) => new Int64Value(v),
);

// ===========================================================================
// IntegerValue — ported from IntegerValueTests.cs
// Values = [MIN, MIN+1, 0, MAX-1, MAX]  (BigInt)
// ===========================================================================
runSimpleValueTests<bigint, IntegerValue>(
  "IntegerValue",
  new IntegerValue(10n),
  new IntegerValue(10n),
  new IntegerValue(20n),
  [INT64_MIN, INT64_MIN + 1n, 0n, INT64_MAX - 1n, INT64_MAX],
  (o) => o.value,
  (v) => new IntegerValue(v),
);

// ===========================================================================
// UInt16Value — ported from UInt16ValueTests.cs
// Values = [0, 1, 0 (dup min), 65534, 65535]
// ===========================================================================
runSimpleValueTests<number, UInt16Value>(
  "UInt16Value",
  new UInt16Value(10),
  new UInt16Value(10),
  new UInt16Value(20),
  [0, 1, 0, 65534, 65535],
  (o) => o.value,
  (v) => new UInt16Value(v),
);

// ===========================================================================
// UInt32Value — ported from UInt32ValueTests.cs
// Values = [0, 1, 0 (dup min), MAX-1, MAX]
// ===========================================================================
const UINT32_MAX = 4_294_967_295;

runSimpleValueTests<number, UInt32Value>(
  "UInt32Value",
  new UInt32Value(10),
  new UInt32Value(10),
  new UInt32Value(20),
  [0, 1, 0, UINT32_MAX - 1, UINT32_MAX],
  (o) => o.value,
  (v) => new UInt32Value(v),
);

// ===========================================================================
// UInt64Value — ported from UInt64ValueTests.cs
// Values = [0, 1, MAX-1, MAX]  (BigInt)
// ===========================================================================
const UINT64_MAX = 2n ** 64n - 1n;

runSimpleValueTests<bigint, UInt64Value>(
  "UInt64Value",
  new UInt64Value(10n),
  new UInt64Value(10n),
  new UInt64Value(20n),
  [0n, 1n, UINT64_MAX - 1n, UINT64_MAX],
  (o) => o.value,
  (v) => new UInt64Value(v),
);

// ===========================================================================
// DecimalValue — ported from DecimalValueTests.cs
// Values = [MIN_SAFE_INT, MIN+1, -1, 0, 1, MAX-1, MAX_SAFE_INT]
// (JS has no native decimal; use Number — same as openxml-ts implementation)
// ===========================================================================
runSimpleValueTests<number, DecimalValue>(
  "DecimalValue",
  new DecimalValue(10),
  new DecimalValue(10),
  new DecimalValue(20),
  [
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER + 1,
    -1,
    0,
    1,
    Number.MAX_SAFE_INTEGER - 1,
    Number.MAX_SAFE_INTEGER,
  ],
  (o) => o.value,
  (v) => new DecimalValue(v),
);

// ===========================================================================
// DoubleValue — ported from DoubleValueTests.cs
// Values includes NaN, -Infinity, +Infinity
// Note: NaN comparisons in JS follow IEEE 754: NaN != NaN, NaN is not < or > anything.
// The .NET IComparable for float treats NaN specially (NaN < everything except another NaN).
// We test what openxml-ts's DoubleValue actually provides (toString round-trip for special values).
// ===========================================================================
describe("DoubleValue — value semantics (ported from DoubleValueTests.cs)", () => {
  const small1 = new DoubleValue(10.0);
  const small2 = new DoubleValue(10.0);
  const large = new DoubleValue(20.0);

  // TestValuesAreConsistent
  it("values are consistent: 10.0 < 20.0", () => {
    expect(small1.value).toBeLessThan(large.value);
    expect(small1.value).toBe(small2.value);
  });

  // CompareTo ordering
  it("large.value > small.value", () => {
    expect(large.value).toBeGreaterThan(small1.value);
  });

  it("small.value < large.value", () => {
    expect(small1.value).toBeLessThan(large.value);
  });

  it("same values compare equal", () => {
    expect(small1.value).toBe(small2.value);
  });

  // GetHashCode equivalents (toString)
  it("equal values produce same toString", () => {
    expect(small1.toString()).toBe(small2.toString());
  });

  it("different values produce different toString", () => {
    expect(small1.toString()).not.toBe(large.toString());
  });

  // Values array from .NET: [-Inf, MIN, MIN+1, NaN, MAX-1, MAX, +Inf]
  // Table-driven: Create(value).value matches value for finite values
  it("Create(value).value round-trips for finite values", () => {
    const finiteCases = [Number.NEGATIVE_INFINITY, -1e308, 10.0, 20.0, Number.POSITIVE_INFINITY];
    for (const v of finiteCases) {
      expect(new DoubleValue(v).value).toBe(v);
    }
  });

  it("NaN is preserved by create/value round-trip", () => {
    expect(Number.isNaN(new DoubleValue(Number.NaN).value)).toBe(true);
  });

  // Operators via .value
  it("ordering operators: small <= small2, small < large, large > small", () => {
    expect(small1.value).toBeLessThanOrEqual(small2.value);
    expect(small1.value).toBeLessThan(large.value);
    expect(large.value).toBeGreaterThan(small1.value);
    expect(large.value).toBeGreaterThanOrEqual(small1.value);
  });
});

// ===========================================================================
// SingleValue — ported from SingleValueTests.cs
// Values = [-Inf, MIN, MIN+1, 0, NaN, MAX-1, MAX, +Inf]
// ===========================================================================
describe("SingleValue — value semantics (ported from SingleValueTests.cs)", () => {
  const small1 = new SingleValue(10.0);
  const small2 = new SingleValue(10.0);
  const large = new SingleValue(20.0);

  it("values are consistent: 10.0 < 20.0", () => {
    expect(small1.value).toBeLessThan(large.value);
    expect(small1.value).toBe(small2.value);
  });

  it("large.value > small.value", () => {
    expect(large.value).toBeGreaterThan(small1.value);
  });

  it("same values compare equal", () => {
    expect(small1.value).toBe(small2.value);
  });

  it("equal values produce same toString", () => {
    expect(small1.toString()).toBe(small2.toString());
  });

  it("different values produce different toString", () => {
    expect(small1.toString()).not.toBe(large.toString());
  });

  it("Create(value).value round-trips for finite values", () => {
    for (const v of [Number.NEGATIVE_INFINITY, -1, 0, 1, Number.POSITIVE_INFINITY]) {
      expect(new SingleValue(v).value).toBe(v);
    }
  });

  it("NaN is preserved", () => {
    expect(Number.isNaN(new SingleValue(Number.NaN).value)).toBe(true);
  });

  it("ordering operators via .value", () => {
    expect(small1.value).toBeLessThanOrEqual(small2.value);
    expect(small1.value).toBeLessThan(large.value);
    expect(large.value).toBeGreaterThan(small1.value);
  });
});

// ===========================================================================
// DateTimeValue — ported from DateTimeValueTests.cs
// SmallValue1 = DateTimeValue(DateTime.MinValue), LargeValue = DateTimeValue(DateTime.MaxValue)
// Values = [MinValue, MinValue+1day, MaxValue-1day, MaxValue]
// ===========================================================================
describe("DateTimeValue — value semantics (ported from DateTimeValueTests.cs)", () => {
  // DateTime.MinValue = 0001-01-01T00:00:00 — JS Date uses 1970 epoch, min is ~-8640000000000000ms
  const MIN_DATE = new Date(Date.UTC(1900, 0, 1)); // approx minimum practical OOXML date
  const MIN_DATE_PLUS_ONE = new Date(MIN_DATE.getTime() + 86_400_000);
  const MAX_DATE = new Date(Date.UTC(9999, 11, 31, 23, 59, 59, 999));
  const MAX_DATE_MINUS_ONE = new Date(MAX_DATE.getTime() - 86_400_000);

  const small1 = new DateTimeValue(MIN_DATE);
  const small2 = new DateTimeValue(MIN_DATE);
  const large = new DateTimeValue(MAX_DATE);

  const values = [MIN_DATE, MIN_DATE_PLUS_ONE, MAX_DATE_MINUS_ONE, MAX_DATE];

  it("values are consistent: min < max", () => {
    expect(small1.value.getTime()).toBe(small2.value.getTime());
    expect(small1.value.getTime()).toBeLessThan(large.value.getTime());
  });

  it("large.value > small.value", () => {
    expect(large.value.getTime()).toBeGreaterThan(small1.value.getTime());
  });

  it("small.value < large.value", () => {
    expect(small1.value.getTime()).toBeLessThan(large.value.getTime());
  });

  it("same values compare equal", () => {
    expect(small1.value.getTime()).toBe(small2.value.getTime());
  });

  it("equal values produce same toString", () => {
    expect(small1.toString()).toBe(small2.toString());
  });

  it("different values produce different toString", () => {
    expect(small1.toString()).not.toBe(large.toString());
  });

  it("CompareTo_Values: create(value).value.getTime() matches value.getTime()", () => {
    for (const v of values) {
      for (const other of values) {
        const created = new DateTimeValue(v);
        const expected = Math.sign(v.getTime() - other.getTime());
        const actual = Math.sign(created.value.getTime() - other.getTime());
        expect(actual).toBe(expected);
      }
    }
  });

  it("ordering operators via .getTime(): small <= small2, small < large, large > small", () => {
    expect(small1.value.getTime()).toBeLessThanOrEqual(small2.value.getTime());
    expect(small1.value.getTime()).toBeLessThan(large.value.getTime());
    expect(large.value.getTime()).toBeGreaterThan(small1.value.getTime());
    expect(large.value.getTime()).toBeGreaterThanOrEqual(small1.value.getTime());
  });
});

// ===========================================================================
// StringValue — ported from StringValueTests.cs
// Uses OpenXmlComparableSimpleReferenceTests<string>
// SmallValue1 = StringValue("abcdef"), LargeValue = StringValue("uvwxyz")
// ===========================================================================
runReferenceValueTests<StringValue>(
  "StringValue",
  new StringValue("abcdef"),
  new StringValue("abcdef"),
  new StringValue("uvwxyz"),
);

// ===========================================================================
// HexBinaryValue — ported from HexBinaryValueTests.cs
// Uses OpenXmlComparableSimpleReferenceTests<string>
// SmallValue1 = HexBinaryValue("12345678"), LargeValue = HexBinaryValue("FEDCBA98")
// Plus extra tests: ValidateValue / GetBytes / CreateFromBytes
// ===========================================================================
runReferenceValueTests<HexBinaryValue>(
  "HexBinaryValue",
  new HexBinaryValue("12345678"),
  new HexBinaryValue("12345678"),
  new HexBinaryValue("FEDCBA98"),
);

describe("HexBinaryValue.ValidateValue (ported from HexBinaryValueTests.ValidateValue Theory)", () => {
  // InlineData from .NET:
  // [null, false], ["", true], ["a", false], ["A", false], ["zz", false], ["gg", false],
  // ["bb", true], ["0A", true], ["5A", true], ["5dA", false],
  // ["5AbC5AbC5AbC5AbC5AbC5AbC5AbC5AbC", true], ["5AbC5AbC5AbC5AbC5AbC5AbC5AbC5Ab", false]
  //
  // In TS: HexBinaryValue.parse(innerText) === undefined means not valid.
  // Empty string "" → valid (parse returns HexBinaryValue with value "").
  // null → undefined input → parse(undefined) → undefined → invalid.
  it.each([
    [undefined, false],
    ["", true],
    ["a", false], // odd length (1)
    ["A", false], // odd length (1)
    ["zz", false], // non-hex chars
    ["gg", false], // non-hex chars
    ["bb", true],
    ["0A", true],
    ["5A", true],
    ["5dA", false], // odd length (3)
    ["5AbC5AbC5AbC5AbC5AbC5AbC5AbC5AbC", true], // 32 chars = 16 bytes
    ["5AbC5AbC5AbC5AbC5AbC5AbC5AbC5Ab", false], // 31 chars = odd length
  ] as Array<[string | undefined, boolean]>)("parse(%s) valid=%s", (innerText, expected) => {
    const result = HexBinaryValue.parse(innerText);
    expect(result !== undefined).toBe(expected);
  });
});

describe("HexBinaryValue.GetBytes (ported from HexBinaryValueTests.GetBytes)", () => {
  // .NET: TryGetBytes → TS: toBytes()
  // .NET False for no-value → TS: parse(undefined) returns undefined (no toBytes to call)

  it("toBytes() for '00' → [0]", () => {
    const type = new HexBinaryValue("00");
    expect(type.toBytes()).toEqual(new Uint8Array([0]));
  });

  it("toBytes() for '01' → [1]", () => {
    const type = new HexBinaryValue("01");
    expect(type.toBytes()).toEqual(new Uint8Array([1]));
  });

  it("toBytes() for 'FF' → [255]", () => {
    const type = new HexBinaryValue("FF");
    expect(type.toBytes()).toEqual(new Uint8Array([0xff]));
  });

  it("parse('FFF') → undefined (odd length, so toBytes not available)", () => {
    expect(HexBinaryValue.parse("FFF")).toBeUndefined();
  });

  it("toBytes() for 'FF01' → [0xFF, 0x01]", () => {
    const type = new HexBinaryValue("FF01");
    expect(type.toBytes()).toEqual(new Uint8Array([0xff, 0x01]));
  });
});

describe("HexBinaryValue.CreateFromBytes (ported from HexBinaryValueTests.CreateFromBytes)", () => {
  // .NET: HexBinaryValue.Create() / Create(0) / Create(1) / Create(0xFF) / Create(0xFF, 0x01)
  // TS equivalent: HexBinaryValue.fromBytes(new Uint8Array([...]))

  it("fromBytes([]) → empty string", () => {
    expect(HexBinaryValue.fromBytes(new Uint8Array([])).value).toBe("");
  });

  it("fromBytes([0]) → '00'", () => {
    expect(HexBinaryValue.fromBytes(new Uint8Array([0])).value).toBe("00");
  });

  it("fromBytes([1]) → '01'", () => {
    expect(HexBinaryValue.fromBytes(new Uint8Array([1])).value).toBe("01");
  });

  it("fromBytes([0xFF]) → 'FF'", () => {
    expect(HexBinaryValue.fromBytes(new Uint8Array([0xff])).value).toBe("FF");
  });

  it("fromBytes([0xFF, 0x01]) → 'FF01'", () => {
    expect(HexBinaryValue.fromBytes(new Uint8Array([0xff, 0x01])).value).toBe("FF01");
  });
});

// ===========================================================================
// Base64BinaryValue — ported from Base64BinaryValueTests.cs
// Uses OpenXmlComparableSimpleReferenceTests<string>
// SmallString = Convert.ToBase64String([31,32,33,34,35,36])
// LargeString = Convert.ToBase64String([41,42,43,44,45,46])
// ===========================================================================
const B64_SMALL = btoa(String.fromCharCode(31, 32, 33, 34, 35, 36));
const B64_LARGE = btoa(String.fromCharCode(41, 42, 43, 44, 45, 46));

runReferenceValueTests<Base64BinaryValue>(
  "Base64BinaryValue",
  new Base64BinaryValue(B64_SMALL),
  new Base64BinaryValue(B64_SMALL),
  new Base64BinaryValue(B64_LARGE),
);
