/**
 * 例子（Epic-55）：构造一份含 4 张幻灯片的 pptx，每张有不同标题文本。
 *
 * 跑法：
 *   bun run examples/ppt-multi-slide.ts /tmp/out.pptx
 *   file /tmp/out.pptx
 *   # → /tmp/out.pptx: Microsoft PowerPoint 2007+
 */

import { PresentationDocument, addSlide } from "../src/ppt/index.js";
import type { SlidePart } from "../src/ppt/index.js";

const P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

const TITLES = [
  "openxml-ts Multi-Slide Demo",
  "第二张：架构概览",
  "第三张：代码示例",
  "第四张：总结与展望",
];

function escapeXml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildSlideXml(title: string): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:p="${P}" xmlns:r="${R}" xmlns:a="${A}"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/><p:sp><p:nvSpPr><p:cNvPr id="2" name="Title"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="838200" y="838200"/><a:ext cx="7467600" cy="1143000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr><p:txBody><a:bodyPr wrap="square" rtlCol="0"/><a:lstStyle/><a:p><a:r><a:rPr lang="zh-CN" dirty="0"/><a:t>${escapeXml(title)}</a:t></a:r></a:p></p:txBody></p:sp></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-multi-slide <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();

  // 取得 slide0，设置第一张标题
  const slide0 = doc.presentationPart!.slideParts[0] as SlidePart;
  slide0.part.writeAsync(buildSlideXml(TITLES[0] as string));

  // 追加 3 张幻灯片（总计 4 张）
  for (let i = 1; i < TITLES.length; i += 1) {
    const sp = addSlide(doc);
    sp.part.writeAsync(buildSlideXml(TITLES[i] as string));
  }

  await doc.saveAsAsync(outputPath);

  const slideParts = doc.presentationPart!.slideParts;
  process.stdout.write(`Wrote ${outputPath} (${slideParts.length} slides)\n`);
  for (let i = 0; i < slideParts.length; i += 1) {
    process.stdout.write(`  Slide ${i + 1}: ${TITLES[i]}\n`);
  }
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
