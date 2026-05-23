// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2016_11_main.json
// @see DocumentFormat.OpenXml.201611Main.PictureAttributionSourceURL

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PictureAttributionSourceURL Class.
 *
 * Element: `a1611:picAttrSrcUrl` */
export class PictureAttributionSourceURL extends OpenXmlLeafElement {
  override readonly localName = "picAttrSrcUrl" as const;
  override readonly prefix = "a1611" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2016/11/main" as const;


  /** id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "r:id", elementClass: "PictureAttributionSourceURL" });
  }
}
