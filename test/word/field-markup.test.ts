/**
 * Epic-34：Word 简单字段 helper 单测。
 */

import { describe, expect, it } from "vitest";
import {
  Paragraph,
  Run,
  SimpleField,
  Text,
  WordprocessingDocument,
  createFieldRun,
  createPageNumberRun,
  createTotalPagesRun,
} from "../../src/word/index.js";

describe("createFieldRun", () => {
  it("生成 <w:fldSimple w:instr=PAGE> 包裹 Run+Text", () => {
    const fld = createFieldRun("PAGE");
    expect(fld).toBeInstanceOf(SimpleField);
    expect(fld.instruction?.toString()).toBe("PAGE");
    const r = fld.firstChild(Run);
    expect(r).toBeDefined();
    expect(r?.firstChild(Text)?.text).toBe("PAGE");
  });

  it("cachedText 覆盖默认 placeholder", () => {
    const fld = createFieldRun("NUMPAGES", { cachedText: "10" });
    expect(fld.firstChild(Run)?.firstChild(Text)?.text).toBe("10");
  });

  it("空 instruction 抛错", () => {
    expect(() => createFieldRun("")).toThrow();
  });

  it("createPageNumberRun 等价于 PAGE + cachedText=1", () => {
    const fld = createPageNumberRun();
    expect(fld.instruction?.toString()).toBe("PAGE");
    expect(fld.firstChild(Run)?.firstChild(Text)?.text).toBe("1");
  });

  it("createTotalPagesRun 等价于 NUMPAGES + cachedText=1", () => {
    const fld = createTotalPagesRun();
    expect(fld.instruction?.toString()).toBe("NUMPAGES");
    expect(fld.firstChild(Run)?.firstChild(Text)?.text).toBe("1");
  });

  it("可作为 Paragraph 直接子（与普通 Run 混排）", () => {
    const p = new Paragraph();
    const leading = new Run();
    const lt = new Text();
    lt.text = "第 ";
    leading.appendChild(lt);
    p.appendChild(leading);
    p.appendChild(createPageNumberRun());
    const trailing = new Run();
    const tt = new Text();
    tt.text = " 页";
    trailing.appendChild(tt);
    p.appendChild(trailing);
    expect(p.children.at(1)).toBeInstanceOf(SimpleField);
  });

  it("round-trip：save → reopen 后 fldSimple 仍带 PAGE instr", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const leadRun = new Run();
    const lt = new Text();
    lt.text = "第 ";
    leadRun.appendChild(lt);
    p.appendChild(leadRun);
    p.appendChild(createPageNumberRun());
    const midRun = new Run();
    const mt = new Text();
    mt.text = " 页 / 共 ";
    midRun.appendChild(mt);
    p.appendChild(midRun);
    p.appendChild(createTotalPagesRun());
    const trailRun = new Run();
    const tt = new Text();
    tt.text = " 页";
    trailRun.appendChild(tt);
    p.appendChild(trailRun);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const fields = [...reopened.mainDocumentPart!.document.descendants(SimpleField)];
    expect(fields).toHaveLength(2);
    expect(fields[0]?.instruction?.toString()).toBe("PAGE");
    expect(fields[1]?.instruction?.toString()).toBe("NUMPAGES");
  });
});
