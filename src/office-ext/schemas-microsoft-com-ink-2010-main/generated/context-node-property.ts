// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_ink_2010_main.json
// @see DocumentFormat.OpenXml.Ink2010Main.ContextNodeProperty

import {
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ContextNodeProperty Class.
 *
 * Element: `msink:property` */
export class ContextNodeProperty extends OpenXmlLeafElement {
  override readonly localName = "property" as const;
  override readonly prefix = "msink" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/ink/2010/main" as const;


  /** type (:type) */
  type: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    return out;
  }

}
