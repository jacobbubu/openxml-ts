// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2016_11_diagram.json
// @see DocumentFormat.OpenXml.201611Diagram.DiagramAutoBullet

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the DiagramAutoBullet Class.
 *
 * Element: `dgm1611:buPr` */
export class DiagramAutoBullet extends OpenXmlCompositeElement {
  override readonly localName = "buPr" as const;
  override readonly prefix = "dgm1611" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2016/11/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** prefix (:prefix) */
  autoBulletPrefix: StringValue | undefined;

  /** leadZeros (:leadZeros) */
  leadZeros: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "prefix": this.autoBulletPrefix = StringValue.parse(value); return;
      case "leadZeros": this.leadZeros = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.autoBulletPrefix !== undefined) out.push(["prefix", this.autoBulletPrefix.toString()]);
    if (this.leadZeros !== undefined) out.push(["leadZeros", this.leadZeros.toString()]);
    return out;
  }

}
