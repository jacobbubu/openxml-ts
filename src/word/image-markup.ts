/**
 * Story-12.3：Word 图片嵌入 markup 助手。
 *
 * 把「我有一个 `relId`」直接变成一个完整可挂的 Word inline-image Run，
 * 调用方 `paragraph.appendChild(run)` 即可。
 *
 * 完整 markup 形如（参 ECMA-376-1 §17.3.2.3 + DrawingML wordprocessingDrawing）：
 *
 * ```xml
 * <w:r>
 *   <w:drawing>
 *     <wp:inline distT="0" distB="0" distL="0" distR="0">
 *       <wp:extent cx="..." cy="..."/>
 *       <wp:docPr id="1" name="..."/>
 *       <wp:cNvGraphicFramePr/>
 *       <a:graphic>
 *         <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
 *           <pic:pic>
 *             <pic:nvPicPr>
 *               <pic:cNvPr id="0" name="..."/>
 *               <pic:cNvPicPr/>
 *             </pic:nvPicPr>
 *             <pic:blipFill>
 *               <a:blip r:embed="${relId}"/>
 *               <a:stretch><a:fillRect/></a:stretch>
 *             </pic:blipFill>
 *             <pic:spPr>
 *               <a:xfrm>
 *                 <a:off x="0" y="0"/>
 *                 <a:ext cx="..." cy="..."/>
 *               </a:xfrm>
 *               <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
 *             </pic:spPr>
 *           </pic:pic>
 *         </a:graphicData>
 *       </a:graphic>
 *     </wp:inline>
 *   </w:drawing>
 * </w:r>
 * ```
 *
 * 用 OpenXmlUnknownElement 构造内层节点——避免拉 ~10 个 generated 类的依赖，
 * 输出 XML 字节级与 .NET SDK 一致。`xmlns:wp` / `xmlns:a` / `xmlns:pic` /
 * `xmlns:r` 通过根 Run 的 extendedAttributes 一次性声明。
 */

import { OpenXmlUnknownElement } from "../element/index.js";
import { Drawing } from "./generated/drawing.js";
import { Run } from "./generated/run.js";

const NS_WP = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const NS_PIC = "http://schemas.openxmlformats.org/drawingml/2006/picture";
const NS_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

export interface CreateImageRunOptions {
  /** docPr 与 cNvPr 的 name；默认 `Picture <id>`。 */
  readonly name?: string;
  /** docPr 的 id；同段落中要全局唯一。默认 1。 */
  readonly id?: number;
  /** docPr 的 descr（替代文字 / alt text）；不传时不写 attribute。 */
  readonly descr?: string;
}

/**
 * 给一个已注册的图片 `relId` 与所需尺寸（EMU），构造一个完整 inline-image Run。
 *
 * 单位：EMU = 1/914400 inch，1 inch ≈ 914400 EMU，1 cm ≈ 360000 EMU。
 *
 * Run 自身额外声明 `xmlns:wp` / `xmlns:a` / `xmlns:pic` / `xmlns:r` 4 个命名空间——
 * 让本 Run 即便从一棵未声明这些 ns 的祖先里独立 serialize 也合法。
 */
export function createImageRunForWord(
  relId: string,
  cxEmu: number,
  cyEmu: number,
  options: CreateImageRunOptions = {},
): Run {
  const id = options.id ?? 1;
  const name = options.name ?? `Picture ${id}`;
  const r = new Run();
  r.extendedAttributes.set("xmlns:wp", NS_WP);
  r.extendedAttributes.set("xmlns:a", NS_A);
  r.extendedAttributes.set("xmlns:pic", NS_PIC);
  r.extendedAttributes.set("xmlns:r", NS_R);

  const drawing = new Drawing();
  const inline = u("wp", "inline", NS_WP);
  inline.extendedAttributes.set("distT", "0");
  inline.extendedAttributes.set("distB", "0");
  inline.extendedAttributes.set("distL", "0");
  inline.extendedAttributes.set("distR", "0");

  const extent = u("wp", "extent", NS_WP);
  extent.extendedAttributes.set("cx", String(cxEmu));
  extent.extendedAttributes.set("cy", String(cyEmu));
  inline.appendChild(extent);

  const docPr = u("wp", "docPr", NS_WP);
  docPr.extendedAttributes.set("id", String(id));
  docPr.extendedAttributes.set("name", name);
  if (options.descr !== undefined) docPr.extendedAttributes.set("descr", options.descr);
  inline.appendChild(docPr);

  inline.appendChild(u("wp", "cNvGraphicFramePr", NS_WP));

  const graphic = u("a", "graphic", NS_A);
  const graphicData = u("a", "graphicData", NS_A);
  graphicData.extendedAttributes.set("uri", NS_PIC);

  const pic = u("pic", "pic", NS_PIC);

  const nvPicPr = u("pic", "nvPicPr", NS_PIC);
  const cNvPr = u("pic", "cNvPr", NS_PIC);
  cNvPr.extendedAttributes.set("id", "0");
  cNvPr.extendedAttributes.set("name", name);
  nvPicPr.appendChild(cNvPr);
  nvPicPr.appendChild(u("pic", "cNvPicPr", NS_PIC));
  pic.appendChild(nvPicPr);

  const blipFill = u("pic", "blipFill", NS_PIC);
  const blip = u("a", "blip", NS_A);
  blip.extendedAttributes.set("r:embed", relId);
  blipFill.appendChild(blip);
  const stretch = u("a", "stretch", NS_A);
  stretch.appendChild(u("a", "fillRect", NS_A));
  blipFill.appendChild(stretch);
  pic.appendChild(blipFill);

  const spPr = u("pic", "spPr", NS_PIC);
  const xfrm = u("a", "xfrm", NS_A);
  const off = u("a", "off", NS_A);
  off.extendedAttributes.set("x", "0");
  off.extendedAttributes.set("y", "0");
  xfrm.appendChild(off);
  const ext = u("a", "ext", NS_A);
  ext.extendedAttributes.set("cx", String(cxEmu));
  ext.extendedAttributes.set("cy", String(cyEmu));
  xfrm.appendChild(ext);
  spPr.appendChild(xfrm);
  const prstGeom = u("a", "prstGeom", NS_A);
  prstGeom.extendedAttributes.set("prst", "rect");
  prstGeom.appendChild(u("a", "avLst", NS_A));
  spPr.appendChild(prstGeom);
  pic.appendChild(spPr);

  graphicData.appendChild(pic);
  graphic.appendChild(graphicData);
  inline.appendChild(graphic);
  drawing.appendChild(inline);
  r.appendChild(drawing);
  return r;
}

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}
