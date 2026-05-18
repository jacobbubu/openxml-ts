/**
 * Story-13.3：Excel 图片嵌入 markup 助手。
 *
 * 给一个 \`relId\`（来自 \`SpreadsheetDocument.addImagePart\`）和两个单元格定位
 * 构造完整 \`<xdr:twoCellAnchor>\` 节点；调用方 \`drawingPart.wsDr.appendChild(anchor)\`
 * 即可。
 *
 * 完整 markup 形如：
 *
 * \`\`\`xml
 * <xdr:twoCellAnchor editAs="oneCell">
 *   <xdr:from>
 *     <xdr:col>1</xdr:col>
 *     <xdr:colOff>0</xdr:colOff>
 *     <xdr:row>1</xdr:row>
 *     <xdr:rowOff>0</xdr:rowOff>
 *   </xdr:from>
 *   <xdr:to>...</xdr:to>
 *   <xdr:pic>
 *     <xdr:nvPicPr>...</xdr:nvPicPr>
 *     <xdr:blipFill><a:blip r:embed="${relId}"/>...</xdr:blipFill>
 *     <xdr:spPr>...</xdr:spPr>
 *   </xdr:pic>
 *   <xdr:clientData/>
 * </xdr:twoCellAnchor>
 * \`\`\`
 *
 * 父 \`<xdr:wsDr>\` 已经在 DrawingPart 占位时声明了 xdr/a/r 三个 namespace，
 * 锚节点本身不重复声明。
 */

import { OpenXmlUnknownElement } from "../element/index.js";

const XDR_NS = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing";
const A_NS = "http://schemas.openxmlformats.org/drawingml/2006/main";

/**
 * 单元格锚点——精确定位到某个单元格 + EMU 偏移量。
 *
 * \`col\` / \`row\` 是 0-based 索引（A1 = (col 0, row 0)）；\`colOff\` / \`rowOff\` 是
 * 该单元格左上角到锚点的 EMU 偏移（1 inch ≈ 914400 EMU）。
 */
export interface CellAnchorPoint {
  readonly col: number;
  readonly row: number;
  /** 默认 0。 */
  readonly colOffEmu?: number;
  /** 默认 0。 */
  readonly rowOffEmu?: number;
}

export interface CreateTwoCellAnchorOptions {
  /** 锚定行为：\`oneCell\` 跟随起始格、\`twoCell\` 随起止格、\`absolute\` 绝对位置。默认 \`oneCell\`。 */
  readonly editAs?: "oneCell" | "twoCell" | "absolute";
  /** cNvPr id；同 drawingPart 中唯一。默认 1。 */
  readonly id?: number;
  /** cNvPr name；默认 \`Picture <id>\`。 */
  readonly name?: string;
  /** cNvPr descr（替代文字）；不传时不写。 */
  readonly descr?: string;
}

/**
 * @param relId  drawingPart.relationships 里 image 关系的 id（来自 \`addImagePart\`）
 * @param from   起始单元格锚点
 * @param to     结束单元格锚点
 */
export function createImageTwoCellAnchorForExcel(
  relId: string,
  from: CellAnchorPoint,
  to: CellAnchorPoint,
  options: CreateTwoCellAnchorOptions = {},
): OpenXmlUnknownElement {
  const id = options.id ?? 1;
  const name = options.name ?? `Picture ${id}`;

  const anchor = u("xdr", "twoCellAnchor", XDR_NS);
  anchor.extendedAttributes.set("editAs", options.editAs ?? "oneCell");

  anchor.appendChild(buildAnchorPoint("from", from));
  anchor.appendChild(buildAnchorPoint("to", to));

  const pic = u("xdr", "pic", XDR_NS);

  const nvPicPr = u("xdr", "nvPicPr", XDR_NS);
  const cNvPr = u("xdr", "cNvPr", XDR_NS);
  cNvPr.extendedAttributes.set("id", String(id));
  cNvPr.extendedAttributes.set("name", name);
  if (options.descr !== undefined) cNvPr.extendedAttributes.set("descr", options.descr);
  nvPicPr.appendChild(cNvPr);
  const cNvPicPr = u("xdr", "cNvPicPr", XDR_NS);
  const picLocks = u("a", "picLocks", A_NS);
  picLocks.extendedAttributes.set("noChangeAspect", "1");
  cNvPicPr.appendChild(picLocks);
  nvPicPr.appendChild(cNvPicPr);
  pic.appendChild(nvPicPr);

  const blipFill = u("xdr", "blipFill", XDR_NS);
  const blip = u("a", "blip", A_NS);
  blip.extendedAttributes.set("r:embed", relId);
  blipFill.appendChild(blip);
  const stretch = u("a", "stretch", A_NS);
  stretch.appendChild(u("a", "fillRect", A_NS));
  blipFill.appendChild(stretch);
  pic.appendChild(blipFill);

  const spPr = u("xdr", "spPr", XDR_NS);
  const xfrm = u("a", "xfrm", A_NS);
  const off = u("a", "off", A_NS);
  off.extendedAttributes.set("x", "0");
  off.extendedAttributes.set("y", "0");
  xfrm.appendChild(off);
  const ext = u("a", "ext", A_NS);
  ext.extendedAttributes.set("cx", "0");
  ext.extendedAttributes.set("cy", "0");
  xfrm.appendChild(ext);
  spPr.appendChild(xfrm);
  const prstGeom = u("a", "prstGeom", A_NS);
  prstGeom.extendedAttributes.set("prst", "rect");
  prstGeom.appendChild(u("a", "avLst", A_NS));
  spPr.appendChild(prstGeom);
  pic.appendChild(spPr);

  anchor.appendChild(pic);
  anchor.appendChild(u("xdr", "clientData", XDR_NS));
  return anchor;
}

function buildAnchorPoint(tag: "from" | "to", p: CellAnchorPoint): OpenXmlUnknownElement {
  const root = u("xdr", tag, XDR_NS);
  root.appendChild(textLeaf("col", String(p.col)));
  root.appendChild(textLeaf("colOff", String(p.colOffEmu ?? 0)));
  root.appendChild(textLeaf("row", String(p.row)));
  root.appendChild(textLeaf("rowOff", String(p.rowOffEmu ?? 0)));
  return root;
}

function textLeaf(localName: string, value: string): OpenXmlUnknownElement {
  const el = u("xdr", localName, XDR_NS);
  el.text = value;
  return el;
}

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}
