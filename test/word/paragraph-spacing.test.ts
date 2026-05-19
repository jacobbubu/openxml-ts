/**
 * Epic-31：Paragraph.spacing 访问器单测。
 */

import { describe, expect, it } from "vitest";
import {
  Paragraph,
  ParagraphProperties,
  Run,
  SpacingBetweenLines,
  Text,
  WordprocessingDocument,
} from "../../src/word/index.js";

describe("Paragraph.spacing", () => {
  it("undefined when pPr 不存在", () => {
    const p = new Paragraph();
    expect(p.spacing).toBeUndefined();
  });

  it("undefined when pPr 存在但没 SpacingBetweenLines", () => {
    const p = new Paragraph();
    const pPr = new ParagraphProperties();
    p.appendChild(pPr);
    expect(p.spacing).toBeUndefined();
  });

  it("setter 在空 Paragraph 上自动创建 pPr + spacing", () => {
    const p = new Paragraph();
    p.spacing = { beforeDxa: 120, afterDxa: 240 };
    const pPr = p.firstChild(ParagraphProperties);
    expect(pPr).toBeDefined();
    const sp = pPr?.firstChild(SpacingBetweenLines);
    expect(sp?.before?.toString()).toBe("120");
    expect(sp?.after?.toString()).toBe("240");
  });

  it("setter 把 pPr 插在 Paragraph 的第一个 child", () => {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "hi";
    r.appendChild(t);
    p.appendChild(r);
    p.spacing = { lineDxa: 360, lineRule: "auto" };
    expect(p.children.at(0)).toBeInstanceOf(ParagraphProperties);
    expect(p.children.at(1)).toBe(r);
  });

  it("getter 读全部 4 字段", () => {
    const p = new Paragraph();
    p.spacing = { beforeDxa: 100, afterDxa: 200, lineDxa: 360, lineRule: "auto" };
    expect(p.spacing).toEqual({
      beforeDxa: 100,
      afterDxa: 200,
      lineDxa: 360,
      lineRule: "auto",
    });
  });

  it("setter merge：partial 写入不清空已存在的字段", () => {
    const p = new Paragraph();
    p.spacing = { beforeDxa: 100, afterDxa: 200 };
    p.spacing = { lineDxa: 360, lineRule: "exact" };
    expect(p.spacing).toEqual({
      beforeDxa: 100,
      afterDxa: 200,
      lineDxa: 360,
      lineRule: "exact",
    });
  });

  it("setter undefined 删 spacing 但保留 pPr 其它子", () => {
    const p = new Paragraph();
    p.spacing = { beforeDxa: 100 };
    p.alignment = "center";
    p.spacing = undefined;
    expect(p.spacing).toBeUndefined();
    expect(p.alignment).toBe("center");
    expect(p.firstChild(ParagraphProperties)).toBeDefined();
  });

  it("getter 只读已设的字段（partial）", () => {
    const p = new Paragraph();
    p.spacing = { afterDxa: 240 };
    expect(p.spacing).toEqual({ afterDxa: 240 });
  });

  it("lineRule 支持 atLeast / exact / auto", () => {
    const p = new Paragraph();
    for (const rule of ["auto", "atLeast", "exact"] as const) {
      p.spacing = { lineDxa: 400, lineRule: rule };
      expect(p.spacing?.lineRule).toBe(rule);
    }
  });

  it("round-trip：save → reopen 后 spacing 完整", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "spaced text";
    r.appendChild(t);
    p.appendChild(r);
    p.spacing = { beforeDxa: 120, afterDxa: 240, lineDxa: 480, lineRule: "auto" };
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const [reP] = [...reopened.mainDocumentPart!.document.descendants(Paragraph)];
    expect(reP?.spacing).toEqual({
      beforeDxa: 120,
      afterDxa: 240,
      lineDxa: 480,
      lineRule: "auto",
    });
  });

  it("spacing 与 alignment / indent 并存不互相破坏", () => {
    const p = new Paragraph();
    p.alignment = "center";
    p.indent = { leftDxa: 720 };
    p.spacing = { afterDxa: 240 };
    expect(p.alignment).toBe("center");
    expect(p.indent).toEqual({ leftDxa: 720 });
    expect(p.spacing).toEqual({ afterDxa: 240 });
  });
});
