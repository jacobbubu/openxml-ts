import { describe, expect, it } from "vitest";
import {
  HexBinaryValue,
  Int32Value,
  Int64Value,
  StringValue,
  assertEnum,
  assertNumber,
  assertRequired,
  assertString,
} from "../../../src/index.js";

const CTX = { attribute: "w:author", elementClass: "TestElem" } as const;

describe("assertRequired", () => {
  it("有值通过，无值抛 REQUIRED_ATTR_MISSING", () => {
    expect(() => assertRequired(new StringValue("x"), CTX)).not.toThrow();
    expect(() => assertRequired(undefined, CTX)).toThrowError(
      expect.objectContaining({
        code: "REQUIRED_ATTR_MISSING",
        attribute: "w:author",
        elementClass: "TestElem",
      }),
    );
  });

  it("type narrowing：编译器知道 value 不再是 undefined", () => {
    const v: StringValue | undefined = new StringValue("hi");
    assertRequired(v, CTX);
    // 这一行能通过 TS strict 检查就是测试通过
    expect(v.value).toBe("hi");
  });
});

describe("assertString", () => {
  it("maxLength 命中抛 STRING_TOO_LONG", () => {
    expect(() =>
      assertString(new StringValue("a".repeat(256)), { maxLength: 255 }, CTX),
    ).toThrowError(expect.objectContaining({ code: "STRING_TOO_LONG" }));
  });

  it("maxLength 内通过", () => {
    expect(() => assertString(new StringValue("ok"), { maxLength: 255 }, CTX)).not.toThrow();
  });

  it("minLength 抛 STRING_TOO_LONG（语义复用）", () => {
    expect(() => assertString(new StringValue(""), { minLength: 1 }, CTX)).toThrowError(
      expect.objectContaining({ code: "STRING_TOO_LONG" }),
    );
  });

  it("undefined 直接放行（Required 由 assertRequired 单独抓）", () => {
    expect(() => assertString(undefined, { maxLength: 10 }, CTX)).not.toThrow();
  });
});

describe("assertNumber", () => {
  it("低于 min 抛 NUMBER_OUT_OF_RANGE", () => {
    expect(() => assertNumber(new Int32Value(-5), { min: 0 }, CTX)).toThrowError(
      expect.objectContaining({ code: "NUMBER_OUT_OF_RANGE" }),
    );
  });

  it("高于 max 抛 NUMBER_OUT_OF_RANGE", () => {
    expect(() => assertNumber(new Int32Value(101), { max: 100 }, CTX)).toThrowError(
      expect.objectContaining({ code: "NUMBER_OUT_OF_RANGE" }),
    );
  });

  it("区间内通过", () => {
    expect(() => assertNumber(new Int32Value(50), { min: 0, max: 100 }, CTX)).not.toThrow();
  });

  it("BigInt（Int64Value）也校验", () => {
    expect(() => assertNumber(new Int64Value(2n ** 40n), { max: 1024 }, CTX)).toThrowError(
      expect.objectContaining({ code: "NUMBER_OUT_OF_RANGE" }),
    );
  });

  it("undefined 放行", () => {
    expect(() => assertNumber(undefined, { min: 0, max: 100 }, CTX)).not.toThrow();
  });
});

describe("assertEnum", () => {
  const MEMBERS = ["start", "center", "end"] as const;

  it("合法值通过", () => {
    expect(() => assertEnum(new StringValue("center"), MEMBERS, CTX)).not.toThrow();
  });

  it("非法值抛 ENUM_VALUE_INVALID", () => {
    expect(() => assertEnum(new StringValue("middle"), MEMBERS, CTX)).toThrowError(
      expect.objectContaining({ code: "ENUM_VALUE_INVALID" }),
    );
  });

  it("undefined 放行", () => {
    expect(() => assertEnum(undefined, MEMBERS, CTX)).not.toThrow();
  });
});

describe("错误上下文 attribute / elementClass 透传", () => {
  it("REQUIRED_ATTR_MISSING 错误对象暴露上下文字段", () => {
    try {
      assertRequired(undefined, {
        attribute: "w:date",
        elementClass: "Paragraph",
      });
    } catch (err) {
      expect(err).toMatchObject({
        code: "REQUIRED_ATTR_MISSING",
        attribute: "w:date",
        elementClass: "Paragraph",
      });
      return;
    }
    throw new Error("expected to throw");
  });

  it("HexBinaryValue 走 assertString 路径", () => {
    const v = new HexBinaryValue("00AB12CD");
    expect(() => assertString(v, { maxLength: 4 }, CTX)).toThrowError(
      expect.objectContaining({ code: "STRING_TOO_LONG" }),
    );
  });
});
