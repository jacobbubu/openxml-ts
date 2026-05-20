// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_chartex.json
// @see DocumentFormat.OpenXml.ChartEx.Extension2

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the Extension2 Class.
 *
 * Element: `cx:ext` */
export class Extension2 extends OpenXmlCompositeElement {
  override readonly localName = "ext" as const;
  override readonly prefix = "cx" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2014/chartex" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** uri (:uri) */
  uri: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uri": this.uri = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uri !== undefined) out.push(["uri", this.uri.toString()]);
    return out;
  }

}
