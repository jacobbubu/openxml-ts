// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_ink_2010_main.json
// @see DocumentFormat.OpenXml.Ink2010Main.ContextNode

import {
  Int32Value,
  ListValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ContextNode Class.
 *
 * Element: `msink:context` */
export class ContextNode extends OpenXmlCompositeElement {
  override readonly localName = "context" as const;
  override readonly prefix = "msink" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/ink/2010/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  /** rotatedBoundingBox (:rotatedBoundingBox) */
  rotatedBoundingBox: ListValue<StringValue> | undefined;

  /** alignmentLevel (:alignmentLevel) */
  alignmentLevel: Int32Value | undefined;

  /** contentType (:contentType) */
  contentType: Int32Value | undefined;

  /** ascender (:ascender) */
  ascender: StringValue | undefined;

  /** descender (:descender) */
  descender: StringValue | undefined;

  /** baseline (:baseline) */
  baseline: StringValue | undefined;

  /** midline (:midline) */
  midline: StringValue | undefined;

  /** customRecognizerId (:customRecognizerId) */
  customRecognizerId: StringValue | undefined;

  /** mathML (:mathML) */
  mathML: StringValue | undefined;

  /** mathStruct (:mathStruct) */
  mathStruct: StringValue | undefined;

  /** mathSymbol (:mathSymbol) */
  mathSymbol: StringValue | undefined;

  /** beginModifierType (:beginModifierType) */
  beginModifierType: StringValue | undefined;

  /** endModifierType (:endModifierType) */
  endModifierType: StringValue | undefined;

  /** rotationAngle (:rotationAngle) */
  rotationAngle: Int32Value | undefined;

  /** hotPoints (:hotPoints) */
  hotPoints: ListValue<StringValue> | undefined;

  /** centroid (:centroid) */
  centroid: StringValue | undefined;

  /** semanticType (:semanticType) */
  semanticType: StringValue | undefined;

  /** shapeName (:shapeName) */
  shapeName: StringValue | undefined;

  /** shapeGeometry (:shapeGeometry) */
  shapeGeometry: ListValue<StringValue> | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "rotatedBoundingBox": this.rotatedBoundingBox = ListValue.parse(value, StringValue.parse); return;
      case "alignmentLevel": this.alignmentLevel = Int32Value.parse(value); return;
      case "contentType": this.contentType = Int32Value.parse(value); return;
      case "ascender": this.ascender = StringValue.parse(value); return;
      case "descender": this.descender = StringValue.parse(value); return;
      case "baseline": this.baseline = StringValue.parse(value); return;
      case "midline": this.midline = StringValue.parse(value); return;
      case "customRecognizerId": this.customRecognizerId = StringValue.parse(value); return;
      case "mathML": this.mathML = StringValue.parse(value); return;
      case "mathStruct": this.mathStruct = StringValue.parse(value); return;
      case "mathSymbol": this.mathSymbol = StringValue.parse(value); return;
      case "beginModifierType": this.beginModifierType = StringValue.parse(value); return;
      case "endModifierType": this.endModifierType = StringValue.parse(value); return;
      case "rotationAngle": this.rotationAngle = Int32Value.parse(value); return;
      case "hotPoints": this.hotPoints = ListValue.parse(value, StringValue.parse); return;
      case "centroid": this.centroid = StringValue.parse(value); return;
      case "semanticType": this.semanticType = StringValue.parse(value); return;
      case "shapeName": this.shapeName = StringValue.parse(value); return;
      case "shapeGeometry": this.shapeGeometry = ListValue.parse(value, StringValue.parse); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.rotatedBoundingBox !== undefined) out.push(["rotatedBoundingBox", this.rotatedBoundingBox.toString()]);
    if (this.alignmentLevel !== undefined) out.push(["alignmentLevel", this.alignmentLevel.toString()]);
    if (this.contentType !== undefined) out.push(["contentType", this.contentType.toString()]);
    if (this.ascender !== undefined) out.push(["ascender", this.ascender.toString()]);
    if (this.descender !== undefined) out.push(["descender", this.descender.toString()]);
    if (this.baseline !== undefined) out.push(["baseline", this.baseline.toString()]);
    if (this.midline !== undefined) out.push(["midline", this.midline.toString()]);
    if (this.customRecognizerId !== undefined) out.push(["customRecognizerId", this.customRecognizerId.toString()]);
    if (this.mathML !== undefined) out.push(["mathML", this.mathML.toString()]);
    if (this.mathStruct !== undefined) out.push(["mathStruct", this.mathStruct.toString()]);
    if (this.mathSymbol !== undefined) out.push(["mathSymbol", this.mathSymbol.toString()]);
    if (this.beginModifierType !== undefined) out.push(["beginModifierType", this.beginModifierType.toString()]);
    if (this.endModifierType !== undefined) out.push(["endModifierType", this.endModifierType.toString()]);
    if (this.rotationAngle !== undefined) out.push(["rotationAngle", this.rotationAngle.toString()]);
    if (this.hotPoints !== undefined) out.push(["hotPoints", this.hotPoints.toString()]);
    if (this.centroid !== undefined) out.push(["centroid", this.centroid.toString()]);
    if (this.semanticType !== undefined) out.push(["semanticType", this.semanticType.toString()]);
    if (this.shapeName !== undefined) out.push(["shapeName", this.shapeName.toString()]);
    if (this.shapeGeometry !== undefined) out.push(["shapeGeometry", this.shapeGeometry.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "ContextNode" });
  }
}
