// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_excel.json
// @see DocumentFormat.OpenXml.VmlExcel.ClientData

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Attached Object Data.
 *
 * Element: `xvml:ClientData` */
export class ClientData extends OpenXmlCompositeElement {
  override readonly localName = "ClientData" as const;
  override readonly prefix = "xvml" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:excel" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Object type (:ObjectType) */
  objectType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ObjectType": this.objectType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.objectType !== undefined) out.push(["ObjectType", this.objectType.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.objectType, { attribute: ":ObjectType", elementClass: "ClientData" });
  }
}
