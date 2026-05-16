/**
 * Story-3.7 端到端：真实 xlsx 经 SpreadsheetDocument 加载 → element 树快照
 * 与 golden 一致；读 → 写 → 读三轮，结构稳定。
 *
 * 覆盖 3 个 fixture（取自 dotnet/Open-XML-SDK MIT 测试资产）：
 * - basicspreadsheet.xlsx：最小用例
 * - Spreadsheet.xlsx：含多 worksheet 与 stylesheet
 * - missingcalcchainpart.xlsx：无 CalcChainPart 边界
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SpreadsheetDocument } from "../../src/excel/index.js";
import { snapshotElement } from "../../tools/golden-generator/element-snapshot.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/golden");

interface XlsxElementGolden {
  readonly source: string;
  readonly generatedBy: string;
  readonly workbook: unknown;
  readonly worksheets: readonly unknown[];
}

async function loadGolden(name: string): Promise<XlsxElementGolden> {
  const text = await readFile(join(FIXTURES_DIR, `${name}.element.golden.json`), "utf-8");
  return JSON.parse(text) as XlsxElementGolden;
}

async function snapshotXlsx(
  bytes: Uint8Array,
): Promise<{ workbook: unknown; worksheets: unknown[] }> {
  const doc = await SpreadsheetDocument.openAsync(bytes);
  const wp = doc.workbookPart;
  if (wp === undefined) throw new Error("missing workbookPart");
  return {
    workbook: snapshotElement(wp.workbook),
    worksheets: wp.worksheetParts.map((wsp) => snapshotElement(wsp.worksheet)),
  };
}

async function roundtripOnce(bytes: Uint8Array): Promise<Uint8Array> {
  const doc = await SpreadsheetDocument.openAsync(bytes);
  // 触发 typed root 加载（workbook + 每个 worksheet）
  const wp = doc.workbookPart;
  if (wp !== undefined) {
    void wp.workbook;
    for (const wsp of wp.worksheetParts) void wsp.worksheet;
  }
  return doc.saveAsBytesAsync();
}

const FIXTURES = [
  "basicspreadsheet.xlsx",
  "Spreadsheet.xlsx",
  "missingcalcchainpart.xlsx",
] as const;

for (const fixture of FIXTURES) {
  describe(`Element-tree golden roundtrip · ${fixture}`, () => {
    it("openAsync → element snapshot 与 golden 完全一致", async () => {
      const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, fixture)));
      const snap = await snapshotXlsx(bytes);
      const golden = await loadGolden(fixture);
      expect(snap.workbook).toEqual(golden.workbook);
      expect(snap.worksheets).toEqual(golden.worksheets);
    });

    it("第二轮 open → save → open 后 element 树仍与 golden 一致", async () => {
      const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, fixture)));
      const r1 = await roundtripOnce(bytes);
      const snap = await snapshotXlsx(r1);
      const golden = await loadGolden(fixture);
      expect(snap.workbook).toEqual(golden.workbook);
      expect(snap.worksheets).toEqual(golden.worksheets);
    });

    it("第三轮再 write → read 一次仍稳定", async () => {
      const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, fixture)));
      const r1 = await roundtripOnce(bytes);
      const r2 = await roundtripOnce(r1);
      const snap = await snapshotXlsx(r2);
      const golden = await loadGolden(fixture);
      expect(snap.workbook).toEqual(golden.workbook);
      expect(snap.worksheets).toEqual(golden.worksheets);
    });
  });
}
