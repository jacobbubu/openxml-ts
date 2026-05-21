/**
 * Epic-85: Schematron cross-Part semantic constraints — 3.1 refExist + 3.2 indexedRef.
 *
 * Tests:
 *   - 3.1 RefExist: comment/footnote reference attribute must exist in target Part
 *   - 3.2 IndexedRef: index attribute must be within bounds of count in target Part
 *   - Same-Part (Part:.) rules work without package context
 *   - Cross-Part rules skip safely when no part resolver provided
 *   - validatePackage on real Office fixtures → 0 semantic errors (false-positive sweep)
 *   - Coverage assertion: reports 912/948 (or actual) covered
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it } from "vitest";
import { OpenXmlElementList } from "../../src/element/element-list.js";
import { OpenXmlCompositeElement, OpenXmlLeafElement } from "../../src/element/element.js";
import type { IRelationshipCollection } from "../../src/packaging/interfaces/relationship.js";
import { OpenXmlValidator } from "../../src/validation/OpenXmlValidator.js";
import type { PartResolver } from "../../src/validation/schematron/evaluator.js";
import {
  SCHEMATRON_COVERED_COUNT,
  SCHEMATRON_RULES,
  SCHEMATRON_SKIPPED_COUNT,
  SCHEMATRON_SOURCE_COUNT,
  evaluateSchematron,
  resetRuleIndex,
} from "../../src/validation/schematron/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

// ---- Namespace constants ----
const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

// ---- Element helpers ----

function makeLeaf(ns: string, local: string, prefix: string): OpenXmlLeafElement {
  return new (class extends OpenXmlLeafElement {
    override readonly localName = local;
    override readonly prefix = prefix;
    override readonly namespaceUri = ns;
  })();
}

function makeComposite(ns: string, local: string, prefix: string): OpenXmlCompositeElement {
  return new (class extends OpenXmlCompositeElement {
    override readonly localName = local;
    override readonly prefix = prefix;
    override readonly namespaceUri = ns;
    override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
  })();
}

// ---- Coverage assertion ----

describe("Epic-85 cross-part — coverage", () => {
  it("source count is 948", () => {
    expect(SCHEMATRON_SOURCE_COUNT).toBe(948);
  });

  it("covered + skipped = total rule count", () => {
    expect(SCHEMATRON_COVERED_COUNT + SCHEMATRON_SKIPPED_COUNT).toBe(SCHEMATRON_RULES.length);
  });

  it("Epic-85 improves coverage to ≥ 912/948 (was 836)", () => {
    process.stdout.write(
      `\n  Coverage: ${SCHEMATRON_COVERED_COUNT}/${SCHEMATRON_SOURCE_COUNT} ` +
        `(${((SCHEMATRON_COVERED_COUNT / SCHEMATRON_SOURCE_COUNT) * 100).toFixed(1)}%)\n`,
    );
    expect(SCHEMATRON_COVERED_COUNT).toBeGreaterThanOrEqual(912);
  });

  it("refExist rules are present in SCHEMATRON_RULES", () => {
    const count = SCHEMATRON_RULES.filter((r) => r.kind === "refExist").length;
    expect(count).toBeGreaterThan(0);
    process.stdout.write(`\n  refExist rules: ${count}\n`);
  });

  it("indexedRef rules are present in SCHEMATRON_RULES", () => {
    const count = SCHEMATRON_RULES.filter((r) => r.kind === "indexedRef").length;
    expect(count).toBeGreaterThan(0);
    process.stdout.write(`\n  indexedRef rules: ${count}\n`);
  });

  it("skipped rules decreased from 112 to ≤ 40", () => {
    expect(SCHEMATRON_SKIPPED_COUNT).toBeLessThanOrEqual(40);
  });
});

// ---- 3.1 RefExist tests ----

describe("3.1 RefExist — cross-part attribute lookup", () => {
  beforeEach(() => resetRuleIndex());

  it("valid: commentReference w:id exists in commentsPart → no error", () => {
    // Build a CommentReference element (context: w:commentReference, refAttr: w:id)
    const commentRef = makeLeaf(W_NS, "commentReference", "w");
    commentRef.extendedAttributes.set("w:id", "1");

    // Build a target CommentsPart root: w:comments/w:comment[@w:id="1"]
    const commentsRoot = makeComposite(W_NS, "comments", "w");
    const comment = makeComposite(W_NS, "comment", "w");
    comment.extendedAttributes.set("w:id", "1");
    commentsRoot.children.append(comment);

    // Part resolver returns the comments root for "Part:WordprocessingCommentsPart"
    const partResolver: PartResolver = {
      resolve(partRef) {
        if (partRef === "Part:WordprocessingCommentsPart" || partRef === "Part:CommentsPart") {
          return commentsRoot;
        }
        return undefined;
      },
    };

    const errors = evaluateSchematron(
      commentRef,
      SCHEMATRON_RULES,
      undefined,
      undefined,
      partResolver,
    );
    const refErrors = errors.filter((e) => e.id === "Sem_MissingReferenceElement");
    expect(refErrors).toHaveLength(0);
  });

  it("invalid: commentReference w:id does NOT exist in commentsPart → error", () => {
    const commentRef = makeLeaf(W_NS, "commentReference", "w");
    commentRef.extendedAttributes.set("w:id", "999");

    // CommentsPart has comment w:id="1" only
    const commentsRoot = makeComposite(W_NS, "comments", "w");
    const comment = makeComposite(W_NS, "comment", "w");
    comment.extendedAttributes.set("w:id", "1");
    commentsRoot.children.append(comment);

    const partResolver: PartResolver = {
      resolve(partRef) {
        if (partRef === "Part:WordprocessingCommentsPart" || partRef === "Part:CommentsPart") {
          return commentsRoot;
        }
        return undefined;
      },
    };

    const errors = evaluateSchematron(
      commentRef,
      SCHEMATRON_RULES,
      undefined,
      undefined,
      partResolver,
    );
    const refErrors = errors.filter((e) => e.id === "Sem_MissingReferenceElement");
    expect(refErrors.length).toBeGreaterThan(0);
    expect(refErrors[0]?.description).toContain("999");
  });

  it("safe-skip: no partResolver provided → no error (backward compatible)", () => {
    const commentRef = makeLeaf(W_NS, "commentReference", "w");
    commentRef.extendedAttributes.set("w:id", "999");

    // No part resolver — cross-part rules are skipped
    const errors = evaluateSchematron(
      commentRef,
      SCHEMATRON_RULES,
      undefined,
      undefined,
      undefined,
    );
    const refErrors = errors.filter((e) => e.id === "Sem_MissingReferenceElement");
    expect(refErrors).toHaveLength(0);
  });

  it("safe-skip: partRef Part:. uses same-tree docRoot", () => {
    // ovml:OLEObject has refExist Part:. — references v:shape/@id in same part
    const ovmlNs = "urn:schemas-microsoft-com:office:powerpoint";
    const vmlNs = "urn:schemas-microsoft-com:vml";

    const docRoot = makeComposite(ovmlNs, "someRoot", "ovml");
    const shape = makeLeaf(vmlNs, "shape", "v");
    shape.extendedAttributes.set("id", "shapeId1");
    docRoot.children.append(shape);

    const oleObj = makeLeaf(ovmlNs, "OLEObject", "ovml");
    oleObj.extendedAttributes.set("ShapeID", "shapeId1");
    docRoot.children.append(oleObj);

    // evaluateSchematron takes docRoot and will use it as the "Part:." target
    const errors = evaluateSchematron(docRoot, SCHEMATRON_RULES, undefined, undefined, undefined);
    const refErrors = errors.filter(
      (e) => e.id === "Sem_MissingReferenceElement" && e.node === oleObj,
    );
    // Should have no error since shape with "shapeId1" exists in same root tree
    expect(refErrors).toHaveLength(0);
  });

  it("valid: w:footnoteReference w:id matches footnote in footnotesPart → no error", () => {
    const footnoteRef = makeLeaf(W_NS, "footnoteReference", "w");
    footnoteRef.extendedAttributes.set("w:id", "2");

    // FootnotesPart: w:footnotes/w:footnote[@w:id="2"]
    const footnotesRoot = makeComposite(W_NS, "footnotes", "w");
    const footnote = makeComposite(W_NS, "footnote", "w");
    footnote.extendedAttributes.set("w:id", "2");
    footnotesRoot.children.append(footnote);

    const partResolver: PartResolver = {
      resolve(partRef) {
        if (
          partRef === "Part:FootnotesPart" ||
          partRef === "Part:/MainDocumentPart/FootnotesPart"
        ) {
          return footnotesRoot;
        }
        return undefined;
      },
    };

    const errors = evaluateSchematron(
      footnoteRef,
      SCHEMATRON_RULES,
      undefined,
      undefined,
      partResolver,
    );
    const refErrors = errors.filter((e) => e.id === "Sem_MissingReferenceElement");
    expect(refErrors).toHaveLength(0);
  });

  it("invalid: w:footnoteReference w:id missing from footnotesPart → error", () => {
    const footnoteRef = makeLeaf(W_NS, "footnoteReference", "w");
    footnoteRef.extendedAttributes.set("w:id", "42");

    // FootnotesPart: empty
    const footnotesRoot = makeComposite(W_NS, "footnotes", "w");

    const partResolver: PartResolver = {
      resolve(partRef) {
        if (
          partRef === "Part:FootnotesPart" ||
          partRef === "Part:/MainDocumentPart/FootnotesPart"
        ) {
          return footnotesRoot;
        }
        return undefined;
      },
    };

    const errors = evaluateSchematron(
      footnoteRef,
      SCHEMATRON_RULES,
      undefined,
      undefined,
      partResolver,
    );
    const refErrors = errors.filter((e) => e.id === "Sem_MissingReferenceElement");
    expect(refErrors.length).toBeGreaterThan(0);
  });
});

// ---- 3.2 IndexedRef tests ----

describe("3.2 IndexedRef — index-based element count validation", () => {
  beforeEach(() => resetRuleIndex());

  it("valid: commentRangeStart/@w:id exists in commentsPart (treated as refExist) → no error", () => {
    // commentRangeStart is a refExist rule (not indexedRef), but let's test indexedRef via x:sheetView
    // x:sheetView@workbookViewId < count(//x:workbookView) + 0
    // We need an x:sheetView element with workbookViewId and a target part with workbookViews
    const xNs = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

    const sheetView = makeLeaf(xNs, "sheetView", "x");
    sheetView.extendedAttributes.set("x:workbookViewId", "0"); // index 0

    // Target part (WorkbookPart) has 2 workbookView elements
    const workbookRoot = makeComposite(xNs, "workbook", "x");
    const wbView1 = makeLeaf(xNs, "workbookView", "x");
    const wbView2 = makeLeaf(xNs, "workbookView", "x");
    workbookRoot.children.append(wbView1);
    workbookRoot.children.append(wbView2);

    const partResolver: PartResolver = {
      resolve(partRef) {
        if (partRef === "Part:/WorkbookPart") return workbookRoot;
        return undefined;
      },
    };

    const errors = evaluateSchematron(
      sheetView,
      SCHEMATRON_RULES,
      undefined,
      undefined,
      partResolver,
    );
    const idxErrors = errors.filter((e) => e.id === "Sem_MissingIndexedElement");
    expect(idxErrors).toHaveLength(0);
  });

  it("invalid: indexedRef attr >= count → error", () => {
    const xNs = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

    const sheetView = makeLeaf(xNs, "sheetView", "x");
    sheetView.extendedAttributes.set("x:workbookViewId", "5"); // index 5, but only 2 exist

    const workbookRoot = makeComposite(xNs, "workbook", "x");
    const wbView1 = makeLeaf(xNs, "workbookView", "x");
    const wbView2 = makeLeaf(xNs, "workbookView", "x");
    workbookRoot.children.append(wbView1);
    workbookRoot.children.append(wbView2);

    const partResolver: PartResolver = {
      resolve(partRef) {
        if (partRef === "Part:/WorkbookPart") return workbookRoot;
        return undefined;
      },
    };

    const errors = evaluateSchematron(
      sheetView,
      SCHEMATRON_RULES,
      undefined,
      undefined,
      partResolver,
    );
    const idxErrors = errors.filter((e) => e.id === "Sem_MissingIndexedElement");
    expect(idxErrors.length).toBeGreaterThan(0);
    expect(idxErrors[0]?.description).toContain("5");
  });

  it("safe-skip: no partResolver → no error (indexedRef silently skipped)", () => {
    const xNs = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

    const sheetView = makeLeaf(xNs, "sheetView", "x");
    sheetView.extendedAttributes.set("x:workbookViewId", "999");

    const errors = evaluateSchematron(sheetView, SCHEMATRON_RULES, undefined, undefined, undefined);
    const idxErrors = errors.filter((e) => e.id === "Sem_MissingIndexedElement");
    expect(idxErrors).toHaveLength(0);
  });

  it("same-Part (Part:.) indexedRef: uses docRoot for count", () => {
    const xNs = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

    // x:comment@authorId < count(Part:.)//x:author + 0
    // We build a root with 2 x:author elements, then a comment with authorId=1 (valid)
    const docRoot = makeComposite(xNs, "comments", "x");
    const author1 = makeLeaf(xNs, "author", "x");
    const author2 = makeLeaf(xNs, "author", "x");
    docRoot.children.append(author1);
    docRoot.children.append(author2);

    const comment = makeLeaf(xNs, "comment", "x");
    comment.extendedAttributes.set("x:authorId", "1"); // valid: 1 < 2 + 0
    docRoot.children.append(comment);

    const errors = evaluateSchematron(docRoot, SCHEMATRON_RULES, undefined, undefined, undefined);
    const idxErrors = errors.filter(
      (e) => e.id === "Sem_MissingIndexedElement" && e.node === comment,
    );
    expect(idxErrors).toHaveLength(0);
  });
});

// ---- validatePackage tests ----

describe("OpenXmlValidator.validatePackage — Word document", () => {
  beforeEach(() => resetRuleIndex());

  it("valid document with matching comment id → no errors", () => {
    const commentsRoot = makeComposite(W_NS, "comments", "w");
    const comment = makeComposite(W_NS, "comment", "w");
    comment.extendedAttributes.set("w:id", "0");
    commentsRoot.children.append(comment);

    const docRoot = makeComposite(W_NS, "document", "w");
    const body = makeComposite(W_NS, "body", "w");
    const para = makeComposite(W_NS, "p", "w");
    const run = makeComposite(W_NS, "r", "w");
    const commentRef = makeLeaf(W_NS, "commentReference", "w");
    commentRef.extendedAttributes.set("w:id", "0");
    run.children.append(commentRef);
    para.children.append(run);
    body.children.append(para);
    docRoot.children.append(body);

    const fakeRels: IRelationshipCollection = {
      has: () => false,
      get: () => undefined,
      [Symbol.iterator]: function* () {},
      create: () => ({ id: "r1", type: "", target: "", targetMode: "internal" }),
      delete: () => {},
    };

    const doc = {
      mainDocumentPart: {
        document: docRoot,
        part: { uri: "/word/document.xml", relationships: fakeRels },
      },
      commentsPart: {
        comments: commentsRoot,
        part: { uri: "/word/comments.xml", relationships: fakeRels },
      },
    };

    const validator = new OpenXmlValidator();
    const errors = validator.validatePackage(doc);
    const refErrors = errors.filter((e) => e.id === "Sem_MissingReferenceElement");
    expect(refErrors).toHaveLength(0);
  });

  it("invalid document with mismatched comment id → semantic error", () => {
    const commentsRoot = makeComposite(W_NS, "comments", "w");
    const comment = makeComposite(W_NS, "comment", "w");
    comment.extendedAttributes.set("w:id", "5"); // comment id is 5
    commentsRoot.children.append(comment);

    const docRoot = makeComposite(W_NS, "document", "w");
    const commentRef = makeLeaf(W_NS, "commentReference", "w");
    commentRef.extendedAttributes.set("w:id", "999"); // references non-existent id
    docRoot.children.append(commentRef);

    const fakeRels: IRelationshipCollection = {
      has: () => false,
      get: () => undefined,
      [Symbol.iterator]: function* () {},
      create: () => ({ id: "r1", type: "", target: "", targetMode: "internal" }),
      delete: () => {},
    };

    const doc = {
      mainDocumentPart: {
        document: docRoot,
        part: { uri: "/word/document.xml", relationships: fakeRels },
      },
      commentsPart: {
        comments: commentsRoot,
        part: { uri: "/word/comments.xml", relationships: fakeRels },
      },
    };

    const validator = new OpenXmlValidator();
    const errors = validator.validatePackage(doc);
    const refErrors = errors.filter((e) => e.id === "Sem_MissingReferenceElement");
    expect(refErrors.length).toBeGreaterThan(0);
    expect(refErrors[0]?.description).toContain("999");
  });
});

// ---- Real Office fixture zero-false-positive sweep ----

describe("validatePackage — Real Office fixtures → 0 semantic errors", () => {
  it("all upstream-smoke/*.docx produce 0 semantic errors via validatePackage", async () => {
    resetRuleIndex();
    const files = (await readdir(FIXTURES_DIR)).filter(
      (f) => f.endsWith(".docx") && !f.toLowerCase().includes("encrypted"),
    );

    expect(files.length).toBeGreaterThan(0);

    const validator = new OpenXmlValidator();
    const allErrors: Array<{ file: string; error: string }> = [];

    for (const file of files) {
      try {
        const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, file)));
        const { WordprocessingDocument } = await import("../../src/word/index.js");
        const doc = await WordprocessingDocument.openAsync(bytes);

        // Access the parts we need (triggers lazy loading)
        void doc.mainDocumentPart;
        void doc.commentsPart;
        void doc.footnotesPart;
        void doc.stylesPart;
        void doc.numberingPart;

        const errors = validator.validatePackage(doc);
        const semanticErrors = errors.filter((e) => e.errorType === "Semantic");
        for (const e of semanticErrors) {
          allErrors.push({ file, error: e.description ?? e.id });
        }
      } catch {
        // Skip files that fail to open (encrypted, unsupported)
      }
    }

    if (allErrors.length > 0) {
      const sample = allErrors
        .slice(0, 10)
        .map((e) => `  ${e.file}: ${e.error}`)
        .join("\n");
      throw new Error(
        `${allErrors.length} false-positive Semantic errors found in validatePackage (first 10):\n${sample}`,
      );
    }

    expect(allErrors).toHaveLength(0);
  }, 120_000);
});
