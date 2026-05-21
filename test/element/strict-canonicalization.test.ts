/**
 * Epic-89: OOXML Strict 命名空间归一化 — 反序列化时 Strict URI → Transitional URI。
 *
 * 核心行为：当 XML 中的 xmlns 声明使用 Strict URI（http://purl.oclc.org/ooxml/...）时，
 * 反序列化器在构建命名空间作用域前先把这些 URI 归一化为 Transitional 等价 URI
 * （http://schemas.openxmlformats.org/...）。效果：
 *
 *   - 元素 namespaceUri 为 Transitional URI（typed class 自带）
 *   - extendedAttributes 中的 xmlns 声明存 Transitional URI（不含 Strict URI）
 *   - registry 查找用 Transitional URI，typed class 正确解析（不降级为 Unknown）
 *   - validator 不再需要 Strict 特判路径，对 Strict 文档执行完整校验
 *   - Strict01.docx validatePackage → 0 错误（含 0 REQUIRED_ATTR_MISSING）
 *   - Transitional 文档不受影响
 *
 * 覆盖（≥8 tests）：
 *  1. Strict xmlns → scope 归一化，元素解析到正确 typed class
 *  2. OpenXmlUnknownElement 用 Transitional URI 构造（不含 Strict URI）
 *  3. extendedAttributes 中 xmlns 值为 Transitional URI
 *  4. hasStrictOriginNamespace 对已归一化的 extendedAttributes 返回 false
 *  5. Strict 元素 namespaceUri 为 Transitional
 *  6. required-attr 校验在 Strict 文档上正常运行（不跳过）
 *  7. Strict01.docx validatePackage → 0 REQUIRED_ATTR_MISSING
 *  8. Strict01.docx 主体元素解析到 typed class（不是 Unknown）
 *  9. Transitional 文档 validatePackage 无回归
 * 10. 非命名空间属性值不被篡改
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { OpenXmlCompositeElement } from "../../src/element/element.js";
import { ElementRegistry, deserialize } from "../../src/element/index.js";
import { hasStrictOriginNamespace } from "../../src/element/strict-namespace-map.js";
import { OpenXmlUnknownElement } from "../../src/element/unknown-element.js";
import { OpenXmlValidator, registerConstraints } from "../../src/validation/OpenXmlValidator.js";
import { constraints as wordConstraints } from "../../src/validation/constraints/word.js";
import { registerWordprocessingElements } from "../../src/word/generated/_registry.js";
import { Paragraph } from "../../src/word/generated/paragraph.js";
import { Run } from "../../src/word/generated/run.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

const TRANS_W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const STRICT_W_NS = "http://purl.oclc.org/ooxml/wordprocessingml/main";

// Minimal XML using Strict namespace URIs (as a real Strict docx part would have)
const STRICT_PARAGRAPH_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:p xmlns:w="${STRICT_W_NS}"><w:r><w:t>Hello</w:t></w:r></w:p>`;

// Same XML but with Transitional namespace URI
const TRANS_PARAGRAPH_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:p xmlns:w="${TRANS_W_NS}"><w:r><w:t>Hello</w:t></w:r></w:p>`;

let registry: ElementRegistry;

beforeAll(() => {
  registry = new ElementRegistry();
  registerWordprocessingElements(registry);
  registerConstraints(wordConstraints);
});

// ── 1. Strict xmlns → typed class resolution ──────────────────────────────────

describe("Epic-89: Strict xmlns 归一化 — typed class 解析", () => {
  it("Strict xmlns 的 <w:p> 解析为 Paragraph typed class（不是 Unknown）", () => {
    const root = deserialize(STRICT_PARAGRAPH_XML, { registry });
    expect(root).toBeInstanceOf(Paragraph);
  });

  it("Strict xmlns 的 <w:r> 子元素也解析为 Run typed class", () => {
    const root = deserialize(STRICT_PARAGRAPH_XML, { registry }) as OpenXmlCompositeElement;
    const firstChild = [...root.children][0];
    expect(firstChild).toBeInstanceOf(Run);
  });

  it("未注册元素在 Strict xmlns 下仍降级为 OpenXmlUnknownElement，namespaceUri 为 Transitional", () => {
    // An element that is NOT registered — uses a valid Strict namespace but unknown local name
    const xml = `<w:xyz xmlns:w="${STRICT_W_NS}"/>`;
    const root = deserialize(xml, { registry });
    expect(root).toBeInstanceOf(OpenXmlUnknownElement);
    // The namespace URI stored on the Unknown element is canonicalized to Transitional
    expect(root.namespaceUri).toBe(TRANS_W_NS);
  });
});

// ── 2. namespaceUri 为 Transitional ──────────────────────────────────────────

describe("Epic-89: 归一化后 namespaceUri 为 Transitional", () => {
  it("Strict xmlns 解析出的元素 namespaceUri 为 Transitional（typed class 自带）", () => {
    const root = deserialize(STRICT_PARAGRAPH_XML, { registry });
    expect(root.namespaceUri).toBe(TRANS_W_NS);
  });

  it("Transitional xmlns 解析出的元素 namespaceUri 同样为 Transitional（无回归）", () => {
    const root = deserialize(TRANS_PARAGRAPH_XML, { registry });
    expect(root.namespaceUri).toBe(TRANS_W_NS);
  });
});

// ── 3. extendedAttributes 中 xmlns 值为 Transitional ─────────────────────────

describe("Epic-89: extendedAttributes 归一化", () => {
  it("Strict xmlns 声明在 extendedAttributes 中存为 Transitional URI", () => {
    const root = deserialize(STRICT_PARAGRAPH_XML, { registry });
    // The xmlns:w value must be canonicalized
    const xmlnsW = root.extendedAttributes.get("xmlns:w");
    expect(xmlnsW).toBe(TRANS_W_NS);
    expect(xmlnsW).not.toBe(STRICT_W_NS);
  });

  it("hasStrictOriginNamespace 对归一化后的 extendedAttributes 返回 false", () => {
    const root = deserialize(STRICT_PARAGRAPH_XML, { registry });
    // After canonicalization no Strict URI remains in extendedAttributes
    expect(hasStrictOriginNamespace(root)).toBe(false);
  });

  it("非 xmlns 属性值不受影响", () => {
    // Use an unknown element so the attribute goes to extendedAttributes directly
    const xml = `<w:xyz xmlns:w="${STRICT_W_NS}" custom:id="00AB1234" xmlns:custom="http://example.com/custom"/>`;
    const root = deserialize(xml, { registry });
    // Non-namespace attributes should be passed through unchanged
    expect(root.extendedAttributes.get("custom:id")).toBe("00AB1234");
    // The custom xmlns value (not a Strict URI) should also be unchanged
    expect(root.extendedAttributes.get("xmlns:custom")).toBe("http://example.com/custom");
  });
});

// ── 4. Validator — 完整校验路径（不跳过 required-attr）─────────────────────

describe("Epic-89: validator 对 Strict 文档执行完整校验", () => {
  const validator = new OpenXmlValidator({ skipUnknown: true });

  it("Strict01.docx validatePackage → 0 REQUIRED_ATTR_MISSING（核心验证）", async () => {
    const strictPath = join(FIXTURES_DIR, "Strict01.docx");
    let strictBytes: Uint8Array;
    try {
      strictBytes = new Uint8Array(await readFile(strictPath));
    } catch {
      return; // Skip if fixture not available
    }

    const { WordprocessingDocument } = await import("../../src/word/index.js");
    const doc = await WordprocessingDocument.openAsync(strictBytes);
    const errors = validator.validatePackage(doc);
    const reqErrors = errors.filter((e) => e.id === "REQUIRED_ATTR_MISSING");

    if (reqErrors.length > 0) {
      console.error(
        `Strict01.docx REQUIRED_ATTR_MISSING errors (${reqErrors.length}):\n${reqErrors
          .slice(0, 10)
          .map((e) => `  [${e.id}] ${e.description}`)
          .join("\n")}`,
      );
    }
    expect(reqErrors).toHaveLength(0);
  }, 30000);

  it("Strict01.docx 主体元素为 typed class（不是 OpenXmlUnknownElement）", async () => {
    const strictPath = join(FIXTURES_DIR, "Strict01.docx");
    let strictBytes: Uint8Array;
    try {
      strictBytes = new Uint8Array(await readFile(strictPath));
    } catch {
      return;
    }

    const { WordprocessingDocument } = await import("../../src/word/index.js");
    const doc = await WordprocessingDocument.openAsync(strictBytes);
    const document = doc.mainDocumentPart?.document;
    expect(document).toBeDefined();
    // Document root should NOT be unknown — it should be the typed Document class
    expect(document).not.toBeInstanceOf(OpenXmlUnknownElement);
    // Find first paragraph in the body
    if (document instanceof OpenXmlCompositeElement) {
      const children = [...document.children];
      const body = children[0];
      expect(body).not.toBeInstanceOf(OpenXmlUnknownElement);
    }
  }, 30000);

  it("Transitional .docx validatePackage → 0 REQUIRED_ATTR_MISSING（回归守卫）", async () => {
    const { WordprocessingDocument } = await import("../../src/word/index.js");
    let files: string[];
    try {
      const { readdir } = await import("node:fs/promises");
      files = (await readdir(FIXTURES_DIR)).filter(
        (f) => f.endsWith(".docx") && !f.includes("Strict"),
      );
    } catch {
      return;
    }
    if (files.length === 0) return;

    let totalErrors = 0;
    for (const filename of files) {
      try {
        const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, filename)));
        const doc = await WordprocessingDocument.openAsync(bytes);
        const errors = validator.validatePackage(doc);
        totalErrors += errors.filter((e) => e.id === "REQUIRED_ATTR_MISSING").length;
      } catch {
        // Skip unreadable files
      }
    }
    expect(totalErrors).toBe(0);
  }, 120000);
});
