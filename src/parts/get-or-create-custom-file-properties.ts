// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * 跨子系统共享：找/创建 CustomFilePropertiesPart（Epic-72）。
 *
 * - 找 package 级关系里有没有 `custom-properties` type；
 * - 没有就 createPart `/docProps/custom.xml` + 加包级关系；
 * - 返 CustomFilePropertiesPart wrapper（含懒解析 root）。
 *
 * 让 Word/Excel/PPT 三族 facade 共享一份 bootstrap 逻辑——避免每家重复。
 */

import type { IPackage } from "../packaging/interfaces/package.js";
import type { PartUri } from "../packaging/interfaces/types.js";
import { CustomFilePropertiesPart } from "./custom-file-properties-part.js";
import { relationshipTypeMatches } from "./relationship-type-match.js";
import { resolveRelativePartUri } from "./relationship-uri.js";

const CUSTOM_PROPS_URI = "/docProps/custom.xml" as PartUri;

export function getOrCreateCustomFilePropertiesPart(pkg: IPackage): CustomFilePropertiesPart {
  // 1. 走包级关系，看是否已挂 custom-properties
  for (const rel of pkg.relationships) {
    if (rel.targetMode !== "internal") continue;
    if (!relationshipTypeMatches(rel.type, CustomFilePropertiesPart.relationshipType)) continue;
    const partUri = resolveRelativePartUri("/", rel.target);
    if (partUri === undefined || !pkg.hasPart(partUri)) continue;
    return new CustomFilePropertiesPart(pkg.getPart(partUri));
  }

  // 2. 没有 → 创建
  const part = pkg.createPart(CUSTOM_PROPS_URI, CustomFilePropertiesPart.contentType);
  pkg.relationships.create({
    type: CustomFilePropertiesPart.relationshipType,
    target: "docProps/custom.xml",
    targetMode: "internal",
  });
  return new CustomFilePropertiesPart(part);
}
