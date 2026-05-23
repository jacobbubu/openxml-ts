// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.ResourceUrl

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ResourceUrl Class.
 *
 * Element: `oac:imgUrl` */
export class ResourceUrl extends OpenXmlLeafElement {
  override readonly localName = "imgUrl" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;


  /** src (:src) */
  src: StringValue | undefined;

  /** linkage (:linkage) */
  linkage: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "src": this.src = StringValue.parse(value); return;
      case "linkage": this.linkage = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.src !== undefined) out.push(["src", this.src.toString()]);
    if (this.linkage !== undefined) out.push(["linkage", this.linkage.toString()]);
    return out;
  }

}
