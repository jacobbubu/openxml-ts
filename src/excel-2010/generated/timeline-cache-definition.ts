// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.TimelineCacheDefinition

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the TimelineCacheDefinition Class.
 *
 * Element: `x15:timelineCacheDefinition` */
export class TimelineCacheDefinition extends OpenXmlCompositeElement {
  override readonly localName = "timelineCacheDefinition" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** sourceName (:sourceName) */
  sourceName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "sourceName": this.sourceName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.sourceName !== undefined) out.push(["sourceName", this.sourceName.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "TimelineCacheDefinition" });
    assertRequired(this.sourceName, { attribute: ":sourceName", elementClass: "TimelineCacheDefinition" });
  }
}
