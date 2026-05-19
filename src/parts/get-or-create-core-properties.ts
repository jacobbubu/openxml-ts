/**
 * 跨子系统共享：找/创建 CorePropertiesPart（Epic-29）。
 *
 * - 找 package 级关系里有没有 \`metadata/core-properties\` type；
 * - 没有就 createPart \`/docProps/core.xml\` + 加包级关系；
 * - 返 CorePropertiesPart wrapper（含懒解析 root）。
 *
 * 让 Word/Excel/PPT 三族 facade 共享一份 bootstrap 逻辑——避免每家重复。
 */

import type { ElementRegistry } from "../element/index.js";
import type { IPackage } from "../packaging/interfaces/package.js";
import type { PartUri } from "../packaging/interfaces/types.js";
import { CorePropertiesPart } from "./core-properties-part.js";
import { relationshipTypeMatches } from "./relationship-type-match.js";
import { resolveRelativePartUri } from "./relationship-uri.js";

const CORE_PROPS_URI = "/docProps/core.xml" as PartUri;

export function getOrCreateCorePropertiesPart(
  pkg: IPackage,
  registry: ElementRegistry,
): CorePropertiesPart {
  // 1. 走包级关系，看是否已挂 core-properties
  for (const rel of pkg.relationships) {
    if (rel.targetMode !== "internal") continue;
    if (!relationshipTypeMatches(rel.type, CorePropertiesPart.relationshipType)) continue;
    const partUri = resolveRelativePartUri("/", rel.target);
    if (partUri === undefined || !pkg.hasPart(partUri)) continue;
    return new CorePropertiesPart(pkg.getPart(partUri), registry);
  }

  // 2. 没有 → 创建
  const part = pkg.createPart(CORE_PROPS_URI, CorePropertiesPart.contentType);
  pkg.relationships.create({
    type: CorePropertiesPart.relationshipType,
    target: "docProps/core.xml",
    targetMode: "internal",
  });
  return new CorePropertiesPart(part, registry);
}
