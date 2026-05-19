/**
 * Story-19.1 / 19.2：Word 修订追踪 markup 助手 + nextRevisionId 单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import {
  DeletedRun,
  DeletedText,
  InsertedRun,
  Paragraph,
  Run,
  Text,
  WordprocessingDocument,
  createDeletedRun,
  createInsertedRun,
} from "../../src/word/index.js";

describe("createInsertedRun（Story-19.1）", () => {
  it("返 <w:ins> 含 author / id / date / 内嵌 Run+Text", () => {
    const ins = createInsertedRun({
      author: "Alice",
      id: 3,
      date: "2026-05-19T08:00:00Z",
      text: "new",
    });
    expect(ins).toBeInstanceOf(InsertedRun);
    expect(ins.extendedAttributes.get("w:id")).toBe("3");
    expect(ins.extendedAttributes.get("w:author")).toBe("Alice");
    expect(ins.extendedAttributes.get("w:date")).toBe("2026-05-19T08:00:00Z");

    const xml = serialize(ins);
    expect(xml).toContain("<w:ins");
    expect(xml).toContain('w:author="Alice"');
    expect(xml).toContain(">new<");
  });

  it("默认 id=0、date=now ISO", () => {
    const ins = createInsertedRun({ author: "Bob", text: "x" });
    expect(ins.extendedAttributes.get("w:id")).toBe("0");
    expect(ins.extendedAttributes.get("w:date")).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("Date 对象 → ISO 字符串", () => {
    const d = new Date("2026-01-01T12:00:00Z");
    const ins = createInsertedRun({ author: "A", date: d, text: "x" });
    expect(ins.extendedAttributes.get("w:date")).toBe("2026-01-01T12:00:00.000Z");
  });

  it("空 author 抛 friendly 错", () => {
    expect(() => createInsertedRun({ author: "", text: "x" })).toThrow(OpenXmlPackageError);
    expect(() => createInsertedRun({ author: "  ", text: "x" })).toThrow(/empty or whitespace/);
  });

  it("前后空格的文本写入 xml:space=preserve", () => {
    const ins = createInsertedRun({ author: "A", text: " padded " });
    expect(serialize(ins)).toContain('xml:space="preserve"');
  });
});

describe("createDeletedRun（Story-19.1）", () => {
  it("返 <w:del> 包内层 <w:delText>（不是 <w:t>）", () => {
    const del = createDeletedRun({
      author: "Alice",
      id: 5,
      date: "2026-05-19T08:00:00Z",
      text: "old",
    });
    expect(del).toBeInstanceOf(DeletedRun);
    expect(del.extendedAttributes.get("w:id")).toBe("5");

    const xml = serialize(del);
    expect(xml).toContain("<w:del");
    expect(xml).toContain("<w:delText");
    expect(xml).not.toContain("<w:t>old</w:t>"); // 删除的文本用 delText 而非 t
    expect(xml).toContain(">old<");
  });

  it("空 author 抛 friendly 错", () => {
    expect(() => createDeletedRun({ author: "", text: "x" })).toThrow(/empty/);
  });
});

describe("WordprocessingDocument.nextRevisionId（Story-19.2）", () => {
  it("空文档返 0", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.nextRevisionId()).toBe(0);
  });

  it("含 ins / del 时返最大 id+1", () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    p.appendChild(createInsertedRun({ author: "A", id: 0, text: "x" }));
    p.appendChild(createDeletedRun({ author: "A", id: 7, text: "y" }));
    p.appendChild(createInsertedRun({ author: "A", id: 3, text: "z" }));
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    expect(doc.nextRevisionId()).toBe(8); // max=7, next=8
  });

  it("save → reopen 后 ins / del 字节保留 + nextRevisionId 仍正确", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r1 = new Run();
    const t = new Text();
    t.text = "Hello ";
    r1.appendChild(t);
    p.appendChild(r1);
    p.appendChild(createInsertedRun({ author: "Alice", id: doc.nextRevisionId(), text: "kind " }));
    const r2 = new Run();
    const t2 = new Text();
    t2.text = "world";
    r2.appendChild(t2);
    p.appendChild(r2);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.nextRevisionId()).toBe(1);
    const inserts = [...reopened.mainDocumentPart!.document.descendants(InsertedRun)];
    expect(inserts).toHaveLength(1);
    // #139 后 InsertedRun.author 是 typed StringValue（reopen 路径不走 extendedAttributes）
    expect(inserts[0].author?.toString()).toBe("Alice");
  });
});

describe("DeletedText 类形态", () => {
  it("可被直接构造（leaf）", () => {
    const dt = new DeletedText();
    dt.text = "x";
    expect(serialize(dt)).toContain("<w:delText");
    expect(serialize(dt)).toContain(">x<");
  });
});
