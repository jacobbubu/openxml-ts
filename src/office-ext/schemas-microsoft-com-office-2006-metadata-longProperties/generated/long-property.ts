// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_metadata_longProperties.json
// @see DocumentFormat.OpenXml.2006MetadataLongProperties.LongProperty

import {
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the LongProperty Class.
 *
 * Element: `lp:LongProp` */
export class LongProperty extends OpenXmlLeafElement {
  override readonly localName = "LongProp" as const;
  override readonly prefix = "lp" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/metadata/longProperties" as const;


  /** name (:name) */
  name: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    return out;
  }

}
