// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.WebPublishItem

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Web Publishing Item.
 *
 * Element: `x:webPublishItem` */
export class WebPublishItem extends OpenXmlLeafElement {
  override readonly localName = "webPublishItem" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Id (:id) */
  id: UInt32Value | undefined;

  /** Destination Bookmark (:divId) */
  divId: StringValue | undefined;

  /** Web Source Type (:sourceType) */
  sourceType: StringValue | undefined;

  /** Source Id (:sourceRef) */
  sourceRef: StringValue | undefined;

  /** Source Object Name (:sourceObject) */
  sourceObject: StringValue | undefined;

  /** Destination File Name (:destinationFile) */
  destinationFile: StringValue | undefined;

  /** Title (:title) */
  title: StringValue | undefined;

  /** Automatically Publish (:autoRepublish) */
  autoRepublish: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":id": this.id = UInt32Value.parse(value); return;
      case ":divId": this.divId = StringValue.parse(value); return;
      case ":sourceType": this.sourceType = StringValue.parse(value); return;
      case ":sourceRef": this.sourceRef = StringValue.parse(value); return;
      case ":sourceObject": this.sourceObject = StringValue.parse(value); return;
      case ":destinationFile": this.destinationFile = StringValue.parse(value); return;
      case ":title": this.title = StringValue.parse(value); return;
      case ":autoRepublish": this.autoRepublish = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push([":id", this.id.toString()]);
    if (this.divId !== undefined) out.push([":divId", this.divId.toString()]);
    if (this.sourceType !== undefined) out.push([":sourceType", this.sourceType.toString()]);
    if (this.sourceRef !== undefined) out.push([":sourceRef", this.sourceRef.toString()]);
    if (this.sourceObject !== undefined) out.push([":sourceObject", this.sourceObject.toString()]);
    if (this.destinationFile !== undefined) out.push([":destinationFile", this.destinationFile.toString()]);
    if (this.title !== undefined) out.push([":title", this.title.toString()]);
    if (this.autoRepublish !== undefined) out.push([":autoRepublish", this.autoRepublish.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "WebPublishItem" });
    assertRequired(this.divId, { attribute: ":divId", elementClass: "WebPublishItem" });
    assertRequired(this.sourceType, { attribute: ":sourceType", elementClass: "WebPublishItem" });
    assertRequired(this.destinationFile, { attribute: ":destinationFile", elementClass: "WebPublishItem" });
  }
}
