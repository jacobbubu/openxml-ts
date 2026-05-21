// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json

import type { ElementRegistry } from "../../../element/index.js";
import { AmbientLight } from "./ambient-light.js";
import { Blip } from "./blip.js";
import { ColorType } from "./color-type.js";
import { DirectionalLight } from "./directional-light.js";
import { IlluminancePositiveRatio } from "./illuminance-positive-ratio.js";
import { IntensityPositiveRatio } from "./intensity-positive-ratio.js";
import { LookAtPoint3D } from "./look-at-point3-d.js";
import { MeterPerModelUnitPositiveRatio } from "./meter-per-model-unit-positive-ratio.js";
import { Model3D } from "./model3-d.js";
import { Model3DCamera } from "./model3-d-camera.js";
import { Model3DExtension } from "./model3-d-extension.js";
import { Model3DRaster } from "./model3-d-raster.js";
import { Model3DTransform } from "./model3-d-transform.js";
import { ObjectViewport } from "./object-viewport.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { OrthographicProjection } from "./orthographic-projection.js";
import { PerspectiveProjection } from "./perspective-projection.js";
import { PictureAttributionSourceURL } from "./picture-attribution-source-url.js";
import { PointLight } from "./point-light.js";
import { PosPoint3D } from "./pos-point3-d.js";
import { PostTransVector3D } from "./post-trans-vector3-d.js";
import { PreTransVector3D } from "./pre-trans-vector3-d.js";
import { Rotate3D } from "./rotate3-d.js";
import { Scale3D } from "./scale3-d.js";
import { ShapeProperties } from "./shape-properties.js";
import { SpotLight } from "./spot-light.js";
import { SxRatio } from "./sx-ratio.js";
import { SyRatio } from "./sy-ratio.js";
import { SzRatio } from "./sz-ratio.js";
import { UnknownLight } from "./unknown-light.js";
import { UpVector3D } from "./up-vector3-d.js";
import { WindowViewport } from "./window-viewport.js";

/**
 * 把 drawing-2017-model3d 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerDrawing2017Model3dElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "ambientLight", AmbientLight);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "blip", Blip);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "clr", ColorType);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "dirLight", DirectionalLight);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "illuminance", IlluminancePositiveRatio);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "intensity", IntensityPositiveRatio);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "lookAt", LookAtPoint3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "meterPerModelUnit", MeterPerModelUnitPositiveRatio);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "model3d", Model3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "camera", Model3DCamera);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "ext", Model3DExtension);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "raster", Model3DRaster);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "trans", Model3DTransform);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "objViewport", ObjectViewport);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "orthographic", OrthographicProjection);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "perspective", PerspectiveProjection);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "attrSrcUrl", PictureAttributionSourceURL);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "ptLight", PointLight);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "pos", PosPoint3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "postTrans", PostTransVector3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "preTrans", PreTransVector3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "rot", Rotate3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "scale", Scale3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "spPr", ShapeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "spotLight", SpotLight);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "sx", SxRatio);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "sy", SyRatio);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "sz", SzRatio);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "unkLight", UnknownLight);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "up", UpVector3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/model3d", "winViewport", WindowViewport);
}
