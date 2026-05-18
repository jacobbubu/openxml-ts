/**
 * Story-12.1：BinaryPart / ImagePart 单元测试。
 *
 * 集中验 MIME 工具函数与 BinaryPart 字节读写——facade `addImagePart` 走集成
 * 测试，见各子系统 facade 测试。
 */

import { describe, expect, it } from "vitest";
import { createInMemory } from "../../src/packaging/index.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";
import { BinaryPart } from "../../src/parts/binary-part.js";
import {
  IMAGE_MIME_BY_EXTENSION,
  ImagePart,
  extensionForMime,
  mimeForExtension,
  sniffImageMime,
} from "../../src/parts/image-part.js";

describe("mimeForExtension / extensionForMime（Story-12.1）", () => {
  it("常见图片扩展名都能映射到 MIME", () => {
    expect(mimeForExtension("png")).toBe("image/png");
    expect(mimeForExtension("jpg")).toBe("image/jpeg");
    expect(mimeForExtension("jpeg")).toBe("image/jpeg");
    expect(mimeForExtension("gif")).toBe("image/gif");
    expect(mimeForExtension("svg")).toBe("image/svg+xml");
  });

  it("大小写无关", () => {
    expect(mimeForExtension("PNG")).toBe("image/png");
    expect(mimeForExtension("Jpeg")).toBe("image/jpeg");
  });

  it("未知扩展名返回 undefined", () => {
    expect(mimeForExtension("webp")).toBeUndefined();
    expect(mimeForExtension("")).toBeUndefined();
  });

  it("MIME → 规范化扩展名（jpeg/tiff 取短形式）", () => {
    expect(extensionForMime("image/png")).toBe("png");
    expect(extensionForMime("image/jpeg")).toBe("jpg");
    expect(extensionForMime("image/tiff")).toBe("tif");
    expect(extensionForMime("image/svg+xml")).toBe("svg");
  });

  it("未知 MIME 返回 undefined", () => {
    expect(extensionForMime("image/webp")).toBeUndefined();
  });

  it("常量表覆盖 8 种 OOXML 主流图片类型", () => {
    expect(Object.keys(IMAGE_MIME_BY_EXTENSION).sort()).toEqual([
      "bmp",
      "gif",
      "jpeg",
      "jpg",
      "png",
      "svg",
      "tif",
      "tiff",
    ]);
  });
});

describe("sniffImageMime（Story-12.1）", () => {
  it("PNG magic 识别", () => {
    const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0]);
    expect(sniffImageMime(png)).toBe("image/png");
  });

  it("JPEG magic 识别", () => {
    expect(sniffImageMime(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe("image/jpeg");
  });

  it("GIF magic 识别", () => {
    expect(sniffImageMime(new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]))).toBe("image/gif");
  });

  it("BMP magic 识别", () => {
    expect(sniffImageMime(new Uint8Array([0x42, 0x4d, 0x40, 0x00]))).toBe("image/bmp");
  });

  it("TIFF magic 识别（II 与 MM 两种字节序）", () => {
    expect(sniffImageMime(new Uint8Array([0x49, 0x49, 0x2a, 0x00]))).toBe("image/tiff");
    expect(sniffImageMime(new Uint8Array([0x4d, 0x4d, 0x00, 0x2a]))).toBe("image/tiff");
  });

  it("SVG 识别（<?xml 开头或 <svg 开头）", () => {
    const svg1 = new TextEncoder().encode('<svg xmlns="http://...">...</svg>');
    expect(sniffImageMime(svg1)).toBe("image/svg+xml");
    const svg2 = new TextEncoder().encode('<?xml version="1.0"?><svg/>');
    expect(sniffImageMime(svg2)).toBe("image/svg+xml");
  });

  it("不识别返回 undefined", () => {
    expect(sniffImageMime(new Uint8Array([0, 0, 0, 0]))).toBeUndefined();
    expect(sniffImageMime(new Uint8Array(0))).toBeUndefined();
  });
});

describe("BinaryPart / ImagePart：字节读写", () => {
  it("ImagePart 包一个 IPackagePart 后能拿到 contentType / uri / bytes", async () => {
    const pkg = createInMemory();
    const uri = "/word/media/image1.png" as PartUri;
    const raw = pkg.createPart(uri, "image/png");
    const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    await raw.writeAsync(bytes);

    const ip = new ImagePart(raw);
    expect(ip).toBeInstanceOf(BinaryPart);
    expect(ip.uri).toBe(uri);
    expect(ip.contentType).toBe("image/png");
    expect(ip.contentTypeAtCreation).toBe("image/png");
    expect([...ip.bytes]).toEqual([...bytes]);
  });

  it("writeAsync 替换字节后 bytes 反映新内容", async () => {
    const pkg = createInMemory();
    const raw = pkg.createPart("/ppt/media/image1.png" as PartUri, "image/png");
    const ip = new ImagePart(raw);

    await ip.writeAsync(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]));
    expect([...ip.bytes]).toEqual([0xff, 0xd8, 0xff, 0xe0]);
  });

  it("relationshipType 常量正确", () => {
    expect(ImagePart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
    );
  });
});
