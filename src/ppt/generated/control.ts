// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.Control

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Embedded Control.
 *
 * Element: `p:control` */
export class Control extends OpenXmlCompositeElement {
  override readonly localName = "control" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** spid (:spid) */
  shapeId: StringValue | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** showAsIcon (:showAsIcon) */
  showAsIcon: BooleanValue | undefined;

  /** id (r:id) */
  id: StringValue | undefined;

  /** imgW (:imgW) */
  imageWidth: Int32Value | undefined;

  /** imgH (:imgH) */
  imageHeight: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":spid": this.shapeId = StringValue.parse(value); return;
      case ":name": this.name = StringValue.parse(value); return;
      case ":showAsIcon": this.showAsIcon = BooleanValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
      case ":imgW": this.imageWidth = Int32Value.parse(value); assertNumber(this.imageWidth, { min: 0 }, { attribute: ":imgW", elementClass: "Control" }); return;
      case ":imgH": this.imageHeight = Int32Value.parse(value); assertNumber(this.imageHeight, { min: 0 }, { attribute: ":imgH", elementClass: "Control" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.shapeId !== undefined) out.push([":spid", this.shapeId.toString()]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.showAsIcon !== undefined) out.push([":showAsIcon", this.showAsIcon.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.imageWidth !== undefined) out.push([":imgW", this.imageWidth.toString()]);
    if (this.imageHeight !== undefined) out.push([":imgH", this.imageHeight.toString()]);
    return out;
  }

}
