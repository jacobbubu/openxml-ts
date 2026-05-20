// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.WordprocessingDrawing.Anchor

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Anchor for Floating DrawingML Object.
 *
 * Element: `wp:anchor` */
export class Anchor extends OpenXmlCompositeElement {
  override readonly localName = "anchor" as const;
  override readonly prefix = "wp" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Distance From Text on Top Edge (:distT) */
  distanceFromTop: UInt32Value | undefined;

  /** Distance From Text on Bottom Edge (:distB) */
  distanceFromBottom: UInt32Value | undefined;

  /** Distance From Text on Left Edge (:distL) */
  distanceFromLeft: UInt32Value | undefined;

  /** Distance From Text on Right Edge (:distR) */
  distanceFromRight: UInt32Value | undefined;

  /** Page Positioning (:simplePos) */
  simplePos: BooleanValue | undefined;

  /** Relative Z-Ordering Position (:relativeHeight) */
  relativeHeight: UInt32Value | undefined;

  /** Display Behind Document Text (:behindDoc) */
  behindDoc: BooleanValue | undefined;

  /** Lock Anchor (:locked) */
  locked: BooleanValue | undefined;

  /** Layout In Table Cell (:layoutInCell) */
  layoutInCell: BooleanValue | undefined;

  /** Hidden (:hidden) */
  hidden: BooleanValue | undefined;

  /** Allow Objects to Overlap (:allowOverlap) */
  allowOverlap: BooleanValue | undefined;

  /** editId (wp14:editId) */
  editId: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "distT": this.distanceFromTop = UInt32Value.parse(value); return;
      case "distB": this.distanceFromBottom = UInt32Value.parse(value); return;
      case "distL": this.distanceFromLeft = UInt32Value.parse(value); return;
      case "distR": this.distanceFromRight = UInt32Value.parse(value); return;
      case "simplePos": this.simplePos = BooleanValue.parse(value); return;
      case "relativeHeight": this.relativeHeight = UInt32Value.parse(value); return;
      case "behindDoc": this.behindDoc = BooleanValue.parse(value); return;
      case "locked": this.locked = BooleanValue.parse(value); return;
      case "layoutInCell": this.layoutInCell = BooleanValue.parse(value); return;
      case "hidden": this.hidden = BooleanValue.parse(value); return;
      case "allowOverlap": this.allowOverlap = BooleanValue.parse(value); return;
      case "wp14:editId": this.editId = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.distanceFromTop !== undefined) out.push(["distT", this.distanceFromTop.toString()]);
    if (this.distanceFromBottom !== undefined) out.push(["distB", this.distanceFromBottom.toString()]);
    if (this.distanceFromLeft !== undefined) out.push(["distL", this.distanceFromLeft.toString()]);
    if (this.distanceFromRight !== undefined) out.push(["distR", this.distanceFromRight.toString()]);
    if (this.simplePos !== undefined) out.push(["simplePos", this.simplePos.toString()]);
    if (this.relativeHeight !== undefined) out.push(["relativeHeight", this.relativeHeight.toString()]);
    if (this.behindDoc !== undefined) out.push(["behindDoc", this.behindDoc.toString()]);
    if (this.locked !== undefined) out.push(["locked", this.locked.toString()]);
    if (this.layoutInCell !== undefined) out.push(["layoutInCell", this.layoutInCell.toString()]);
    if (this.hidden !== undefined) out.push(["hidden", this.hidden.toString()]);
    if (this.allowOverlap !== undefined) out.push(["allowOverlap", this.allowOverlap.toString()]);
    if (this.editId !== undefined) out.push(["wp14:editId", this.editId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.relativeHeight, { attribute: ":relativeHeight", elementClass: "Anchor" });
    assertRequired(this.behindDoc, { attribute: ":behindDoc", elementClass: "Anchor" });
    assertRequired(this.locked, { attribute: ":locked", elementClass: "Anchor" });
    assertRequired(this.layoutInCell, { attribute: ":layoutInCell", elementClass: "Anchor" });
    assertRequired(this.allowOverlap, { attribute: ":allowOverlap", elementClass: "Anchor" });
  }
}
