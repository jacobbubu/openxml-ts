// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.SdtContentDate

import {
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the SdtContentDate Class.
 *
 * Element: `w:date` */
export class SdtContentDate extends OpenXmlCompositeElement {
  override readonly localName = "date" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Last Known Date in XML Schema DateTime Format (w:fullDate) */
  fullDate: DateTimeValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:fullDate": this.fullDate = DateTimeValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fullDate !== undefined) out.push(["w:fullDate", this.fullDate.toString()]);
    return out;
  }

}
