// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.CustomXmlAttribute

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
  assertString,
} from "../../element/index.js";

/** Custom XML Attribute.
 *
 * Element: `w:attr` */
export class CustomXmlAttribute extends OpenXmlLeafElement {
  override readonly localName = "attr" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** uri (w:uri) */
  uri: StringValue | undefined;

  /** name (w:name) */
  name: StringValue | undefined;

  /** val (w:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:uri": this.uri = StringValue.parse(value); return;
      case "w:name": this.name = StringValue.parse(value); assertString(this.name, { maxLength: 255 }, { attribute: "w:name", elementClass: "CustomXmlAttribute" }); return;
      case "w:val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uri !== undefined) out.push(["w:uri", this.uri.toString()]);
    if (this.name !== undefined) out.push(["w:name", this.name.toString()]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: "w:name", elementClass: "CustomXmlAttribute" });
    assertRequired(this.val, { attribute: "w:val", elementClass: "CustomXmlAttribute" });
  }
}
