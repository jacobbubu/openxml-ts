// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.DataModel

import {
  ByteValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the DataModel Class.
 *
 * Element: `x15:dataModel` */
export class DataModel extends OpenXmlCompositeElement {
  override readonly localName = "dataModel" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** minVersionLoad (:minVersionLoad) */
  minVersionLoad: ByteValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "minVersionLoad": this.minVersionLoad = ByteValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.minVersionLoad !== undefined) out.push(["minVersionLoad", this.minVersionLoad.toString()]);
    return out;
  }

}
