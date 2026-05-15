/**
 * `openxml-ts/packaging` 子门面。等 Epic-2+ 切包时这里会变成 `@openxml-ts/packaging` 的入口。
 */

export * from "./interfaces/index.js";
export {
  OpenXmlPackageError,
  type OpenXmlPackageErrorCode,
  type OpenXmlPackageErrorOptions,
} from "./errors.js";
export { OpenXmlPackage } from "./core/open-xml-package.js";
export { createInMemory, openSync } from "./factories.js";
export {
  CONTENT_TYPES_NS,
  ContentTypeManifest,
  type DefaultEntry,
  type OverrideEntry,
} from "./content-types/index.js";
export {
  createHyperlinkInput,
  HYPERLINK_RELATIONSHIP_TYPE,
  parseRelationshipsXml,
  RELATIONSHIPS_NS,
  serializeRelationshipsXml,
  type CreateHyperlinkInput,
  type ParsedRelationship,
} from "./relationships/index.js";
export { RelationshipCollection } from "./core/relationship-collection.js";
