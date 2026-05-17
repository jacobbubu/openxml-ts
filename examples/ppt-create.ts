/**
 * 例子：从零构造一份含 3 张 Slide 的 pptx，每张挂一段示例文本。
 *
 * 跑法：
 *   bun run examples/ppt-create.ts <output.pptx>
 */

import type { MemoryPackagePart } from "../src/backends/memory/memory-package-part.js";
import type { IPackagePart } from "../src/packaging/interfaces/part.js";
import { PresentationDocument } from "../src/ppt/index.js";

const P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

const TITLES = [
  "openxml-ts PowerPoint Demo",
  "Generated on {{date}}",
  "Slide 3 — concluding remarks",
];

function buildSlideXml(title: string): string {
  // shape 必须含 <a:xfrm>（位置 + 大小）+ <a:prstGeom>（图形预设）。缺任一项
  // PowerPoint 渲染出来是空白页面（解析不报错，但没几何 → 没可见区域 → 文本看不到）。
  // 位置 838200 EMU ≈ 0.875 inch；大小 7467600 × 1143000 EMU ≈ 7.78" × 1.19"。
  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<p:sld xmlns:p="${P}" xmlns:r="${R}" xmlns:a="${A}">` +
    `<p:cSld><p:spTree>` +
    `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
    `<p:grpSpPr/>` +
    `<p:sp>` +
    `<p:nvSpPr><p:cNvPr id="2" name="Title"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>` +
    `<p:spPr>` +
    `<a:xfrm><a:off x="838200" y="838200"/><a:ext cx="7467600" cy="1143000"/></a:xfrm>` +
    `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>` +
    `<a:noFill/>` +
    `</p:spPr>` +
    `<p:txBody>` +
    `<a:bodyPr wrap="square" rtlCol="0"/><a:lstStyle/>` +
    `<a:p><a:r><a:rPr lang="en-US" dirty="0"/><a:t>${escapeXml(title)}</a:t></a:r></a:p>` +
    `</p:txBody>` +
    `</p:sp>` +
    `</p:spTree></p:cSld>` +
    `<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>` +
    `</p:sld>`
  );
}

function escapeXml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function findRelIdFor(part: IPackagePart, target: string): string {
  for (const rel of part.relationships) {
    if (rel.target === target) return rel.id;
  }
  throw new Error(`no relationship target=${target}`);
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-create <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const pkg = doc.package;
  const pres = doc.presentationPart!.part;

  // create() 默认建好 1 slide + 1 layout + 1 master + 1 theme；这里覆盖 slide1 + 追加 2 张。
  for (let i = 0; i < TITLES.length; i += 1) {
    const slideUri = `/ppt/slides/slide${i + 1}.xml` as never;
    const part = pkg.hasPart(slideUri)
      ? pkg.getPart(slideUri)
      : pkg.createPart(
          slideUri,
          "application/vnd.openxmlformats-officedocument.presentationml.slide+xml",
        );
    (part as MemoryPackagePart).writeSync(buildSlideXml(TITLES[i] as string));

    if (i === 0) continue;
    pres.relationships.create({
      id: `rIdSlide${i + 1}`,
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide",
      target: `slides/slide${i + 1}.xml`,
      targetMode: "internal",
    });
    part.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
      target: "../slideLayouts/slideLayout1.xml",
      targetMode: "internal",
    });
  }

  // 重写 presentation.xml seed：3 张 slide 全进 sldIdLst（默认 seed 只有 1 张）。
  const slideMasterRid = findRelIdFor(pres, "slideMasters/slideMaster1.xml");
  const slide1Rid = findRelIdFor(pres, "slides/slide1.xml");
  const sldIds = TITLES.map((_, i) => {
    const rid = i === 0 ? slide1Rid : `rIdSlide${i + 1}`;
    return `<p:sldId id="${256 + i}" r:id="${rid}"/>`;
  }).join("");
  const presentationXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<p:presentation xmlns:p="${P}" xmlns:r="${R}" xmlns:a="${A}">` +
    `<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="${slideMasterRid}"/></p:sldMasterIdLst>` +
    `<p:sldIdLst>${sldIds}</p:sldIdLst>` +
    `<p:sldSz cx="9144000" cy="6858000" type="screen4x3"/>` +
    `<p:notesSz cx="6858000" cy="9144000"/>` +
    `<p:defaultTextStyle/>` +
    `</p:presentation>`;
  (pres as MemoryPackagePart).writeSync(presentationXml);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (${TITLES.length} slides)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
