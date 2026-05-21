/**
 * openxml-ts — TypeScript port of Microsoft Open-XML-SDK.
 *
 * Public API surface will be exported here as the OPC Packaging core
 * (Epic-1) and subsequent document-specific Epics are implemented.
 */

export const PACKAGE_NAME = "openxml-ts" as const;

export * from "./packaging/index.js";
export * from "./element/index.js";
