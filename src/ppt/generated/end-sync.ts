// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.EndSync

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the EndSync Class.
 *
 * Element: `p:endSync` */
export class EndSync extends OpenXmlCompositeElement {
  override readonly localName = "endSync" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Trigger Event (:evt) */
  event: StringValue | undefined;

  /** Trigger Delay (:delay) */
  delay: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "evt": this.event = StringValue.parse(value); return;
      case "delay": this.delay = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.event !== undefined) out.push(["evt", this.event.toString()]);
    if (this.delay !== undefined) out.push(["delay", this.delay.toString()]);
    return out;
  }

}
