// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.PageSize

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertNumber,
} from "../../element/index.js";

/** Defines the PageSize Class.
 *
 * Element: `w:pgSz` */
export class PageSize extends OpenXmlLeafElement {
  override readonly localName = "pgSz" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Page Width (w:w) */
  width: UInt32Value | undefined;

  /** Page Height (w:h) */
  height: UInt32Value | undefined;

  /** Page Orientation (w:orient) */
  orient: StringValue | undefined;

  /** Printer Paper Code (w:code) */
  code: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:w": this.width = UInt32Value.parse(value); assertNumber(this.width, { max: 31680 }, { attribute: "w:w", elementClass: "PageSize" }); return;
      case "w:h": this.height = UInt32Value.parse(value); assertNumber(this.height, { max: 31680 }, { attribute: "w:h", elementClass: "PageSize" }); return;
      case "w:orient": this.orient = StringValue.parse(value); return;
      case "w:code": this.code = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push(["w:w", this.width.toString()]);
    if (this.height !== undefined) out.push(["w:h", this.height.toString()]);
    if (this.orient !== undefined) out.push(["w:orient", this.orient.toString()]);
    if (this.code !== undefined) out.push(["w:code", this.code.toString()]);
    return out;
  }

}
