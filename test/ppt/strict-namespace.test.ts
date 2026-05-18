/**
 * Epic-8 端到端：用 OOXML Strict（ISO 29500-1）格式的真实 pptx 验证
 * Strict ↔ Transitional URI fallback。
 *
 * fixture：Algn_tab_TabAlignment.pptx（取自 dotnet/Open-XML-SDK）。
 * 文件里 _rels/.rels 与 slide xmlns 全用 Strict URI
 * (`http://purl.oclc.org/ooxml/...`)；走 PresentationDocument 必须能：
 * 1. 识别包级 officeDocument 关系（Strict URI）→ 解出 PresentationPart；
 * 2. ElementRegistry Strict fallback 让 <p:sld> 解成 Slide 类（而非 Unknown）；
 * 3. slide.namespaceUri 报 Transitional URI（typed class 内置）——LINQ / typed
 *    API 后续操作不感知输入是 Strict 还是 Transitional。
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { Slide } from "../../src/ppt/generated/slide.js";
import { PresentationDocument } from "../../src/ppt/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "fixtures");

describe("PresentationDocument · OOXML Strict 兼容", () => {
  it("Algn_tab_TabAlignment.pptx（Strict URI）能解出 presentationPart + slide 为 Slide 类型", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "Algn_tab_TabAlignment.pptx")));
    const doc = await PresentationDocument.openAsync(bytes);
    const pp = doc.presentationPart;
    expect(pp).toBeDefined();
    expect(pp?.slideParts.length).toBeGreaterThanOrEqual(1);
    const slide = pp?.slideParts[0]?.slide;
    expect(slide).toBeInstanceOf(Slide);
    expect(slide?.namespaceUri).toBe("http://schemas.openxmlformats.org/presentationml/2006/main");
  });
});
