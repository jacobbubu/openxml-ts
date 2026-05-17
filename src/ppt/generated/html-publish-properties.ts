// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.HtmlPublishProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** HTML Publishing Properties.
 *
 * Element: `p:htmlPubPr` */
export class HtmlPublishProperties extends OpenXmlCompositeElement {
  override readonly localName = "htmlPubPr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Show Speaker Notes (:showSpeakerNotes) */
  showSpeakerNotes: BooleanValue | undefined;

  /** Browser Support Target (:pubBrowser) */
  targetBrowser: StringValue | undefined;

  /** Publish Path (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":showSpeakerNotes": this.showSpeakerNotes = BooleanValue.parse(value); return;
      case ":pubBrowser": this.targetBrowser = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.showSpeakerNotes !== undefined) out.push([":showSpeakerNotes", this.showSpeakerNotes.toString()]);
    if (this.targetBrowser !== undefined) out.push([":pubBrowser", this.targetBrowser.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "r:id", elementClass: "HtmlPublishProperties" });
  }
}
