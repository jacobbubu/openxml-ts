/**
 * Epic-46：Word Style 创建 helper 单测。
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import { NextParagraphStyle } from "../../src/word/generated/next-paragraph-style.js";
import { StyleName } from "../../src/word/generated/style-name.js";
import { StyleParagraphProperties } from "../../src/word/generated/style-paragraph-properties.js";
import { StyleRunProperties } from "../../src/word/generated/style-run-properties.js";
import {
  BasedOn,
  Bold,
  Color,
  FontSize,
  Italic,
  Justification,
  Paragraph,
  Run,
  Style,
  type StylesPart,
  Text,
  WordprocessingDocument,
  createCharacterStyle,
  createParagraphStyle,
} from "../../src/word/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/golden");

async function loadHelloWorld(): Promise<Uint8Array> {
  return new Uint8Array(await readFile(join(FIXTURES_DIR, "HelloWorld.docx")));
}

/** 每次返回独立的 StylesPart（从新打开的 doc 取，互不干扰）。 */
async function getStylesPart(): Promise<StylesPart> {
  const bytes = await loadHelloWorld();
  const doc = await WordprocessingDocument.openAsync(bytes);
  const sp = doc.stylesPart;
  if (sp === undefined) throw new Error("No StylesPart on HelloWorld.docx");
  return sp;
}

describe("createParagraphStyle（Epic-46）", () => {
  it("返回 Style 实例，type=paragraph，styleId 正确", async () => {
    const sp = await getStylesPart();
    const style = createParagraphStyle(sp, { styleId: "MyHeading", name: "my heading" });
    expect(style).toBeInstanceOf(Style);
    expect(style.type?.toString()).toBe("paragraph");
    expect(style.styleId?.toString()).toBe("MyHeading");
  });

  it("StyleName 子元素含正确 val", async () => {
    const sp = await getStylesPart();
    const style = createParagraphStyle(sp, { styleId: "H2", name: "heading 2" });
    const nameEl = style.firstChild(StyleName);
    expect(nameEl?.val?.toString()).toBe("heading 2");
  });

  it("basedOn 写入 <w:basedOn>", async () => {
    const sp = await getStylesPart();
    const style = createParagraphStyle(sp, {
      styleId: "MyBody",
      name: "my body",
      basedOn: "Normal",
    });
    const bo = style.firstChild(BasedOn);
    expect(bo?.val?.toString()).toBe("Normal");
  });

  it("next 写入 <w:next>", async () => {
    const sp = await getStylesPart();
    const style = createParagraphStyle(sp, {
      styleId: "MyH1",
      name: "my heading 1",
      basedOn: "Normal",
      next: "Normal",
    });
    const next = style.firstChild(NextParagraphStyle);
    expect(next?.val?.toString()).toBe("Normal");
  });

  it("formatting.alignment 写入 pPr > jc", async () => {
    const sp = await getStylesPart();
    const style = createParagraphStyle(sp, {
      styleId: "Centered",
      name: "centered",
      formatting: { alignment: "center" },
    });
    const pPr = style.firstChild(StyleParagraphProperties);
    expect(pPr).toBeDefined();
    const jc = pPr?.firstChild(Justification);
    expect(jc?.val?.toString()).toBe("center");
  });

  it("formatting.bold+italic+fontSizeHalfPoints+colorHex 写入 rPr", async () => {
    const sp = await getStylesPart();
    const style = createParagraphStyle(sp, {
      styleId: "BigBold",
      name: "big bold",
      formatting: {
        bold: true,
        italic: true,
        fontSizeHalfPoints: 32,
        colorHex: "FF0000",
      },
    });
    const rPr = style.firstChild(StyleRunProperties);
    expect(rPr).toBeDefined();
    expect(rPr?.firstChild(Bold)).toBeDefined();
    expect(rPr?.firstChild(Italic)).toBeDefined();
    const sz = rPr?.firstChild(FontSize);
    expect(sz?.val?.toString()).toBe("32");
    const color = rPr?.firstChild(Color);
    expect(color?.val?.toString()).toBe("FF0000");
  });

  it("新 style 已追加到 styles 子节点", async () => {
    const sp = await getStylesPart();
    const before = [...sp.styles.children].length;
    createParagraphStyle(sp, { styleId: "Extra1", name: "extra 1" });
    expect([...sp.styles.children].length).toBe(before + 1);
  });

  it("重复 styleId 抛 OpenXmlPackageError", async () => {
    const sp = await getStylesPart();
    createParagraphStyle(sp, { styleId: "UniqueId", name: "unique" });
    expect(() => createParagraphStyle(sp, { styleId: "UniqueId", name: "duplicate" })).toThrow(
      OpenXmlPackageError,
    );
    expect(() => createParagraphStyle(sp, { styleId: "UniqueId", name: "dup2" })).toThrow(
      /already exists/,
    );
  });

  it("不含格式选项时无 rPr / pPr 子节点", async () => {
    const sp = await getStylesPart();
    const style = createParagraphStyle(sp, { styleId: "Plain", name: "plain" });
    expect(style.firstChild(StyleParagraphProperties)).toBeUndefined();
    expect(style.firstChild(StyleRunProperties)).toBeUndefined();
  });

  it("serialize 输出 <w:style> 含正确 XML 属性", async () => {
    const sp = await getStylesPart();
    const style = createParagraphStyle(sp, {
      styleId: "Heading1Custom",
      name: "heading 1",
      basedOn: "Normal",
      next: "Normal",
      formatting: { bold: true, alignment: "center" },
    });
    const xml = serialize(style);
    expect(xml).toContain('w:type="paragraph"');
    expect(xml).toContain('w:styleId="Heading1Custom"');
    expect(xml).toContain("<w:name");
    expect(xml).toContain("<w:basedOn");
    expect(xml).toContain("<w:next");
    expect(xml).toContain("<w:pPr");
    expect(xml).toContain("<w:jc");
    expect(xml).toContain("<w:rPr");
    expect(xml).toContain("<w:b");
  });
});

describe("createCharacterStyle（Epic-46）", () => {
  it("返回 Style 实例，type=character", async () => {
    const sp = await getStylesPart();
    const style = createCharacterStyle(sp, { styleId: "StrongCustom", name: "strong" });
    expect(style).toBeInstanceOf(Style);
    expect(style.type?.toString()).toBe("character");
    expect(style.styleId?.toString()).toBe("StrongCustom");
  });

  it("字符样式不含 pPr（只有 rPr）", async () => {
    const sp = await getStylesPart();
    const style = createCharacterStyle(sp, {
      styleId: "EmphCustom",
      name: "emphasis",
      formatting: { italic: true },
    });
    expect(style.firstChild(StyleParagraphProperties)).toBeUndefined();
    const rPr = style.firstChild(StyleRunProperties);
    expect(rPr?.firstChild(Italic)).toBeDefined();
  });

  it("重复 styleId 抛错", async () => {
    const sp = await getStylesPart();
    createCharacterStyle(sp, { styleId: "CodeCustom", name: "code" });
    expect(() => createCharacterStyle(sp, { styleId: "CodeCustom", name: "code2" })).toThrow(
      OpenXmlPackageError,
    );
  });

  it("basedOn 写入正确", async () => {
    const sp = await getStylesPart();
    const style = createCharacterStyle(sp, {
      styleId: "SubEmphCustom",
      name: "sub emphasis",
      basedOn: "DefaultParagraphFont",
    });
    expect(style.firstChild(BasedOn)?.val?.toString()).toBe("DefaultParagraphFont");
  });
});

describe("round-trip: createParagraphStyle + paragraph.styleId（Epic-46）", () => {
  it("save → reopen 后自定义样式可被 descendants 遍历", async () => {
    // 从空白 doc 开始，用 getOrCreateStylesPart 创建 StylesPart
    const doc = WordprocessingDocument.create();
    const sp = doc.getOrCreateStylesPart();

    createParagraphStyle(sp, {
      styleId: "MyCustomHeading",
      name: "my custom heading",
      formatting: { bold: true, fontSizeHalfPoints: 32 },
    });
    createCharacterStyle(sp, {
      styleId: "MyEmphasis",
      name: "my emphasis",
      formatting: { italic: true },
    });

    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "Custom Heading";
    r.appendChild(t);
    p.appendChild(r);
    p.styleId = "MyCustomHeading";
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const newBytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(newBytes);

    // 段落 styleId 保留
    const allP = [...reopened.mainDocumentPart!.document.descendants(Paragraph)];
    const lastP = allP.at(-1);
    expect(lastP?.styleId).toBe("MyCustomHeading");

    // styles part 里有我们创建的两个 styles
    const sp2 = reopened.stylesPart!;
    const found1 = [...sp2.styles.children].find(
      (c) => c instanceof Style && c.styleId?.toString() === "MyCustomHeading",
    );
    const found2 = [...sp2.styles.children].find(
      (c) => c instanceof Style && c.styleId?.toString() === "MyEmphasis",
    );
    expect(found1).toBeDefined();
    expect(found2).toBeDefined();
  });
});
