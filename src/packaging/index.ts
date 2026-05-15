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
