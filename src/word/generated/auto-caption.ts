// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.AutoCaption

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Single Automatic Captioning Setting.
 *
 * Element: `w:autoCaption` */
export class AutoCaption extends OpenXmlLeafElement {
  override readonly localName = "autoCaption" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Identifier of Object to be Automatically Captioned (w:name) */
  name: StringValue | undefined;

  /** Caption Used for Automatic Captioning (w:caption) */
  caption: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:name": this.name = StringValue.parse(value); return;
      case "w:caption": this.caption = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["w:name", this.name.toString()]);
    if (this.caption !== undefined) out.push(["w:caption", this.caption.toString()]);
    return out;
  }
}
