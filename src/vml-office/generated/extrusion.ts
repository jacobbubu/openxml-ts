// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Extrusion

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** 3D Extrusion.
 *
 * Element: `o:extrusion` */
export class Extrusion extends OpenXmlLeafElement {
  override readonly localName = "extrusion" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Extrusion Toggle (:on) */
  on: StringValue | undefined;

  /** Extrusion Type (:type) */
  type: StringValue | undefined;

  /** Extrusion Render Mode (:render) */
  render: StringValue | undefined;

  /** Extrusion Viewpoint Origin (:viewpointorigin) */
  viewpointOrigin: StringValue | undefined;

  /** Extrusion Viewpoint (:viewpoint) */
  viewpoint: StringValue | undefined;

  /** Extrusion Skew Angle (:skewangle) */
  skewAngle: StringValue | undefined;

  /** Extrusion Skew (:skewamt) */
  skewAmount: StringValue | undefined;

  /** Forward Extrusion (:foredepth) */
  forceDepth: StringValue | undefined;

  /** Backward Extrusion Depth (:backdepth) */
  backDepth: StringValue | undefined;

  /** Rotation Axis (:orientation) */
  orientation: StringValue | undefined;

  /** Rotation Around Axis (:orientationangle) */
  orientationAngle: StringValue | undefined;

  /** Rotation Toggle (:lockrotationcenter) */
  lockRotationCenter: StringValue | undefined;

  /** Center of Rotation Toggle (:autorotationcenter) */
  autoRotationCenter: StringValue | undefined;

  /** Rotation Center (:rotationcenter) */
  rotationCenter: StringValue | undefined;

  /** X-Y Rotation Angle (:rotationangle) */
  rotationAngle: StringValue | undefined;

  /** Extrusion Color (:color) */
  color: StringValue | undefined;

  /** Shininess (:shininess) */
  shininess: StringValue | undefined;

  /** Specularity (:specularity) */
  specularity: StringValue | undefined;

  /** Diffuse Reflection (:diffusity) */
  diffusity: StringValue | undefined;

  /** Metallic Surface Toggle (:metal) */
  metal: StringValue | undefined;

  /** Simulated Bevel (:edge) */
  edge: StringValue | undefined;

  /** Faceting Quality (:facet) */
  facet: StringValue | undefined;

  /** Shape Face Lighting Toggle (:lightface) */
  lightFace: StringValue | undefined;

  /** Brightness (:brightness) */
  brightness: StringValue | undefined;

  /** Primary Light Position (:lightposition) */
  lightPosition: StringValue | undefined;

  /** Primary Light Intensity (:lightlevel) */
  lightLevel: StringValue | undefined;

  /** Primary Light Harshness Toggle (:lightharsh) */
  lightHarsh: StringValue | undefined;

  /** Secondary Light Position (:lightposition2) */
  lightPosition2: StringValue | undefined;

  /** Secondary Light Intensity (:lightlevel2) */
  lightLevel2: StringValue | undefined;

  /** Secondary Light Harshness Toggle (:lightharsh2) */
  lightHarsh2: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "on": this.on = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "render": this.render = StringValue.parse(value); return;
      case "viewpointorigin": this.viewpointOrigin = StringValue.parse(value); return;
      case "viewpoint": this.viewpoint = StringValue.parse(value); return;
      case "skewangle": this.skewAngle = StringValue.parse(value); return;
      case "skewamt": this.skewAmount = StringValue.parse(value); return;
      case "foredepth": this.forceDepth = StringValue.parse(value); return;
      case "backdepth": this.backDepth = StringValue.parse(value); return;
      case "orientation": this.orientation = StringValue.parse(value); return;
      case "orientationangle": this.orientationAngle = StringValue.parse(value); return;
      case "lockrotationcenter": this.lockRotationCenter = StringValue.parse(value); return;
      case "autorotationcenter": this.autoRotationCenter = StringValue.parse(value); return;
      case "rotationcenter": this.rotationCenter = StringValue.parse(value); return;
      case "rotationangle": this.rotationAngle = StringValue.parse(value); return;
      case "color": this.color = StringValue.parse(value); return;
      case "shininess": this.shininess = StringValue.parse(value); return;
      case "specularity": this.specularity = StringValue.parse(value); return;
      case "diffusity": this.diffusity = StringValue.parse(value); return;
      case "metal": this.metal = StringValue.parse(value); return;
      case "edge": this.edge = StringValue.parse(value); return;
      case "facet": this.facet = StringValue.parse(value); return;
      case "lightface": this.lightFace = StringValue.parse(value); return;
      case "brightness": this.brightness = StringValue.parse(value); return;
      case "lightposition": this.lightPosition = StringValue.parse(value); return;
      case "lightlevel": this.lightLevel = StringValue.parse(value); return;
      case "lightharsh": this.lightHarsh = StringValue.parse(value); return;
      case "lightposition2": this.lightPosition2 = StringValue.parse(value); return;
      case "lightlevel2": this.lightLevel2 = StringValue.parse(value); return;
      case "lightharsh2": this.lightHarsh2 = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.on !== undefined) out.push(["on", this.on.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.render !== undefined) out.push(["render", this.render.toString()]);
    if (this.viewpointOrigin !== undefined) out.push(["viewpointorigin", this.viewpointOrigin.toString()]);
    if (this.viewpoint !== undefined) out.push(["viewpoint", this.viewpoint.toString()]);
    if (this.skewAngle !== undefined) out.push(["skewangle", this.skewAngle.toString()]);
    if (this.skewAmount !== undefined) out.push(["skewamt", this.skewAmount.toString()]);
    if (this.forceDepth !== undefined) out.push(["foredepth", this.forceDepth.toString()]);
    if (this.backDepth !== undefined) out.push(["backdepth", this.backDepth.toString()]);
    if (this.orientation !== undefined) out.push(["orientation", this.orientation.toString()]);
    if (this.orientationAngle !== undefined) out.push(["orientationangle", this.orientationAngle.toString()]);
    if (this.lockRotationCenter !== undefined) out.push(["lockrotationcenter", this.lockRotationCenter.toString()]);
    if (this.autoRotationCenter !== undefined) out.push(["autorotationcenter", this.autoRotationCenter.toString()]);
    if (this.rotationCenter !== undefined) out.push(["rotationcenter", this.rotationCenter.toString()]);
    if (this.rotationAngle !== undefined) out.push(["rotationangle", this.rotationAngle.toString()]);
    if (this.color !== undefined) out.push(["color", this.color.toString()]);
    if (this.shininess !== undefined) out.push(["shininess", this.shininess.toString()]);
    if (this.specularity !== undefined) out.push(["specularity", this.specularity.toString()]);
    if (this.diffusity !== undefined) out.push(["diffusity", this.diffusity.toString()]);
    if (this.metal !== undefined) out.push(["metal", this.metal.toString()]);
    if (this.edge !== undefined) out.push(["edge", this.edge.toString()]);
    if (this.facet !== undefined) out.push(["facet", this.facet.toString()]);
    if (this.lightFace !== undefined) out.push(["lightface", this.lightFace.toString()]);
    if (this.brightness !== undefined) out.push(["brightness", this.brightness.toString()]);
    if (this.lightPosition !== undefined) out.push(["lightposition", this.lightPosition.toString()]);
    if (this.lightLevel !== undefined) out.push(["lightlevel", this.lightLevel.toString()]);
    if (this.lightHarsh !== undefined) out.push(["lightharsh", this.lightHarsh.toString()]);
    if (this.lightPosition2 !== undefined) out.push(["lightposition2", this.lightPosition2.toString()]);
    if (this.lightLevel2 !== undefined) out.push(["lightlevel2", this.lightLevel2.toString()]);
    if (this.lightHarsh2 !== undefined) out.push(["lightharsh2", this.lightHarsh2.toString()]);
    return out;
  }

}
