// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.Curve

import {
  Int32Value,
  IntegerValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  SingleValue,
  StringValue,
  TrueFalseBlankValue,
  TrueFalseValue,
  assertNumber,
} from "../../element/index.js";

/** Bezier Curve.
 *
 * Element: `v:curve` */
export class Curve extends OpenXmlCompositeElement {
  override readonly localName = "curve" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Unique Identifier (:id) */
  id: StringValue | undefined;

  /** Shape Styling Properties (:style) */
  style: StringValue | undefined;

  /** Hyperlink Target (:href) */
  href: StringValue | undefined;

  /** Hyperlink Display Target (:target) */
  target: StringValue | undefined;

  /** CSS Reference (:class) */
  class: StringValue | undefined;

  /** Shape Title (:title) */
  title: StringValue | undefined;

  /** Alternate Text (:alt) */
  alternate: StringValue | undefined;

  /** Coordinate Space Size (:coordsize) */
  coordinateSize: StringValue | undefined;

  /** Coordinate Space Origin (:coordorigin) */
  coordinateOrigin: StringValue | undefined;

  /** Shape Bounding Polygon (:wrapcoords) */
  wrapCoordinates: StringValue | undefined;

  /** Print Toggle (:print) */
  print: TrueFalseValue | undefined;

  /** Optional String (o:spid) */
  optionalString: StringValue | undefined;

  /** Shape Handle Toggle (o:oned) */
  oned: TrueFalseValue | undefined;

  /** Regroup ID (o:regroupid) */
  regroupId: IntegerValue | undefined;

  /** Double-click Notification Toggle (o:doubleclicknotify) */
  doubleClickNotify: TrueFalseValue | undefined;

  /** Button Behavior Toggle (o:button) */
  button: TrueFalseValue | undefined;

  /** Hide Script Anchors (o:userhidden) */
  userHidden: TrueFalseValue | undefined;

  /** Graphical Bullet (o:bullet) */
  bullet: TrueFalseValue | undefined;

  /** Horizontal Rule Toggle (o:hr) */
  horizontal: TrueFalseValue | undefined;

  /** Horizontal Rule Standard Display Toggle (o:hrstd) */
  horizontalStandard: TrueFalseValue | undefined;

  /** Horizontal Rule 3D Shading Toggle (o:hrnoshade) */
  horizontalNoShade: TrueFalseValue | undefined;

  /** Horizontal Rule Length Percentage (o:hrpct) */
  horizontalPercentage: SingleValue | undefined;

  /** Horizontal Rule Alignment (o:hralign) */
  horizontalAlignment: StringValue | undefined;

  /** Allow in Table Cell (o:allowincell) */
  allowInCell: TrueFalseValue | undefined;

  /** Allow Shape Overlap (o:allowoverlap) */
  allowOverlap: TrueFalseValue | undefined;

  /** Exists In Master Slide (o:userdrawn) */
  userDrawn: TrueFalseValue | undefined;

  /** Border Top Color (o:bordertopcolor) */
  borderTopColor: StringValue | undefined;

  /** Border Left Color (o:borderleftcolor) */
  borderLeftColor: StringValue | undefined;

  /** Bottom Border Color (o:borderbottomcolor) */
  borderBottomColor: StringValue | undefined;

  /** Border Right Color (o:borderrightcolor) */
  borderRightColor: StringValue | undefined;

  /** Diagram Node Layout Identifier (o:dgmlayout) */
  diagramLayout: IntegerValue | undefined;

  /** Diagram Node Identifier (o:dgmnodekind) */
  diagramNodeKind: IntegerValue | undefined;

  /** Diagram Node Recent Layout Identifier (o:dgmlayoutmru) */
  diagramLayoutMostRecentUsed: IntegerValue | undefined;

  /** Text Inset Mode (o:insetmode) */
  insetMode: StringValue | undefined;

  /** Shape Fill Toggle (:filled) */
  filled: TrueFalseValue | undefined;

  /** Fill Color (:fillcolor) */
  fillColor: StringValue | undefined;

  /** Shape Stroke Toggle (:stroked) */
  stroked: TrueFalseValue | undefined;

  /** Shape Stroke Color (:strokecolor) */
  strokeColor: StringValue | undefined;

  /** Shape Stroke Weight (:strokeweight) */
  strokeWeight: StringValue | undefined;

  /** Inset Border From Path (:insetpen) */
  insetPen: TrueFalseValue | undefined;

  /** Optional Number (o:spt) */
  optionalNumber: Int32Value | undefined;

  /** Shape Connector Type (o:connectortype) */
  connectorType: StringValue | undefined;

  /** Black-and-White Mode (o:bwmode) */
  blackWhiteMode: StringValue | undefined;

  /** Pure Black-and-White Mode (o:bwpure) */
  pureBlackWhiteMode: StringValue | undefined;

  /** Normal Black-and-White Mode (o:bwnormal) */
  normalBlackWhiteMode: StringValue | undefined;

  /** Force Dashed Outline (o:forcedash) */
  forceDash: TrueFalseValue | undefined;

  /** Embedded Object Icon Toggle (o:oleicon) */
  oleIcon: TrueFalseValue | undefined;

  /** Embedded Object Toggle (o:ole) */
  ole: TrueFalseBlankValue | undefined;

  /** Relative Resize Toggle (o:preferrelative) */
  preferRelative: TrueFalseValue | undefined;

  /** Clip to Wrapping Polygon (o:cliptowrap) */
  clipToWrap: TrueFalseValue | undefined;

  /** Clipping Toggle (o:clip) */
  clip: TrueFalseValue | undefined;

  /** Curve Starting Point (:from) */
  from: StringValue | undefined;

  /** First Curve Control Point (:control1) */
  control1: StringValue | undefined;

  /** Second Curve Control Point (:control2) */
  control2: StringValue | undefined;

  /** Curve Ending Point (:to) */
  to: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "style": this.style = StringValue.parse(value); return;
      case "href": this.href = StringValue.parse(value); return;
      case "target": this.target = StringValue.parse(value); return;
      case "class": this.class = StringValue.parse(value); return;
      case "title": this.title = StringValue.parse(value); return;
      case "alt": this.alternate = StringValue.parse(value); return;
      case "coordsize": this.coordinateSize = StringValue.parse(value); return;
      case "coordorigin": this.coordinateOrigin = StringValue.parse(value); return;
      case "wrapcoords": this.wrapCoordinates = StringValue.parse(value); return;
      case "print": this.print = TrueFalseValue.parse(value); return;
      case "o:spid": this.optionalString = StringValue.parse(value); return;
      case "o:oned": this.oned = TrueFalseValue.parse(value); return;
      case "o:regroupid": this.regroupId = IntegerValue.parse(value); return;
      case "o:doubleclicknotify": this.doubleClickNotify = TrueFalseValue.parse(value); return;
      case "o:button": this.button = TrueFalseValue.parse(value); return;
      case "o:userhidden": this.userHidden = TrueFalseValue.parse(value); return;
      case "o:bullet": this.bullet = TrueFalseValue.parse(value); return;
      case "o:hr": this.horizontal = TrueFalseValue.parse(value); return;
      case "o:hrstd": this.horizontalStandard = TrueFalseValue.parse(value); return;
      case "o:hrnoshade": this.horizontalNoShade = TrueFalseValue.parse(value); return;
      case "o:hrpct": this.horizontalPercentage = SingleValue.parse(value); return;
      case "o:hralign": this.horizontalAlignment = StringValue.parse(value); return;
      case "o:allowincell": this.allowInCell = TrueFalseValue.parse(value); return;
      case "o:allowoverlap": this.allowOverlap = TrueFalseValue.parse(value); return;
      case "o:userdrawn": this.userDrawn = TrueFalseValue.parse(value); return;
      case "o:bordertopcolor": this.borderTopColor = StringValue.parse(value); return;
      case "o:borderleftcolor": this.borderLeftColor = StringValue.parse(value); return;
      case "o:borderbottomcolor": this.borderBottomColor = StringValue.parse(value); return;
      case "o:borderrightcolor": this.borderRightColor = StringValue.parse(value); return;
      case "o:dgmlayout": this.diagramLayout = IntegerValue.parse(value); return;
      case "o:dgmnodekind": this.diagramNodeKind = IntegerValue.parse(value); return;
      case "o:dgmlayoutmru": this.diagramLayoutMostRecentUsed = IntegerValue.parse(value); return;
      case "o:insetmode": this.insetMode = StringValue.parse(value); return;
      case "filled": this.filled = TrueFalseValue.parse(value); return;
      case "fillcolor": this.fillColor = StringValue.parse(value); return;
      case "stroked": this.stroked = TrueFalseValue.parse(value); return;
      case "strokecolor": this.strokeColor = StringValue.parse(value); return;
      case "strokeweight": this.strokeWeight = StringValue.parse(value); return;
      case "insetpen": this.insetPen = TrueFalseValue.parse(value); return;
      case "o:spt": this.optionalNumber = Int32Value.parse(value); assertNumber(this.optionalNumber, { min: 0, max: 202 }, { attribute: "o:spt", elementClass: "Curve" }); return;
      case "o:connectortype": this.connectorType = StringValue.parse(value); return;
      case "o:bwmode": this.blackWhiteMode = StringValue.parse(value); return;
      case "o:bwpure": this.pureBlackWhiteMode = StringValue.parse(value); return;
      case "o:bwnormal": this.normalBlackWhiteMode = StringValue.parse(value); return;
      case "o:forcedash": this.forceDash = TrueFalseValue.parse(value); return;
      case "o:oleicon": this.oleIcon = TrueFalseValue.parse(value); return;
      case "o:ole": this.ole = TrueFalseBlankValue.parse(value); return;
      case "o:preferrelative": this.preferRelative = TrueFalseValue.parse(value); return;
      case "o:cliptowrap": this.clipToWrap = TrueFalseValue.parse(value); return;
      case "o:clip": this.clip = TrueFalseValue.parse(value); return;
      case "from": this.from = StringValue.parse(value); return;
      case "control1": this.control1 = StringValue.parse(value); return;
      case "control2": this.control2 = StringValue.parse(value); return;
      case "to": this.to = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    if (this.href !== undefined) out.push(["href", this.href.toString()]);
    if (this.target !== undefined) out.push(["target", this.target.toString()]);
    if (this.class !== undefined) out.push(["class", this.class.toString()]);
    if (this.title !== undefined) out.push(["title", this.title.toString()]);
    if (this.alternate !== undefined) out.push(["alt", this.alternate.toString()]);
    if (this.coordinateSize !== undefined) out.push(["coordsize", this.coordinateSize.toString()]);
    if (this.coordinateOrigin !== undefined) out.push(["coordorigin", this.coordinateOrigin.toString()]);
    if (this.wrapCoordinates !== undefined) out.push(["wrapcoords", this.wrapCoordinates.toString()]);
    if (this.print !== undefined) out.push(["print", this.print.toString()]);
    if (this.optionalString !== undefined) out.push(["o:spid", this.optionalString.toString()]);
    if (this.oned !== undefined) out.push(["o:oned", this.oned.toString()]);
    if (this.regroupId !== undefined) out.push(["o:regroupid", this.regroupId.toString()]);
    if (this.doubleClickNotify !== undefined) out.push(["o:doubleclicknotify", this.doubleClickNotify.toString()]);
    if (this.button !== undefined) out.push(["o:button", this.button.toString()]);
    if (this.userHidden !== undefined) out.push(["o:userhidden", this.userHidden.toString()]);
    if (this.bullet !== undefined) out.push(["o:bullet", this.bullet.toString()]);
    if (this.horizontal !== undefined) out.push(["o:hr", this.horizontal.toString()]);
    if (this.horizontalStandard !== undefined) out.push(["o:hrstd", this.horizontalStandard.toString()]);
    if (this.horizontalNoShade !== undefined) out.push(["o:hrnoshade", this.horizontalNoShade.toString()]);
    if (this.horizontalPercentage !== undefined) out.push(["o:hrpct", this.horizontalPercentage.toString()]);
    if (this.horizontalAlignment !== undefined) out.push(["o:hralign", this.horizontalAlignment.toString()]);
    if (this.allowInCell !== undefined) out.push(["o:allowincell", this.allowInCell.toString()]);
    if (this.allowOverlap !== undefined) out.push(["o:allowoverlap", this.allowOverlap.toString()]);
    if (this.userDrawn !== undefined) out.push(["o:userdrawn", this.userDrawn.toString()]);
    if (this.borderTopColor !== undefined) out.push(["o:bordertopcolor", this.borderTopColor.toString()]);
    if (this.borderLeftColor !== undefined) out.push(["o:borderleftcolor", this.borderLeftColor.toString()]);
    if (this.borderBottomColor !== undefined) out.push(["o:borderbottomcolor", this.borderBottomColor.toString()]);
    if (this.borderRightColor !== undefined) out.push(["o:borderrightcolor", this.borderRightColor.toString()]);
    if (this.diagramLayout !== undefined) out.push(["o:dgmlayout", this.diagramLayout.toString()]);
    if (this.diagramNodeKind !== undefined) out.push(["o:dgmnodekind", this.diagramNodeKind.toString()]);
    if (this.diagramLayoutMostRecentUsed !== undefined) out.push(["o:dgmlayoutmru", this.diagramLayoutMostRecentUsed.toString()]);
    if (this.insetMode !== undefined) out.push(["o:insetmode", this.insetMode.toString()]);
    if (this.filled !== undefined) out.push(["filled", this.filled.toString()]);
    if (this.fillColor !== undefined) out.push(["fillcolor", this.fillColor.toString()]);
    if (this.stroked !== undefined) out.push(["stroked", this.stroked.toString()]);
    if (this.strokeColor !== undefined) out.push(["strokecolor", this.strokeColor.toString()]);
    if (this.strokeWeight !== undefined) out.push(["strokeweight", this.strokeWeight.toString()]);
    if (this.insetPen !== undefined) out.push(["insetpen", this.insetPen.toString()]);
    if (this.optionalNumber !== undefined) out.push(["o:spt", this.optionalNumber.toString()]);
    if (this.connectorType !== undefined) out.push(["o:connectortype", this.connectorType.toString()]);
    if (this.blackWhiteMode !== undefined) out.push(["o:bwmode", this.blackWhiteMode.toString()]);
    if (this.pureBlackWhiteMode !== undefined) out.push(["o:bwpure", this.pureBlackWhiteMode.toString()]);
    if (this.normalBlackWhiteMode !== undefined) out.push(["o:bwnormal", this.normalBlackWhiteMode.toString()]);
    if (this.forceDash !== undefined) out.push(["o:forcedash", this.forceDash.toString()]);
    if (this.oleIcon !== undefined) out.push(["o:oleicon", this.oleIcon.toString()]);
    if (this.ole !== undefined) out.push(["o:ole", this.ole.toString()]);
    if (this.preferRelative !== undefined) out.push(["o:preferrelative", this.preferRelative.toString()]);
    if (this.clipToWrap !== undefined) out.push(["o:cliptowrap", this.clipToWrap.toString()]);
    if (this.clip !== undefined) out.push(["o:clip", this.clip.toString()]);
    if (this.from !== undefined) out.push(["from", this.from.toString()]);
    if (this.control1 !== undefined) out.push(["control1", this.control1.toString()]);
    if (this.control2 !== undefined) out.push(["control2", this.control2.toString()]);
    if (this.to !== undefined) out.push(["to", this.to.toString()]);
    return out;
  }

}
