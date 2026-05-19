// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.MetadataRecord

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Metadata Record.
 *
 * Element: `x:rc` */
export class MetadataRecord extends OpenXmlLeafElement {
  override readonly localName = "rc" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Metadata Record Type Index (:t) */
  typeIndex: UInt32Value | undefined;

  /** Metadata Record Value Index (:v) */
  val: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "t": this.typeIndex = UInt32Value.parse(value); return;
      case "v": this.val = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.typeIndex !== undefined) out.push(["t", this.typeIndex.toString()]);
    if (this.val !== undefined) out.push(["v", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.typeIndex, { attribute: ":t", elementClass: "MetadataRecord" });
    assertRequired(this.val, { attribute: ":v", elementClass: "MetadataRecord" });
  }
}
