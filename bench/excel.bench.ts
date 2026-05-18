/**
 * Story-3.9 Excel 子系统性能基线（epic-3-prd §NFR-3）。
 *
 * 跑法：`pnpm bench`。基准 fixture：合成 ~1 MB xlsx：
 *   18000 行 × 1 Cell，每行的 cellValue 是确定性高熵 token，让压缩后体积接近
 *   element 树规模（约 985 KiB zipped / ~4 MB 未压缩 XML）。
 *
 * 阈值（NFR-3.1 / 3.2，单线程本地 NVMe）:
 * - SpreadsheetDocument.openAsync + workbookPart + worksheet descendants 全量遍历：≤ 300 ms p95
 * - element 树 → XML 序列化（saveAsBytesAsync）：≤ 200 ms p95
 *
 * bench 不强制阈值（vitest bench 是统计性能数据）。实际值见
 * docs/implementation/bench-baseline.md «Epic-3 段» ，回归走 PR diff 评估。
 */

import { beforeAll, bench, describe } from "vitest";
import { Cell, CellValue, Row, SheetData, SpreadsheetDocument } from "../src/excel/index.js";

const ROW_COUNT = 18000;

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

let oneMegabyteXlsx: Uint8Array = new Uint8Array(0);

async function build1MbXlsx(): Promise<Uint8Array> {
  const doc = SpreadsheetDocument.create();
  const sd = doc.workbookPart?.worksheetParts[0]?.worksheet.firstChild(SheetData)!;
  for (let i = 0; i < ROW_COUNT; i += 1) {
    const r = new Row();
    const c = new Cell();
    const v = new CellValue();
    v.text = `${i.toString(16)}-${token(i + 1)}-${token(i * 31 + 7)}`;
    c.appendChild(v);
    r.appendChild(c);
    sd.appendChild(r);
  }
  return doc.saveAsBytesAsync();
}

beforeAll(async () => {
  oneMegabyteXlsx = await build1MbXlsx();
});

describe("SpreadsheetDocument.openAsync — 1 MB xlsx", () => {
  bench("open + workbook + worksheet descendants 遍历", async () => {
    const doc = await SpreadsheetDocument.openAsync(oneMegabyteXlsx);
    const wp = doc.workbookPart;
    if (wp === undefined) return;
    let count = 0;
    void wp.workbook;
    for (const wsp of wp.worksheetParts) {
      for (const _ of wsp.worksheet.descendants()) count += 1;
    }
    void count;
  });
});

describe("element 树 → bytes — 1 MB xlsx", () => {
  bench("修改 1 个 Cell + saveAsBytes 整包写回", async () => {
    const doc = await SpreadsheetDocument.openAsync(oneMegabyteXlsx);
    const wsp = doc.workbookPart?.worksheetParts[0];
    if (wsp === undefined) return;
    const [first] = wsp.worksheet.descendants(Cell);
    if (first !== undefined) {
      const v = new CellValue();
      v.text = "MUTATED";
      first.appendChild(v);
    }
    await doc.saveAsBytesAsync();
  });
});

describe("SpreadsheetDocument.create — 端到端 18000 行构造", () => {
  bench("create + 填充 + saveAsBytes", async () => {
    await build1MbXlsx();
  });
});
