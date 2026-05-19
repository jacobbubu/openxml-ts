// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.SequenceTimeNode

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Sequence Time Node.
 *
 * Element: `p:seq` */
export class SequenceTimeNode extends OpenXmlCompositeElement {
  override readonly localName = "seq" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Concurrent (:concurrent) */
  concurrent: BooleanValue | undefined;

  /** Previous Action (:prevAc) */
  previousAction: StringValue | undefined;

  /** Next Action (:nextAc) */
  nextAction: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "concurrent": this.concurrent = BooleanValue.parse(value); return;
      case "prevAc": this.previousAction = StringValue.parse(value); return;
      case "nextAc": this.nextAction = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.concurrent !== undefined) out.push(["concurrent", this.concurrent.toString()]);
    if (this.previousAction !== undefined) out.push(["prevAc", this.previousAction.toString()]);
    if (this.nextAction !== undefined) out.push(["nextAc", this.nextAction.toString()]);
    return out;
  }

}
