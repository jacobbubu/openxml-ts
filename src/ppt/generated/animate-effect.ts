// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.AnimateEffect

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Animate Effect.
 *
 * Element: `p:animEffect` */
export class AnimateEffect extends OpenXmlCompositeElement {
  override readonly localName = "animEffect" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Transition (:transition) */
  transition: StringValue | undefined;

  /** Filter (:filter) */
  filter: StringValue | undefined;

  /** Property List (:prLst) */
  propertyList: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":transition": this.transition = StringValue.parse(value); return;
      case ":filter": this.filter = StringValue.parse(value); return;
      case ":prLst": this.propertyList = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.transition !== undefined) out.push([":transition", this.transition.toString()]);
    if (this.filter !== undefined) out.push([":filter", this.filter.toString()]);
    if (this.propertyList !== undefined) out.push([":prLst", this.propertyList.toString()]);
    return out;
  }

}
