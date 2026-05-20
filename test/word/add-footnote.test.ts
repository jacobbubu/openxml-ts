/**
 * Epic-64：`addFootnote` / `getFootnoteText` 集成测试。
 */

import { describe, expect, it } from "vitest";
import {
  Footnote,
  FootnoteReference,
  FootnoteReferenceMark,
  FootnotesPart,
  Paragraph,
  Run,
  WordprocessingDocument,
  addFootnote,
  getFootnoteText,
} from "../../src/word/index.js";

function makeDoc(): WordprocessingDocument {
  return WordprocessingDocument.create();
}

describe("addFootnote（Epic-64）", () => {
  it("首次调用自动创建 FootnotesPart + 主文档关系", () => {
    const doc = makeDoc();
    expect(doc.footnotesPart).toBeUndefined();

    const { reference, footnoteId } = addFootnote(doc, { text: "First footnote" });

    expect(footnoteId).toBe(1);
    expect(reference).toBeInstanceOf(Run);
    expect(doc.footnotesPart).toBeInstanceOf(FootnotesPart);
  });

  it("FootnotesPart 预置 separator（id=-1）和 continuationSeparator（id=0）", () => {
    const doc = makeDoc();
    addFootnote(doc, { text: "any" });

    const fp = doc.footnotesPart;
    expect(fp).toBeDefined();
    const footnotes = [...(fp?.footnotes.descendants(Footnote) ?? [])];
    const sep = footnotes.find((f) => f.id?.toString() === "-1");
    const cont = footnotes.find((f) => f.id?.toString() === "0");

    expect(sep).toBeDefined();
    expect(sep?.type?.toString()).toBe("separator");
    expect(cont).toBeDefined();
    expect(cont?.type?.toString()).toBe("continuationSeparator");
  });

  it("id 从 1 开始自动递增", () => {
    const doc = makeDoc();
    const a = addFootnote(doc, { text: "fn1" });
    const b = addFootnote(doc, { text: "fn2" });
    const c = addFootnote(doc, { text: "fn3" });

    expect(a.footnoteId).toBe(1);
    expect(b.footnoteId).toBe(2);
    expect(c.footnoteId).toBe(3);
  });

  it("追加后 FootnotesPart 含正确数量的 normal 脚注条目", () => {
    const doc = makeDoc();
    addFootnote(doc, { text: "A" });
    addFootnote(doc, { text: "B" });

    const fp = doc.footnotesPart;
    expect(fp).toBeDefined();
    const normalFns = [...(fp?.footnotes.descendants(Footnote) ?? [])].filter(
      (f) => f.type?.toString() === "normal",
    );
    expect(normalFns).toHaveLength(2);
    expect(normalFns[0].id?.toString()).toBe("1");
    expect(normalFns[1].id?.toString()).toBe("2");
  });

  it("返回的 Run 含 FootnoteReference，id 与脚注一致", () => {
    const doc = makeDoc();
    const { reference, footnoteId } = addFootnote(doc, { text: "hello" });

    const refs = [...reference.descendants(FootnoteReference)];
    expect(refs).toHaveLength(1);
    expect(refs[0].id?.toString()).toBe(String(footnoteId));
  });

  it("脚注条目内有 FootnoteReferenceMark + Text", () => {
    const doc = makeDoc();
    const { footnoteId } = addFootnote(doc, { text: "content text" });

    const fp = doc.footnotesPart;
    expect(fp).toBeDefined();
    const fn = [...(fp?.footnotes.descendants(Footnote) ?? [])].find(
      (f) => f.id?.toString() === String(footnoteId),
    );
    expect(fn).toBeDefined();
    expect([...(fn?.descendants(FootnoteReferenceMark) ?? [])]).toHaveLength(1);
    const texts = [...(fn?.descendants() ?? [])].filter((n) => n.localName === "t" && "text" in n);
    expect(texts.length).toBeGreaterThan(0);
  });

  it("可显式指定 id", () => {
    const doc = makeDoc();
    const { footnoteId } = addFootnote(doc, { text: "explicit", id: 42 });
    expect(footnoteId).toBe(42);
  });

  it("reference Run 含 FootnoteReference 字符样式", () => {
    const doc = makeDoc();
    const { reference } = addFootnote(doc, { text: "styled" });
    // Run > RunProperties > RunStyle w:val="FootnoteReference"
    const runProps = reference.firstChild();
    expect(runProps).toBeDefined();
    const children = [...(runProps?.descendants() ?? [])];
    const hasStyle = children.some(
      (n) => n.extendedAttributes.get("w:val") === "FootnoteReference",
    );
    expect(hasStyle).toBe(true);
  });

  it("save → reopen 后 FootnotesPart + 脚注内容全保留", async () => {
    const doc = makeDoc();
    const { footnoteId } = addFootnote(doc, { text: "round-trip text" });

    const body = doc.mainDocumentPart?.document.firstChild();
    expect(body).toBeDefined();
    const p = new Paragraph();
    const { reference } = addFootnote(doc, { text: "second fn" });
    p.appendChild(reference);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);

    expect(reopened.footnotesPart).toBeInstanceOf(FootnotesPart);
    const normalFns = [...(reopened.footnotesPart?.footnotes.descendants(Footnote) ?? [])].filter(
      (f) => f.type?.toString() === "normal",
    );
    expect(normalFns).toHaveLength(2);
    expect(normalFns[0].id?.toString()).toBe(String(footnoteId));
  });
});

describe("getFootnoteText（Epic-64）", () => {
  it("footnotesPart 不存在时返 undefined", () => {
    const doc = makeDoc();
    expect(getFootnoteText(doc, 1)).toBeUndefined();
  });

  it("找到对应 id 后返文本", () => {
    const doc = makeDoc();
    addFootnote(doc, { text: "Note A" });
    addFootnote(doc, { text: "Note B" });

    expect(getFootnoteText(doc, 1)).toBe("Note A");
    expect(getFootnoteText(doc, 2)).toBe("Note B");
  });

  it("id 不存在返 undefined", () => {
    const doc = makeDoc();
    addFootnote(doc, { text: "only one" });
    expect(getFootnoteText(doc, 99)).toBeUndefined();
  });
});

describe("WordprocessingDocument.footnotesPart（Epic-64）", () => {
  it("未添加脚注时 footnotesPart 返 undefined", () => {
    const doc = makeDoc();
    expect(doc.footnotesPart).toBeUndefined();
  });

  it("添加后 footnotesPart 为 FootnotesPart 实例", () => {
    const doc = makeDoc();
    addFootnote(doc, { text: "x" });
    expect(doc.footnotesPart).toBeInstanceOf(FootnotesPart);
  });

  it("getOrCreateFootnotesPart 幂等：多次调用返同一实例", () => {
    const doc = makeDoc();
    const a = doc.getOrCreateFootnotesPart();
    const b = doc.getOrCreateFootnotesPart();
    expect(a).toBe(b);
  });
});
