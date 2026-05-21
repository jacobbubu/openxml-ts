// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_04_emma.json
// @see DocumentFormat.OpenXml.200304Emma.DerivedFrom

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the DerivedFrom Class.
 *
 * Element: `emma:derived-from` */
export class DerivedFrom extends OpenXmlLeafElement {
  override readonly localName = "derived-from" as const;
  override readonly prefix = "emma" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/04/emma" as const;


  /** resource (:resource) */
  resource: StringValue | undefined;

  /** composite (:composite) */
  composite: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "resource": this.resource = StringValue.parse(value); return;
      case "composite": this.composite = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.resource !== undefined) out.push(["resource", this.resource.toString()]);
    if (this.composite !== undefined) out.push(["composite", this.composite.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.resource, { attribute: ":resource", elementClass: "DerivedFrom" });
  }
}
