/**
 * Epic-94: 13 个补齐值类型的单元测试。
 */
import { describe, expect, it } from "vitest";
import {
  Base64BinaryValue,
  ByteValue,
  DoubleValue,
  Int16Value,
  IntegerValue,
  ListValue,
  OnOffValue,
  SByteValue,
  SingleValue,
  StringValue,
  TrueFalseBlankValue,
  TrueFalseValue,
  UInt16Value,
  UInt64Value,
} from "../../src/index.js";

describe("OnOffValue", () => {
  it("serialize 固定 true/false", () => {
    expect(new OnOffValue(true).toString()).toBe("true");
    expect(new OnOffValue(false).toString()).toBe("false");
  });
  it("parse 接受 true/1/on → true", () => {
    expect(OnOffValue.parse("true")?.value).toBe(true);
    expect(OnOffValue.parse("1")?.value).toBe(true);
    expect(OnOffValue.parse("on")?.value).toBe(true);
  });
  it("parse 接受 false/0/off → false", () => {
    expect(OnOffValue.parse("false")?.value).toBe(false);
    expect(OnOffValue.parse("0")?.value).toBe(false);
    expect(OnOffValue.parse("off")?.value).toBe(false);
  });
  it("parse 非法 → undefined", () => {
    expect(OnOffValue.parse("yes")).toBeUndefined();
    expect(OnOffValue.parse("")).toBeUndefined();
    expect(OnOffValue.parse(undefined)).toBeUndefined();
  });
  it("round-trip: parse(toString) 保真", () => {
    const v = new OnOffValue(true);
    expect(OnOffValue.parse(v.toString())?.value).toBe(true);
  });
});

describe("TrueFalseValue", () => {
  it("serialize 固定 true/false", () => {
    expect(new TrueFalseValue(true).toString()).toBe("true");
    expect(new TrueFalseValue(false).toString()).toBe("false");
  });
  it("parse 接受 t/true → true，f/false → false", () => {
    expect(TrueFalseValue.parse("t")?.value).toBe(true);
    expect(TrueFalseValue.parse("true")?.value).toBe(true);
    expect(TrueFalseValue.parse("f")?.value).toBe(false);
    expect(TrueFalseValue.parse("false")?.value).toBe(false);
  });
  it("不接受 on/off/1/0", () => {
    expect(TrueFalseValue.parse("on")).toBeUndefined();
    expect(TrueFalseValue.parse("1")).toBeUndefined();
  });
  it("undefined → undefined", () => {
    expect(TrueFalseValue.parse(undefined)).toBeUndefined();
  });
});

describe("TrueFalseBlankValue", () => {
  it("serialize 固定 true/false", () => {
    expect(new TrueFalseBlankValue(true).toString()).toBe("true");
    expect(new TrueFalseBlankValue(false).toString()).toBe("false");
  });
  it("parse: t/true → true，f/false/空串 → false", () => {
    expect(TrueFalseBlankValue.parse("t")?.value).toBe(true);
    expect(TrueFalseBlankValue.parse("true")?.value).toBe(true);
    expect(TrueFalseBlankValue.parse("f")?.value).toBe(false);
    expect(TrueFalseBlankValue.parse("false")?.value).toBe(false);
    expect(TrueFalseBlankValue.parse("")?.value).toBe(false);
  });
  it("非法值 → undefined", () => {
    expect(TrueFalseBlankValue.parse("yes")).toBeUndefined();
    expect(TrueFalseBlankValue.parse(undefined)).toBeUndefined();
  });
});

describe("DoubleValue", () => {
  it("普通小数 round-trip", () => {
    expect(new DoubleValue(3.14).toString()).toBe("3.14");
    expect(DoubleValue.parse("3.14")?.value).toBeCloseTo(3.14);
  });
  it("接受科学计数法", () => {
    expect(DoubleValue.parse("1.5e3")?.value).toBe(1500);
    expect(DoubleValue.parse("-2.5e-1")?.value).toBeCloseTo(-0.25);
  });
  it("NaN/INF/-INF 特殊形态", () => {
    expect(DoubleValue.parse("NaN")?.value).toBeNaN();
    expect(DoubleValue.parse("INF")?.value).toBe(Number.POSITIVE_INFINITY);
    expect(DoubleValue.parse("-INF")?.value).toBe(Number.NEGATIVE_INFINITY);
    expect(new DoubleValue(Number.NaN).toString()).toBe("NaN");
    expect(new DoubleValue(Number.POSITIVE_INFINITY).toString()).toBe("INF");
    expect(new DoubleValue(Number.NEGATIVE_INFINITY).toString()).toBe("-INF");
  });
  it("非法 → undefined", () => {
    expect(DoubleValue.parse("abc")).toBeUndefined();
    expect(DoubleValue.parse("")).toBeUndefined();
    expect(DoubleValue.parse(undefined)).toBeUndefined();
  });
});

describe("SingleValue", () => {
  it("round-trip 普通值", () => {
    expect(SingleValue.parse("1.5")?.value).toBe(1.5);
    expect(new SingleValue(1.5).toString()).toBe("1.5");
  });
  it("NaN/INF/-INF", () => {
    expect(SingleValue.parse("NaN")?.value).toBeNaN();
    expect(SingleValue.parse("INF")?.value).toBe(Number.POSITIVE_INFINITY);
  });
  it("非法 → undefined", () => {
    expect(SingleValue.parse("xyz")).toBeUndefined();
    expect(SingleValue.parse(undefined)).toBeUndefined();
  });
});

describe("Base64BinaryValue", () => {
  it("空字符串是合法空值", () => {
    expect(Base64BinaryValue.parse("")?.value).toBe("");
  });
  it("round-trip 合法 base64 字符串", () => {
    const b64 = btoa("hello world");
    const v = Base64BinaryValue.parse(b64);
    expect(v?.value).toBe(b64);
    expect(v?.toString()).toBe(b64);
  });
  it("fromBytes / toBytes 双向保真", () => {
    const bytes = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
    const v = Base64BinaryValue.fromBytes(bytes);
    expect(v.toBytes()).toEqual(bytes);
  });
  it("非法 base64 → undefined", () => {
    expect(Base64BinaryValue.parse("not!base64!!")).toBeUndefined();
  });
  it("undefined → undefined", () => {
    expect(Base64BinaryValue.parse(undefined)).toBeUndefined();
  });
});

describe("ByteValue", () => {
  it("边界 0 和 255 round-trip", () => {
    expect(new ByteValue(0).toString()).toBe("0");
    expect(ByteValue.parse("255")?.value).toBe(255);
  });
  it("越界抛 RangeError", () => {
    expect(() => new ByteValue(256)).toThrow(RangeError);
    expect(() => new ByteValue(-1)).toThrow(RangeError);
  });
  it("非整数 / 非法 → undefined", () => {
    expect(ByteValue.parse("3.5")).toBeUndefined();
    expect(ByteValue.parse("abc")).toBeUndefined();
    expect(ByteValue.parse("256")).toBeUndefined();
  });
});

describe("SByteValue", () => {
  it("边界 -128 和 127", () => {
    expect(new SByteValue(-128).toString()).toBe("-128");
    expect(SByteValue.parse("127")?.value).toBe(127);
  });
  it("越界 → 抛错 / undefined", () => {
    expect(() => new SByteValue(128)).toThrow(RangeError);
    expect(SByteValue.parse("128")).toBeUndefined();
    expect(SByteValue.parse("-129")).toBeUndefined();
  });
});

describe("Int16Value", () => {
  it("边界 -32768 和 32767", () => {
    expect(new Int16Value(-32768).toString()).toBe("-32768");
    expect(Int16Value.parse("32767")?.value).toBe(32767);
  });
  it("越界 → 抛错 / undefined", () => {
    expect(() => new Int16Value(32768)).toThrow(RangeError);
    expect(Int16Value.parse("32768")).toBeUndefined();
  });
  it("非整数 → undefined", () => {
    expect(Int16Value.parse("3.14")).toBeUndefined();
  });
});

describe("UInt16Value", () => {
  it("0 和 65535 round-trip", () => {
    expect(new UInt16Value(0).toString()).toBe("0");
    expect(UInt16Value.parse("65535")?.value).toBe(65535);
  });
  it("越界 → 抛错 / undefined", () => {
    expect(() => new UInt16Value(65536)).toThrow(RangeError);
    expect(UInt16Value.parse("65536")).toBeUndefined();
    expect(UInt16Value.parse("-1")).toBeUndefined();
  });
});

describe("UInt64Value (BigInt)", () => {
  it("最大值 2^64-1 round-trip", () => {
    const max = "18446744073709551615";
    expect(UInt64Value.parse(max)?.value).toBe(2n ** 64n - 1n);
    expect(UInt64Value.parse(max)?.toString()).toBe(max);
  });
  it("0 round-trip", () => {
    expect(new UInt64Value(0n).toString()).toBe("0");
  });
  it("越界 → 抛错 / undefined", () => {
    expect(() => new UInt64Value(-1n)).toThrow(RangeError);
    expect(UInt64Value.parse("18446744073709551616")).toBeUndefined();
    expect(UInt64Value.parse("-1")).toBeUndefined();
  });
  it("非整数 → undefined", () => {
    expect(UInt64Value.parse("3.14")).toBeUndefined();
    expect(UInt64Value.parse("abc")).toBeUndefined();
  });
});

describe("IntegerValue (Int64 BigInt)", () => {
  it("超 Number 精度的值仍保真", () => {
    const big = "9007199254740993"; // 2^53 + 1
    expect(IntegerValue.parse(big)?.value).toBe(9_007_199_254_740_993n);
  });
  it("边界 2^63-1 / -2^63", () => {
    expect(IntegerValue.parse("9223372036854775807")?.value).toBe(2n ** 63n - 1n);
    expect(IntegerValue.parse("-9223372036854775808")?.value).toBe(-(2n ** 63n));
  });
  it("越界 / 非整数 → undefined", () => {
    expect(IntegerValue.parse("9223372036854775808")).toBeUndefined();
    expect(IntegerValue.parse("3.14")).toBeUndefined();
    expect(IntegerValue.parse("abc")).toBeUndefined();
  });
});

describe("ListValue<T>", () => {
  it("空格分隔字符串列表 round-trip", () => {
    const v = ListValue.parse("foo bar baz", StringValue.parse);
    expect(v?.items.map((i) => i.value)).toEqual(["foo", "bar", "baz"]);
    expect(v?.toString()).toBe("foo bar baz");
  });
  it("空字符串 → 空列表", () => {
    const v = ListValue.parse("", StringValue.parse);
    expect(v?.items).toHaveLength(0);
    expect(v?.toString()).toBe("");
  });
  it("undefined → undefined", () => {
    expect(ListValue.parse(undefined, StringValue.parse)).toBeUndefined();
  });
  it("任一项解析失败 → 整体 undefined", () => {
    // ByteValue.parse rejects negative numbers
    expect(ListValue.parse("1 2 -1 4", ByteValue.parse)).toBeUndefined();
  });
  it("空格分隔数字列表 round-trip", () => {
    const v = ListValue.parse("10 20 30", ByteValue.parse);
    expect(v?.items.map((i) => i.value)).toEqual([10, 20, 30]);
    expect(v?.toString()).toBe("10 20 30");
  });
});

describe("导出契约：13 个新值类均可从根入口 import", () => {
  it("所有新类型均是函数（类）", () => {
    expect(OnOffValue).toBeTypeOf("function");
    expect(TrueFalseValue).toBeTypeOf("function");
    expect(TrueFalseBlankValue).toBeTypeOf("function");
    expect(DoubleValue).toBeTypeOf("function");
    expect(SingleValue).toBeTypeOf("function");
    expect(Base64BinaryValue).toBeTypeOf("function");
    expect(ByteValue).toBeTypeOf("function");
    expect(SByteValue).toBeTypeOf("function");
    expect(Int16Value).toBeTypeOf("function");
    expect(UInt16Value).toBeTypeOf("function");
    expect(UInt64Value).toBeTypeOf("function");
    expect(IntegerValue).toBeTypeOf("function");
    expect(ListValue).toBeTypeOf("function");
  });
});
