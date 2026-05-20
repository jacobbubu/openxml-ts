// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2010_main.json
// @see DocumentFormat.OpenXml.Ppt2010.TracePoint

import {
  Int64Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the TracePoint Class.
 *
 * Element: `p14:tracePt` */
export class TracePoint extends OpenXmlLeafElement {
  override readonly localName = "tracePt" as const;
  override readonly prefix = "p14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2010/main" as const;


  /** t (:t) */
  time: StringValue | undefined;

  /** x (:x) */
  xCoordinate: Int64Value | undefined;

  /** y (:y) */
  yCoordinate: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "t": this.time = StringValue.parse(value); return;
      case "x": this.xCoordinate = Int64Value.parse(value); assertNumber(this.xCoordinate, { min: -27273042329600, max: 27273042316900 }, { attribute: ":x", elementClass: "TracePoint" }); return;
      case "y": this.yCoordinate = Int64Value.parse(value); assertNumber(this.yCoordinate, { min: -27273042329600, max: 27273042316900 }, { attribute: ":y", elementClass: "TracePoint" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.time !== undefined) out.push(["t", this.time.toString()]);
    if (this.xCoordinate !== undefined) out.push(["x", this.xCoordinate.toString()]);
    if (this.yCoordinate !== undefined) out.push(["y", this.yCoordinate.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.time, { attribute: ":t", elementClass: "TracePoint" });
    assertRequired(this.xCoordinate, { attribute: ":x", elementClass: "TracePoint" });
    assertRequired(this.yCoordinate, { attribute: ":y", elementClass: "TracePoint" });
  }
}
