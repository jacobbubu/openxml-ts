// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2008_diagram.json
// @see DocumentFormat.OpenXml.Drawing2008Diagram.DataModelExtensionBlock

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the DataModelExtensionBlock Class.
 *
 * Element: `dsp:dataModelExt` */
export class DataModelExtensionBlock extends OpenXmlLeafElement {
  override readonly localName = "dataModelExt" as const;
  override readonly prefix = "dsp" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2008/diagram" as const;


  /** relId (:relId) */
  relId: StringValue | undefined;

  /** minVer (:minVer) */
  minVer: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "relId": this.relId = StringValue.parse(value); return;
      case "minVer": this.minVer = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.relId !== undefined) out.push(["relId", this.relId.toString()]);
    if (this.minVer !== undefined) out.push(["minVer", this.minVer.toString()]);
    return out;
  }

}
