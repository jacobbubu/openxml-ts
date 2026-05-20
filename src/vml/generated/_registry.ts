// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json

import type { ElementRegistry } from "../../element/index.js";
import { Arc } from "./arc.js";
import { Background } from "./background.js";
import { Curve } from "./curve.js";
import { Fill } from "./fill.js";
import { Formula } from "./formula.js";
import { Formulas } from "./formulas.js";
import { Group } from "./group.js";
import { ImageData } from "./image-data.js";
import { ImageFile } from "./image-file.js";
import { Line } from "./line.js";
import { Oval } from "./oval.js";
import { Path } from "./path.js";
import { PolyLine } from "./poly-line.js";
import { Rectangle } from "./rectangle.js";
import { RoundRectangle } from "./round-rectangle.js";
import { Shadow } from "./shadow.js";
import { Shape } from "./shape.js";
import { ShapeHandle } from "./shape-handle.js";
import { ShapeHandles } from "./shape-handles.js";
import { Shapetype } from "./shapetype.js";
import { Stroke } from "./stroke.js";
import { TextBox } from "./text-box.js";
import { TextPath } from "./text-path.js";

/**
 * 把 vml 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerVmlElements(registry: ElementRegistry): void {
  registry.register("urn:schemas-microsoft-com:vml", "arc", Arc);
  registry.register("urn:schemas-microsoft-com:vml", "background", Background);
  registry.register("urn:schemas-microsoft-com:vml", "curve", Curve);
  registry.register("urn:schemas-microsoft-com:vml", "fill", Fill);
  registry.register("urn:schemas-microsoft-com:vml", "f", Formula);
  registry.register("urn:schemas-microsoft-com:vml", "formulas", Formulas);
  registry.register("urn:schemas-microsoft-com:vml", "group", Group);
  registry.register("urn:schemas-microsoft-com:vml", "imagedata", ImageData);
  registry.register("urn:schemas-microsoft-com:vml", "image", ImageFile);
  registry.register("urn:schemas-microsoft-com:vml", "line", Line);
  registry.register("urn:schemas-microsoft-com:vml", "oval", Oval);
  registry.register("urn:schemas-microsoft-com:vml", "path", Path);
  registry.register("urn:schemas-microsoft-com:vml", "polyline", PolyLine);
  registry.register("urn:schemas-microsoft-com:vml", "rect", Rectangle);
  registry.register("urn:schemas-microsoft-com:vml", "roundrect", RoundRectangle);
  registry.register("urn:schemas-microsoft-com:vml", "shadow", Shadow);
  registry.register("urn:schemas-microsoft-com:vml", "shape", Shape);
  registry.register("urn:schemas-microsoft-com:vml", "h", ShapeHandle);
  registry.register("urn:schemas-microsoft-com:vml", "handles", ShapeHandles);
  registry.register("urn:schemas-microsoft-com:vml", "shapetype", Shapetype);
  registry.register("urn:schemas-microsoft-com:vml", "stroke", Stroke);
  registry.register("urn:schemas-microsoft-com:vml", "textbox", TextBox);
  registry.register("urn:schemas-microsoft-com:vml", "textpath", TextPath);
}
