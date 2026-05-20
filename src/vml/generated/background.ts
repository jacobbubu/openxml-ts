// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.Background

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../element/index.js";

/** Document Background.
 *
 * Element: `v:background` */
export class Background extends OpenXmlCompositeElement {
  override readonly localName = "background" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Unique Identifier (:id) */
  id: StringValue | undefined;

  /** Shape Fill Toggle (:fill) */
  filled: StringValue | undefined;

  /** Fill Color (:fillcolor) */
  fillcolor: StringValue | undefined;

  /** Black-and-White Mode (o:bwmode) */
  blackWhiteMode: StringValue | undefined;

  /** Pure Black-and-White Mode (o:bwpure) */
  pureBlackWhiteMode: StringValue | undefined;

  /** Normal Black-and-White Mode (o:bwnormal) */
  normalBlackWhiteMode: StringValue | undefined;

  /** Target Screen Size (o:targetscreensize) */
  targetScreenSize: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 255 }, { attribute: ":id", elementClass: "Background" }); return;
      case "fill": this.filled = StringValue.parse(value); return;
      case "fillcolor": this.fillcolor = StringValue.parse(value); return;
      case "o:bwmode": this.blackWhiteMode = StringValue.parse(value); return;
      case "o:bwpure": this.pureBlackWhiteMode = StringValue.parse(value); return;
      case "o:bwnormal": this.normalBlackWhiteMode = StringValue.parse(value); return;
      case "o:targetscreensize": this.targetScreenSize = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.filled !== undefined) out.push(["fill", this.filled.toString()]);
    if (this.fillcolor !== undefined) out.push(["fillcolor", this.fillcolor.toString()]);
    if (this.blackWhiteMode !== undefined) out.push(["o:bwmode", this.blackWhiteMode.toString()]);
    if (this.pureBlackWhiteMode !== undefined) out.push(["o:bwpure", this.pureBlackWhiteMode.toString()]);
    if (this.normalBlackWhiteMode !== undefined) out.push(["o:bwnormal", this.normalBlackWhiteMode.toString()]);
    if (this.targetScreenSize !== undefined) out.push(["o:targetscreensize", this.targetScreenSize.toString()]);
    return out;
  }

}
