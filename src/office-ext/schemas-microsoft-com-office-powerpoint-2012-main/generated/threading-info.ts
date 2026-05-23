// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2012_main.json
// @see DocumentFormat.OpenXml.Powerpoint2012Main.ThreadingInfo

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the ThreadingInfo Class.
 *
 * Element: `p15:threadingInfo` */
export class ThreadingInfo extends OpenXmlCompositeElement {
  override readonly localName = "threadingInfo" as const;
  override readonly prefix = "p15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2012/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** timeZoneBias (:timeZoneBias) */
  timeZoneBias: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "timeZoneBias": this.timeZoneBias = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.timeZoneBias !== undefined) out.push(["timeZoneBias", this.timeZoneBias.toString()]);
    return out;
  }

}
