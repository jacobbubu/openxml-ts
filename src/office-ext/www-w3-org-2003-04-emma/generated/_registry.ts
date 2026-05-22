// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_04_emma.json

import type { ElementRegistry } from "../../../element/index.js";
import { register200304EmmaChildMaps } from "./_child-map.js";
import { Arc } from "./arc.js";
import { Derivation } from "./derivation.js";
import { DerivedFrom } from "./derived-from.js";
import { Emma } from "./emma.js";
import { EndPoint } from "./end-point.js";
import { EndPointInfo } from "./end-point-info.js";
import { Grammar } from "./grammar.js";
import { Group } from "./group.js";
import { GroupInfo } from "./group-info.js";
import { Info } from "./info.js";
import { Interpretation } from "./interpretation.js";
import { Lattice } from "./lattice.js";
import { Literal } from "./literal.js";
import { Model } from "./model.js";
import { Node } from "./node.js";
import { OneOf } from "./one-of.js";
import { Sequence } from "./sequence.js";

/**
 * 把 2003-04-emma 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register200304EmmaElements(registry: ElementRegistry): void {
  registry.register("http://www.w3.org/2003/04/emma", "arc", Arc);
  registry.register("http://www.w3.org/2003/04/emma", "derivation", Derivation);
  registry.register("http://www.w3.org/2003/04/emma", "derived-from", DerivedFrom);
  registry.register("http://www.w3.org/2003/04/emma", "emma", Emma);
  registry.register("http://www.w3.org/2003/04/emma", "endpoint", EndPoint);
  registry.register("http://www.w3.org/2003/04/emma", "endpoint-info", EndPointInfo);
  registry.register("http://www.w3.org/2003/04/emma", "grammar", Grammar);
  registry.register("http://www.w3.org/2003/04/emma", "group", Group);
  registry.register("http://www.w3.org/2003/04/emma", "group-info", GroupInfo);
  registry.register("http://www.w3.org/2003/04/emma", "info", Info);
  registry.register("http://www.w3.org/2003/04/emma", "interpretation", Interpretation);
  registry.register("http://www.w3.org/2003/04/emma", "lattice", Lattice);
  registry.register("http://www.w3.org/2003/04/emma", "literal", Literal);
  registry.register("http://www.w3.org/2003/04/emma", "model", Model);
  registry.register("http://www.w3.org/2003/04/emma", "node", Node);
  registry.register("http://www.w3.org/2003/04/emma", "one-of", OneOf);
  registry.register("http://www.w3.org/2003/04/emma", "sequence", Sequence);
  register200304EmmaChildMaps(registry);
}
