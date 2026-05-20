// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.Fill

import {
  DecimalValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the Fill Class.
 *
 * Element: `v:fill` */
export class Fill extends OpenXmlCompositeElement {
  override readonly localName = "fill" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Unique Identifier (:id) */
  id: StringValue | undefined;

  /** Fill Type (:type) */
  type: StringValue | undefined;

  /** Fill Toggle (:on) */
  on: StringValue | undefined;

  /** Primary Color (:color) */
  color: StringValue | undefined;

  /** Primary Color Opacity (:opacity) */
  opacity: StringValue | undefined;

  /** Secondary Color (:color2) */
  color2: StringValue | undefined;

  /** Fill Image Source (:src) */
  source: StringValue | undefined;

  /** Hyperlink Target (o:href) */
  href: StringValue | undefined;

  /** Alternate Image Reference Location (o:althref) */
  alternateImageReference: StringValue | undefined;

  /** Fill Image Size (:size) */
  size: StringValue | undefined;

  /** Fill Image Origin (:origin) */
  origin: StringValue | undefined;

  /** Fill Image Position (:position) */
  position: StringValue | undefined;

  /** Image Aspect Ratio (:aspect) */
  aspect: StringValue | undefined;

  /** Intermediate Colors (:colors) */
  colors: StringValue | undefined;

  /** Gradient Angle (:angle) */
  angle: DecimalValue | undefined;

  /** Align Image With Shape (:alignshape) */
  alignShape: StringValue | undefined;

  /** Gradient Center (:focus) */
  focus: StringValue | undefined;

  /** Radial Gradient Size (:focussize) */
  focusSize: StringValue | undefined;

  /** Radial Gradient Center (:focusposition) */
  focusPosition: StringValue | undefined;

  /** Gradient Fill Method (:method) */
  method: StringValue | undefined;

  /** Detect Mouse Click (o:detectmouseclick) */
  detectMouseClick: StringValue | undefined;

  /** Title (o:title) */
  title: StringValue | undefined;

  /** Secondary Color Opacity (o:opacity2) */
  opacity2: StringValue | undefined;

  /** Recolor Fill as Picture (:recolor) */
  recolor: StringValue | undefined;

  /** Rotate Fill with Shape (:rotate) */
  rotate: StringValue | undefined;

  /** Relationship to Part (r:id) */
  relationshipId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "on": this.on = StringValue.parse(value); return;
      case "color": this.color = StringValue.parse(value); return;
      case "opacity": this.opacity = StringValue.parse(value); return;
      case "color2": this.color2 = StringValue.parse(value); return;
      case "src": this.source = StringValue.parse(value); return;
      case "o:href": this.href = StringValue.parse(value); return;
      case "o:althref": this.alternateImageReference = StringValue.parse(value); return;
      case "size": this.size = StringValue.parse(value); return;
      case "origin": this.origin = StringValue.parse(value); return;
      case "position": this.position = StringValue.parse(value); return;
      case "aspect": this.aspect = StringValue.parse(value); return;
      case "colors": this.colors = StringValue.parse(value); return;
      case "angle": this.angle = DecimalValue.parse(value); return;
      case "alignshape": this.alignShape = StringValue.parse(value); return;
      case "focus": this.focus = StringValue.parse(value); return;
      case "focussize": this.focusSize = StringValue.parse(value); return;
      case "focusposition": this.focusPosition = StringValue.parse(value); return;
      case "method": this.method = StringValue.parse(value); return;
      case "o:detectmouseclick": this.detectMouseClick = StringValue.parse(value); return;
      case "o:title": this.title = StringValue.parse(value); return;
      case "o:opacity2": this.opacity2 = StringValue.parse(value); return;
      case "recolor": this.recolor = StringValue.parse(value); return;
      case "rotate": this.rotate = StringValue.parse(value); return;
      case "r:id": this.relationshipId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.on !== undefined) out.push(["on", this.on.toString()]);
    if (this.color !== undefined) out.push(["color", this.color.toString()]);
    if (this.opacity !== undefined) out.push(["opacity", this.opacity.toString()]);
    if (this.color2 !== undefined) out.push(["color2", this.color2.toString()]);
    if (this.source !== undefined) out.push(["src", this.source.toString()]);
    if (this.href !== undefined) out.push(["o:href", this.href.toString()]);
    if (this.alternateImageReference !== undefined) out.push(["o:althref", this.alternateImageReference.toString()]);
    if (this.size !== undefined) out.push(["size", this.size.toString()]);
    if (this.origin !== undefined) out.push(["origin", this.origin.toString()]);
    if (this.position !== undefined) out.push(["position", this.position.toString()]);
    if (this.aspect !== undefined) out.push(["aspect", this.aspect.toString()]);
    if (this.colors !== undefined) out.push(["colors", this.colors.toString()]);
    if (this.angle !== undefined) out.push(["angle", this.angle.toString()]);
    if (this.alignShape !== undefined) out.push(["alignshape", this.alignShape.toString()]);
    if (this.focus !== undefined) out.push(["focus", this.focus.toString()]);
    if (this.focusSize !== undefined) out.push(["focussize", this.focusSize.toString()]);
    if (this.focusPosition !== undefined) out.push(["focusposition", this.focusPosition.toString()]);
    if (this.method !== undefined) out.push(["method", this.method.toString()]);
    if (this.detectMouseClick !== undefined) out.push(["o:detectmouseclick", this.detectMouseClick.toString()]);
    if (this.title !== undefined) out.push(["o:title", this.title.toString()]);
    if (this.opacity2 !== undefined) out.push(["o:opacity2", this.opacity2.toString()]);
    if (this.recolor !== undefined) out.push(["recolor", this.recolor.toString()]);
    if (this.rotate !== undefined) out.push(["rotate", this.rotate.toString()]);
    if (this.relationshipId !== undefined) out.push(["r:id", this.relationshipId.toString()]);
    return out;
  }

}
