/**
 * Story-16.1 / 16.2：Word bookmark 助手单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import {
  Paragraph,
  Run,
  Text,
  WordprocessingDocument,
  createBookmarkPair,
} from "../../src/word/index.js";

describe("createBookmarkPair（Story-16.1）", () => {
  it("一对 start/end，id / name 正确，配对", () => {
    const { start, end } = createBookmarkPair("section1", 7);
    expect(start.id?.toString()).toBe("7");
    expect(start.name?.toString()).toBe("section1");
    expect(end.extendedAttributes.get("w:id")).toBe("7");
  });

  it("id 默认 0", () => {
    const { start, end } = createBookmarkPair("home");
    expect(start.id?.toString()).toBe("0");
    expect(end.extendedAttributes.get("w:id")).toBe("0");
  });

  it("空 name 抛 friendly 错", () => {
    expect(() => createBookmarkPair("")).toThrow(OpenXmlPackageError);
    expect(() => createBookmarkPair("")).toThrow(/empty/);
  });

  it("name 超过 40 字符抛 friendly 错", () => {
    const tooLong = "a".repeat(41);
    expect(() => createBookmarkPair(tooLong)).toThrow(/40 chars/);
  });

  it("serialize 形态：bookmarkStart 含 name+id，bookmarkEnd 仅 id", () => {
    const { start, end } = createBookmarkPair("intro", 3);
    expect(serialize(start)).toContain('w:name="intro"');
    expect(serialize(start)).toContain('w:id="3"');
    expect(serialize(end)).toContain('w:id="3"');
    expect(serialize(end)).not.toContain("w:name");
  });
});

describe("WordprocessingDocument.nextBookmarkId（Story-16.2）", () => {
  it("空文档返 0", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.nextBookmarkId()).toBe(0);
  });

  it("文档里有现成 bookmark 时返最大 id+1", () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const append = (e: unknown): void =>
      (body as { appendChild: (e: unknown) => void }).appendChild(e);

    const p = new Paragraph();
    // 模拟手工插入 3 个 bookmark：id=0, 7, 2
    for (const id of [0, 7, 2]) {
      const { start, end } = createBookmarkPair(`b${id}`, id);
      p.appendChild(start);
      const r = new Run();
      const t = new Text();
      t.text = `text${id}`;
      r.appendChild(t);
      p.appendChild(r);
      p.appendChild(end);
    }
    append(p);

    expect(doc.nextBookmarkId()).toBe(8); // max=7, next=8
  });

  it("端到端：nextBookmarkId + createBookmarkPair → save → reopen → bookmark 字节保留", async () => {
    const doc = WordprocessingDocument.create();
    const id = doc.nextBookmarkId();
    const { start, end } = createBookmarkPair("section1", id);

    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    p.appendChild(start);
    const r = new Run();
    const t = new Text();
    t.text = "Section 1";
    r.appendChild(t);
    p.appendChild(r);
    p.appendChild(end);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.nextBookmarkId()).toBe(id + 1);
  });
});
