// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Lock

import {
  OpenXmlLeafElement,
  StringValue,
  TrueFalseValue,
} from "../../element/index.js";

/** Defines the Lock Class.
 *
 * Element: `o:lock` */
export class Lock extends OpenXmlLeafElement {
  override readonly localName = "lock" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Position Lock (:position) */
  position: TrueFalseValue | undefined;

  /** Selection Lock (:selection) */
  selection: TrueFalseValue | undefined;

  /** Grouping Lock (:grouping) */
  grouping: TrueFalseValue | undefined;

  /** Ungrouping Lock (:ungrouping) */
  ungrouping: TrueFalseValue | undefined;

  /** Rotation Lock (:rotation) */
  rotation: TrueFalseValue | undefined;

  /** Cropping Lock (:cropping) */
  cropping: TrueFalseValue | undefined;

  /** Vertices Lock (:verticies) */
  verticies: TrueFalseValue | undefined;

  /** Handles Lock (:adjusthandles) */
  adjustHandles: TrueFalseValue | undefined;

  /** Text Lock (:text) */
  textLock: TrueFalseValue | undefined;

  /** Aspect Ratio Lock (:aspectratio) */
  aspectRatio: TrueFalseValue | undefined;

  /** AutoShape Type Lock (:shapetype) */
  shapeType: TrueFalseValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "position": this.position = TrueFalseValue.parse(value); return;
      case "selection": this.selection = TrueFalseValue.parse(value); return;
      case "grouping": this.grouping = TrueFalseValue.parse(value); return;
      case "ungrouping": this.ungrouping = TrueFalseValue.parse(value); return;
      case "rotation": this.rotation = TrueFalseValue.parse(value); return;
      case "cropping": this.cropping = TrueFalseValue.parse(value); return;
      case "verticies": this.verticies = TrueFalseValue.parse(value); return;
      case "adjusthandles": this.adjustHandles = TrueFalseValue.parse(value); return;
      case "text": this.textLock = TrueFalseValue.parse(value); return;
      case "aspectratio": this.aspectRatio = TrueFalseValue.parse(value); return;
      case "shapetype": this.shapeType = TrueFalseValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.position !== undefined) out.push(["position", this.position.toString()]);
    if (this.selection !== undefined) out.push(["selection", this.selection.toString()]);
    if (this.grouping !== undefined) out.push(["grouping", this.grouping.toString()]);
    if (this.ungrouping !== undefined) out.push(["ungrouping", this.ungrouping.toString()]);
    if (this.rotation !== undefined) out.push(["rotation", this.rotation.toString()]);
    if (this.cropping !== undefined) out.push(["cropping", this.cropping.toString()]);
    if (this.verticies !== undefined) out.push(["verticies", this.verticies.toString()]);
    if (this.adjustHandles !== undefined) out.push(["adjusthandles", this.adjustHandles.toString()]);
    if (this.textLock !== undefined) out.push(["text", this.textLock.toString()]);
    if (this.aspectRatio !== undefined) out.push(["aspectratio", this.aspectRatio.toString()]);
    if (this.shapeType !== undefined) out.push(["shapetype", this.shapeType.toString()]);
    return out;
  }

}
