// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.SectionSlideIdListEntry

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the SectionSlideIdListEntry Class.
 *
 * Element: `p14:sldId` */
export class SectionSlideIdListEntry extends OpenXmlLeafElement {
  override readonly localName = "sldId" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** id (:id) */
  id: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); assertNumber(this.id, { min: 256 }, { attribute: ":id", elementClass: "SectionSlideIdListEntry" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "SectionSlideIdListEntry" });
  }
}
