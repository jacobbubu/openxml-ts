// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.TextBox

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the TextBox Class.
 *
 * Element: `v:textbox` */
export class TextBox extends OpenXmlCompositeElement {
  override readonly localName = "textbox" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Unique Identifier (:id) */
  id: StringValue | undefined;

  /** Shape Styling Properties (:style) */
  style: StringValue | undefined;

  /** Text Box Inset (:inset) */
  inset: StringValue | undefined;

  /** Text Box Single-Click Selection Toggle (o:singleclick) */
  singleClick: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "style": this.style = StringValue.parse(value); return;
      case "inset": this.inset = StringValue.parse(value); return;
      case "o:singleclick": this.singleClick = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    if (this.inset !== undefined) out.push(["inset", this.inset.toString()]);
    if (this.singleClick !== undefined) out.push(["o:singleclick", this.singleClick.toString()]);
    return out;
  }

}
