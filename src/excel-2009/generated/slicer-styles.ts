// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.SlicerStyles

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the SlicerStyles Class.
 *
 * Element: `x14:slicerStyles` */
export class SlicerStyles extends OpenXmlCompositeElement {
  override readonly localName = "slicerStyles" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** defaultSlicerStyle (:defaultSlicerStyle) */
  defaultSlicerStyle: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "defaultSlicerStyle": this.defaultSlicerStyle = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.defaultSlicerStyle !== undefined) out.push(["defaultSlicerStyle", this.defaultSlicerStyle.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.defaultSlicerStyle, { attribute: ":defaultSlicerStyle", elementClass: "SlicerStyles" });
  }
}
