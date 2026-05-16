// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CellStyle

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Cell Style.
 *
 * Element: `x:cellStyle` */
export class CellStyle extends OpenXmlCompositeElement {
  override readonly localName = "cellStyle" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** User Defined Cell Style (:name) */
  name: StringValue | undefined;

  /** Format Id (:xfId) */
  formatId: UInt32Value | undefined;

  /** Built-In Style Id (:builtinId) */
  builtinId: UInt32Value | undefined;

  /** Outline Style (:iLevel) */
  outlineLevel: UInt32Value | undefined;

  /** Hidden Style (:hidden) */
  hidden: BooleanValue | undefined;

  /** Custom Built In (:customBuiltin) */
  customBuiltin: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":name": this.name = StringValue.parse(value); return;
      case ":xfId": this.formatId = UInt32Value.parse(value); return;
      case ":builtinId": this.builtinId = UInt32Value.parse(value); return;
      case ":iLevel": this.outlineLevel = UInt32Value.parse(value); return;
      case ":hidden": this.hidden = BooleanValue.parse(value); return;
      case ":customBuiltin": this.customBuiltin = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.formatId !== undefined) out.push([":xfId", this.formatId.toString()]);
    if (this.builtinId !== undefined) out.push([":builtinId", this.builtinId.toString()]);
    if (this.outlineLevel !== undefined) out.push([":iLevel", this.outlineLevel.toString()]);
    if (this.hidden !== undefined) out.push([":hidden", this.hidden.toString()]);
    if (this.customBuiltin !== undefined) out.push([":customBuiltin", this.customBuiltin.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.formatId, { attribute: ":xfId", elementClass: "CellStyle" });
  }
}
