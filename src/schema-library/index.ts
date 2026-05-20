/**
 * `openxml-ts/schema-library` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { SchemaLibrary, Schema, registerSchemaLibraryElements } from "openxml-ts/schema-library";
 * ```
 */

export * from "./generated/index.js";
export { registerSchemaLibraryElements } from "./generated/_registry.js";
