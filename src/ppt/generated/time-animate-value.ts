// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.TimeAnimateValue

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Time Animate Value.
 *
 * Element: `p:tav` */
export class TimeAnimateValue extends OpenXmlCompositeElement {
  override readonly localName = "tav" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Time (:tm) */
  time: StringValue | undefined;

  /** Formula (:fmla) */
  fomula: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":tm": this.time = StringValue.parse(value); return;
      case ":fmla": this.fomula = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.time !== undefined) out.push([":tm", this.time.toString()]);
    if (this.fomula !== undefined) out.push([":fmla", this.fomula.toString()]);
    return out;
  }

}
