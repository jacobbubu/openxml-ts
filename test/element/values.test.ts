import { describe, expect, it } from "vitest";
import {
  BooleanValue,
  DateTimeValue,
  DecimalValue,
  EnumValue,
  HexBinaryValue,
  Int32Value,
  Int64Value,
  StringValue,
  UInt32Value,
} from "../../src/index.js";

describe("StringValue", () => {
  it("toString round-trip", () => {
    expect(new StringValue("hi").toString()).toBe("hi");
    expect(StringValue.parse("中文")?.toString()).toBe("中文");
  });
  it("空字符串保留为空字符串", () => {
    expect(StringValue.parse("")?.value).toBe("");
  });
  it("undefined → undefined", () => {
    expect(StringValue.parse(undefined)).toBeUndefined();
  });
});

describe("BooleanValue", () => {
  it("serialize 固定 1/0", () => {
    expect(new BooleanValue(true).toString()).toBe("1");
    expect(new BooleanValue(false).toString()).toBe("0");
  });
  it("parse 接受 6 类形态（大小写无关）", () => {
    expect(BooleanValue.parse("1")?.value).toBe(true);
    expect(BooleanValue.parse("0")?.value).toBe(false);
    expect(BooleanValue.parse("true")?.value).toBe(true);
    expect(BooleanValue.parse("FALSE")?.value).toBe(false);
    expect(BooleanValue.parse("On")?.value).toBe(true);
    expect(BooleanValue.parse("off")?.value).toBe(false);
  });
  it("非法形态返回 undefined", () => {
    expect(BooleanValue.parse("yes")).toBeUndefined();
    expect(BooleanValue.parse("2")).toBeUndefined();
    expect(BooleanValue.parse("")).toBeUndefined();
  });
});

describe("Int32Value", () => {
  it("正常 round-trip", () => {
    expect(new Int32Value(42).toString()).toBe("42");
    expect(Int32Value.parse("-2147483648")?.value).toBe(-2_147_483_648);
    expect(Int32Value.parse("2147483647")?.value).toBe(2_147_483_647);
  });
  it("越界 → undefined（parse）/ 抛错（构造）", () => {
    expect(Int32Value.parse("2147483648")).toBeUndefined();
    expect(Int32Value.parse("-2147483649")).toBeUndefined();
    expect(() => new Int32Value(2_147_483_648)).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });
  it("含小数 / 非数字 / 空 → undefined", () => {
    expect(Int32Value.parse("3.14")).toBeUndefined();
    expect(Int32Value.parse("abc")).toBeUndefined();
    expect(Int32Value.parse("")).toBeUndefined();
    expect(Int32Value.parse(undefined)).toBeUndefined();
  });
});

describe("UInt32Value", () => {
  it("0 与最大值 round-trip", () => {
    expect(new UInt32Value(0).toString()).toBe("0");
    expect(UInt32Value.parse("4294967295")?.value).toBe(4_294_967_295);
  });
  it("负数与越界 → undefined", () => {
    expect(UInt32Value.parse("-1")).toBeUndefined();
    expect(UInt32Value.parse("4294967296")).toBeUndefined();
    expect(() => new UInt32Value(-1)).toThrow();
  });
});

describe("Int64Value (BigInt)", () => {
  it("超 Number 精度的值仍保真", () => {
    const big = "9007199254740993"; // 2^53 + 1
    expect(Int64Value.parse(big)?.value).toBe(9_007_199_254_740_993n);
    expect(Int64Value.parse(big)?.toString()).toBe(big);
  });
  it("边界 2^63-1 / -2^63", () => {
    expect(Int64Value.parse("9223372036854775807")?.value).toBe(2n ** 63n - 1n);
    expect(Int64Value.parse("-9223372036854775808")?.value).toBe(-(2n ** 63n));
  });
  it("越界 / 非整数 → undefined", () => {
    expect(Int64Value.parse("9223372036854775808")).toBeUndefined();
    expect(Int64Value.parse("3.14")).toBeUndefined();
    expect(Int64Value.parse("abc")).toBeUndefined();
  });
});

describe("DecimalValue", () => {
  it("整数 + 小数 round-trip", () => {
    expect(new DecimalValue(0).toString()).toBe("0");
    expect(DecimalValue.parse("3.14")?.value).toBe(3.14);
    expect(DecimalValue.parse("-0.5")?.value).toBe(-0.5);
  });
  it("非法 → undefined", () => {
    expect(DecimalValue.parse("abc")).toBeUndefined();
    expect(DecimalValue.parse("")).toBeUndefined();
    expect(DecimalValue.parse("1.2.3")).toBeUndefined();
  });
  it("非 finite 构造抛 RangeError", () => {
    expect(() => new DecimalValue(Number.NaN)).toThrow(RangeError);
    expect(() => new DecimalValue(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});

describe("HexBinaryValue", () => {
  it("rsid 形态 round-trip", () => {
    const v = HexBinaryValue.parse("00C50A98");
    expect(v?.value).toBe("00C50A98");
    expect(v?.toString()).toBe("00C50A98");
  });
  it("接受混合大小写并归一化为大写", () => {
    expect(HexBinaryValue.parse("abcdef")?.value).toBe("ABCDEF");
  });
  it("奇数长度 → undefined", () => {
    expect(HexBinaryValue.parse("abc")).toBeUndefined();
  });
  it("非 hex 字符 → undefined", () => {
    expect(HexBinaryValue.parse("xyz0")).toBeUndefined();
  });
  it("toBytes 与 fromBytes 双向保真", () => {
    const bytes = new Uint8Array([0x00, 0xc5, 0x0a, 0x98]);
    const v = HexBinaryValue.fromBytes(bytes);
    expect(v.value).toBe("00C50A98");
    expect(v.toBytes()).toEqual(bytes);
  });
  it("空字节流构造空 hex（合法）", () => {
    const v = HexBinaryValue.fromBytes(new Uint8Array(0));
    expect(v.value).toBe("");
    expect(v.toBytes()).toEqual(new Uint8Array(0));
  });
});

describe("DateTimeValue", () => {
  it("ISO 8601 round-trip", () => {
    const iso = "2026-05-15T07:00:00.000Z";
    const v = DateTimeValue.parse(iso);
    expect(v?.toString()).toBe(iso);
  });
  it("无时区接受为本地解析（仍为合法 Date）", () => {
    const v = DateTimeValue.parse("2026-05-15T07:00:00");
    expect(v).toBeDefined();
    expect(Number.isNaN(v?.value.getTime())).toBe(false);
  });
  it("非法日期 → undefined", () => {
    expect(DateTimeValue.parse("not-a-date")).toBeUndefined();
    expect(DateTimeValue.parse("")).toBeUndefined();
  });
  it("Invalid Date 构造抛错", () => {
    expect(() => new DateTimeValue(new Date("invalid"))).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });
});

describe("EnumValue<T>", () => {
  const ALIGN = ["start", "center", "end"] as const;
  type Align = (typeof ALIGN)[number];

  it("合法成员 round-trip", () => {
    const v = EnumValue.parse<Align>("center", ALIGN);
    expect(v?.value).toBe("center");
    expect(v?.toString()).toBe("center");
  });
  it("未知值 → undefined（不抛）", () => {
    expect(EnumValue.parse<Align>("middle", ALIGN)).toBeUndefined();
  });
  it("undefined → undefined", () => {
    expect(EnumValue.parse<Align>(undefined, ALIGN)).toBeUndefined();
  });
  it("空 members 列表 → undefined", () => {
    expect(EnumValue.parse("foo", [] as const)).toBeUndefined();
  });
  it("类型层面：value 的字面量类型受 T 约束", () => {
    const v = EnumValue.parse<Align>("start", ALIGN);
    // 编译期：v?.value 是 Align 而不是 string
    if (v !== undefined) {
      const literal: Align = v.value;
      expect(literal).toBe("start");
    }
  });
});

describe("整体导出契约", () => {
  it("所有 9 个值类都可从根入口 import", () => {
    expect(StringValue).toBeTypeOf("function");
    expect(BooleanValue).toBeTypeOf("function");
    expect(Int32Value).toBeTypeOf("function");
    expect(UInt32Value).toBeTypeOf("function");
    expect(Int64Value).toBeTypeOf("function");
    expect(DecimalValue).toBeTypeOf("function");
    expect(HexBinaryValue).toBeTypeOf("function");
    expect(DateTimeValue).toBeTypeOf("function");
    expect(EnumValue).toBeTypeOf("function");
  });
});
