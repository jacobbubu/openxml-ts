// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.ColorMostRecentlyUsed

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Most Recently Used Colors.
 *
 * Element: `o:colormru` */
export class ColorMostRecentlyUsed extends OpenXmlLeafElement {
  override readonly localName = "colormru" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Recent colors (:colors) */
  colors: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "colors": this.colors = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.colors !== undefined) out.push(["colors", this.colors.toString()]);
    return out;
  }

}
