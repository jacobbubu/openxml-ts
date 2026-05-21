// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2016_11_diagram.json

import type { ElementRegistry } from "../../../element/index.js";
import { DiagramAutoBullet } from "./diagram-auto-bullet.js";
import { NumberDiagramInfo } from "./number-diagram-info.js";
import { NumberDiagramInfoList } from "./number-diagram-info-list.js";

/**
 * 把 2016-11-diagram 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register201611DiagramElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2016/11/diagram", "buPr", DiagramAutoBullet);
  registry.register("http://schemas.microsoft.com/office/drawing/2016/11/diagram", "autoBuNodeInfo", NumberDiagramInfo);
  registry.register("http://schemas.microsoft.com/office/drawing/2016/11/diagram", "autoBuNodeInfoLst", NumberDiagramInfoList);
}
