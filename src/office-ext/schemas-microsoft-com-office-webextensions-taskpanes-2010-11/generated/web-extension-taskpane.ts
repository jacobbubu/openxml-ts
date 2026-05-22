// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_webextensions_taskpanes_2010_11.json
// @see DocumentFormat.OpenXml.Taskpanes201011.WebExtensionTaskpane

import {
  BooleanValue,
  DoubleValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the WebExtensionTaskpane Class.
 *
 * Element: `wetp:taskpane` */
export class WebExtensionTaskpane extends OpenXmlCompositeElement {
  override readonly localName = "taskpane" as const;
  override readonly prefix = "wetp" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** dockstate (:dockstate) */
  dockState: StringValue | undefined;

  /** visibility (:visibility) */
  visibility: BooleanValue | undefined;

  /** width (:width) */
  width: DoubleValue | undefined;

  /** locked (:locked) */
  locked: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "dockstate": this.dockState = StringValue.parse(value); return;
      case "visibility": this.visibility = BooleanValue.parse(value); return;
      case "width": this.width = DoubleValue.parse(value); return;
      case "locked": this.locked = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.dockState !== undefined) out.push(["dockstate", this.dockState.toString()]);
    if (this.visibility !== undefined) out.push(["visibility", this.visibility.toString()]);
    if (this.width !== undefined) out.push(["width", this.width.toString()]);
    if (this.locked !== undefined) out.push(["locked", this.locked.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.dockState, { attribute: ":dockstate", elementClass: "WebExtensionTaskpane" });
    assertRequired(this.visibility, { attribute: ":visibility", elementClass: "WebExtensionTaskpane" });
    assertRequired(this.width, { attribute: ":width", elementClass: "WebExtensionTaskpane" });
  }
}
