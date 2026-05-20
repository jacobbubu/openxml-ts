// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.Section

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the Section Class.
 *
 * Element: `p14:section` */
export class Section extends OpenXmlCompositeElement {
  override readonly localName = "section" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

}
