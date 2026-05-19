// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.SlideRange

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Slide Range.
 *
 * Element: `p:sldRg` */
export class SlideRange extends OpenXmlLeafElement {
  override readonly localName = "sldRg" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Start (:st) */
  start: UInt32Value | undefined;

  /** End (:end) */
  end: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "st": this.start = UInt32Value.parse(value); return;
      case "end": this.end = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.start !== undefined) out.push(["st", this.start.toString()]);
    if (this.end !== undefined) out.push(["end", this.end.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.start, { attribute: ":st", elementClass: "SlideRange" });
    assertRequired(this.end, { attribute: ":end", elementClass: "SlideRange" });
  }
}
