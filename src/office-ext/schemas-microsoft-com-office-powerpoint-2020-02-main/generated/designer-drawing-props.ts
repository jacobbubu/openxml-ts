// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2020_02_main.json
// @see DocumentFormat.OpenXml.202002Main.DesignerDrawingProps

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the DesignerDrawingProps Class.
 *
 * Element: `p202:designPr` */
export class DesignerDrawingProps extends OpenXmlCompositeElement {
  override readonly localName = "designPr" as const;
  override readonly prefix = "p202" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2020/02/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** edtDesignElem (:edtDesignElem) */
  edtDesignElem: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "edtDesignElem": this.edtDesignElem = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.edtDesignElem !== undefined) out.push(["edtDesignElem", this.edtDesignElem.toString()]);
    return out;
  }

}
