import { describe, expectTypeOf, it } from "vitest";
import {
  type AccessMode,
  type CompressionLevel,
  type CreateRelationshipInput,
  type IPackage,
  type IPackagePart,
  type IPackageProperties,
  type IPackageRelationship,
  type IRelationshipCollection,
  OpenXmlPackageError,
  type OpenXmlPackageErrorCode,
  type PartUri,
  type PartWriteInput,
  type TargetMode,
  isPartUri,
} from "../../src/index.js";

describe("公共 API 导出契约", () => {
  it("isPartUri 是值导出", () => {
    expectTypeOf(isPartUri).toBeFunction();
  });

  it("OpenXmlPackageError 是可构造的值导出", () => {
    expectTypeOf(OpenXmlPackageError).toBeConstructibleWith({
      code: "PART_NOT_FOUND",
    });
  });

  it("AccessMode / TargetMode / CompressionLevel 字面量类型形状", () => {
    expectTypeOf<AccessMode>().toEqualTypeOf<"read" | "readWrite">();
    expectTypeOf<TargetMode>().toEqualTypeOf<"internal" | "external">();
    expectTypeOf<CompressionLevel>().toEqualTypeOf<"none" | "fast" | "normal" | "max">();
  });

  it("PartUri 不可与裸 string 直接互赋（brand 起作用）", () => {
    expectTypeOf<string>().not.toMatchTypeOf<PartUri>();
  });

  it("接口类型可被 export", () => {
    expectTypeOf<IPackage>().toBeObject();
    expectTypeOf<IPackagePart>().toBeObject();
    expectTypeOf<IPackageRelationship>().toBeObject();
    expectTypeOf<IRelationshipCollection>().toBeObject();
    expectTypeOf<IPackageProperties>().toBeObject();
    expectTypeOf<CreateRelationshipInput>().toBeObject();
    expectTypeOf<OpenXmlPackageErrorCode>().toBeString();
    expectTypeOf<PartWriteInput>().toMatchTypeOf<
      Uint8Array | string | Blob | ReadableStream<Uint8Array>
    >();
  });

  it("IPackage 同时实现 Disposable 与 AsyncDisposable", () => {
    expectTypeOf<IPackage>().toMatchTypeOf<Disposable>();
    expectTypeOf<IPackage>().toMatchTypeOf<AsyncDisposable>();
  });
});
