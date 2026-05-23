// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2022_08_main.json
// @see DocumentFormat.OpenXml.202208Main.TaskDetails

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the TaskDetails Class.
 *
 * Element: `p228:taskDetails` */
export class TaskDetails extends OpenXmlCompositeElement {
  override readonly localName = "taskDetails" as const;
  override readonly prefix = "p228" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2022/08/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** deleted (:deleted) */
  deleted: BooleanValue | undefined;

  /** inactive (:inactive) */
  inactive: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "deleted": this.deleted = BooleanValue.parse(value); return;
      case "inactive": this.inactive = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.deleted !== undefined) out.push(["deleted", this.deleted.toString()]);
    if (this.inactive !== undefined) out.push(["inactive", this.inactive.toString()]);
    return out;
  }

}
