// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.AutoNumberedBullet

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Auto-Numbered Bullet.
 *
 * Element: `a:buAutoNum` */
export class AutoNumberedBullet extends OpenXmlLeafElement {
  override readonly localName = "buAutoNum" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Bullet Autonumbering Type (:type) */
  type: StringValue | undefined;

  /** Start Numbering At (:startAt) */
  startAt: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":type": this.type = StringValue.parse(value); return;
      case ":startAt": this.startAt = Int32Value.parse(value); assertNumber(this.startAt, { min: 1, max: 32767 }, { attribute: ":startAt", elementClass: "AutoNumberedBullet" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push([":type", this.type.toString()]);
    if (this.startAt !== undefined) out.push([":startAt", this.startAt.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "AutoNumberedBullet" });
  }
}
