// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.Group

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Shape Group.
 *
 * Element: `v:group` */
export class Group extends OpenXmlCompositeElement {
  override readonly localName = "group" as const;
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
  print: StringValue | undefined;

  /** spid (o:spid) */
  optionalString: StringValue | undefined;

  /** oned (o:oned) */
  oned: StringValue | undefined;

  /** regroupid (o:regroupid) */
  regroupId: StringValue | undefined;

  /** doubleclicknotify (o:doubleclicknotify) */
  doubleClickNotify: StringValue | undefined;

  /** button (o:button) */
  button: StringValue | undefined;

  /** userhidden (o:userhidden) */
  userHidden: StringValue | undefined;

  /** bullet (o:bullet) */
  bullet: StringValue | undefined;

  /** hr (o:hr) */
  horizontal: StringValue | undefined;

  /** hrstd (o:hrstd) */
  horizontalStandard: StringValue | undefined;

  /** hrnoshade (o:hrnoshade) */
  horizontalNoShade: StringValue | undefined;

  /** hrpct (o:hrpct) */
  horizontalPercentage: StringValue | undefined;

  /** hralign (o:hralign) */
  horizontalAlignment: StringValue | undefined;

  /** allowincell (o:allowincell) */
  allowInCell: StringValue | undefined;

  /** allowoverlap (o:allowoverlap) */
  allowOverlap: StringValue | undefined;

  /** userdrawn (o:userdrawn) */
  userDrawn: StringValue | undefined;

  /** dgmlayout (o:dgmlayout) */
  diagramLayout: StringValue | undefined;

  /** dgmnodekind (o:dgmnodekind) */
  diagramNodeKind: StringValue | undefined;

  /** dgmlayoutmru (o:dgmlayoutmru) */
  diagramLayoutMostRecentUsed: StringValue | undefined;

  /** insetmode (o:insetmode) */
  insetMode: StringValue | undefined;

  /** Group Diagram Type (:editas) */
  editAs: StringValue | undefined;

  /** Table Properties (o:tableproperties) */
  tableProperties: StringValue | undefined;

  /** Table Row Height Limits (o:tablelimits) */
  tableLimits: StringValue | undefined;

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
      case "print": this.print = StringValue.parse(value); return;
      case "o:spid": this.optionalString = StringValue.parse(value); return;
      case "o:oned": this.oned = StringValue.parse(value); return;
      case "o:regroupid": this.regroupId = StringValue.parse(value); return;
      case "o:doubleclicknotify": this.doubleClickNotify = StringValue.parse(value); return;
      case "o:button": this.button = StringValue.parse(value); return;
      case "o:userhidden": this.userHidden = StringValue.parse(value); return;
      case "o:bullet": this.bullet = StringValue.parse(value); return;
      case "o:hr": this.horizontal = StringValue.parse(value); return;
      case "o:hrstd": this.horizontalStandard = StringValue.parse(value); return;
      case "o:hrnoshade": this.horizontalNoShade = StringValue.parse(value); return;
      case "o:hrpct": this.horizontalPercentage = StringValue.parse(value); return;
      case "o:hralign": this.horizontalAlignment = StringValue.parse(value); return;
      case "o:allowincell": this.allowInCell = StringValue.parse(value); return;
      case "o:allowoverlap": this.allowOverlap = StringValue.parse(value); return;
      case "o:userdrawn": this.userDrawn = StringValue.parse(value); return;
      case "o:dgmlayout": this.diagramLayout = StringValue.parse(value); return;
      case "o:dgmnodekind": this.diagramNodeKind = StringValue.parse(value); return;
      case "o:dgmlayoutmru": this.diagramLayoutMostRecentUsed = StringValue.parse(value); return;
      case "o:insetmode": this.insetMode = StringValue.parse(value); return;
      case "editas": this.editAs = StringValue.parse(value); return;
      case "o:tableproperties": this.tableProperties = StringValue.parse(value); return;
      case "o:tablelimits": this.tableLimits = StringValue.parse(value); return;
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
    if (this.diagramLayout !== undefined) out.push(["o:dgmlayout", this.diagramLayout.toString()]);
    if (this.diagramNodeKind !== undefined) out.push(["o:dgmnodekind", this.diagramNodeKind.toString()]);
    if (this.diagramLayoutMostRecentUsed !== undefined) out.push(["o:dgmlayoutmru", this.diagramLayoutMostRecentUsed.toString()]);
    if (this.insetMode !== undefined) out.push(["o:insetmode", this.insetMode.toString()]);
    if (this.editAs !== undefined) out.push(["editas", this.editAs.toString()]);
    if (this.tableProperties !== undefined) out.push(["o:tableproperties", this.tableProperties.toString()]);
    if (this.tableLimits !== undefined) out.push(["o:tablelimits", this.tableLimits.toString()]);
    return out;
  }

}
