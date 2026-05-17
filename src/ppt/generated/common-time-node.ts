// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.CommonTimeNode

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertNumber,
} from "../../element/index.js";

/** Parallel TimeNode.
 *
 * Element: `p:cTn` */
export class CommonTimeNode extends OpenXmlCompositeElement {
  override readonly localName = "cTn" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: UInt32Value | undefined;

  /** presetID (:presetID) */
  presetId: Int32Value | undefined;

  /** presetClass (:presetClass) */
  presetClass: StringValue | undefined;

  /** presetSubtype (:presetSubtype) */
  presetSubtype: Int32Value | undefined;

  /** dur (:dur) */
  duration: StringValue | undefined;

  /** repeatCount (:repeatCount) */
  repeatCount: StringValue | undefined;

  /** repeatDur (:repeatDur) */
  repeatDuration: StringValue | undefined;

  /** spd (:spd) */
  speed: Int32Value | undefined;

  /** accel (:accel) */
  acceleration: Int32Value | undefined;

  /** decel (:decel) */
  deceleration: Int32Value | undefined;

  /** autoRev (:autoRev) */
  autoReverse: BooleanValue | undefined;

  /** restart (:restart) */
  restart: StringValue | undefined;

  /** fill (:fill) */
  fill: StringValue | undefined;

  /** syncBehavior (:syncBehavior) */
  syncBehavior: StringValue | undefined;

  /** tmFilter (:tmFilter) */
  timeFilter: StringValue | undefined;

  /** evtFilter (:evtFilter) */
  eventFilter: StringValue | undefined;

  /** display (:display) */
  display: BooleanValue | undefined;

  /** masterRel (:masterRel) */
  masterRelation: StringValue | undefined;

  /** bldLvl (:bldLvl) */
  buildLevel: Int32Value | undefined;

  /** grpId (:grpId) */
  groupId: UInt32Value | undefined;

  /** afterEffect (:afterEffect) */
  afterEffect: BooleanValue | undefined;

  /** nodeType (:nodeType) */
  nodeType: StringValue | undefined;

  /** nodePh (:nodePh) */
  nodePlaceholder: BooleanValue | undefined;

  /** presetBounceEnd (p14:presetBounceEnd) */
  presetBounceEnd: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":id": this.id = UInt32Value.parse(value); return;
      case ":presetID": this.presetId = Int32Value.parse(value); return;
      case ":presetClass": this.presetClass = StringValue.parse(value); return;
      case ":presetSubtype": this.presetSubtype = Int32Value.parse(value); return;
      case ":dur": this.duration = StringValue.parse(value); return;
      case ":repeatCount": this.repeatCount = StringValue.parse(value); return;
      case ":repeatDur": this.repeatDuration = StringValue.parse(value); return;
      case ":spd": this.speed = Int32Value.parse(value); return;
      case ":accel": this.acceleration = Int32Value.parse(value); assertNumber(this.acceleration, { min: 0, max: 100000 }, { attribute: ":accel", elementClass: "CommonTimeNode" }); return;
      case ":decel": this.deceleration = Int32Value.parse(value); assertNumber(this.deceleration, { min: 0, max: 100000 }, { attribute: ":decel", elementClass: "CommonTimeNode" }); return;
      case ":autoRev": this.autoReverse = BooleanValue.parse(value); return;
      case ":restart": this.restart = StringValue.parse(value); return;
      case ":fill": this.fill = StringValue.parse(value); return;
      case ":syncBehavior": this.syncBehavior = StringValue.parse(value); return;
      case ":tmFilter": this.timeFilter = StringValue.parse(value); return;
      case ":evtFilter": this.eventFilter = StringValue.parse(value); return;
      case ":display": this.display = BooleanValue.parse(value); return;
      case ":masterRel": this.masterRelation = StringValue.parse(value); return;
      case ":bldLvl": this.buildLevel = Int32Value.parse(value); return;
      case ":grpId": this.groupId = UInt32Value.parse(value); return;
      case ":afterEffect": this.afterEffect = BooleanValue.parse(value); return;
      case ":nodeType": this.nodeType = StringValue.parse(value); return;
      case ":nodePh": this.nodePlaceholder = BooleanValue.parse(value); return;
      case "p14:presetBounceEnd": this.presetBounceEnd = Int32Value.parse(value); assertNumber(this.presetBounceEnd, { min: 0, max: 100000 }, { attribute: "p14:presetBounceEnd", elementClass: "CommonTimeNode" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push([":id", this.id.toString()]);
    if (this.presetId !== undefined) out.push([":presetID", this.presetId.toString()]);
    if (this.presetClass !== undefined) out.push([":presetClass", this.presetClass.toString()]);
    if (this.presetSubtype !== undefined) out.push([":presetSubtype", this.presetSubtype.toString()]);
    if (this.duration !== undefined) out.push([":dur", this.duration.toString()]);
    if (this.repeatCount !== undefined) out.push([":repeatCount", this.repeatCount.toString()]);
    if (this.repeatDuration !== undefined) out.push([":repeatDur", this.repeatDuration.toString()]);
    if (this.speed !== undefined) out.push([":spd", this.speed.toString()]);
    if (this.acceleration !== undefined) out.push([":accel", this.acceleration.toString()]);
    if (this.deceleration !== undefined) out.push([":decel", this.deceleration.toString()]);
    if (this.autoReverse !== undefined) out.push([":autoRev", this.autoReverse.toString()]);
    if (this.restart !== undefined) out.push([":restart", this.restart.toString()]);
    if (this.fill !== undefined) out.push([":fill", this.fill.toString()]);
    if (this.syncBehavior !== undefined) out.push([":syncBehavior", this.syncBehavior.toString()]);
    if (this.timeFilter !== undefined) out.push([":tmFilter", this.timeFilter.toString()]);
    if (this.eventFilter !== undefined) out.push([":evtFilter", this.eventFilter.toString()]);
    if (this.display !== undefined) out.push([":display", this.display.toString()]);
    if (this.masterRelation !== undefined) out.push([":masterRel", this.masterRelation.toString()]);
    if (this.buildLevel !== undefined) out.push([":bldLvl", this.buildLevel.toString()]);
    if (this.groupId !== undefined) out.push([":grpId", this.groupId.toString()]);
    if (this.afterEffect !== undefined) out.push([":afterEffect", this.afterEffect.toString()]);
    if (this.nodeType !== undefined) out.push([":nodeType", this.nodeType.toString()]);
    if (this.nodePlaceholder !== undefined) out.push([":nodePh", this.nodePlaceholder.toString()]);
    if (this.presetBounceEnd !== undefined) out.push(["p14:presetBounceEnd", this.presetBounceEnd.toString()]);
    return out;
  }

}
