// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Callout

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the Callout Class.
 *
 * Element: `o:callout` */
export class Callout extends OpenXmlLeafElement {
  override readonly localName = "callout" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Callout toggle (:on) */
  on: StringValue | undefined;

  /** Callout type (:type) */
  type: StringValue | undefined;

  /** Callout gap (:gap) */
  gap: StringValue | undefined;

  /** Callout angle (:angle) */
  angle: StringValue | undefined;

  /** Callout automatic drop toggle (:dropauto) */
  dropAuto: StringValue | undefined;

  /** Callout drop position (:drop) */
  drop: StringValue | undefined;

  /** Callout drop distance (:distance) */
  distance: StringValue | undefined;

  /** Callout length toggle (:lengthspecified) */
  lengthSpecified: StringValue | undefined;

  /** Callout length (:length) */
  length: StringValue | undefined;

  /** Callout accent bar toggle (:accentbar) */
  accentBar: StringValue | undefined;

  /** Callout text border toggle (:textborder) */
  textBorder: StringValue | undefined;

  /** Callout flip x (:minusx) */
  minusX: StringValue | undefined;

  /** Callout flip y (:minusy) */
  minusY: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "on": this.on = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "gap": this.gap = StringValue.parse(value); return;
      case "angle": this.angle = StringValue.parse(value); return;
      case "dropauto": this.dropAuto = StringValue.parse(value); return;
      case "drop": this.drop = StringValue.parse(value); return;
      case "distance": this.distance = StringValue.parse(value); return;
      case "lengthspecified": this.lengthSpecified = StringValue.parse(value); return;
      case "length": this.length = StringValue.parse(value); return;
      case "accentbar": this.accentBar = StringValue.parse(value); return;
      case "textborder": this.textBorder = StringValue.parse(value); return;
      case "minusx": this.minusX = StringValue.parse(value); return;
      case "minusy": this.minusY = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.on !== undefined) out.push(["on", this.on.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.gap !== undefined) out.push(["gap", this.gap.toString()]);
    if (this.angle !== undefined) out.push(["angle", this.angle.toString()]);
    if (this.dropAuto !== undefined) out.push(["dropauto", this.dropAuto.toString()]);
    if (this.drop !== undefined) out.push(["drop", this.drop.toString()]);
    if (this.distance !== undefined) out.push(["distance", this.distance.toString()]);
    if (this.lengthSpecified !== undefined) out.push(["lengthspecified", this.lengthSpecified.toString()]);
    if (this.length !== undefined) out.push(["length", this.length.toString()]);
    if (this.accentBar !== undefined) out.push(["accentbar", this.accentBar.toString()]);
    if (this.textBorder !== undefined) out.push(["textborder", this.textBorder.toString()]);
    if (this.minusX !== undefined) out.push(["minusx", this.minusX.toString()]);
    if (this.minusY !== undefined) out.push(["minusy", this.minusY.toString()]);
    return out;
  }

}
