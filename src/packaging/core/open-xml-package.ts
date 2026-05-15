import type { IPackage } from "../interfaces/package.js";
import type { IPackagePart } from "../interfaces/part.js";
import type { IPackageProperties } from "../interfaces/properties.js";
import type { IRelationshipCollection } from "../interfaces/relationship.js";
import type { AccessMode, CompressionLevel, PartUri } from "../interfaces/types.js";

/**
 * `OpenXmlPackage` 的抽象基类——所有 backend 的「门面」共同身份。
 *
 * 设计意图（与 .NET `OpenXmlPackage` 同名同位）：
 * - 用户既可以 `import type { IPackage }` 走结构子类型，也可以 `instanceof OpenXmlPackage` 做运行时分支；
 * - 把 IPackage 全部成员声明为 abstract，让具体 backend（Memory / Zip / Flat）按自己的存储语义实现；
 * - 不在本类内塞共享状态，避免基类与子类间的隐式耦合（共享逻辑放到 `core/*` 工具类）。
 */
export abstract class OpenXmlPackage implements IPackage {
  abstract readonly accessMode: AccessMode;
  abstract readonly properties: IPackageProperties;
  abstract readonly relationships: IRelationshipCollection;

  abstract parts(): Iterable<IPackagePart>;
  abstract getPart(uri: PartUri): IPackagePart;
  abstract hasPart(uri: PartUri): boolean;
  abstract createPart(
    uri: PartUri,
    contentType: string,
    compression?: CompressionLevel,
  ): IPackagePart;
  abstract deletePart(uri: PartUri): void;
  abstract saveAsync(): Promise<void>;
  abstract dispose(): Promise<void>;
  abstract [Symbol.dispose](): void;
  abstract [Symbol.asyncDispose](): Promise<void>;
}
