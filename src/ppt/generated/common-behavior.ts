// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.CommonBehavior

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the CommonBehavior Class.
 *
 * Element: `p:cBhvr` */
export class CommonBehavior extends OpenXmlCompositeElement {
  override readonly localName = "cBhvr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Additive (:additive) */
  additive: StringValue | undefined;

  /** Accumulate (:accumulate) */
  accumulate: StringValue | undefined;

  /** Transform Type (:xfrmType) */
  transformType: StringValue | undefined;

  /** From (:from) */
  from: StringValue | undefined;

  /** To (:to) */
  to: StringValue | undefined;

  /** By (:by) */
  by: StringValue | undefined;

  /** Runtime Context (:rctx) */
  runtimeContext: StringValue | undefined;

  /** Override (:override) */
  override: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":additive": this.additive = StringValue.parse(value); return;
      case ":accumulate": this.accumulate = StringValue.parse(value); return;
      case ":xfrmType": this.transformType = StringValue.parse(value); return;
      case ":from": this.from = StringValue.parse(value); return;
      case ":to": this.to = StringValue.parse(value); return;
      case ":by": this.by = StringValue.parse(value); return;
      case ":rctx": this.runtimeContext = StringValue.parse(value); return;
      case ":override": this.override = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.additive !== undefined) out.push([":additive", this.additive.toString()]);
    if (this.accumulate !== undefined) out.push([":accumulate", this.accumulate.toString()]);
    if (this.transformType !== undefined) out.push([":xfrmType", this.transformType.toString()]);
    if (this.from !== undefined) out.push([":from", this.from.toString()]);
    if (this.to !== undefined) out.push([":to", this.to.toString()]);
    if (this.by !== undefined) out.push([":by", this.by.toString()]);
    if (this.runtimeContext !== undefined) out.push([":rctx", this.runtimeContext.toString()]);
    if (this.override !== undefined) out.push([":override", this.override.toString()]);
    return out;
  }

}
