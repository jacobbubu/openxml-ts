// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.NormalViewProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Normal View Properties.
 *
 * Element: `p:normalViewPr` */
export class NormalViewProperties extends OpenXmlCompositeElement {
  override readonly localName = "normalViewPr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Show Outline Icons in Normal View (:showOutlineIcons) */
  showOutlineIcons: BooleanValue | undefined;

  /** Snap Vertical Splitter (:snapVertSplitter) */
  snapVerticalSplitter: BooleanValue | undefined;

  /** State of the Vertical Splitter Bar (:vertBarState) */
  verticalBarState: StringValue | undefined;

  /** State of the Horizontal Splitter Bar (:horzBarState) */
  horizontalBarState: StringValue | undefined;

  /** Prefer Single View (:preferSingleView) */
  preferSingleView: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":showOutlineIcons": this.showOutlineIcons = BooleanValue.parse(value); return;
      case ":snapVertSplitter": this.snapVerticalSplitter = BooleanValue.parse(value); return;
      case ":vertBarState": this.verticalBarState = StringValue.parse(value); return;
      case ":horzBarState": this.horizontalBarState = StringValue.parse(value); return;
      case ":preferSingleView": this.preferSingleView = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.showOutlineIcons !== undefined) out.push([":showOutlineIcons", this.showOutlineIcons.toString()]);
    if (this.snapVerticalSplitter !== undefined) out.push([":snapVertSplitter", this.snapVerticalSplitter.toString()]);
    if (this.verticalBarState !== undefined) out.push([":vertBarState", this.verticalBarState.toString()]);
    if (this.horizontalBarState !== undefined) out.push([":horzBarState", this.horizontalBarState.toString()]);
    if (this.preferSingleView !== undefined) out.push([":preferSingleView", this.preferSingleView.toString()]);
    return out;
  }

}
