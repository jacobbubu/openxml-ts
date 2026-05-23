// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2018_animation_model3d.json
// @see DocumentFormat.OpenXml.2018AnimationModel3d.AnimationProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the AnimationProperties Class.
 *
 * Element: `a3danim:animPr` */
export class AnimationProperties extends OpenXmlCompositeElement {
  override readonly localName = "animPr" as const;
  override readonly prefix = "a3danim" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2018/animation/model3d" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** length (:length) */
  length: StringValue | undefined;

  /** count (:count) */
  count: StringValue | undefined;

  /** auto (:auto) */
  auto: BooleanValue | undefined;

  /** offset (:offset) */
  offset: StringValue | undefined;

  /** st (:st) */
  st: StringValue | undefined;

  /** end (:end) */
  end: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "length": this.length = StringValue.parse(value); return;
      case "count": this.count = StringValue.parse(value); return;
      case "auto": this.auto = BooleanValue.parse(value); return;
      case "offset": this.offset = StringValue.parse(value); return;
      case "st": this.st = StringValue.parse(value); return;
      case "end": this.end = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.length !== undefined) out.push(["length", this.length.toString()]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    if (this.auto !== undefined) out.push(["auto", this.auto.toString()]);
    if (this.offset !== undefined) out.push(["offset", this.offset.toString()]);
    if (this.st !== undefined) out.push(["st", this.st.toString()]);
    if (this.end !== undefined) out.push(["end", this.end.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.length, { attribute: ":length", elementClass: "AnimationProperties" });
  }
}
