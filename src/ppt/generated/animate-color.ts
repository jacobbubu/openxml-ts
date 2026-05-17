// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.AnimateColor

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Animate Color Behavior.
 *
 * Element: `p:animClr` */
export class AnimateColor extends OpenXmlCompositeElement {
  override readonly localName = "animClr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Color Space (:clrSpc) */
  colorSpace: StringValue | undefined;

  /** Direction (:dir) */
  direction: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":clrSpc": this.colorSpace = StringValue.parse(value); return;
      case ":dir": this.direction = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.colorSpace !== undefined) out.push([":clrSpc", this.colorSpace.toString()]);
    if (this.direction !== undefined) out.push([":dir", this.direction.toString()]);
    return out;
  }

}
