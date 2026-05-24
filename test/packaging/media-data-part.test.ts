/**
 * Epic-128: MediaDataPart / VideoReferenceRelationship + CreateMediaDataPart facade
 *
 * 验证：
 * - MediaDataPart 创建后 URI / contentType / bytes 正确；
 * - OPC 包内 `media/media1.mp4` Part 存在；
 * - 引用关系类型（Video / Audio / Media）正确写入 owner Part 的 .rels；
 * - round-trip：保存 → 重打开后 MediaDataPart 仍存在、关系仍在；
 * - Word / PPT / Excel 三个 facade 都正确工作；
 * - baseName 自定义 + URI 递增分配。
 */

import { describe, expect, it } from "vitest";
import { SpreadsheetDocument } from "../../src/excel/spreadsheet-document.js";
import { MediaDataPart } from "../../src/parts/media-data-part.js";
import {
  AudioReferenceRelationship,
  MediaReferenceRelationship,
  VideoReferenceRelationship,
} from "../../src/parts/reference-relationships.js";
import { PresentationDocument } from "../../src/ppt/presentation-document.js";
import { WordprocessingDocument } from "../../src/word/word-document.js";

/** 最小 MP4 ftyp box stub（4 字节）——验证字节 round-trip 用。 */
const STUB_MP4 = new Uint8Array([0x66, 0x74, 0x79, 0x70]);

/** 最小 WAV stub。 */
const STUB_WAV = new Uint8Array([0x52, 0x49, 0x46, 0x46]);

// ─── 关系类型常量 ─────────────────────────────────────────────────────────────

describe("ReferenceRelationship 关系类型常量", () => {
  it("VideoReferenceRelationship.relationshipType 对位 .NET", () => {
    expect(VideoReferenceRelationship.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/video",
    );
  });

  it("AudioReferenceRelationship.relationshipType 对位 .NET", () => {
    expect(AudioReferenceRelationship.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio",
    );
  });

  it("MediaReferenceRelationship.relationshipType 对位 .NET（Microsoft 私有命名空间）", () => {
    expect(MediaReferenceRelationship.relationshipType).toBe(
      "http://schemas.microsoft.com/office/2007/relationships/media",
    );
  });
});

// ─── WordprocessingDocument facade ──────────────────────────────────────────

describe("WordprocessingDocument.addMediaDataPart（Epic-128）", () => {
  it("addVideoReferenceRelationship → URI / contentType / relId 正确", () => {
    const doc = WordprocessingDocument.create();
    const { part, relId } = doc.addVideoReferenceRelationship("video/mp4", STUB_MP4);

    expect(part).toBeInstanceOf(MediaDataPart);
    expect(part.uri).toBe("/word/media/media1.mp4");
    expect(part.contentType).toBe("video/mp4");
    expect([...part.bytes]).toEqual([...STUB_MP4]);
    expect(relId).toMatch(/^rId\d+$/);
  });

  it("addVideoReferenceRelationship → 关系类型写入 mainDocumentPart .rels", () => {
    const doc = WordprocessingDocument.create();
    const { relId } = doc.addVideoReferenceRelationship("video/mp4", STUB_MP4);

    const main = doc.mainDocumentPart!;
    const rel = [...main.part.relationships].find((r) => r.id === relId);
    expect(rel).toBeDefined();
    expect(rel?.type).toBe(VideoReferenceRelationship.relationshipType);
    expect(rel?.targetMode).toBe("internal");
    expect(rel?.target).toBe("media/media1.mp4");
  });

  it("addAudioReferenceRelationship → 关系类型正确", () => {
    const doc = WordprocessingDocument.create();
    const { part, relId } = doc.addAudioReferenceRelationship("audio/wav", STUB_WAV);

    expect(part.uri).toBe("/word/media/media1.wav");
    expect(part.contentType).toBe("audio/wav");
    const main = doc.mainDocumentPart!;
    const rel = [...main.part.relationships].find((r) => r.id === relId);
    expect(rel?.type).toBe(AudioReferenceRelationship.relationshipType);
  });

  it("addMediaReferenceRelationship → Microsoft 私有关系类型正确", () => {
    const doc = WordprocessingDocument.create();
    const { relId } = doc.addMediaReferenceRelationship("video/mp4", STUB_MP4);

    const main = doc.mainDocumentPart!;
    const rel = [...main.part.relationships].find((r) => r.id === relId);
    expect(rel?.type).toBe(MediaReferenceRelationship.relationshipType);
  });

  it("URI 递增分配 media1 / media2", () => {
    const doc = WordprocessingDocument.create();
    const a = doc.addVideoReferenceRelationship("video/mp4", STUB_MP4);
    const b = doc.addAudioReferenceRelationship("audio/wav", STUB_WAV);

    expect(a.part.uri).toBe("/word/media/media1.mp4");
    expect(b.part.uri).toBe("/word/media/media2.wav");
    expect(a.relId).not.toBe(b.relId);
  });

  it("baseName 自定义", () => {
    const doc = WordprocessingDocument.create();
    const { part } = doc.addVideoReferenceRelationship("video/mp4", STUB_MP4, {
      baseName: "intro",
    });
    expect(part.uri).toBe("/word/media/intro.mp4");
  });

  it("bytes 省略 → 创建空 Part，URI 仍正确", () => {
    const doc = WordprocessingDocument.create();
    const { part } = doc.addVideoReferenceRelationship("video/mp4");
    expect(part.uri).toBe("/word/media/media1.mp4");
    expect(part.contentType).toBe("video/mp4");
  });

  it("save → reopen 后 MediaDataPart 仍存在、关系仍在", async () => {
    const doc = WordprocessingDocument.create();
    const { relId } = doc.addVideoReferenceRelationship("video/mp4", STUB_MP4);
    const out = await doc.saveAsBytesAsync();

    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.package.hasPart("/word/media/media1.mp4" as never)).toBe(true);
    const rels = [...reopened.mainDocumentPart!.part.relationships];
    const videoRel = rels.find((r) => r.id === relId);
    expect(videoRel).toBeDefined();
    expect(videoRel?.type).toBe(VideoReferenceRelationship.relationshipType);
  });
});

// ─── PresentationDocument facade ─────────────────────────────────────────────

describe("PresentationDocument.addMediaDataPart（Epic-128）", () => {
  it("addVideoReferenceRelationship → URI / contentType / relId 正确", () => {
    const doc = PresentationDocument.create();
    const { part, relId } = doc.addVideoReferenceRelationship(0, "video/mp4", STUB_MP4);

    expect(part).toBeInstanceOf(MediaDataPart);
    expect(part.uri).toBe("/ppt/media/media1.mp4");
    expect(part.contentType).toBe("video/mp4");
    expect(relId).toMatch(/^rId\d+$/);
  });

  it("addVideoReferenceRelationship → 关系挂在 slide0 的 part-level", () => {
    const doc = PresentationDocument.create();
    const { relId } = doc.addVideoReferenceRelationship(0, "video/mp4", STUB_MP4);

    const slidePart = doc.presentationPart!.slideParts[0]!;
    const rels = [...slidePart.part.relationships];
    const rel = rels.find((r) => r.id === relId);
    expect(rel?.type).toBe(VideoReferenceRelationship.relationshipType);
    // slide 在 /ppt/slides/slide1.xml，媒体在 /ppt/media/ → 相对路径含 ../
    expect(rel?.target).toBe("../media/media1.mp4");
  });

  it("addAudioReferenceRelationship → 关系类型正确", () => {
    const doc = PresentationDocument.create();
    const { relId } = doc.addAudioReferenceRelationship(0, "audio/wav", STUB_WAV);

    const slidePart = doc.presentationPart!.slideParts[0]!;
    const rel = [...slidePart.part.relationships].find((r) => r.id === relId);
    expect(rel?.type).toBe(AudioReferenceRelationship.relationshipType);
  });

  it("接受 SlidePart 引用而非下标", () => {
    const doc = PresentationDocument.create();
    const slide0 = doc.presentationPart!.slideParts[0]!;
    const { part } = doc.addVideoReferenceRelationship(slide0, "video/mp4", STUB_MP4);
    expect(part.uri).toBe("/ppt/media/media1.mp4");
  });

  it("save → reopen 后 MediaDataPart 仍存在", async () => {
    const doc = PresentationDocument.create();
    doc.addVideoReferenceRelationship(0, "video/mp4", STUB_MP4);
    const out = await doc.saveAsBytesAsync();

    const reopened = await PresentationDocument.openAsync(out);
    expect(reopened.package.hasPart("/ppt/media/media1.mp4" as never)).toBe(true);
  });
});

// ─── SpreadsheetDocument facade ──────────────────────────────────────────────

describe("SpreadsheetDocument.addMediaDataPart（Epic-128）", () => {
  it("addVideoReferenceRelationship → URI / contentType / relId 正确", () => {
    const doc = SpreadsheetDocument.create();
    const { part, relId } = doc.addVideoReferenceRelationship("video/mp4", STUB_MP4);

    expect(part).toBeInstanceOf(MediaDataPart);
    expect(part.uri).toBe("/xl/media/media1.mp4");
    expect(part.contentType).toBe("video/mp4");
    expect(relId).toMatch(/^rId\d+$/);
  });

  it("addAudioReferenceRelationship → 关系类型正确", () => {
    const doc = SpreadsheetDocument.create();
    const { relId } = doc.addAudioReferenceRelationship("audio/wav", STUB_WAV);

    const wb = doc.workbookPart!;
    const rel = [...wb.part.relationships].find((r) => r.id === relId);
    expect(rel?.type).toBe(AudioReferenceRelationship.relationshipType);
  });

  it("save → reopen 后 MediaDataPart 仍存在", async () => {
    const doc = SpreadsheetDocument.create();
    doc.addVideoReferenceRelationship("video/mp4", STUB_MP4);
    const out = await doc.saveAsBytesAsync();

    const reopened = await SpreadsheetDocument.openAsync(out);
    expect(reopened.package.hasPart("/xl/media/media1.mp4" as never)).toBe(true);
  });
});
