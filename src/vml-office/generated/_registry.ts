// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json

import type { ElementRegistry } from "../../element/index.js";
import { registerVmlOfficeChildMaps } from "./_child-map.js";
import { BottomStroke } from "./bottom-stroke.js";
import { Callout } from "./callout.js";
import { ClipPath } from "./clip-path.js";
import { ColorMenu } from "./color-menu.js";
import { ColorMostRecentlyUsed } from "./color-most-recently-used.js";
import { ColumnStroke } from "./column-stroke.js";
import { Complex } from "./complex.js";
import { Diagram } from "./diagram.js";
import { Entry } from "./entry.js";
import { Extrusion } from "./extrusion.js";
import { FieldCodes } from "./field-codes.js";
import { FillExtendedProperties } from "./fill-extended-properties.js";
import { Ink } from "./ink.js";
import { LeftStroke } from "./left-stroke.js";
import { LinkType } from "./link-type.js";
import { Lock } from "./lock.js";
import { LockedField } from "./locked-field.js";
import { OleObject } from "./ole-object.js";
import { Proxy } from "./proxy.js";
import { RegroupTable } from "./regroup-table.js";
import { Relation } from "./relation.js";
import { RelationTable } from "./relation-table.js";
import { RightStroke } from "./right-stroke.js";
import { Rule } from "./rule.js";
import { Rules } from "./rules.js";
import { ShapeDefaults } from "./shape-defaults.js";
import { ShapeIdMap } from "./shape-id-map.js";
import { ShapeLayout } from "./shape-layout.js";
import { SignatureLine } from "./signature-line.js";
import { Skew } from "./skew.js";
import { TopStroke } from "./top-stroke.js";

/**
 * 把 vml-office 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerVmlOfficeElements(registry: ElementRegistry): void {
  registry.register("urn:schemas-microsoft-com:office:office", "bottom", BottomStroke);
  registry.register("urn:schemas-microsoft-com:office:office", "callout", Callout);
  registry.register("urn:schemas-microsoft-com:office:office", "clippath", ClipPath);
  registry.register("urn:schemas-microsoft-com:office:office", "colormenu", ColorMenu);
  registry.register("urn:schemas-microsoft-com:office:office", "colormru", ColorMostRecentlyUsed);
  registry.register("urn:schemas-microsoft-com:office:office", "column", ColumnStroke);
  registry.register("urn:schemas-microsoft-com:office:office", "complex", Complex);
  registry.register("urn:schemas-microsoft-com:office:office", "diagram", Diagram);
  registry.register("urn:schemas-microsoft-com:office:office", "entry", Entry);
  registry.register("urn:schemas-microsoft-com:office:office", "extrusion", Extrusion);
  registry.register("urn:schemas-microsoft-com:office:office", "FieldCodes", FieldCodes);
  registry.register("urn:schemas-microsoft-com:office:office", "fill", FillExtendedProperties);
  registry.register("urn:schemas-microsoft-com:office:office", "ink", Ink);
  registry.register("urn:schemas-microsoft-com:office:office", "left", LeftStroke);
  registry.register("urn:schemas-microsoft-com:office:office", "LinkType", LinkType);
  registry.register("urn:schemas-microsoft-com:office:office", "lock", Lock);
  registry.register("urn:schemas-microsoft-com:office:office", "LockedField", LockedField);
  registry.register("urn:schemas-microsoft-com:office:office", "OLEObject", OleObject);
  registry.register("urn:schemas-microsoft-com:office:office", "proxy", Proxy);
  registry.register("urn:schemas-microsoft-com:office:office", "regrouptable", RegroupTable);
  registry.register("urn:schemas-microsoft-com:office:office", "rel", Relation);
  registry.register("urn:schemas-microsoft-com:office:office", "relationtable", RelationTable);
  registry.register("urn:schemas-microsoft-com:office:office", "right", RightStroke);
  registry.register("urn:schemas-microsoft-com:office:office", "r", Rule);
  registry.register("urn:schemas-microsoft-com:office:office", "rules", Rules);
  registry.register("urn:schemas-microsoft-com:office:office", "shapedefaults", ShapeDefaults);
  registry.register("urn:schemas-microsoft-com:office:office", "idmap", ShapeIdMap);
  registry.register("urn:schemas-microsoft-com:office:office", "shapelayout", ShapeLayout);
  registry.register("urn:schemas-microsoft-com:office:office", "signatureline", SignatureLine);
  registry.register("urn:schemas-microsoft-com:office:office", "skew", Skew);
  registry.register("urn:schemas-microsoft-com:office:office", "top", TopStroke);
  registerVmlOfficeChildMaps(registry);
}
