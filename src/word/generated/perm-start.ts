// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.PermStart

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the PermStart Class.
 *
 * Element: `w:permStart` */
export class PermStart extends OpenXmlLeafElement {
  override readonly localName = "permStart" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** edGrp (w:edGrp) */
  editorGroup: StringValue | undefined;

  /** ed (w:ed) */
  ed: StringValue | undefined;

  /** colFirst (w:colFirst) */
  columnFirst: Int32Value | undefined;

  /** colLast (w:colLast) */
  columnLast: Int32Value | undefined;

  /** Annotation ID (w:id) */
  id: Int32Value | undefined;

  /** Annotation Displaced By Custom XML Markup (w:displacedByCustomXml) */
  displacedByCustomXml: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:edGrp": this.editorGroup = StringValue.parse(value); return;
      case "w:ed": this.ed = StringValue.parse(value); return;
      case "w:colFirst": this.columnFirst = Int32Value.parse(value); assertNumber(this.columnFirst, { min: 0 }, { attribute: "w:colFirst", elementClass: "PermStart" }); return;
      case "w:colLast": this.columnLast = Int32Value.parse(value); assertNumber(this.columnLast, { min: 0 }, { attribute: "w:colLast", elementClass: "PermStart" }); return;
      case "w:id": this.id = Int32Value.parse(value); return;
      case "w:displacedByCustomXml": this.displacedByCustomXml = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.editorGroup !== undefined) out.push(["w:edGrp", this.editorGroup.toString()]);
    if (this.ed !== undefined) out.push(["w:ed", this.ed.toString()]);
    if (this.columnFirst !== undefined) out.push(["w:colFirst", this.columnFirst.toString()]);
    if (this.columnLast !== undefined) out.push(["w:colLast", this.columnLast.toString()]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    if (this.displacedByCustomXml !== undefined) out.push(["w:displacedByCustomXml", this.displacedByCustomXml.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "w:id", elementClass: "PermStart" });
  }
}
