// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_main.json
// @see DocumentFormat.OpenXml.Drawing2014Main.ConnectableReferences

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ConnectableReferences Class.
 *
 * Element: `a16:cxnDERefs` */
export class ConnectableReferences extends OpenXmlLeafElement {
  override readonly localName = "cxnDERefs" as const;
  override readonly prefix = "a16" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2014/main" as const;


  /** st (:st) */
  st: StringValue | undefined;

  /** end (:end) */
  end: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "st": this.st = StringValue.parse(value); return;
      case "end": this.end = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.st !== undefined) out.push(["st", this.st.toString()]);
    if (this.end !== undefined) out.push(["end", this.end.toString()]);
    return out;
  }

}
