// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.KioskSlideMode

import {
  OpenXmlLeafElement,
  UInt32Value,
} from "../../element/index.js";

/** Kiosk Slide Show Mode.
 *
 * Element: `p:kiosk` */
export class KioskSlideMode extends OpenXmlLeafElement {
  override readonly localName = "kiosk" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Restart Show (:restart) */
  restart: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "restart": this.restart = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.restart !== undefined) out.push(["restart", this.restart.toString()]);
    return out;
  }

}
