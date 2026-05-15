// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.FrameProperties

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the FrameProperties Class.
 *
 * Element: `w:framePr` */
export class FrameProperties extends OpenXmlLeafElement {
  override readonly localName = "framePr" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Drop Cap Frame (w:dropCap) */
  dropCap: StringValue | undefined;

  /** Drop Cap Vertical Height in Lines (w:lines) */
  lines: Int32Value | undefined;

  /** Frame Width (w:w) */
  width: StringValue | undefined;

  /** Frame Height (w:h) */
  height: UInt32Value | undefined;

  /** Vertical Frame Padding (w:vSpace) */
  verticalSpace: StringValue | undefined;

  /** Horizontal Frame Padding (w:hSpace) */
  horizontalSpace: StringValue | undefined;

  /** Text Wrapping Around Frame (w:wrap) */
  wrap: StringValue | undefined;

  /** Frame Horizontal Positioning Base (w:hAnchor) */
  horizontalPosition: StringValue | undefined;

  /** Frame Vertical Positioning Base (w:vAnchor) */
  verticalPosition: StringValue | undefined;

  /** Absolute Horizontal Position (w:x) */
  x: StringValue | undefined;

  /** Relative Horizontal Position (w:xAlign) */
  xAlign: StringValue | undefined;

  /** Absolute Vertical Position (w:y) */
  y: StringValue | undefined;

  /** Relative Vertical Position (w:yAlign) */
  yAlign: StringValue | undefined;

  /** Frame Height Type (w:hRule) */
  heightType: StringValue | undefined;

  /** Lock Frame Anchor to Paragraph (w:anchorLock) */
  anchorLock: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:dropCap": this.dropCap = StringValue.parse(value); return;
      case "w:lines": this.lines = Int32Value.parse(value); return;
      case "w:w": this.width = StringValue.parse(value); return;
      case "w:h": this.height = UInt32Value.parse(value); return;
      case "w:vSpace": this.verticalSpace = StringValue.parse(value); return;
      case "w:hSpace": this.horizontalSpace = StringValue.parse(value); return;
      case "w:wrap": this.wrap = StringValue.parse(value); return;
      case "w:hAnchor": this.horizontalPosition = StringValue.parse(value); return;
      case "w:vAnchor": this.verticalPosition = StringValue.parse(value); return;
      case "w:x": this.x = StringValue.parse(value); return;
      case "w:xAlign": this.xAlign = StringValue.parse(value); return;
      case "w:y": this.y = StringValue.parse(value); return;
      case "w:yAlign": this.yAlign = StringValue.parse(value); return;
      case "w:hRule": this.heightType = StringValue.parse(value); return;
      case "w:anchorLock": this.anchorLock = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.dropCap !== undefined) out.push(["w:dropCap", this.dropCap.toString()]);
    if (this.lines !== undefined) out.push(["w:lines", this.lines.toString()]);
    if (this.width !== undefined) out.push(["w:w", this.width.toString()]);
    if (this.height !== undefined) out.push(["w:h", this.height.toString()]);
    if (this.verticalSpace !== undefined) out.push(["w:vSpace", this.verticalSpace.toString()]);
    if (this.horizontalSpace !== undefined) out.push(["w:hSpace", this.horizontalSpace.toString()]);
    if (this.wrap !== undefined) out.push(["w:wrap", this.wrap.toString()]);
    if (this.horizontalPosition !== undefined) out.push(["w:hAnchor", this.horizontalPosition.toString()]);
    if (this.verticalPosition !== undefined) out.push(["w:vAnchor", this.verticalPosition.toString()]);
    if (this.x !== undefined) out.push(["w:x", this.x.toString()]);
    if (this.xAlign !== undefined) out.push(["w:xAlign", this.xAlign.toString()]);
    if (this.y !== undefined) out.push(["w:y", this.y.toString()]);
    if (this.yAlign !== undefined) out.push(["w:yAlign", this.yAlign.toString()]);
    if (this.heightType !== undefined) out.push(["w:hRule", this.heightType.toString()]);
    if (this.anchorLock !== undefined) out.push(["w:anchorLock", this.anchorLock.toString()]);
    return out;
  }
}
