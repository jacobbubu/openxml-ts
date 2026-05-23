// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_main.json
// @see DocumentFormat.OpenXml.Drawing2014Main.CreationId

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the CreationId Class.
 *
 * Element: `a16:creationId` */
export class CreationId extends OpenXmlLeafElement {
  override readonly localName = "creationId" as const;
  override readonly prefix = "a16" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2014/main" as const;


  /** id (:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

}
