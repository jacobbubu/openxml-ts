// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.TextPath

import {
  OpenXmlLeafElement,
  StringValue,
  TrueFalseValue,
} from "../../element/index.js";

/** Defines the TextPath Class.
 *
 * Element: `v:textpath` */
export class TextPath extends OpenXmlLeafElement {
  override readonly localName = "textpath" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;


  /** Unique Identifier (:id) */
  id: StringValue | undefined;

  /** Shape Styling Properties (:style) */
  style: StringValue | undefined;

  /** Text Path Toggle (:on) */
  on: TrueFalseValue | undefined;

  /** Shape Fit Toggle (:fitshape) */
  fitShape: TrueFalseValue | undefined;

  /** Path Fit Toggle (:fitpath) */
  fitPath: TrueFalseValue | undefined;

  /** Text Path Trim Toggle (:trim) */
  trim: TrueFalseValue | undefined;

  /** Text X-Scaling (:xscale) */
  xScale: TrueFalseValue | undefined;

  /** Text Path Text (:string) */
  string: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "style": this.style = StringValue.parse(value); return;
      case "on": this.on = TrueFalseValue.parse(value); return;
      case "fitshape": this.fitShape = TrueFalseValue.parse(value); return;
      case "fitpath": this.fitPath = TrueFalseValue.parse(value); return;
      case "trim": this.trim = TrueFalseValue.parse(value); return;
      case "xscale": this.xScale = TrueFalseValue.parse(value); return;
      case "string": this.string = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    if (this.on !== undefined) out.push(["on", this.on.toString()]);
    if (this.fitShape !== undefined) out.push(["fitshape", this.fitShape.toString()]);
    if (this.fitPath !== undefined) out.push(["fitpath", this.fitPath.toString()]);
    if (this.trim !== undefined) out.push(["trim", this.trim.toString()]);
    if (this.xScale !== undefined) out.push(["xscale", this.xScale.toString()]);
    if (this.string !== undefined) out.push(["string", this.string.toString()]);
    return out;
  }

}
