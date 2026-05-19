// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.SlideSyncProperties

import {
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Slide Synchronization Properties.
 *
 * Element: `p:sldSyncPr` */
export class SlideSyncProperties extends OpenXmlCompositeElement {
  override readonly localName = "sldSyncPr" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Server's Slide File ID (:serverSldId) */
  serverSlideId: StringValue | undefined;

  /** Server's Slide File's modification date/time (:serverSldModifiedTime) */
  serverSlideModifiedTime: DateTimeValue | undefined;

  /** Client Slide Insertion date/time (:clientInsertedTime) */
  clientInsertedTime: DateTimeValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "serverSldId": this.serverSlideId = StringValue.parse(value); return;
      case "serverSldModifiedTime": this.serverSlideModifiedTime = DateTimeValue.parse(value); return;
      case "clientInsertedTime": this.clientInsertedTime = DateTimeValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.serverSlideId !== undefined) out.push(["serverSldId", this.serverSlideId.toString()]);
    if (this.serverSlideModifiedTime !== undefined) out.push(["serverSldModifiedTime", this.serverSlideModifiedTime.toString()]);
    if (this.clientInsertedTime !== undefined) out.push(["clientInsertedTime", this.clientInsertedTime.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.serverSlideId, { attribute: ":serverSldId", elementClass: "SlideSyncProperties" });
    assertRequired(this.serverSlideModifiedTime, { attribute: ":serverSldModifiedTime", elementClass: "SlideSyncProperties" });
    assertRequired(this.clientInsertedTime, { attribute: ":clientInsertedTime", elementClass: "SlideSyncProperties" });
  }
}
