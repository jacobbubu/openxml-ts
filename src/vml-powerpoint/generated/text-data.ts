// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_powerpoint.json
// @see DocumentFormat.OpenXml.VmlPowerpoint.TextData

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** VML Diagram Text.
 *
 * Element: `pvml:textdata` */
export class TextData extends OpenXmlLeafElement {
  override readonly localName = "textdata" as const;
  override readonly prefix = "pvml" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:powerpoint" as const;


  /** Text Reference (:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

}
