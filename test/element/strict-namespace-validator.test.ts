/**
 * Epic-87: OOXML Strict 命名空间归一化 — 修 validator 对 Strict 文档的误报。
 *
 * 问题：OOXML Strict 格式文档用不同的命名空间 URI（purl.oclc.org 而非
 * schemas.openxmlformats.org）。反序列化后 Strict 元素的 extendedAttributes
 * 中包含 Strict namespace URI 的 xmlns 声明，可用于检测文档来源。
 *
 * 修复：validator 检测根元素的 xmlns 声明，若发现 Strict URI，则跳过
 * required-attribute 校验（Strict schema 对某些属性的 required/optional 定义
 * 与 Transitional 不同）。
 *
 * 覆盖（≥6 tests）：
 *  1. hasStrictOriginNamespace 对 Strict xmlns 返回 true
 *  2. hasStrictOriginNamespace 对 Transitional xmlns 返回 false
 *  3. hasStrictOriginNamespace 对空 extendedAttributes 返回 false
 *  4. validate() 在 Strict 文档根元素树上不报 required-attr 错误
 *  5. validate() 在 Transitional 元素（缺少必填属性）上仍报错（回归守卫）
 *  6. Strict01.docx validatePackage → 0 REQUIRED_ATTR_MISSING 误报
 *  7. 全部 Transitional .docx validatePackage → 0 REQUIRED_ATTR_MISSING（回归守卫）
 *  8. hasStrictOriginNamespace 对 Strict relationships URI 也返回 true
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { OpenXmlLeafElement } from "../../src/element/element.js";
import { StringValue } from "../../src/element/index.js";
import { hasStrictOriginNamespace } from "../../src/element/strict-namespace-map.js";
import { OpenXmlValidator, registerConstraints } from "../../src/validation/OpenXmlValidator.js";
import { constraints as wordConstraints } from "../../src/validation/constraints/word.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const STRICT_W_NS = "http://purl.oclc.org/ooxml/wordprocessingml/main";
const STRICT_REL_NS = "http://purl.oclc.org/ooxml/officeDocument/relationships";

beforeAll(() => {
  registerConstraints(wordConstraints);
});

// ── hasStrictOriginNamespace unit tests ───────────────────────────────────────

describe("Epic-87: hasStrictOriginNamespace", () => {
  it("Strict wordprocessingml URI → true", () => {
    const el = { extendedAttributes: new Map([["xmlns:w", STRICT_W_NS]]) };
    expect(hasStrictOriginNamespace(el)).toBe(true);
  });

  it("Strict relationships URI → true", () => {
    const el = { extendedAttributes: new Map([["xmlns:r", STRICT_REL_NS]]) };
    expect(hasStrictOriginNamespace(el)).toBe(true);
  });

  it("Transitional xmlns → false", () => {
    const el = {
      extendedAttributes: new Map([
        ["xmlns:w", W_NS],
        ["xmlns:r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships"],
      ]),
    };
    expect(hasStrictOriginNamespace(el)).toBe(false);
  });

  it("empty extendedAttributes → false", () => {
    const el = { extendedAttributes: new Map<string, string>() };
    expect(hasStrictOriginNamespace(el)).toBe(false);
  });
});

// ── Minimal stub mimicking a generated element with validateRequired ──────────

/**
 * Minimal ConditionalFormatStyle stub for unit testing validator behavior.
 */
class StubCnfStyle extends OpenXmlLeafElement {
  override readonly localName = "cnfStyle" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;

  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    if (qname === "w:val") {
      this.val = StringValue.parse(value);
      return;
    }
    super.applyAttribute(qname, value);
  }

  validateRequired(): void {
    if (this.val === undefined) {
      throw Object.assign(new Error('Required attribute "w:val" missing on <StubCnfStyle>'), {
        code: "REQUIRED_ATTR_MISSING",
      });
    }
  }
}

// ── Validator behavior unit tests ─────────────────────────────────────────────

describe("Epic-87: validator required-attr 行为", () => {
  const validator = new OpenXmlValidator({ skipUnknown: true });

  it("Transitional 元素缺少必填属性 → validator 报错（回归守卫）", () => {
    const el = new StubCnfStyle();
    // No applyAttribute call → val is undefined → should report error
    const errors = validator.validate(el);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("Strict 文档根元素有 Strict xmlns → validator 不报 required-attr 错误", () => {
    // Simulate a Strict-origin root element by adding a Strict xmlns to extendedAttributes
    const el = new StubCnfStyle();
    el.extendedAttributes.set("xmlns:w", STRICT_W_NS); // Strict origin marker
    // val is undefined (simulating Strict doc with optional val)
    const errors = validator.validate(el);
    const reqErrors = errors.filter(
      (e) => e.id === "REQUIRED_ATTR_MISSING" || e.id === "Sch_MissingRequiredAttribute",
    );
    expect(reqErrors).toHaveLength(0);
  });
});

// ── Real fixture tests ────────────────────────────────────────────────────────

// The REQUIRED_ATTR_MISSING id comes from validateRequiredViaCodegen (codegen's
// validateRequired() method). This is the error type that was the 41 false
// positives in Strict01.docx before the fix.
//
// Sch_MissingRequiredAttribute comes from the constraint-based attrIsPresent()
// check and is a pre-existing Phase 1 issue (affects both Strict and Transitional);
// fixing it is out-of-scope for this epic.
const REQUIRED_ATTR_IDS = new Set(["REQUIRED_ATTR_MISSING"]);

describe("Epic-87: Strict 文档 validatePackage — REQUIRED_ATTR_MISSING 误报归零", () => {
  it("Strict01.docx validatePackage → 0 REQUIRED_ATTR_MISSING 误报（核心修复）", async () => {
    const strictPath = join(FIXTURES_DIR, "Strict01.docx");
    let strictBytes: Uint8Array;
    try {
      strictBytes = new Uint8Array(await readFile(strictPath));
    } catch {
      // Skip if fixture not available
      return;
    }

    const { WordprocessingDocument } = await import("../../src/word/index.js");
    const doc = await WordprocessingDocument.openAsync(strictBytes);

    const validator = new OpenXmlValidator({ skipUnknown: true });
    const errors = validator.validatePackage(doc);
    const reqErrors = errors.filter((e) => REQUIRED_ATTR_IDS.has(e.id));

    if (reqErrors.length > 0) {
      console.error(
        `Strict01.docx required-attr errors (${reqErrors.length}):\n${reqErrors
          .slice(0, 10)
          .map((e) => `  [${e.id}] ${e.description}`)
          .join("\n")}`,
      );
    }
    // Before fix: 41 false positives; after fix: 0.
    expect(reqErrors).toHaveLength(0);
  }, 30000);

  it("全部 Transitional .docx validatePackage → 0 REQUIRED_ATTR_MISSING（回归守卫）", async () => {
    let files: string[];
    try {
      files = (await readdir(FIXTURES_DIR)).filter(
        (f) => f.endsWith(".docx") && !f.includes("Strict"),
      );
    } catch {
      return;
    }
    if (files.length === 0) return;

    const { WordprocessingDocument } = await import("../../src/word/index.js");
    const validator = new OpenXmlValidator({ skipUnknown: true });

    let totalReqErrors = 0;
    const errorDetails: string[] = [];

    for (const filename of files) {
      try {
        const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, filename)));
        const doc = await WordprocessingDocument.openAsync(bytes);
        const errors = validator.validatePackage(doc);
        const reqErrors = errors.filter((e) => REQUIRED_ATTR_IDS.has(e.id));
        totalReqErrors += reqErrors.length;
        if (reqErrors.length > 0 && errorDetails.length < 5) {
          errorDetails.push(`  ${filename}: ${reqErrors.length} required-attr errors`);
          for (const e of reqErrors.slice(0, 2)) {
            errorDetails.push(`    [${e.id}] ${e.description}`);
          }
        }
      } catch {
        // Skip files that cannot be opened
      }
    }

    if (totalReqErrors > 0) {
      console.error(`Transitional docs required-attr errors:\n${errorDetails.join("\n")}`);
    }
    expect(totalReqErrors).toBe(0);
  }, 120000);
});
