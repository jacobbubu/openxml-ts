// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.BrowseSlideMode

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Browse Slide Show Mode.
 *
 * Element: `p:browse` */
export class BrowseSlideMode extends OpenXmlLeafElement {
  override readonly localName = "browse" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Show Scroll Bar in Window (:showScrollbar) */
  showScrollbar: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "showScrollbar": this.showScrollbar = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.showScrollbar !== undefined) out.push(["showScrollbar", this.showScrollbar.toString()]);
    return out;
  }

}
