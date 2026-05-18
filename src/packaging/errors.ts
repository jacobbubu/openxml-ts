import type { PartUri } from "./interfaces/types.js";

/**
 * 包级错误码字面量联合。增删时务必同步更新 PRD §FR-7 与 architecture §6。
 *
 * 调用方可以这样 narrow：
 *
 * ```ts
 * try {
 *   await pkg.openAsync(badZip);
 * } catch (err) {
 *   if (err instanceof OpenXmlPackageError) {
 *     if (err.code === "INVALID_ZIP") { ... }
 *   }
 * }
 * ```
 */
export type OpenXmlPackageErrorCode =
  | "INVALID_ZIP"
  | "MISSING_CONTENT_TYPES"
  | "PART_NOT_FOUND"
  | "PART_ALREADY_EXISTS"
  | "RELATIONSHIP_ID_CONFLICT"
  | "RELATIONSHIP_TARGET_INVALID"
  | "CONTENT_TYPE_MISSING"
  | "UNSUPPORTED_OPERATION"
  | "BACKEND_ERROR"
  | "INVALID_PART_URI"
  | "STREAM_CLOSED"
  | "SECURITY_VIOLATION"
  // Story-2.7 validators
  | "REQUIRED_ATTR_MISSING"
  | "STRING_TOO_LONG"
  | "NUMBER_OUT_OF_RANGE"
  | "ENUM_VALUE_INVALID"
  // Phase D：加密包检测
  | "ENCRYPTED_PACKAGE_NOT_SUPPORTED";

/**
 * 构造 {@link OpenXmlPackageError} 的入参。
 *
 * 所有可选字段使用 `exactOptionalPropertyTypes`：调用方不要传 `undefined`，
 * 应直接省略键。
 */
export interface OpenXmlPackageErrorOptions {
  readonly code: OpenXmlPackageErrorCode;
  readonly message?: string;
  readonly partUri?: PartUri;
  readonly relationshipId?: string;
  readonly cause?: unknown;
  /** Story-2.7 validator 上下文：受违例的 schema 属性 qname（如 `"w:author"`）。 */
  readonly attribute?: string;
  /** Story-2.7 validator 上下文：所在 element 类名（如 `"Paragraph"`）。 */
  readonly elementClass?: string;
}

const DEFAULT_MESSAGES: Readonly<Record<OpenXmlPackageErrorCode, string>> = {
  INVALID_ZIP: "ZIP container is malformed or unreadable",
  MISSING_CONTENT_TYPES: "[Content_Types].xml is missing or invalid",
  PART_NOT_FOUND: "Requested package part does not exist",
  PART_ALREADY_EXISTS: "A package part with this URI already exists",
  RELATIONSHIP_ID_CONFLICT: "A relationship with this id already exists",
  RELATIONSHIP_TARGET_INVALID: "Relationship target URI is not acceptable",
  CONTENT_TYPE_MISSING: "Content type for the part cannot be resolved from Content-Types map",
  UNSUPPORTED_OPERATION: "Operation is not supported in the current access mode",
  BACKEND_ERROR: "Underlying storage backend reported an error",
  INVALID_PART_URI: "Part URI does not satisfy OPC §9.1 rules",
  STREAM_CLOSED: "Stream has already been closed",
  SECURITY_VIOLATION: "Operation refused by security policy (size/path/decoder limits)",
  REQUIRED_ATTR_MISSING: "Required attribute is missing",
  STRING_TOO_LONG: "Attribute value exceeds the schema MaxLength bound",
  NUMBER_OUT_OF_RANGE: "Attribute numeric value is outside the schema-allowed range",
  ENUM_VALUE_INVALID: "Attribute value is not a member of the schema-defined enumeration",
  ENCRYPTED_PACKAGE_NOT_SUPPORTED:
    "Encrypted OOXML package detected (CFB container); decryption is not implemented",
};

/**
 * 所有包级错误的统一基类。
 *
 * - `code` 字段用字面量联合，便于 `switch` narrow；
 * - `cause` 透传底层异常（如 backend 抛的 ZIP 错误），保留完整链路；
 * - `partUri` / `relationshipId` 在已知时提供上下文。
 *
 * 设计参考 architecture.md §6 / ADR-004。
 */
export class OpenXmlPackageError extends Error {
  override readonly name = "OpenXmlPackageError";

  readonly code: OpenXmlPackageErrorCode;
  readonly partUri: PartUri | undefined;
  readonly relationshipId: string | undefined;
  readonly attribute: string | undefined;
  readonly elementClass: string | undefined;

  constructor(options: OpenXmlPackageErrorOptions) {
    const message = options.message ?? DEFAULT_MESSAGES[options.code];
    super(message, options.cause !== undefined ? { cause: options.cause } : undefined);
    this.code = options.code;
    this.partUri = options.partUri;
    this.relationshipId = options.relationshipId;
    this.attribute = options.attribute;
    this.elementClass = options.elementClass;
  }

  /**
   * JSON 友好的可观察形态。`Error` 默认不参与 JSON 序列化，本方法补齐。
   *
   * 注意：`cause` 也会被序列化（最多一层）；嵌套 cause 仅展开到字符串。
   */
  toJSON(): {
    name: string;
    code: OpenXmlPackageErrorCode;
    message: string;
    partUri?: PartUri;
    relationshipId?: string;
    cause?: unknown;
  } {
    const out: {
      name: string;
      code: OpenXmlPackageErrorCode;
      message: string;
      partUri?: PartUri;
      relationshipId?: string;
      cause?: unknown;
    } = {
      name: this.name,
      code: this.code,
      message: this.message,
    };
    if (this.partUri !== undefined) out.partUri = this.partUri;
    if (this.relationshipId !== undefined) out.relationshipId = this.relationshipId;
    if (this.cause !== undefined) {
      out.cause =
        this.cause instanceof Error
          ? { name: this.cause.name, message: this.cause.message }
          : String(this.cause);
    }
    return out;
  }
}
