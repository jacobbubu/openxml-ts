// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.MediaBookmark

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the MediaBookmark Class.
 *
 * Element: `p14:bmk` */
export class MediaBookmark extends OpenXmlLeafElement {
  override readonly localName = "bmk" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** name (:name) */
  name: StringValue | undefined;

  /** time (:time) */
  time: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "time": this.time = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.time !== undefined) out.push(["time", this.time.toString()]);
    return out;
  }

}
