/**
 * Story-15.2：`WordprocessingDocument.addHyperlinkRelationship` 集成测试。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import {
  HYPERLINK_RELATIONSHIP_TYPE,
  Paragraph,
  WordprocessingDocument,
  createHyperlinkRun,
} from "../../src/word/index.js";

describe("WordprocessingDocument.addHyperlinkRelationship（Story-15.2）", () => {
  it("加一条外链 → relId 在 mainDocumentPart 关系里、targetMode=external、target 是 URL", () => {
    const doc = WordprocessingDocument.create();
    const { relId } = doc.addHyperlinkRelationship("https://example.com/");

    expect(relId).toMatch(/^rId\d+$/);
    const main = doc.mainDocumentPart!;
    const rels = [...main.part.relationships];
    const r = rels.find((x) => x.id === relId);
    expect(r).toBeDefined();
    expect(r?.type).toBe(HYPERLINK_RELATIONSHIP_TYPE);
    expect(r?.targetMode).toBe("external");
    expect(r?.target).toBe("https://example.com/");
  });

  it("空 URL 抛 friendly 错（code=RELATIONSHIP_TARGET_INVALID）", () => {
    const doc = WordprocessingDocument.create();
    expect(() => doc.addHyperlinkRelationship("")).toThrow(OpenXmlPackageError);
    expect(() => doc.addHyperlinkRelationship("   ")).toThrow(/empty or whitespace/);
  });

  it("save → reopen 后关系仍在 + target 不变", async () => {
    const doc = WordprocessingDocument.create();
    const { relId } = doc.addHyperlinkRelationship("https://anthropic.com/");
    const out = await doc.saveAsBytesAsync();

    const reopened = await WordprocessingDocument.openAsync(out);
    const rels = [...reopened.mainDocumentPart!.part.relationships];
    const r = rels.find((x) => x.id === relId);
    expect(r?.target).toBe("https://anthropic.com/");
    expect(r?.targetMode).toBe("external");
  });

  it("端到端：addHyperlinkRelationship + createHyperlinkRun → append 到段落 → save", async () => {
    const doc = WordprocessingDocument.create();
    const { relId } = doc.addHyperlinkRelationship("https://github.com/jacobbubu/openxml-ts");

    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    p.appendChild(createHyperlinkRun({ relId, text: "openxml-ts on GitHub" }));
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const out = await doc.saveAsBytesAsync();
    expect(out.byteLength).toBeGreaterThan(0);

    const reopened = await WordprocessingDocument.openAsync(out);
    const rels = [...reopened.mainDocumentPart!.part.relationships];
    expect(rels.some((r) => r.id === relId)).toBe(true);
  });
});
