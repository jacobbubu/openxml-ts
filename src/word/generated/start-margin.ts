// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.StartMargin

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the StartMargin Class.
 *
 * Element: `w:start` */
export class StartMargin extends OpenXmlLeafElement {
  override readonly localName = "start" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Table Width Value (w:w) */
  width: StringValue | undefined;

  /** Table Width Type (w:type) */
  type: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:w": this.width = StringValue.parse(value); return;
      case "w:type": this.type = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push(["w:w", this.width.toString()]);
    if (this.type !== undefined) out.push(["w:type", this.type.toString()]);
    return out;
  }

}
