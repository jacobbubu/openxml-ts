// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.Latency

import {
  DecimalValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Latency Class.
 *
 * Element: `inkml:latency` */
export class Latency extends OpenXmlLeafElement {
  override readonly localName = "latency" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;


  /** value (:value) */
  value: DecimalValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "value": this.value = DecimalValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.value !== undefined) out.push(["value", this.value.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.value, { attribute: ":value", elementClass: "Latency" });
  }
}
