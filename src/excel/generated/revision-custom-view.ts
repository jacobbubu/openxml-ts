// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionCustomView

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Revision Custom View.
 *
 * Element: `x:rcv` */
export class RevisionCustomView extends OpenXmlLeafElement {
  override readonly localName = "rcv" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** GUID (:guid) */
  guid: StringValue | undefined;

  /** User Action (:action) */
  action: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":guid": this.guid = StringValue.parse(value); return;
      case ":action": this.action = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.guid !== undefined) out.push([":guid", this.guid.toString()]);
    if (this.action !== undefined) out.push([":action", this.action.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.guid, { attribute: ":guid", elementClass: "RevisionCustomView" });
    assertRequired(this.action, { attribute: ":action", elementClass: "RevisionCustomView" });
  }
}
