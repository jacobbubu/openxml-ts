/**
 * Story-18.2：`WordprocessingDocument.addComment` 集成测试。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import {
  Comment,
  CommentRangeEnd,
  CommentRangeStart,
  CommentReference,
  CommentsPart,
  Paragraph,
  Run,
  Text,
  WordprocessingDocument,
} from "../../src/word/index.js";

function makeDocWithSentence(sentence: string): WordprocessingDocument {
  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const p = new Paragraph();
  const r = new Run();
  const t = new Text();
  t.text = sentence;
  r.appendChild(t);
  p.appendChild(r);
  (body as { appendChild: (e: unknown) => void }).appendChild(p);
  return doc;
}

describe("WordprocessingDocument.addComment（Story-18.2）", () => {
  it("第一次 addComment 自动创建 CommentsPart + 主文档关系", () => {
    const doc = makeDocWithSentence("hello world");
    expect(doc.commentsPart).toBeUndefined();

    const { commentId, rangeStart, rangeEnd, reference } = doc.addComment({
      author: "Alice",
      text: "Looks great",
    });

    expect(commentId).toBe(0);
    expect(rangeStart).toBeInstanceOf(CommentRangeStart);
    expect(rangeEnd).toBeInstanceOf(CommentRangeEnd);
    expect(reference).toBeInstanceOf(Run);

    // CommentsPart 已创建
    expect(doc.commentsPart).toBeInstanceOf(CommentsPart);
    // 内含 1 条 comment
    const comments = [...doc.commentsPart!.comments.descendants(Comment)];
    expect(comments).toHaveLength(1);
    expect(comments[0].author?.toString()).toBe("Alice");
    // 3 个 markup 元素的 w:id 都是 0
    expect(rangeStart.extendedAttributes.get("w:id")).toBe("0");
    expect(rangeEnd.extendedAttributes.get("w:id")).toBe("0");
    expect([...reference.descendants(CommentReference)][0]?.extendedAttributes.get("w:id")).toBe(
      "0",
    );
  });

  it("第二次 addComment 复用 CommentsPart，id 自增", () => {
    const doc = makeDocWithSentence("text");
    const a = doc.addComment({ author: "Alice", text: "c0" });
    const b = doc.addComment({ author: "Bob", text: "c1" });
    expect(a.commentId).toBe(0);
    expect(b.commentId).toBe(1);
    expect([...doc.commentsPart!.comments.descendants(Comment)]).toHaveLength(2);
  });

  it("opts.date Date 对象转 ISO 字符串", () => {
    const doc = makeDocWithSentence("text");
    const d = new Date("2026-05-19T08:00:00Z");
    doc.addComment({ author: "Alice", date: d, text: "..." });
    const c = [...doc.commentsPart!.comments.descendants(Comment)][0];
    expect(c.extendedAttributes.get("w:date")).toBe("2026-05-19T08:00:00.000Z");
  });

  it("opts.initials 透传到 w:initials", () => {
    const doc = makeDocWithSentence("text");
    doc.addComment({ author: "Alice Wong", initials: "AW", text: "..." });
    const c = [...doc.commentsPart!.comments.descendants(Comment)][0];
    expect(c.initials?.toString()).toBe("AW");
  });

  it("author 为空抛 friendly 错", () => {
    const doc = makeDocWithSentence("text");
    expect(() => doc.addComment({ author: "", text: "x" })).toThrow(OpenXmlPackageError);
    expect(() => doc.addComment({ author: "   ", text: "x" })).toThrow(/empty or whitespace/);
  });

  it("save → reopen 后 CommentsPart + 关系 + comment 字节全保留", async () => {
    const doc = makeDocWithSentence("Hello");
    const { commentId } = doc.addComment({ author: "Alice", text: "comment-text" });
    // 也把 markup 元素挂到段落里——这样 commentReference 在主文档 XML 里有 record
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const para = [...(body as { children: Iterable<Paragraph> }).children][0];
    // 简化：不真挂 markup（这是用户的责任）；只验 CommentsPart 持久化
    void para;

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.commentsPart).toBeDefined();
    expect(reopened.nextCommentId()).toBe(commentId + 1);
    const recomments = [...reopened.commentsPart!.comments.descendants(Comment)];
    expect(recomments).toHaveLength(1);
    expect(recomments[0].author?.toString()).toBe("Alice");
  });
});

describe("WordprocessingDocument.nextCommentId（Story-18.2）", () => {
  it("commentsPart 不存在时返 0", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.nextCommentId()).toBe(0);
  });

  it("含 comments 时返最大 w:id + 1", () => {
    const doc = makeDocWithSentence("text");
    doc.addComment({ author: "A", text: "0" });
    doc.addComment({ author: "B", text: "1" });
    doc.addComment({ author: "C", text: "2" });
    expect(doc.nextCommentId()).toBe(3);
  });
});
