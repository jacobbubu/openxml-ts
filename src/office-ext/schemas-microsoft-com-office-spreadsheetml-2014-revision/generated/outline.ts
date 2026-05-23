// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.Outline

import {
  BooleanValue,
  ByteValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Outline Class.
 *
 * Element: `xr:outline` */
export class Outline extends OpenXmlLeafElement {
  override readonly localName = "outline" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** isCollapsed (:isCollapsed) */
  isCollapsed: BooleanValue | undefined;

  /** level (:level) */
  level: ByteValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "isCollapsed": this.isCollapsed = BooleanValue.parse(value); return;
      case "level": this.level = ByteValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.isCollapsed !== undefined) out.push(["isCollapsed", this.isCollapsed.toString()]);
    if (this.level !== undefined) out.push(["level", this.level.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.isCollapsed, { attribute: ":isCollapsed", elementClass: "Outline" });
    assertRequired(this.level, { attribute: ":level", elementClass: "Outline" });
  }
}
