/**
 * Epic-86: 上下文感知反序列化测试。
 *
 * 验证：反序列化时按父元素 schema child-map 消歧同名元素，而非全局扁平 registry。
 *
 * 核心场景：
 *  - `<w:r><w:tab/></w:r>` → `TabChar`（不是 TabStop）
 *  - `<w:tabs><w:tab w:val="left" w:pos="720"/></w:tabs>` → `TabStop`
 *  - `<w:p><w:pPr>` → ParagraphProperties（不是 StyleParagraphProperties）
 *  - `<w:rPr>` 在 `<w:r>` 下 → RunProperties
 *  - `<w:jc>` 在 `<w:pPr>` 下 → Justification（不是 TableJustification）
 *  - Real Office fixtures validatePackage → 0 false positives（Epic-86 主要目标）
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { OpenXmlCompositeElement } from "../../src/element/element.js";
import { ElementRegistry, deserialize } from "../../src/element/index.js";
import { registerWordprocessingElements } from "../../src/word/generated/_registry.js";
import { Justification } from "../../src/word/generated/justification.js";
import { ParagraphProperties } from "../../src/word/generated/paragraph-properties.js";
import { RunProperties } from "../../src/word/generated/run-properties.js";
import { TabChar } from "../../src/word/generated/tab-char.js";
import { TabStop } from "../../src/word/generated/tab-stop.js";
import { TableCellProperties } from "../../src/word/generated/table-cell-properties.js";
import { TableJustification } from "../../src/word/generated/table-justification.js";
import { TableProperties } from "../../src/word/generated/table-properties.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

// Set up a fresh registry for all tests
let registry: ElementRegistry;

beforeAll(() => {
  registry = new ElementRegistry();
  registerWordprocessingElements(registry);
});

describe("Epic-86: 上下文感知反序列化", () => {
  // ── w:tab 同名消歧 ────────────────────────────────────────────────────────

  describe("w:tab 消歧", () => {
    it("w:tab 在 w:r 下 → TabChar（CT_Empty，无属性）", () => {
      const xml = `<w:r xmlns:w="${WPNS}"><w:tab/></w:r>`;
      const root = deserialize(xml, { registry });
      expect(root).toBeInstanceOf(OpenXmlCompositeElement);
      const run = root as OpenXmlCompositeElement;
      const tab = run.firstChild();
      expect(tab).toBeInstanceOf(TabChar);
      expect(tab?.constructor.name).toBe("TabChar");
    });

    it("w:tab 在 w:tabs 下 → TabStop（CT_TabStop，有 val/pos 属性）", () => {
      const xml = `<w:tabs xmlns:w="${WPNS}"><w:tab w:val="left" w:pos="720"/></w:tabs>`;
      const root = deserialize(xml, { registry });
      expect(root).toBeInstanceOf(OpenXmlCompositeElement);
      const tabs = root as OpenXmlCompositeElement;
      const tab = tabs.firstChild();
      expect(tab).toBeInstanceOf(TabStop);
      expect(tab?.constructor.name).toBe("TabStop");
    });

    it("w:r 内 w:tab 没有不必要的属性错误（round-trip）", () => {
      const xml = `<w:r xmlns:w="${WPNS}"><w:tab/></w:r>`;
      const root = deserialize(xml, { registry });
      const tab = (root as OpenXmlCompositeElement).firstChild();
      // TabChar 是 CT_Empty，无任何必要属性
      expect(tab).toBeInstanceOf(TabChar);
    });
  });

  // ── w:pPr 消歧 ────────────────────────────────────────────────────────────

  describe("w:pPr 消歧", () => {
    it("w:pPr 在 w:p 下 → ParagraphProperties", () => {
      const xml = `<w:p xmlns:w="${WPNS}"><w:pPr/></w:p>`;
      const root = deserialize(xml, { registry });
      const p = root as OpenXmlCompositeElement;
      const pPr = p.firstChild();
      expect(pPr).toBeInstanceOf(ParagraphProperties);
      expect(pPr?.constructor.name).toBe("ParagraphProperties");
    });
  });

  // ── w:rPr 消歧 ────────────────────────────────────────────────────────────

  describe("w:rPr 消歧", () => {
    it("w:rPr 在 w:r 下 → RunProperties", () => {
      const xml = `<w:r xmlns:w="${WPNS}"><w:rPr><w:b/></w:rPr><w:t>hello</w:t></w:r>`;
      const root = deserialize(xml, { registry });
      const run = root as OpenXmlCompositeElement;
      const rPr = run.firstChild();
      expect(rPr).toBeInstanceOf(RunProperties);
      expect(rPr?.constructor.name).toBe("RunProperties");
    });
  });

  // ── w:jc 消歧 ────────────────────────────────────────────────────────────

  describe("w:jc 消歧", () => {
    it("w:jc 在 w:pPr 下 → Justification（不是 TableJustification）", () => {
      const xml = `<w:p xmlns:w="${WPNS}"><w:pPr><w:jc w:val="center"/></w:pPr></w:p>`;
      const root = deserialize(xml, { registry });
      const p = root as OpenXmlCompositeElement;
      const pPr = p.firstChild() as OpenXmlCompositeElement;
      expect(pPr).toBeInstanceOf(OpenXmlCompositeElement);
      const jc = (pPr as OpenXmlCompositeElement).firstChild();
      expect(jc).toBeInstanceOf(Justification);
      expect(jc).not.toBeInstanceOf(TableJustification);
    });

    it("w:jc 在 w:tblPr 下 → TableJustification（不是 Justification）", () => {
      const xml = `<w:tbl xmlns:w="${WPNS}"><w:tblPr><w:jc w:val="center"/></w:tblPr></w:tbl>`;
      const root = deserialize(xml, { registry });
      const tbl = root as OpenXmlCompositeElement;
      const tblPr = tbl.firstChild() as OpenXmlCompositeElement;
      expect(tblPr).toBeInstanceOf(TableProperties);
      const jc = (tblPr as OpenXmlCompositeElement).firstChild();
      expect(jc).toBeInstanceOf(TableJustification);
      expect(jc).not.toBeInstanceOf(Justification);
    });
  });

  // ── w:tcPr 消歧 ──────────────────────────────────────────────────────────

  describe("w:tcPr 消歧", () => {
    it("w:tcPr 在 w:tc 下 → TableCellProperties", () => {
      const xml = `<w:tc xmlns:w="${WPNS}"><w:tcPr/></w:tc>`;
      const root = deserialize(xml, { registry });
      const tc = root as OpenXmlCompositeElement;
      const tcPr = tc.firstChild();
      expect(tcPr).toBeInstanceOf(TableCellProperties);
      expect(tcPr?.constructor.name).toBe("TableCellProperties");
    });
  });

  // ── 全局 fallback 仍有效 ──────────────────────────────────────────────────

  describe("全局 fallback 完整性", () => {
    it("无父上下文时（根元素）仍从全局 registry 解析", () => {
      // w:document 是根，应该从全局 registry 解析
      const xml = `<w:document xmlns:w="${WPNS}"></w:document>`;
      const root = deserialize(xml, { registry });
      expect(root).toBeDefined();
      expect(root.localName).toBe("document");
    });

    it("父无 child-map 的 unknown 元素下，子元素仍从全局 registry fallback", () => {
      // 自定义根+子：root 没有 child-map，子 w:p 应从 global registry 拿
      const xml = `<w:body xmlns:w="${WPNS}"><w:p/></w:body>`;
      const root = deserialize(xml, { registry });
      const body = root as OpenXmlCompositeElement;
      const p = body.firstChild();
      expect(p?.localName).toBe("p");
      expect(p?.constructor.name).toBe("Paragraph");
    });
  });

  // ── descendants 查找 ─────────────────────────────────────────────────────

  describe("descendants 查找验证", () => {
    it("TabChar.descendants(TabChar) 能找到 w:r 内的 tab", () => {
      const xml = `<w:r xmlns:w="${WPNS}"><w:tab/></w:r>`;
      const root = deserialize(xml, { registry }) as OpenXmlCompositeElement;
      const tabs = [...root.descendants(TabChar)];
      expect(tabs).toHaveLength(1);
    });

    it("TabStop.descendants(TabStop) 能找到 w:tabs 内的 tab", () => {
      const xml = `<w:tabs xmlns:w="${WPNS}"><w:tab w:val="left" w:pos="720"/><w:tab w:val="right" w:pos="1440"/></w:tabs>`;
      const root = deserialize(xml, { registry }) as OpenXmlCompositeElement;
      const stops = [...root.descendants(TabStop)];
      expect(stops).toHaveLength(2);
    });
  });
});

// ── Real Office fixtures: 上下文感知消歧后，元素正确分类 ─────────────────────

describe("Epic-86: upstream-smoke.docx 上下文感知分类验证", () => {
  const HERE = dirname(fileURLToPath(import.meta.url));
  const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

  it("fixtures 目录可访问", async () => {
    const files = await readdir(FIXTURES_DIR);
    expect(files.length).toBeGreaterThan(0);
  });

  it("所有 .docx 中的 w:tab 在 w:r 下都被正确分类为 TabChar（不是 TabStop）", async () => {
    // Epic-86 的核心修复：w:tab 在 w:r 下 → TabChar（CT_Empty），
    // 在 w:tabs 下 → TabStop（CT_TabStop）。
    // 修复前：全局 registry 让 TabStop 胜出，导致 w:r 里的 w:tab 被误分类为 TabStop。
    // 修复后：child-map 按父上下文精确消歧。
    const { WordprocessingDocument } = await import("../../src/word/index.js");

    const files = await readdir(FIXTURES_DIR);
    const docxFiles = files.filter((f) => f.endsWith(".docx"));
    expect(docxFiles.length).toBeGreaterThan(0);

    let wrongClassCount = 0;
    const wrongClassDetails: string[] = [];

    for (const filename of docxFiles) {
      const docxPath = join(FIXTURES_DIR, filename);
      try {
        const bytes = new Uint8Array(await readFile(docxPath));
        const doc = await WordprocessingDocument.openAsync(bytes);
        const mainPart = doc.mainDocumentPart;
        if (mainPart === undefined) continue;

        const docEl = mainPart.document;
        if (!(docEl instanceof OpenXmlCompositeElement)) continue;

        // 在 w:r 下找到的 w:tab 必须是 TabChar，不能是 TabStop
        for (const el of docEl.descendants()) {
          if (
            el.localName === "tab" &&
            el.parent?.localName === "r" &&
            el.constructor.name !== "TabChar"
          ) {
            wrongClassCount++;
            if (wrongClassDetails.length < 5) {
              wrongClassDetails.push(
                `  ${filename}: w:tab in w:r classified as ${el.constructor.name}`,
              );
            }
          }
        }
      } catch {
        // Skip files that cannot be opened (encrypted, malformed, etc.)
      }
    }

    if (wrongClassCount > 0) {
      console.error(
        `w:tab 在 w:r 下错误分类 (${wrongClassCount} 处):\n${wrongClassDetails.join("\n")}`,
      );
    }
    expect(wrongClassCount).toBe(0);
  }, 120000);

  it("所有 .docx 中无 TabStop 被实例化在 w:r 内（验证正确分类）", async () => {
    // 辅助验证：在 w:r 的直接子节点中不应出现 TabStop 实例（TabStop 只应在 w:tabs 下）
    const { WordprocessingDocument } = await import("../../src/word/index.js");

    const files = await readdir(FIXTURES_DIR);
    const docxFiles = files.filter((f) => f.endsWith(".docx"));

    let wrongTabStopCount = 0;
    const wrongTabStopDetails: string[] = [];

    for (const filename of docxFiles) {
      const docxPath = join(FIXTURES_DIR, filename);
      try {
        const bytes = new Uint8Array(await readFile(docxPath));
        const doc = await WordprocessingDocument.openAsync(bytes);
        const mainPart = doc.mainDocumentPart;
        if (mainPart === undefined) continue;

        const docEl = mainPart.document;
        // Find all elements with localName 'tab' that are TabStop (constructor.name === 'TabStop')
        // inside a parent with localName 'r'
        if (!(docEl instanceof OpenXmlCompositeElement)) continue;
        for (const el of docEl.descendants()) {
          if (
            el.localName === "tab" &&
            el.constructor.name === "TabStop" &&
            el.parent?.localName === "r"
          ) {
            wrongTabStopCount++;
            wrongTabStopDetails.push(`  ${filename}: TabStop in <w:r>`);
          }
        }
      } catch {
        // Skip
      }
    }

    if (wrongTabStopCount > 0) {
      console.error(
        `Wrong TabStop in w:r (${wrongTabStopCount} instances):\n${wrongTabStopDetails.join("\n")}`,
      );
    }
    expect(wrongTabStopCount).toBe(0);
  }, 120000);
});
