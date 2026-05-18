/**
 * Story-12.3：PPT 图片嵌入 markup 助手。
 *
 * 给一个已注册的图片 relId + 位置/尺寸（EMU），返一个完整 `<p:pic>` shape。
 * 调用方把它 append 到 `slide.commonSlideData.shapeTree` 即可（或者 spTree
 * 那一层——pptx 里 cSld 子是 spTree，本助手不关心 path）。
 *
 * 完整 markup 形如：
 *
 * ```xml
 * <p:pic>
 *   <p:nvPicPr>
 *     <p:cNvPr id="..." name="..."/>
 *     <p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr>
 *     <p:nvPr/>
 *   </p:nvPicPr>
 *   <p:blipFill>
 *     <a:blip r:embed="${relId}"/>
 *     <a:stretch><a:fillRect/></a:stretch>
 *   </p:blipFill>
 *   <p:spPr>
 *     <a:xfrm>
 *       <a:off x="..." y="..."/>
 *       <a:ext cx="..." cy="..."/>
 *     </a:xfrm>
 *     <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
 *   </p:spPr>
 * </p:pic>
 * ```
 *
 * 输出 OpenXmlUnknownElement——保 ns 设置正确、不挂载未生成的 typed Picture
 * 类。Picture 类 codegen 里有，但需要 register + 子树仍是 DrawingML，构造
 * 一层包装收益有限。
 */

import { OpenXmlUnknownElement } from "../element/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const NS_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

export interface CreateImagePictureOptions {
  /** cNvPr id；同 slide 中唯一。默认 4（避开 cSld / spTree / 占位 id）。 */
  readonly id?: number;
  /** cNvPr name；默认 `Picture <id>`。 */
  readonly name?: string;
  /** cNvPr descr（替代文字）；不传时不写。 */
  readonly descr?: string;
}

/**
 * @param relId  slidePart.relationships 里 image 关系的 id（来自 \`addImagePart\`）
 * @param offsetEmu  shape 左上角位置（EMU；1 inch = 914400 EMU）
 * @param extentEmu  shape 宽高（EMU）
 */
export function createImagePictureForPpt(
  relId: string,
  offsetEmu: { xEmu: number; yEmu: number },
  extentEmu: { cxEmu: number; cyEmu: number },
  options: CreateImagePictureOptions = {},
): OpenXmlUnknownElement {
  const id = options.id ?? 4;
  const name = options.name ?? `Picture ${id}`;

  const pic = u("p", "pic", NS_P);

  const nvPicPr = u("p", "nvPicPr", NS_P);
  const cNvPr = u("p", "cNvPr", NS_P);
  cNvPr.extendedAttributes.set("id", String(id));
  cNvPr.extendedAttributes.set("name", name);
  if (options.descr !== undefined) cNvPr.extendedAttributes.set("descr", options.descr);
  nvPicPr.appendChild(cNvPr);
  const cNvPicPr = u("p", "cNvPicPr", NS_P);
  const picLocks = u("a", "picLocks", NS_A);
  picLocks.extendedAttributes.set("noChangeAspect", "1");
  cNvPicPr.appendChild(picLocks);
  nvPicPr.appendChild(cNvPicPr);
  nvPicPr.appendChild(u("p", "nvPr", NS_P));
  pic.appendChild(nvPicPr);

  const blipFill = u("p", "blipFill", NS_P);
  const blip = u("a", "blip", NS_A);
  blip.extendedAttributes.set("xmlns:r", NS_R);
  blip.extendedAttributes.set("r:embed", relId);
  blipFill.appendChild(blip);
  const stretch = u("a", "stretch", NS_A);
  stretch.appendChild(u("a", "fillRect", NS_A));
  blipFill.appendChild(stretch);
  pic.appendChild(blipFill);

  const spPr = u("p", "spPr", NS_P);
  const xfrm = u("a", "xfrm", NS_A);
  const off = u("a", "off", NS_A);
  off.extendedAttributes.set("x", String(offsetEmu.xEmu));
  off.extendedAttributes.set("y", String(offsetEmu.yEmu));
  xfrm.appendChild(off);
  const ext = u("a", "ext", NS_A);
  ext.extendedAttributes.set("cx", String(extentEmu.cxEmu));
  ext.extendedAttributes.set("cy", String(extentEmu.cyEmu));
  xfrm.appendChild(ext);
  spPr.appendChild(xfrm);
  const prstGeom = u("a", "prstGeom", NS_A);
  prstGeom.extendedAttributes.set("prst", "rect");
  prstGeom.appendChild(u("a", "avLst", NS_A));
  spPr.appendChild(prstGeom);
  pic.appendChild(spPr);

  return pic;
}

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}
