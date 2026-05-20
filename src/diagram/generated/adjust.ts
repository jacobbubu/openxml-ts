// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.Adjust

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Shape Adjust.
 *
 * Element: `dgm:adj` */
export class Adjust extends OpenXmlLeafElement {
  override readonly localName = "adj" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;


  /** Adjust Handle Index (:idx) */
  index: UInt32Value | undefined;

  /** Value (:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "idx": this.index = UInt32Value.parse(value); assertNumber(this.index, { min: 1 }, { attribute: ":idx", elementClass: "Adjust" }); return;
      case "val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.index !== undefined) out.push(["idx", this.index.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.index, { attribute: ":idx", elementClass: "Adjust" });
    assertRequired(this.val, { attribute: ":val", elementClass: "Adjust" });
  }
}
