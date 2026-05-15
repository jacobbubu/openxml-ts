import { describe, expect, expectTypeOf, it } from "vitest";
import { OpenXmlPackageError, type OpenXmlPackageErrorCode } from "../../src/packaging/errors.js";
import { tryPartUri } from "../../src/packaging/interfaces/types.js";

describe("OpenXmlPackageError", () => {
  it("仅传 code 时使用默认 message", () => {
    const err = new OpenXmlPackageError({ code: "PART_NOT_FOUND" });
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(OpenXmlPackageError);
    expect(err.code).toBe("PART_NOT_FOUND");
    expect(err.message).toMatch(/does not exist/);
    expect(err.name).toBe("OpenXmlPackageError");
    expect(err.partUri).toBeUndefined();
    expect(err.relationshipId).toBeUndefined();
    expect(err.cause).toBeUndefined();
  });

  it("message 可被显式覆盖", () => {
    const err = new OpenXmlPackageError({
      code: "INVALID_PART_URI",
      message: "Custom diagnostic",
    });
    expect(err.message).toBe("Custom diagnostic");
  });

  it("透传 cause（ES2022 Error options）", () => {
    const root = new TypeError("boom");
    const err = new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      cause: root,
    });
    expect(err.cause).toBe(root);
  });

  it("携带 partUri / relationshipId 上下文", () => {
    const uri = tryPartUri("/word/document.xml");
    expect(uri).toBeDefined();
    const err = new OpenXmlPackageError({
      code: "PART_NOT_FOUND",
      partUri: uri,
      relationshipId: "rId7",
    });
    expect(err.partUri).toBe("/word/document.xml");
    expect(err.relationshipId).toBe("rId7");
  });

  it("toJSON 暴露稳定可观察形态", () => {
    const err = new OpenXmlPackageError({
      code: "RELATIONSHIP_ID_CONFLICT",
      relationshipId: "rId1",
      cause: new Error("nope"),
    });
    const json = err.toJSON();
    expect(json).toEqual({
      name: "OpenXmlPackageError",
      code: "RELATIONSHIP_ID_CONFLICT",
      message: expect.any(String),
      relationshipId: "rId1",
      cause: { name: "Error", message: "nope" },
    });
    expect(JSON.parse(JSON.stringify(err))).toEqual(json);
  });

  it("toJSON 在没有可选字段时不输出空键", () => {
    const err = new OpenXmlPackageError({ code: "STREAM_CLOSED" });
    const json = err.toJSON();
    expect(json).not.toHaveProperty("partUri");
    expect(json).not.toHaveProperty("relationshipId");
    expect(json).not.toHaveProperty("cause");
  });

  it("非 Error cause 被序列化为字符串", () => {
    const err = new OpenXmlPackageError({
      code: "SECURITY_VIOLATION",
      cause: { status: 413 },
    });
    expect(err.toJSON().cause).toBe("[object Object]");
  });

  it("code 字面量联合可做 switch 收敛", () => {
    function classify(err: OpenXmlPackageError): "missing" | "conflict" | "other" {
      switch (err.code) {
        case "PART_NOT_FOUND":
        case "MISSING_CONTENT_TYPES":
        case "CONTENT_TYPE_MISSING":
          return "missing";
        case "PART_ALREADY_EXISTS":
        case "RELATIONSHIP_ID_CONFLICT":
          return "conflict";
        default:
          return "other";
      }
    }
    expect(classify(new OpenXmlPackageError({ code: "PART_NOT_FOUND" }))).toBe("missing");
    expect(classify(new OpenXmlPackageError({ code: "RELATIONSHIP_ID_CONFLICT" }))).toBe(
      "conflict",
    );
    expect(classify(new OpenXmlPackageError({ code: "STREAM_CLOSED" }))).toBe("other");
  });

  it("错误码字面量联合的类型完整性（编译期）", () => {
    // 把已知 12 个 code 排成数组——任何遗漏都会导致 expectTypeOf 失败
    expectTypeOf<OpenXmlPackageErrorCode>().toEqualTypeOf<
      | "INVALID_ZIP"
      | "MISSING_CONTENT_TYPES"
      | "PART_NOT_FOUND"
      | "PART_ALREADY_EXISTS"
      | "RELATIONSHIP_ID_CONFLICT"
      | "RELATIONSHIP_TARGET_INVALID"
      | "CONTENT_TYPE_MISSING"
      | "UNSUPPORTED_OPERATION"
      | "BACKEND_ERROR"
      | "INVALID_PART_URI"
      | "STREAM_CLOSED"
      | "SECURITY_VIOLATION"
    >();
  });
});
