// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.TimelineStyles

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the TimelineStyles Class.
 *
 * Element: `x15:timelineStyles` */
export class TimelineStyles extends OpenXmlCompositeElement {
  override readonly localName = "timelineStyles" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** defaultTimelineStyle (:defaultTimelineStyle) */
  defaultTimelineStyle: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "defaultTimelineStyle": this.defaultTimelineStyle = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.defaultTimelineStyle !== undefined) out.push(["defaultTimelineStyle", this.defaultTimelineStyle.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.defaultTimelineStyle, { attribute: ":defaultTimelineStyle", elementClass: "TimelineStyles" });
  }
}
