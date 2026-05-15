import type { IPackageProperties } from "../../packaging/interfaces/properties.js";

/**
 * 内存版的核心属性容器。所有字段直接 mutable，调用方按 `pkg.properties.title = "x"` 写入。
 *
 * 等 Story-1.3 接入 ContentTypes 之后再决定是否把 properties 序列化到 `docProps/core.xml`。
 */
export class MemoryPackageProperties implements IPackageProperties {
  title?: string;
  subject?: string;
  creator?: string;
  keywords?: string;
  description?: string;
  lastModifiedBy?: string;
  revision?: string;
  lastPrinted?: Date;
  created?: Date;
  modified?: Date;
  category?: string;
  identifier?: string;
  contentType?: string;
  language?: string;
  version?: string;
  contentStatus?: string;
}
