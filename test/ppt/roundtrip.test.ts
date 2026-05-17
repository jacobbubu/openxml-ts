/**
 * Story-4.7 端到端：真实 pptx 经 PresentationDocument 加载 → element 树快照
 * 与 golden 一致；读 → 写 → 读三轮，结构稳定。
 *
 * 覆盖 3 个 fixture（取自 dotnet/Open-XML-SDK MIT 测试资产）：
 * - mcppt.pptx：Markup Compatibility 测试 deck（已在 Epic-1 中心 fixtures，本 Story
 *   把 element snapshot 一并在中心位置生成；本测试用本地副本）；
 * - autosave.pptx：含 autosave 元素的简易 deck；
 * - Of16-02.pptx：Office 2016 风格 deck，含完整 master/layout/theme 链路。
 *
 * 一项额外断言：3 个 fixture 经 PresentationDocument.openAsync 后，drawingml/
 * presentationml 「核心 namespace」内不应出现 OpenXmlUnknownElement——任何核心
 * 元素未注册类都视作 codegen 覆盖回归（扩展 namespace `mc:` / `p14:` / `a14:` 等
 * 不在本守护范围）。
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { OpenXmlCompositeElement, OpenXmlUnknownElement } from "../../src/element/index.js";
import type { OpenXmlElement } from "../../src/element/index.js";
import { PresentationDocument } from "../../src/ppt/index.js";
import { snapshotElement } from "../../tools/golden-generator/element-snapshot.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "fixtures");

const CORE_NAMESPACES = new Set([
  "http://schemas.openxmlformats.org/drawingml/2006/main",
  "http://schemas.openxmlformats.org/presentationml/2006/main",
]);

interface PptxElementGolden {
  readonly source: string;
  readonly generatedBy: string;
  readonly presentation: unknown;
  readonly slides: readonly unknown[];
}

async function loadGolden(name: string): Promise<PptxElementGolden> {
  const text = await readFile(join(FIXTURES_DIR, `${name}.element.golden.json`), "utf-8");
  return JSON.parse(text) as PptxElementGolden;
}

async function snapshotPptx(
  bytes: Uint8Array,
): Promise<{ presentation: unknown; slides: unknown[] }> {
  const doc = await PresentationDocument.openAsync(bytes);
  const pp = doc.presentationPart;
  if (pp === undefined) throw new Error("missing presentationPart");
  return {
    presentation: snapshotElement(pp.presentation),
    slides: pp.slideParts.map((sp) => snapshotElement(sp.slide)),
  };
}

async function roundtripOnce(bytes: Uint8Array): Promise<Uint8Array> {
  const doc = await PresentationDocument.openAsync(bytes);
  const pp = doc.presentationPart;
  if (pp !== undefined) {
    void pp.presentation;
    for (const sp of pp.slideParts) void sp.slide;
  }
  return doc.saveAsBytesAsync();
}

/** 走整棵 typed 树，收集核心 namespace（drawingml/presentationml main）内的 Unknown。 */
function collectCoreUnknowns(root: OpenXmlElement): OpenXmlUnknownElement[] {
  const out: OpenXmlUnknownElement[] = [];
  if (root instanceof OpenXmlUnknownElement && CORE_NAMESPACES.has(root.namespaceUri)) {
    out.push(root);
  }
  if (root instanceof OpenXmlCompositeElement) {
    for (const child of root.descendants(OpenXmlUnknownElement)) {
      if (CORE_NAMESPACES.has(child.namespaceUri)) out.push(child);
    }
  }
  return out;
}

const FIXTURES = ["mcppt.pptx", "autosave.pptx", "Of16-02.pptx"] as const;

for (const fixture of FIXTURES) {
  describe(`Element-tree golden roundtrip · ${fixture}`, () => {
    it("openAsync → element snapshot 与 golden 完全一致", async () => {
      const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, fixture)));
      const snap = await snapshotPptx(bytes);
      const golden = await loadGolden(fixture);
      expect(snap.presentation).toEqual(golden.presentation);
      expect(snap.slides).toEqual(golden.slides);
    });

    it("第二轮 open → save → open 后 element 树仍与 golden 一致", async () => {
      const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, fixture)));
      const r1 = await roundtripOnce(bytes);
      const snap = await snapshotPptx(r1);
      const golden = await loadGolden(fixture);
      expect(snap.presentation).toEqual(golden.presentation);
      expect(snap.slides).toEqual(golden.slides);
    });

    it("第三轮再 write → read 一次仍稳定", async () => {
      const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, fixture)));
      const r1 = await roundtripOnce(bytes);
      const r2 = await roundtripOnce(r1);
      const snap = await snapshotPptx(r2);
      const golden = await loadGolden(fixture);
      expect(snap.presentation).toEqual(golden.presentation);
      expect(snap.slides).toEqual(golden.slides);
    });

    it("核心 namespace（drawingml / presentationml main）内无 Unknown 元素", async () => {
      const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, fixture)));
      const doc = await PresentationDocument.openAsync(bytes);
      const pp = doc.presentationPart!;
      const unknowns: OpenXmlUnknownElement[] = [
        ...collectCoreUnknowns(pp.presentation),
        ...pp.slideParts.flatMap((sp) => collectCoreUnknowns(sp.slide)),
      ];
      // 任一核心 namespace Unknown 都视作 codegen 覆盖回归
      expect(unknowns).toEqual([]);
    });
  });
}

describe("effective* resolver 真实样例联动", () => {
  it("autosave.pptx slide[0] 有完整 slide → layout → master → theme 链路，effective* 三档命中", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "autosave.pptx")));
    const doc = await PresentationDocument.openAsync(bytes);
    const sp = doc.presentationPart?.slideParts[0]!;
    // 三级继承全部到位
    expect(sp.slideLayoutPart).toBeDefined();
    expect(sp.slideLayoutPart?.slideMasterPart).toBeDefined();
    expect(sp.slideLayoutPart?.slideMasterPart?.themePart).toBeDefined();
    // effective* 命中 master.themePart 这一档
    expect(sp.effectiveColorScheme).toBeDefined();
    expect(sp.effectiveFontScheme).toBeDefined();
    expect(sp.effectiveFormatScheme).toBeDefined();
  });
});
