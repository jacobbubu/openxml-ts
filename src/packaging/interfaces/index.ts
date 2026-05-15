/**
 * OPC Packaging 公共接口的统一导出口。
 *
 * Story-1.1 阶段只提供契约，具体实现由 Story-1.2..1.7 落地。
 */

export type {
  CreateRelationshipInput,
  IPackageRelationship,
  IRelationshipCollection,
} from "./relationship.js";

export type { IPackagePart } from "./part.js";

export type { IPackageProperties } from "./properties.js";

export type { IPackage } from "./package.js";

export type {
  AccessMode,
  CompressionLevel,
  PartUri,
  PartWriteInput,
  TargetMode,
} from "./types.js";

export { isPartUri, tryPartUri } from "./types.js";
