// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.QuickTimeFromFile

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** QuickTime from File.
 *
 * Element: `a:quickTimeFile` */
export class QuickTimeFromFile extends OpenXmlCompositeElement {
  override readonly localName = "quickTimeFile" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Linked Relationship ID (r:link) */
  link: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:link": this.link = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.link !== undefined) out.push(["r:link", this.link.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.link, { attribute: "r:link", elementClass: "QuickTimeFromFile" });
  }
}
