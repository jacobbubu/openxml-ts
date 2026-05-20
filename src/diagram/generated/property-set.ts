// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.PropertySet

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Property Set.
 *
 * Element: `dgm:prSet` */
export class PropertySet extends OpenXmlCompositeElement {
  override readonly localName = "prSet" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Presentation Element Identifier (:presAssocID) */
  presentationElementId: StringValue | undefined;

  /** Presentation Name (:presName) */
  presentationName: StringValue | undefined;

  /** Presentation Style Label (:presStyleLbl) */
  presentationStyleLabel: StringValue | undefined;

  /** Presentation Style Index (:presStyleIdx) */
  presentationStyleIndex: Int32Value | undefined;

  /** Presentation Style Count (:presStyleCnt) */
  presentationStyleCount: Int32Value | undefined;

  /** Current Diagram Type (:loTypeId) */
  layoutTypeId: StringValue | undefined;

  /** Current Diagram Category (:loCatId) */
  layoutCategoryId: StringValue | undefined;

  /** Current Style Type (:qsTypeId) */
  quickStyleTypeId: StringValue | undefined;

  /** Current Style Category (:qsCatId) */
  quickStyleCategoryId: StringValue | undefined;

  /** Color Transform Type Identifier (:csTypeId) */
  colorType: StringValue | undefined;

  /** Color Transform Category (:csCatId) */
  colorCategoryId: StringValue | undefined;

  /** Coherent 3D Behavior (:coherent3DOff) */
  coherent3D: BooleanValue | undefined;

  /** Placeholder Text (:phldrT) */
  placeholderText: StringValue | undefined;

  /** Placeholder (:phldr) */
  placeholder: BooleanValue | undefined;

  /** Custom Rotation (:custAng) */
  rotation: Int32Value | undefined;

  /** Custom Vertical Flip (:custFlipVert) */
  verticalFlip: BooleanValue | undefined;

  /** Custom Horizontal Flip (:custFlipHor) */
  horizontalFlip: BooleanValue | undefined;

  /** Fixed Width Override (:custSzX) */
  fixedWidthOverride: Int32Value | undefined;

  /** Fixed Height Override (:custSzY) */
  fixedHeightOverride: Int32Value | undefined;

  /** Width Scale (:custScaleX) */
  widthScale: Int32Value | undefined;

  /** Height Scale (:custScaleY) */
  heightScale: Int32Value | undefined;

  /** Text Changed (:custT) */
  textChanged: BooleanValue | undefined;

  /** Custom Factor Width (:custLinFactX) */
  factorWidth: Int32Value | undefined;

  /** Custom Factor Height (:custLinFactY) */
  factorHeight: Int32Value | undefined;

  /** Neighbor Offset Width (:custLinFactNeighborX) */
  neighborOffsetWidth: Int32Value | undefined;

  /** Neighbor Offset Height (:custLinFactNeighborY) */
  neighborOffsetHeight: Int32Value | undefined;

  /** Radius Scale (:custRadScaleRad) */
  radiusScale: Int32Value | undefined;

  /** Include Angle Scale (:custRadScaleInc) */
  includeAngleScale: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "presAssocID": this.presentationElementId = StringValue.parse(value); return;
      case "presName": this.presentationName = StringValue.parse(value); return;
      case "presStyleLbl": this.presentationStyleLabel = StringValue.parse(value); return;
      case "presStyleIdx": this.presentationStyleIndex = Int32Value.parse(value); return;
      case "presStyleCnt": this.presentationStyleCount = Int32Value.parse(value); return;
      case "loTypeId": this.layoutTypeId = StringValue.parse(value); return;
      case "loCatId": this.layoutCategoryId = StringValue.parse(value); return;
      case "qsTypeId": this.quickStyleTypeId = StringValue.parse(value); return;
      case "qsCatId": this.quickStyleCategoryId = StringValue.parse(value); return;
      case "csTypeId": this.colorType = StringValue.parse(value); return;
      case "csCatId": this.colorCategoryId = StringValue.parse(value); return;
      case "coherent3DOff": this.coherent3D = BooleanValue.parse(value); return;
      case "phldrT": this.placeholderText = StringValue.parse(value); return;
      case "phldr": this.placeholder = BooleanValue.parse(value); return;
      case "custAng": this.rotation = Int32Value.parse(value); return;
      case "custFlipVert": this.verticalFlip = BooleanValue.parse(value); return;
      case "custFlipHor": this.horizontalFlip = BooleanValue.parse(value); return;
      case "custSzX": this.fixedWidthOverride = Int32Value.parse(value); return;
      case "custSzY": this.fixedHeightOverride = Int32Value.parse(value); return;
      case "custScaleX": this.widthScale = Int32Value.parse(value); return;
      case "custScaleY": this.heightScale = Int32Value.parse(value); return;
      case "custT": this.textChanged = BooleanValue.parse(value); return;
      case "custLinFactX": this.factorWidth = Int32Value.parse(value); return;
      case "custLinFactY": this.factorHeight = Int32Value.parse(value); return;
      case "custLinFactNeighborX": this.neighborOffsetWidth = Int32Value.parse(value); return;
      case "custLinFactNeighborY": this.neighborOffsetHeight = Int32Value.parse(value); return;
      case "custRadScaleRad": this.radiusScale = Int32Value.parse(value); return;
      case "custRadScaleInc": this.includeAngleScale = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.presentationElementId !== undefined) out.push(["presAssocID", this.presentationElementId.toString()]);
    if (this.presentationName !== undefined) out.push(["presName", this.presentationName.toString()]);
    if (this.presentationStyleLabel !== undefined) out.push(["presStyleLbl", this.presentationStyleLabel.toString()]);
    if (this.presentationStyleIndex !== undefined) out.push(["presStyleIdx", this.presentationStyleIndex.toString()]);
    if (this.presentationStyleCount !== undefined) out.push(["presStyleCnt", this.presentationStyleCount.toString()]);
    if (this.layoutTypeId !== undefined) out.push(["loTypeId", this.layoutTypeId.toString()]);
    if (this.layoutCategoryId !== undefined) out.push(["loCatId", this.layoutCategoryId.toString()]);
    if (this.quickStyleTypeId !== undefined) out.push(["qsTypeId", this.quickStyleTypeId.toString()]);
    if (this.quickStyleCategoryId !== undefined) out.push(["qsCatId", this.quickStyleCategoryId.toString()]);
    if (this.colorType !== undefined) out.push(["csTypeId", this.colorType.toString()]);
    if (this.colorCategoryId !== undefined) out.push(["csCatId", this.colorCategoryId.toString()]);
    if (this.coherent3D !== undefined) out.push(["coherent3DOff", this.coherent3D.toString()]);
    if (this.placeholderText !== undefined) out.push(["phldrT", this.placeholderText.toString()]);
    if (this.placeholder !== undefined) out.push(["phldr", this.placeholder.toString()]);
    if (this.rotation !== undefined) out.push(["custAng", this.rotation.toString()]);
    if (this.verticalFlip !== undefined) out.push(["custFlipVert", this.verticalFlip.toString()]);
    if (this.horizontalFlip !== undefined) out.push(["custFlipHor", this.horizontalFlip.toString()]);
    if (this.fixedWidthOverride !== undefined) out.push(["custSzX", this.fixedWidthOverride.toString()]);
    if (this.fixedHeightOverride !== undefined) out.push(["custSzY", this.fixedHeightOverride.toString()]);
    if (this.widthScale !== undefined) out.push(["custScaleX", this.widthScale.toString()]);
    if (this.heightScale !== undefined) out.push(["custScaleY", this.heightScale.toString()]);
    if (this.textChanged !== undefined) out.push(["custT", this.textChanged.toString()]);
    if (this.factorWidth !== undefined) out.push(["custLinFactX", this.factorWidth.toString()]);
    if (this.factorHeight !== undefined) out.push(["custLinFactY", this.factorHeight.toString()]);
    if (this.neighborOffsetWidth !== undefined) out.push(["custLinFactNeighborX", this.neighborOffsetWidth.toString()]);
    if (this.neighborOffsetHeight !== undefined) out.push(["custLinFactNeighborY", this.neighborOffsetHeight.toString()]);
    if (this.radiusScale !== undefined) out.push(["custRadScaleRad", this.radiusScale.toString()]);
    if (this.includeAngleScale !== undefined) out.push(["custRadScaleInc", this.includeAngleScale.toString()]);
    return out;
  }

}
