/**
 * Story-4.9 PowerPoint 子系统性能基线（epic-4-prd §NFR-4）。
 *
 * 跑法：`pnpm bench`。基准 fixture：合成 ~1 MB pptx：
 *   PresentationDocument.create() 起 → 追加 ~120 张 Slide，每张含若干段 text run
 *   填充确定性高熵 token，使打包后 ZIP 体积接近 1 MB。
 *
 * 阈值（NFR-4.1 / 4.2，单线程本地 NVMe）:
 * - PresentationDocument.openAsync + presentationPart + 全部 slide descendants 遍历：≤ 300 ms p95
 * - element 树 → XML 序列化（saveAsBytesAsync）：≤ 200 ms p95
 *
 * bench 不强制阈值（vitest bench 是统计性能数据）。实际值见
 * docs/implementation/bench-baseline.md «Epic-4 段» ，回归走 PR diff 评估。
 */

import { beforeAll, bench, describe } from "vitest";
import type { MemoryPackagePart } from "../src/backends/memory/memory-package-part.js";
import type { IPackagePart } from "../src/packaging/interfaces/part.js";
import { PresentationDocument } from "../src/ppt/index.js";

const SLIDE_COUNT = 120;
const RUNS_PER_SLIDE = 8;
const P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

/** 确定性高熵 token：xorshift32。 */
function token(seed: number): string {
  let x = seed >>> 0 || 1;
  let s = "";
  for (let i = 0; i < 6; i++) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    s += (x >>> 0).toString(36);
  }
  return s;
}

/** 一张「文本满载」幻灯片：单 shape + 单 txBody + 多段 run。 */
function buildSlideXml(slideIdx: number): string {
  let runs = "";
  for (let i = 0; i < RUNS_PER_SLIDE; i += 1) {
    runs += `<a:r><a:rPr lang="en-US"/><a:t>${token(slideIdx * 31 + i)}</a:t></a:r>`;
  }
  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<p:sld xmlns:p="${P}" xmlns:r="${R}" xmlns:a="${A}">` +
    `<p:cSld><p:spTree>` +
    `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
    `<p:grpSpPr/>` +
    `<p:sp>` +
    `<p:nvSpPr><p:cNvPr id="2" name="Body"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>` +
    `<p:spPr/>` +
    `<p:txBody>` +
    `<a:bodyPr/><a:lstStyle/>` +
    `<a:p>${runs}</a:p>` +
    `</p:txBody>` +
    `</p:sp>` +
    `</p:spTree></p:cSld>` +
    `<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>` +
    `</p:sld>`
  );
}

let oneMegabytePptx: Uint8Array = new Uint8Array(0);

async function build1MbPptx(): Promise<Uint8Array> {
  const doc = PresentationDocument.create();
  const pkg = doc.package;
  const presentationPart = doc.presentationPart!.part;
  const slideLayoutTarget = "slideLayouts/slideLayout1.xml";

  // create() 已建第 1 张 slide：覆盖 + 追加 (SLIDE_COUNT-1) 张达到 ~1 MB。
  for (let i = 0; i < SLIDE_COUNT; i += 1) {
    const slideUri = `/ppt/slides/slide${i + 1}.xml` as never;
    const slidePart = pkg.hasPart(slideUri)
      ? pkg.getPart(slideUri)
      : pkg.createPart(
          slideUri,
          "application/vnd.openxmlformats-officedocument.presentationml.slide+xml",
        );
    (slidePart as MemoryPackagePart).writeSync(buildSlideXml(i + 1));

    if (i === 0) continue;
    presentationPart.relationships.create({
      id: `rIdSlide${i + 1}`,
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide",
      target: `slides/slide${i + 1}.xml`,
      targetMode: "internal",
    });
    slidePart.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
      target: `../${slideLayoutTarget}`,
      targetMode: "internal",
    });
  }

  // 重写 presentation.xml seed，把 sldIdLst 扩到全部 120 个 slideId（reopen 时
  // slideParts 才能拿到完整列表，确保 bench traversal 计入所有 slide）。
  const sldIds = Array.from({ length: SLIDE_COUNT })
    .map((_, i) => {
      const rid = i === 0 ? findRelIdFor(presentationPart, "slides/slide1.xml") : `rIdSlide${i + 1}`;
      return `<p:sldId id="${256 + i}" r:id="${rid}"/>`;
    })
    .join("");
  const slideMasterRid = findRelIdFor(presentationPart, "slideMasters/slideMaster1.xml");
  const presentationXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<p:presentation xmlns:p="${P}" xmlns:r="${R}" xmlns:a="${A}">` +
    `<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="${slideMasterRid}"/></p:sldMasterIdLst>` +
    `<p:sldIdLst>${sldIds}</p:sldIdLst>` +
    `<p:sldSz cx="9144000" cy="6858000" type="screen4x3"/>` +
    `<p:notesSz cx="6858000" cy="9144000"/>` +
    `<p:defaultTextStyle/>` +
    `</p:presentation>`;
  (presentationPart as MemoryPackagePart).writeSync(presentationXml);

  return doc.saveAsBytesAsync();
}

function findRelIdFor(part: IPackagePart, target: string): string {
  for (const rel of part.relationships) {
    if (rel.target === target) return rel.id;
  }
  throw new Error(`no relationship target=${target}`);
}

beforeAll(async () => {
  oneMegabytePptx = await build1MbPptx();
});

describe("PresentationDocument.openAsync — ~1 MB pptx", () => {
  bench("open + presentation + 全部 slide descendants 遍历", async () => {
    const doc = await PresentationDocument.openAsync(oneMegabytePptx);
    const pp = doc.presentationPart;
    if (pp === undefined) return;
    let count = 0;
    void pp.presentation;
    for (const sp of pp.slideParts) {
      for (const _ of sp.slide.descendants()) count += 1;
    }
    void count;
  });
});

describe("element 树 → bytes — ~1 MB pptx", () => {
  bench("修改 1 个 slide 根 + saveAsBytes 整包写回", async () => {
    const doc = await PresentationDocument.openAsync(oneMegabytePptx);
    const pp = doc.presentationPart;
    if (pp === undefined) return;
    const sp = pp.slideParts[0];
    if (sp !== undefined) {
      sp.slide.extendedAttributes.set("data-bench-mutated", "1");
    }
    await doc.saveAsBytesAsync();
  });
});

describe("PresentationDocument.create — 端到端 120 张 Slide 构造", () => {
  bench("create + 填充 120 slides + saveAsBytes", async () => {
    await build1MbPptx();
  });
});
