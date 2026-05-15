/**
 * OPC 核心属性（Core Properties）。对应包内 `docProps/core.xml`（dcterms 命名空间）。
 *
 * 与 .NET 的 `IPackageProperties` 一一对位。所有字段可读可写，未设置时为 `undefined`。
 *
 * @see DocumentFormat.OpenXml.Packaging.IPackageProperties
 */
export interface IPackageProperties {
  /** 文档标题。`dc:title` */
  title?: string;

  /** 主题。`dc:subject` */
  subject?: string;

  /** 主要作者标识（可为人名、邮箱、工号）。`dc:creator` */
  creator?: string;

  /** 关键字（一般为分隔列表）。`cp:keywords` */
  keywords?: string;

  /** 描述/摘要。`dc:description` */
  description?: string;

  /** 最后修改人。`cp:lastModifiedBy` */
  lastModifiedBy?: string;

  /** 版本号字符串，应用自维护。`cp:revision` */
  revision?: string;

  /** 最近一次打印时间。`cp:lastPrinted` */
  lastPrinted?: Date;

  /** 创建时间。`dcterms:created` */
  created?: Date;

  /** 最近修改时间。`dcterms:modified` */
  modified?: Date;

  /** 分类。`cp:category` */
  category?: string;

  /** 唯一标识（DOI、UUID 等）。`dc:identifier` */
  identifier?: string;

  /**
   * 内容类型描述（区分于 MIME；例如 "Whitepaper"、"Exam"）。`cp:contentType`
   */
  contentType?: string;

  /** 主要语言（RFC 3066，如 `en-US`）。`dc:language` */
  language?: string;

  /** 版本字符串。`cp:version` */
  version?: string;

  /** 内容状态（如 "Draft"、"Reviewed"）。`cp:contentStatus` */
  contentStatus?: string;
}
