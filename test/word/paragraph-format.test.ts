/**
 * Epic-30：Word \`Paragraph.alignment\` / \`Paragraph.indent\` 访问器单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { Indentation } from "../../src/word/generated/indentation.js";
import { Justification } from "../../src/word/generated/justification.js";
import { ParagraphProperties } from "../../src/word/generated/paragraph-properties.js";
import { Paragraph, Run, Text, WordprocessingDocument } from "../../src/word/index.js";

describe("Paragraph.alignment（Story-30.1）", () => {
  it("空段落 getter 返 undefined", () => {
    expect(new Paragraph().alignment).toBeUndefined();
  });

  it("setter 写入 + getter 读出", () => {
    const p = new Paragraph();
    p.alignment = "center";
    expect(p.alignment).toBe("center");
    expect(p.firstChild(ParagraphProperties)?.firstChild(Justification)?.val?.toString()).toBe(
      "center",
    );
  });

  it("setter 覆盖：第二次 set 替换 val", () => {
    const p = new Paragraph();
    p.alignment = "left";
    p.alignment = "right";
    expect(p.alignment).toBe("right");
    // 不重复 child
    expect([...(p.firstChild(ParagraphProperties)?.descendants(Justification) ?? [])]).toHaveLength(
      1,
    );
  });

  it("setter undefined 删除 jc", () => {
    const p = new Paragraph();
    p.alignment = "center";
    p.alignment = undefined;
    expect(p.alignment).toBeUndefined();
    expect(p.firstChild(ParagraphProperties)?.firstChild(Justification)).toBeUndefined();
  });

  it("pPr 在含 Run 的段落中插入到第一位", () => {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "hi";
    r.appendChild(t);
    p.appendChild(r);
    p.alignment = "right";
    const first = p.children.at(0);
    expect(first).toBeInstanceOf(ParagraphProperties);
  });

  it("serialize 形态：<w:jc w:val=...>", () => {
    const p = new Paragraph();
    p.alignment = "both";
    expect(serialize(p)).toContain('<w:jc w:val="both"');
  });
});

describe("Paragraph.indent（Story-30.2）", () => {
  it("空段落 getter 返 undefined", () => {
    expect(new Paragraph().indent).toBeUndefined();
  });

  it("setter 单字段写入 + getter 还原", () => {
    const p = new Paragraph();
    p.indent = { leftDxa: 720 };
    expect(p.indent).toEqual({ leftDxa: 720 });
  });

  it("merge：第二次 set partial 不清空已有字段", () => {
    const p = new Paragraph();
    p.indent = { leftDxa: 720 };
    p.indent = { rightDxa: 360 };
    expect(p.indent).toEqual({ leftDxa: 720, rightDxa: 360 });
  });

  it("setter undefined 删除 ind", () => {
    const p = new Paragraph();
    p.indent = { firstLineDxa: 480 };
    p.indent = undefined;
    expect(p.indent).toBeUndefined();
    expect(p.firstChild(ParagraphProperties)?.firstChild(Indentation)).toBeUndefined();
  });

  it("hanging + firstLine 同时存在", () => {
    const p = new Paragraph();
    p.indent = { hangingDxa: 360, firstLineDxa: 720 };
    expect(p.indent).toEqual({ hangingDxa: 360, firstLineDxa: 720 });
  });
});

describe("端到端：alignment + indent + save → reopen 持久", () => {
  it("一个 Paragraph 上挂 alignment + indent，save+reopen 后读回一致", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "Centered with left indent";
    r.appendChild(t);
    p.appendChild(r);
    p.alignment = "center";
    p.indent = { leftDxa: 720, firstLineDxa: 240 };
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    const [reP] = [...reopened.mainDocumentPart!.document.descendants(Paragraph)];
    expect(reP?.alignment).toBe("center");
    expect(reP?.indent).toEqual({ leftDxa: 720, firstLineDxa: 240 });
  });
});
