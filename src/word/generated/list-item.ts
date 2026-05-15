// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.ListItem

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Combo Box List Item.
 *
 * Element: `w:listItem` */
export class ListItem extends OpenXmlLeafElement {
  override readonly localName = "listItem" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** List Entry Display Text (w:displayText) */
  displayText: StringValue | undefined;

  /** List Entry Value (w:value) */
  value: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:displayText": this.displayText = StringValue.parse(value); return;
      case "w:value": this.value = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.displayText !== undefined) out.push(["w:displayText", this.displayText.toString()]);
    if (this.value !== undefined) out.push(["w:value", this.value.toString()]);
    return out;
  }
}
