// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.ForegroundMark

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the ForegroundMark Class.
 *
 * Element: `a14:foregroundMark` */
export class ForegroundMark extends OpenXmlLeafElement {
  override readonly localName = "foregroundMark" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** x1 (:x1) */
  firstXCoordinate: Int32Value | undefined;

  /** y1 (:y1) */
  firstYCoordinate: Int32Value | undefined;

  /** x2 (:x2) */
  secondXCoordinate: Int32Value | undefined;

  /** y2 (:y2) */
  secondYCoordinate: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "x1": this.firstXCoordinate = Int32Value.parse(value); assertNumber(this.firstXCoordinate, { min: 0, max: 100000 }, { attribute: ":x1", elementClass: "ForegroundMark" }); return;
      case "y1": this.firstYCoordinate = Int32Value.parse(value); assertNumber(this.firstYCoordinate, { min: 0, max: 100000 }, { attribute: ":y1", elementClass: "ForegroundMark" }); return;
      case "x2": this.secondXCoordinate = Int32Value.parse(value); assertNumber(this.secondXCoordinate, { min: 0, max: 100000 }, { attribute: ":x2", elementClass: "ForegroundMark" }); return;
      case "y2": this.secondYCoordinate = Int32Value.parse(value); assertNumber(this.secondYCoordinate, { min: 0, max: 100000 }, { attribute: ":y2", elementClass: "ForegroundMark" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.firstXCoordinate !== undefined) out.push(["x1", this.firstXCoordinate.toString()]);
    if (this.firstYCoordinate !== undefined) out.push(["y1", this.firstYCoordinate.toString()]);
    if (this.secondXCoordinate !== undefined) out.push(["x2", this.secondXCoordinate.toString()]);
    if (this.secondYCoordinate !== undefined) out.push(["y2", this.secondYCoordinate.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.firstXCoordinate, { attribute: ":x1", elementClass: "ForegroundMark" });
    assertRequired(this.firstYCoordinate, { attribute: ":y1", elementClass: "ForegroundMark" });
    assertRequired(this.secondXCoordinate, { attribute: ":x2", elementClass: "ForegroundMark" });
    assertRequired(this.secondYCoordinate, { attribute: ":y2", elementClass: "ForegroundMark" });
  }
}
