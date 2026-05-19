// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DdeItem

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** DDE Item definition.
 *
 * Element: `x:ddeItem` */
export class DdeItem extends OpenXmlCompositeElement {
  override readonly localName = "ddeItem" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** DDE Name (:name) */
  name: StringValue | undefined;

  /** OLE (:ole) */
  useOle: BooleanValue | undefined;

  /** Advise (:advise) */
  advise: BooleanValue | undefined;

  /** Data is an Image (:preferPic) */
  preferPicture: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "ole": this.useOle = BooleanValue.parse(value); return;
      case "advise": this.advise = BooleanValue.parse(value); return;
      case "preferPic": this.preferPicture = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.useOle !== undefined) out.push(["ole", this.useOle.toString()]);
    if (this.advise !== undefined) out.push(["advise", this.advise.toString()]);
    if (this.preferPicture !== undefined) out.push(["preferPic", this.preferPicture.toString()]);
    return out;
  }

}
