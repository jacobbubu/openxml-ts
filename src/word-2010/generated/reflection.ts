// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.Reflection

import {
  Int32Value,
  Int64Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Defines the Reflection Class.
 *
 * Element: `w14:reflection` */
export class Reflection extends OpenXmlLeafElement {
  override readonly localName = "reflection" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;


  /** blurRad (w14:blurRad) */
  blurRadius: Int64Value | undefined;

  /** stA (w14:stA) */
  startingOpacity: Int32Value | undefined;

  /** stPos (w14:stPos) */
  startPosition: Int32Value | undefined;

  /** endA (w14:endA) */
  endingOpacity: Int32Value | undefined;

  /** endPos (w14:endPos) */
  endPosition: Int32Value | undefined;

  /** dist (w14:dist) */
  distanceFromText: Int64Value | undefined;

  /** dir (w14:dir) */
  directionAngle: Int32Value | undefined;

  /** fadeDir (w14:fadeDir) */
  fadeDirection: Int32Value | undefined;

  /** sx (w14:sx) */
  horizontalScalingFactor: Int32Value | undefined;

  /** sy (w14:sy) */
  verticalScalingFactor: Int32Value | undefined;

  /** kx (w14:kx) */
  horizontalSkewAngle: Int32Value | undefined;

  /** ky (w14:ky) */
  verticalSkewAngle: Int32Value | undefined;

  /** algn (w14:algn) */
  alignment: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:blurRad": this.blurRadius = Int64Value.parse(value); assertNumber(this.blurRadius, { min: 0, max: 2147483647 }, { attribute: "w14:blurRad", elementClass: "Reflection" }); return;
      case "w14:stA": this.startingOpacity = Int32Value.parse(value); assertNumber(this.startingOpacity, { min: 0, max: 100000 }, { attribute: "w14:stA", elementClass: "Reflection" }); return;
      case "w14:stPos": this.startPosition = Int32Value.parse(value); assertNumber(this.startPosition, { min: 0, max: 100000 }, { attribute: "w14:stPos", elementClass: "Reflection" }); return;
      case "w14:endA": this.endingOpacity = Int32Value.parse(value); assertNumber(this.endingOpacity, { min: 0, max: 100000 }, { attribute: "w14:endA", elementClass: "Reflection" }); return;
      case "w14:endPos": this.endPosition = Int32Value.parse(value); assertNumber(this.endPosition, { min: 0, max: 100000 }, { attribute: "w14:endPos", elementClass: "Reflection" }); return;
      case "w14:dist": this.distanceFromText = Int64Value.parse(value); assertNumber(this.distanceFromText, { min: 0, max: 2147483647 }, { attribute: "w14:dist", elementClass: "Reflection" }); return;
      case "w14:dir": this.directionAngle = Int32Value.parse(value); assertNumber(this.directionAngle, { min: 0 }, { attribute: "w14:dir", elementClass: "Reflection" }); return;
      case "w14:fadeDir": this.fadeDirection = Int32Value.parse(value); assertNumber(this.fadeDirection, { min: 0 }, { attribute: "w14:fadeDir", elementClass: "Reflection" }); return;
      case "w14:sx": this.horizontalScalingFactor = Int32Value.parse(value); return;
      case "w14:sy": this.verticalScalingFactor = Int32Value.parse(value); return;
      case "w14:kx": this.horizontalSkewAngle = Int32Value.parse(value); return;
      case "w14:ky": this.verticalSkewAngle = Int32Value.parse(value); return;
      case "w14:algn": this.alignment = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blurRadius !== undefined) out.push(["w14:blurRad", this.blurRadius.toString()]);
    if (this.startingOpacity !== undefined) out.push(["w14:stA", this.startingOpacity.toString()]);
    if (this.startPosition !== undefined) out.push(["w14:stPos", this.startPosition.toString()]);
    if (this.endingOpacity !== undefined) out.push(["w14:endA", this.endingOpacity.toString()]);
    if (this.endPosition !== undefined) out.push(["w14:endPos", this.endPosition.toString()]);
    if (this.distanceFromText !== undefined) out.push(["w14:dist", this.distanceFromText.toString()]);
    if (this.directionAngle !== undefined) out.push(["w14:dir", this.directionAngle.toString()]);
    if (this.fadeDirection !== undefined) out.push(["w14:fadeDir", this.fadeDirection.toString()]);
    if (this.horizontalScalingFactor !== undefined) out.push(["w14:sx", this.horizontalScalingFactor.toString()]);
    if (this.verticalScalingFactor !== undefined) out.push(["w14:sy", this.verticalScalingFactor.toString()]);
    if (this.horizontalSkewAngle !== undefined) out.push(["w14:kx", this.horizontalSkewAngle.toString()]);
    if (this.verticalSkewAngle !== undefined) out.push(["w14:ky", this.verticalSkewAngle.toString()]);
    if (this.alignment !== undefined) out.push(["w14:algn", this.alignment.toString()]);
    return out;
  }

}
