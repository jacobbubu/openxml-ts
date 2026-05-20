/**
 * 跨子系统共享：找/创建 ExtendedFilePropertiesPart（Epic-72）。
 *
 * - 找 package 级关系里有没有 `extended-properties` type；
 * - 没有就 createPart `/docProps/app.xml` + 加包级关系；
 * - 返 ExtendedFilePropertiesPart wrapper（含懒解析 root）。
 *
 * 让 Word/Excel/PPT 三族 facade 共享一份 bootstrap 逻辑——避免每家重复。
 */

import type { IPackage } from "../packaging/interfaces/package.js";
import type { PartUri } from "../packaging/interfaces/types.js";
import { ExtendedFilePropertiesPart } from "./extended-file-properties-part.js";
import { relationshipTypeMatches } from "./relationship-type-match.js";
import { resolveRelativePartUri } from "./relationship-uri.js";

const EXTENDED_PROPS_URI = "/docProps/app.xml" as PartUri;

export function getOrCreateExtendedFilePropertiesPart(pkg: IPackage): ExtendedFilePropertiesPart {
  // 1. 走包级关系，看是否已挂 extended-properties
  for (const rel of pkg.relationships) {
    if (rel.targetMode !== "internal") continue;
    if (!relationshipTypeMatches(rel.type, ExtendedFilePropertiesPart.relationshipType)) continue;
    const partUri = resolveRelativePartUri("/", rel.target);
    if (partUri === undefined || !pkg.hasPart(partUri)) continue;
    return new ExtendedFilePropertiesPart(pkg.getPart(partUri));
  }

  // 2. 没有 → 创建
  const part = pkg.createPart(EXTENDED_PROPS_URI, ExtendedFilePropertiesPart.contentType);
  pkg.relationships.create({
    type: ExtendedFilePropertiesPart.relationshipType,
    target: "docProps/app.xml",
    targetMode: "internal",
  });
  return new ExtendedFilePropertiesPart(part);
}
