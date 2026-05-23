// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.SourceProperty

import {
  DecimalValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the SourceProperty Class.
 *
 * Element: `inkml:srcProperty` */
export class SourceProperty extends OpenXmlLeafElement {
  override readonly localName = "srcProperty" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;


  /** name (:name) */
  name: StringValue | undefined;

  /** value (:value) */
  value: DecimalValue | undefined;

  /** units (:units) */
  units: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "value": this.value = DecimalValue.parse(value); return;
      case "units": this.units = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.value !== undefined) out.push(["value", this.value.toString()]);
    if (this.units !== undefined) out.push(["units", this.units.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "SourceProperty" });
    assertRequired(this.value, { attribute: ":value", elementClass: "SourceProperty" });
  }
}
