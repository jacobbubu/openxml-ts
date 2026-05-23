// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.ImgLink

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ImgLink Class.
 *
 * Element: `oac:imgLink` */
export class ImgLink extends OpenXmlLeafElement {
  override readonly localName = "imgLink" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;


  /** tgt (:tgt) */
  tgt: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "tgt": this.tgt = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.tgt !== undefined) out.push(["tgt", this.tgt.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.tgt, { attribute: ":tgt", elementClass: "ImgLink" });
  }
}
