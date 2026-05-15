// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.TabStop

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Custom Tab Stop.
 *
 * Element: `w:tab` */
export class TabStop extends OpenXmlLeafElement {
  override readonly localName = "tab" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Tab Stop Type (w:val) */
  val: StringValue | undefined;

  /** Tab Leader Character (w:leader) */
  leader: StringValue | undefined;

  /** Tab Stop Position (w:pos) */
  position: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:val": this.val = StringValue.parse(value); return;
      case "w:leader": this.leader = StringValue.parse(value); return;
      case "w:pos": this.position = Int32Value.parse(value); assertNumber(this.position, { min: -31680, max: 31680 }, { attribute: "w:pos", elementClass: "TabStop" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    if (this.leader !== undefined) out.push(["w:leader", this.leader.toString()]);
    if (this.position !== undefined) out.push(["w:pos", this.position.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: "w:val", elementClass: "TabStop" });
    assertRequired(this.position, { attribute: "w:pos", elementClass: "TabStop" });
  }
}
