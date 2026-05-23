// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2022_03_main.json
// @see DocumentFormat.OpenXml.202203Main.ReactionInstance

import {
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ReactionInstance Class.
 *
 * Element: `p223:instance` */
export class ReactionInstance extends OpenXmlCompositeElement {
  override readonly localName = "instance" as const;
  override readonly prefix = "p223" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2022/03/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** time (:time) */
  time: DateTimeValue | undefined;

  /** authorId (:authorId) */
  authorId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "time": this.time = DateTimeValue.parse(value); return;
      case "authorId": this.authorId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.time !== undefined) out.push(["time", this.time.toString()]);
    if (this.authorId !== undefined) out.push(["authorId", this.authorId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.time, { attribute: ":time", elementClass: "ReactionInstance" });
    assertRequired(this.authorId, { attribute: ":authorId", elementClass: "ReactionInstance" });
  }
}
