// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.PlaceholderShape

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Placeholder Shape.
 *
 * Element: `p:ph` */
export class PlaceholderShape extends OpenXmlCompositeElement {
  override readonly localName = "ph" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** type (:type) */
  type: StringValue | undefined;

  /** orient (:orient) */
  orientation: StringValue | undefined;

  /** sz (:sz) */
  size: StringValue | undefined;

  /** idx (:idx) */
  index: UInt32Value | undefined;

  /** hasCustomPrompt (:hasCustomPrompt) */
  hasCustomPrompt: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":type": this.type = StringValue.parse(value); return;
      case ":orient": this.orientation = StringValue.parse(value); return;
      case ":sz": this.size = StringValue.parse(value); return;
      case ":idx": this.index = UInt32Value.parse(value); return;
      case ":hasCustomPrompt": this.hasCustomPrompt = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push([":type", this.type.toString()]);
    if (this.orientation !== undefined) out.push([":orient", this.orientation.toString()]);
    if (this.size !== undefined) out.push([":sz", this.size.toString()]);
    if (this.index !== undefined) out.push([":idx", this.index.toString()]);
    if (this.hasCustomPrompt !== undefined) out.push([":hasCustomPrompt", this.hasCustomPrompt.toString()]);
    return out;
  }

}
