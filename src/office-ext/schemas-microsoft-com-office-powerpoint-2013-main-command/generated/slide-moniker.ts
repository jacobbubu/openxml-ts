// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2013_main_command.json
// @see DocumentFormat.OpenXml.Ppt2013Command.SlideMoniker

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the SlideMoniker Class.
 *
 * Element: `pc:sldMk` */
export class SlideMoniker extends OpenXmlLeafElement {
  override readonly localName = "sldMk" as const;
  override readonly prefix = "pc" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2013/main/command" as const;


  /** cId (:cId) */
  cId: UInt32Value | undefined;

  /** sldId (:sldId) */
  sldId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "cId": this.cId = UInt32Value.parse(value); return;
      case "sldId": this.sldId = UInt32Value.parse(value); assertNumber(this.sldId, { min: 256 }, { attribute: ":sldId", elementClass: "SlideMoniker" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cId !== undefined) out.push(["cId", this.cId.toString()]);
    if (this.sldId !== undefined) out.push(["sldId", this.sldId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.sldId, { attribute: ":sldId", elementClass: "SlideMoniker" });
  }
}
