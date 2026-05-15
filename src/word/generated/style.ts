// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Style

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../element/index.js";

/** Style Definition.
 *
 * Element: `w:style` */
export class Style extends OpenXmlCompositeElement {
  override readonly localName = "style" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Style Type (w:type) */
  type: StringValue | undefined;

  /** Style ID (w:styleId) */
  styleId: StringValue | undefined;

  /** Default Style (w:default) */
  default: BooleanValue | undefined;

  /** User-Defined Style (w:customStyle) */
  customStyle: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:type": this.type = StringValue.parse(value); return;
      case "w:styleId": this.styleId = StringValue.parse(value); assertString(this.styleId, { maxLength: 253 }, { attribute: "w:styleId", elementClass: "Style" }); return;
      case "w:default": this.default = BooleanValue.parse(value); return;
      case "w:customStyle": this.customStyle = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["w:type", this.type.toString()]);
    if (this.styleId !== undefined) out.push(["w:styleId", this.styleId.toString()]);
    if (this.default !== undefined) out.push(["w:default", this.default.toString()]);
    if (this.customStyle !== undefined) out.push(["w:customStyle", this.customStyle.toString()]);
    return out;
  }

}
