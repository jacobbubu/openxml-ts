// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.WebPublishObject

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Web Publishing Object.
 *
 * Element: `x:webPublishObject` */
export class WebPublishObject extends OpenXmlLeafElement {
  override readonly localName = "webPublishObject" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Id (:id) */
  id: UInt32Value | undefined;

  /** Div Id (:divId) */
  divId: StringValue | undefined;

  /** Source Object (:sourceObject) */
  sourceObject: StringValue | undefined;

  /** Destination File (:destinationFile) */
  destinationFile: StringValue | undefined;

  /** Title (:title) */
  title: StringValue | undefined;

  /** Auto Republish (:autoRepublish) */
  autoRepublish: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); return;
      case "divId": this.divId = StringValue.parse(value); return;
      case "sourceObject": this.sourceObject = StringValue.parse(value); return;
      case "destinationFile": this.destinationFile = StringValue.parse(value); return;
      case "title": this.title = StringValue.parse(value); return;
      case "autoRepublish": this.autoRepublish = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.divId !== undefined) out.push(["divId", this.divId.toString()]);
    if (this.sourceObject !== undefined) out.push(["sourceObject", this.sourceObject.toString()]);
    if (this.destinationFile !== undefined) out.push(["destinationFile", this.destinationFile.toString()]);
    if (this.title !== undefined) out.push(["title", this.title.toString()]);
    if (this.autoRepublish !== undefined) out.push(["autoRepublish", this.autoRepublish.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "WebPublishObject" });
    assertRequired(this.divId, { attribute: ":divId", elementClass: "WebPublishObject" });
    assertRequired(this.destinationFile, { attribute: ":destinationFile", elementClass: "WebPublishObject" });
  }
}
