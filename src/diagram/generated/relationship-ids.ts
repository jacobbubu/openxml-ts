// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.RelationshipIds

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Explicit Relationships to Diagram Parts.
 *
 * Element: `dgm:relIds` */
export class RelationshipIds extends OpenXmlLeafElement {
  override readonly localName = "relIds" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;


  /** Explicit Relationship to Diagram Data Part (r:dm) */
  dataPart: StringValue | undefined;

  /** Explicit Relationship to Diagram Layout Definition Part (r:lo) */
  layoutPart: StringValue | undefined;

  /** Explicit Relationship to Style Definition Part (r:qs) */
  stylePart: StringValue | undefined;

  /** Explicit Relationship to Diagram Colors Part (r:cs) */
  colorPart: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:dm": this.dataPart = StringValue.parse(value); return;
      case "r:lo": this.layoutPart = StringValue.parse(value); return;
      case "r:qs": this.stylePart = StringValue.parse(value); return;
      case "r:cs": this.colorPart = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.dataPart !== undefined) out.push(["r:dm", this.dataPart.toString()]);
    if (this.layoutPart !== undefined) out.push(["r:lo", this.layoutPart.toString()]);
    if (this.stylePart !== undefined) out.push(["r:qs", this.stylePart.toString()]);
    if (this.colorPart !== undefined) out.push(["r:cs", this.colorPart.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.dataPart, { attribute: "r:dm", elementClass: "RelationshipIds" });
    assertRequired(this.layoutPart, { attribute: "r:lo", elementClass: "RelationshipIds" });
    assertRequired(this.stylePart, { attribute: "r:qs", elementClass: "RelationshipIds" });
    assertRequired(this.colorPart, { attribute: "r:cs", elementClass: "RelationshipIds" });
  }
}
