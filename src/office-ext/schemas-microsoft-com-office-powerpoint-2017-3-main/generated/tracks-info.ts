// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2017_3_main.json
// @see DocumentFormat.OpenXml.20173Main.TracksInfo

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the TracksInfo Class.
 *
 * Element: `p173:tracksInfo` */
export class TracksInfo extends OpenXmlCompositeElement {
  override readonly localName = "tracksInfo" as const;
  override readonly prefix = "p173" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2017/3/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** displayLoc (:displayLoc) */
  displayLoc: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "displayLoc": this.displayLoc = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.displayLoc !== undefined) out.push(["displayLoc", this.displayLoc.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.displayLoc, { attribute: ":displayLoc", elementClass: "TracksInfo" });
  }
}
