// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.Table

import {
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the Table Class.
 *
 * Element: `inkml:table` */
export class Table extends OpenXmlLeafElement {
  override readonly localName = "table" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;


  /** id (xml:id) */
  id: StringValue | undefined;

  /** apply (:apply) */
  apply: StringValue | undefined;

  /** interpolation (:interpolation) */
  interpolation: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "xml:id": this.id = StringValue.parse(value); return;
      case "apply": this.apply = StringValue.parse(value); return;
      case "interpolation": this.interpolation = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["xml:id", this.id.toString()]);
    if (this.apply !== undefined) out.push(["apply", this.apply.toString()]);
    if (this.interpolation !== undefined) out.push(["interpolation", this.interpolation.toString()]);
    return out;
  }

}
