// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerDrawing2014MainChildMaps } from "./_child-map.js";
import { ColIdIdentifier } from "./col-id-identifier.js";
import { ConnectableReferences } from "./connectable-references.js";
import { CreationId } from "./creation-id.js";
import { PredecessorDrawingElementReference } from "./predecessor-drawing-element-reference.js";
import { RowIdIdentifier } from "./row-id-identifier.js";

/**
 * 把 drawing-2014-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerDrawing2014MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2014/main", "colId", ColIdIdentifier);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/main", "cxnDERefs", ConnectableReferences);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/main", "creationId", CreationId);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/main", "predDERef", PredecessorDrawingElementReference);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/main", "rowId", RowIdIdentifier);
  registerDrawing2014MainChildMaps(registry);
}
