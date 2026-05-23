// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2021_scriptlink.json
// @see DocumentFormat.OpenXml.Drawing2021Scriptlink.ScriptLink

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the ScriptLink Class.
 *
 * Element: `asl:scriptLink` */
export class ScriptLink extends OpenXmlCompositeElement {
  override readonly localName = "scriptLink" as const;
  override readonly prefix = "asl" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2021/scriptlink" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** val (:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

}
