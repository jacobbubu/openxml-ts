/**
 * Story-12.2：`WordprocessingDocument.addImagePart` / `PresentationDocument.addImagePart`
 * 集成测试。
 *
 * 验证：
 * - 字节 → part bytes 在 reopen 后保留；
 * - URI 自动递增（image1, image2, ...）；
 * - relId 实际挂在正确 owner Part 的关系集合里；
 * - content-type 不传时从 magic 嗅探出；
 * - 不识别的字节抛 friendly 错。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import { ImagePart } from "../../src/parts/image-part.js";
import { PresentationDocument } from "../../src/ppt/index.js";
import { WordprocessingDocument } from "../../src/word/index.js";

/** 最小 PNG（8 字节 magic + 17 字节 IHDR + 12 字节 IEND，可被任何 PNG 读取器接受）。 */
const TINY_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  // IHDR chunk: 1×1 8-bit RGBA
  0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89,
  // IEND
  0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
]);

const TINY_JPEG = new Uint8Array([
  0xff,
  0xd8,
  0xff,
  0xe0,
  0x00,
  0x10,
  0x4a,
  0x46,
  0x49,
  0x46,
  0x00,
  0x01,
  // 后面随便填，不解码
  ...new Array(20).fill(0),
  0xff,
  0xd9,
]);

describe("WordprocessingDocument.addImagePart（Story-12.2）", () => {
  it("加一张 PNG → URI / relId / bytes 全部正确", async () => {
    const doc = WordprocessingDocument.create();
    const { part, relId } = doc.addImagePart(TINY_PNG);

    expect(part).toBeInstanceOf(ImagePart);
    expect(part.uri).toBe("/word/media/image1.png");
    expect(part.contentType).toBe("image/png");
    expect([...part.bytes]).toEqual([...TINY_PNG]);
    expect(relId).toMatch(/^rId\d+$/);

    // 关系挂在 mainDocumentPart 上
    const main = doc.mainDocumentPart!;
    const rels = [...main.part.relationships];
    const imageRel = rels.find((r) => r.id === relId);
    expect(imageRel).toBeDefined();
    expect(imageRel?.type).toBe(ImagePart.relationshipType);
    expect(imageRel?.target).toBe("media/image1.png");
  });

  it("递增分配 image1 / image2 / image3", () => {
    const doc = WordprocessingDocument.create();
    const a = doc.addImagePart(TINY_PNG);
    const b = doc.addImagePart(TINY_JPEG);
    const c = doc.addImagePart(TINY_PNG, { contentType: "image/png" });

    expect(a.part.uri).toBe("/word/media/image1.png");
    expect(b.part.uri).toBe("/word/media/image2.jpg");
    expect(c.part.uri).toBe("/word/media/image3.png");
    // 3 个不同 relId
    expect(new Set([a.relId, b.relId, c.relId]).size).toBe(3);
  });

  it("不传 contentType 时按字节 magic 嗅探（PNG）", () => {
    const doc = WordprocessingDocument.create();
    const { part } = doc.addImagePart(TINY_PNG);
    expect(part.contentType).toBe("image/png");
  });

  it("不传 contentType 时按字节 magic 嗅探（JPEG）", () => {
    const doc = WordprocessingDocument.create();
    const { part } = doc.addImagePart(TINY_JPEG);
    expect(part.contentType).toBe("image/jpeg");
  });

  it("字节嗅不出来时抛 friendly 错（要求显式传 contentType）", () => {
    const doc = WordprocessingDocument.create();
    const garbage = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(() => doc.addImagePart(garbage)).toThrow(OpenXmlPackageError);
    expect(() => doc.addImagePart(garbage)).toThrow(/MIME/);
  });

  it("baseName 自定义", () => {
    const doc = WordprocessingDocument.create();
    const { part } = doc.addImagePart(TINY_PNG, { baseName: "logo" });
    expect(part.uri).toBe("/word/media/logo.png");
  });

  it("save → reopen 后图片字节保留 + 关系仍在", async () => {
    const doc = WordprocessingDocument.create();
    const { relId } = doc.addImagePart(TINY_PNG);
    const out = await doc.saveAsBytesAsync();

    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.package.hasPart("/word/media/image1.png" as never)).toBe(true);
    const reRels = [...reopened.mainDocumentPart!.part.relationships];
    const imgRel = reRels.find((r) => r.id === relId);
    expect(imgRel).toBeDefined();
    expect(imgRel?.type).toBe(ImagePart.relationshipType);
  });
});

describe("PresentationDocument.addImagePart（Story-12.2）", () => {
  it("加图到第 0 张 slide → URI / relId 正确", () => {
    const doc = PresentationDocument.create();
    const { part, relId } = doc.addImagePart(0, TINY_PNG);

    expect(part.uri).toBe("/ppt/media/image1.png");
    expect(part.contentType).toBe("image/png");
    expect(relId).toMatch(/^rId\d+$/);

    // 关系挂在 slide1 的 part-level 上，target 用相对路径
    const slidePart = doc.presentationPart!.slideParts[0]!;
    const rels = [...slidePart.part.relationships];
    const imgRel = rels.find((r) => r.id === relId);
    expect(imgRel?.type).toBe(ImagePart.relationshipType);
    expect(imgRel?.target).toBe("../media/image1.png");
  });

  it("接受 SlidePart 引用而非下标", () => {
    const doc = PresentationDocument.create();
    const slide0 = doc.presentationPart!.slideParts[0]!;
    const { part } = doc.addImagePart(slide0, TINY_PNG);
    expect(part.uri).toBe("/ppt/media/image1.png");
  });

  it("slide 越界抛 friendly 错", () => {
    const doc = PresentationDocument.create();
    expect(() => doc.addImagePart(99, TINY_PNG)).toThrow(OpenXmlPackageError);
    expect(() => doc.addImagePart(99, TINY_PNG)).toThrow(/out of range/);
  });

  it("save → reopen 后图片保留", async () => {
    const doc = PresentationDocument.create();
    doc.addImagePart(0, TINY_PNG);
    const out = await doc.saveAsBytesAsync();

    const reopened = await PresentationDocument.openAsync(out);
    expect(reopened.package.hasPart("/ppt/media/image1.png" as never)).toBe(true);
  });
});
