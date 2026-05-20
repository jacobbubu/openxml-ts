// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_compatibility.json
// @see DocumentFormat.OpenXml.DrawingCompatibility.LegacyDrawing

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Legacy Drawing Object.
 *
 * Element: `comp:legacyDrawing` */
export class LegacyDrawing extends OpenXmlLeafElement {
  override readonly localName = "legacyDrawing" as const;
  override readonly prefix = "comp" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/compatibility" as const;


  /** Shape ID (:spid) */
  shapeId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "spid": this.shapeId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.shapeId !== undefined) out.push(["spid", this.shapeId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.shapeId, { attribute: ":spid", elementClass: "LegacyDrawing" });
  }
}
