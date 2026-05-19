/**
 * Story-17.1：PPT 表格 markup 助手。
 *
 * 一行返完整 `<p:graphicFrame>` shape：内嵌 `<a:graphic><a:graphicData><a:tbl>` 链路，
 * 含 row × col 个空 `<a:tc>` 单元格。调用方再用 \`setSlideTableCellText\` 填文本。
 *
 * 完整 markup 形态参考 ECMA-376-1 §14.3.5 + DrawingML \`a:tbl\`：
 *
 * ```xml
 * <p:graphicFrame>
 *   <p:nvGraphicFramePr>
 *     <p:cNvPr id="N" name="Table N"/>
 *     <p:cNvGraphicFramePr/>
 *     <p:nvPr/>
 *   </p:nvGraphicFramePr>
 *   <p:xfrm>
 *     <a:off x="..." y="..."/>
 *     <a:ext cx="..." cy="..."/>
 *   </p:xfrm>
 *   <a:graphic>
 *     <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table">
 *       <a:tbl>
 *         <a:tblPr firstRow="1" bandRow="1"/>
 *         <a:tblGrid>
 *           <a:gridCol w="cellW"/>...
 *         </a:tblGrid>
 *         <a:tr h="rowH">
 *           <a:tc>
 *             <a:txBody>
 *               <a:bodyPr/>
 *               <a:lstStyle/>
 *               <a:p/>
 *             </a:txBody>
 *             <a:tcPr/>
 *           </a:tc>
 *           ...
 *         </a:tr>
 *         ...
 *       </a:tbl>
 *     </a:graphicData>
 *   </a:graphic>
 * </p:graphicFrame>
 * ```
 *
 * codegen 在 drawingml 里没把 \`a:tbl\` 及一干表元素出成 typed 类，所以这里全部用
 * \`OpenXmlUnknownElement\` 构造——保 ns 声明一次到位（在最外层 graphicFrame 上）。
 */

import {
  OpenXmlCompositeElement,
  type OpenXmlElement,
  OpenXmlUnknownElement,
} from "../element/index.js";
import { OpenXmlPackageError } from "../packaging/errors.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const TABLE_URI = "http://schemas.openxmlformats.org/drawingml/2006/table";

/** 默认表格几何（约 6 inch 宽，1 行约 0.4 inch 高）。1 inch = 914400 EMU。 */
const DEFAULT_OFFSET_EMU = { xEmu: 914400, yEmu: 914400 };
const DEFAULT_TABLE_WIDTH_EMU = 6 * 914400;
const DEFAULT_ROW_HEIGHT_EMU = Math.round(0.4 * 914400);

export interface CreateSlideTableOptions {
  /** 左上角位置 EMU；默认 1 inch × 1 inch。 */
  readonly offset?: { xEmu: number; yEmu: number };
  /** 总宽 / 总高 EMU；省略时按列宽 / 行高之和自动求。 */
  readonly extent?: { cxEmu: number; cyEmu: number };
  /** 每列宽 EMU；不传 → 均分 \`extent.cxEmu\` / 默认 6 inch。 */
  readonly columnWidthsEmu?: readonly number[];
  /** 每行高 EMU；不传 → 均分 \`extent.cyEmu\` / 默认 0.4 inch × rows。 */
  readonly rowHeightsEmu?: readonly number[];
  /** cNvPr id，同 slide 中唯一。默认 5（避开常用占位 id）。 */
  readonly id?: number;
  /** cNvPr name，默认 \`Table <id>\`。 */
  readonly name?: string;
}

/**
 * 构造一个 \`rows\` × \`cols\` 的空表 \`<p:graphicFrame>\`。
 *
 * @throws OpenXmlPackageError 当 rows / cols ≤ 0 或 columnWidthsEmu / rowHeightsEmu
 *   长度不匹配时（code="BACKEND_ERROR"）
 */
export function createSlideTable(
  rows: number,
  cols: number,
  options: CreateSlideTableOptions = {},
): OpenXmlUnknownElement {
  if (rows <= 0 || cols <= 0 || !Number.isInteger(rows) || !Number.isInteger(cols)) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `createSlideTable: rows/cols must be positive integers, got rows=${rows} cols=${cols}`,
    });
  }
  if (options.columnWidthsEmu !== undefined && options.columnWidthsEmu.length !== cols) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `createSlideTable: columnWidthsEmu.length=${options.columnWidthsEmu.length} != cols=${cols}`,
    });
  }
  if (options.rowHeightsEmu !== undefined && options.rowHeightsEmu.length !== rows) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `createSlideTable: rowHeightsEmu.length=${options.rowHeightsEmu.length} != rows=${rows}`,
    });
  }

  const id = options.id ?? 5;
  const name = options.name ?? `Table ${id}`;
  const offset = options.offset ?? DEFAULT_OFFSET_EMU;
  const totalWidth = options.extent?.cxEmu ?? DEFAULT_TABLE_WIDTH_EMU;
  const totalHeight = options.extent?.cyEmu ?? DEFAULT_ROW_HEIGHT_EMU * rows;
  const columnWidths =
    options.columnWidthsEmu ?? Array.from({ length: cols }, () => Math.floor(totalWidth / cols));
  const rowHeights =
    options.rowHeightsEmu ?? Array.from({ length: rows }, () => Math.floor(totalHeight / rows));

  const frame = u("p", "graphicFrame", NS_P);
  // 一次性声明 a / p 两个 ns（p 已在祖先 slide.xml 声明；a 我们要写）
  frame.extendedAttributes.set("xmlns:a", NS_A);

  // nvGraphicFramePr
  const nvGfp = u("p", "nvGraphicFramePr", NS_P);
  const cNvPr = u("p", "cNvPr", NS_P);
  cNvPr.extendedAttributes.set("id", String(id));
  cNvPr.extendedAttributes.set("name", name);
  nvGfp.appendChild(cNvPr);
  nvGfp.appendChild(u("p", "cNvGraphicFramePr", NS_P));
  nvGfp.appendChild(u("p", "nvPr", NS_P));
  frame.appendChild(nvGfp);

  // xfrm
  const xfrm = u("p", "xfrm", NS_P);
  const off = u("a", "off", NS_A);
  off.extendedAttributes.set("x", String(offset.xEmu));
  off.extendedAttributes.set("y", String(offset.yEmu));
  xfrm.appendChild(off);
  const ext = u("a", "ext", NS_A);
  ext.extendedAttributes.set("cx", String(totalWidth));
  ext.extendedAttributes.set("cy", String(totalHeight));
  xfrm.appendChild(ext);
  frame.appendChild(xfrm);

  // graphic > graphicData > tbl
  const graphic = u("a", "graphic", NS_A);
  const graphicData = u("a", "graphicData", NS_A);
  graphicData.extendedAttributes.set("uri", TABLE_URI);
  const tbl = u("a", "tbl", NS_A);
  // tblPr——空属性
  const tblPr = u("a", "tblPr", NS_A);
  tblPr.extendedAttributes.set("firstRow", "1");
  tblPr.extendedAttributes.set("bandRow", "1");
  tbl.appendChild(tblPr);
  // tblGrid
  const tblGrid = u("a", "tblGrid", NS_A);
  for (const w of columnWidths) {
    const gridCol = u("a", "gridCol", NS_A);
    gridCol.extendedAttributes.set("w", String(w));
    tblGrid.appendChild(gridCol);
  }
  tbl.appendChild(tblGrid);
  // rows
  for (let r = 0; r < rows; r += 1) {
    const tr = u("a", "tr", NS_A);
    tr.extendedAttributes.set("h", String(rowHeights[r]));
    for (let _c = 0; _c < cols; _c += 1) {
      tr.appendChild(buildEmptyCell());
    }
    tbl.appendChild(tr);
  }
  graphicData.appendChild(tbl);
  graphic.appendChild(graphicData);
  frame.appendChild(graphic);
  return frame;
}

function buildEmptyCell(): OpenXmlUnknownElement {
  const tc = u("a", "tc", NS_A);
  const txBody = u("a", "txBody", NS_A);
  txBody.appendChild(u("a", "bodyPr", NS_A));
  txBody.appendChild(u("a", "lstStyle", NS_A));
  txBody.appendChild(u("a", "p", NS_A));
  tc.appendChild(txBody);
  tc.appendChild(u("a", "tcPr", NS_A));
  return tc;
}

/**
 * 给指定单元格设置纯文本——替换该 \`<a:tc>\` 内 \`<a:p>\` 的内容为单个 Run + 单个 \`<a:t>\`。
 *
 * 用法：
 * ```ts
 * const table = createSlideTable(3, 2);
 * setSlideTableCellText(table, 0, 0, "Header A");
 * setSlideTableCellText(table, 0, 1, "Header B");
 * ```
 *
 * @throws OpenXmlPackageError 当 row/col 越界、找不到 \`<a:tbl>\` 或 \`<a:tc>\` 时（code="BACKEND_ERROR"）
 */
export function setSlideTableCellText(
  table: OpenXmlElement,
  row: number,
  col: number,
  text: string,
): void {
  const tc = findCell(table, row, col);
  const txBody = firstUnknown(tc, "txBody");
  if (txBody === undefined) {
    throw cellMissingError("a:txBody", row, col);
  }
  // 移除现有 \`<a:p>\` 们（兼容 typed / Unknown）
  for (const child of txBody.children.toArray()) {
    if (child.localName === "p") {
      txBody.children.remove(child);
    }
  }
  const p = u("a", "p", NS_A);
  const r = u("a", "r", NS_A);
  r.appendChild(u("a", "rPr", NS_A));
  const t = u("a", "t", NS_A);
  t.text = text;
  r.appendChild(t);
  p.appendChild(r);
  txBody.appendChild(p);
}

/**
 * 读单元格的纯文本——展平 \`<a:tc>\` 里所有 \`<a:p><a:r><a:t>\` 子串。
 *
 * @throws OpenXmlPackageError 当 row/col 越界（code="BACKEND_ERROR"）
 */
export function getSlideTableCellText(table: OpenXmlElement, row: number, col: number): string {
  const tc = findCell(table, row, col);
  let buf = "";
  for (const node of tc.descendants()) {
    // \`localName === "t"\` 已经唯一定位到 DrawingML 文本节点；typed 的 a:Text 也带 text
    if (node.localName === "t" && "text" in node && typeof node.text === "string") {
      buf += node.text;
    }
  }
  return buf;
}

/**
 * 合并表格里 `(fromRow, fromCol)` 到 `(toRow, toCol)` 范围的单元格——Story-20。
 *
 * DrawingML 合并语义（ECMA-376-1 §20.1.4.2 / §20.1.4.3）：
 *
 * - 主格 (fromRow, fromCol)：写 `a:gridSpan="N"` / `a:rowSpan="N"`（N > 1 时）；
 * - 同行（row == fromRow）右侧被合并 cell：写 `a:hMerge="1"`；
 * - 同列（col == fromCol）下方被合并 cell：写 `a:vMerge="1"`；
 * - 两个方向都覆盖的 cell：两个 merge 标志叠加。
 *
 * 文本：建议合并前先设主格文本；其它 cell 的 \`<a:t>\` 会被 PowerPoint 忽略
 * 渲染（合并视觉只显示主格）。
 *
 * @throws OpenXmlPackageError 当范围越界 / 反向（toRow < fromRow / toCol < fromCol）/
 *   表中 row 数不足时（code="BACKEND_ERROR"）
 */
export function mergeSlideTableCells(
  table: OpenXmlElement,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number,
): void {
  if (toRow < fromRow || toCol < fromCol) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `mergeSlideTableCells: range reversed (from=(${fromRow},${fromCol}) to=(${toRow},${toCol}))`,
    });
  }
  if (fromRow < 0 || fromCol < 0) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "mergeSlideTableCells: row/col must be ≥ 0",
    });
  }

  // 预先 findCell 验证全部存在——单元格越界在这里抛
  for (let r = fromRow; r <= toRow; r += 1) {
    for (let c = fromCol; c <= toCol; c += 1) {
      findCell(table, r, c);
    }
  }

  const gridSpan = toCol - fromCol + 1;
  const rowSpan = toRow - fromRow + 1;

  for (let r = fromRow; r <= toRow; r += 1) {
    for (let c = fromCol; c <= toCol; c += 1) {
      const tc = findCell(table, r, c);
      if (r === fromRow && c === fromCol) {
        if (gridSpan > 1) tc.extendedAttributes.set("gridSpan", String(gridSpan));
        if (rowSpan > 1) tc.extendedAttributes.set("rowSpan", String(rowSpan));
      } else {
        if (r === fromRow) tc.extendedAttributes.set("hMerge", "1");
        else if (c === fromCol) tc.extendedAttributes.set("vMerge", "1");
        else {
          tc.extendedAttributes.set("hMerge", "1");
          tc.extendedAttributes.set("vMerge", "1");
        }
      }
    }
  }
}

/**
 * 注意：本助手既兼容**新构造**（OpenXmlUnknownElement 一整套）也兼容**reopen 后**
 * （drawingml 的 \`a:tbl\` / \`a:tr\` / \`a:tc\` 等已经有 typed 类，会被 deserializer
 * 解析成 Table / TableRow / TableCell typed 实例）。所以这里按 \`localName\` 匹配，
 * 不依赖具体 class 身份。
 */
function findCell(table: OpenXmlElement, row: number, col: number): OpenXmlCompositeElement {
  const tbl = findByLocalName(table, "tbl");
  if (tbl === undefined) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message:
        "table missing <a:tbl> — is this actually a graphicFrame containing a DrawingML table?",
    });
  }
  let rowIdx = 0;
  for (const child of tbl.children) {
    if (child.localName !== "tr" || !(child instanceof OpenXmlCompositeElement)) continue;
    if (rowIdx === row) {
      let colIdx = 0;
      for (const grandChild of child.children) {
        if (grandChild.localName !== "tc" || !(grandChild instanceof OpenXmlCompositeElement))
          continue;
        if (colIdx === col) return grandChild;
        colIdx += 1;
      }
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `setSlideTableCellText: col ${col} out of range (row has ${colIdx} cells)`,
      });
    }
    rowIdx += 1;
  }
  throw new OpenXmlPackageError({
    code: "BACKEND_ERROR",
    message: `setSlideTableCellText: row ${row} out of range (table has ${rowIdx} rows)`,
  });
}

function findByLocalName(
  root: OpenXmlElement,
  localName: string,
): OpenXmlCompositeElement | undefined {
  if (root.localName === localName && root instanceof OpenXmlCompositeElement) return root;
  if (root instanceof OpenXmlCompositeElement) {
    for (const node of root.descendants()) {
      if (node.localName === localName && node instanceof OpenXmlCompositeElement) return node;
    }
  }
  return undefined;
}

function firstUnknown(
  parent: OpenXmlCompositeElement,
  localName: string,
): OpenXmlCompositeElement | undefined {
  for (const child of parent.children) {
    if (child.localName === localName && child instanceof OpenXmlCompositeElement) return child;
  }
  return undefined;
}

function cellMissingError(what: string, row: number, col: number): OpenXmlPackageError {
  return new OpenXmlPackageError({
    code: "BACKEND_ERROR",
    message: `cell (${row}, ${col}) missing expected child ${what}`,
  });
}

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}
