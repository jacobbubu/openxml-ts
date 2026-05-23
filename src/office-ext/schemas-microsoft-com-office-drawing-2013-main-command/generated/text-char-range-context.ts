// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.TextCharRangeContext

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the TextCharRangeContext Class.
 *
 * Element: `oac:context` */
export class TextCharRangeContext extends OpenXmlLeafElement {
  override readonly localName = "context" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;


  /** len (:len) */
  len: UInt32Value | undefined;

  /** hash (:hash) */
  hash: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "len": this.len = UInt32Value.parse(value); return;
      case "hash": this.hash = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.len !== undefined) out.push(["len", this.len.toString()]);
    if (this.hash !== undefined) out.push(["hash", this.hash.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.hash, { attribute: ":hash", elementClass: "TextCharRangeContext" });
  }
}
