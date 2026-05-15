/**
 * Story-2.6 端到端：WordprocessingDocument 强类型门面 + typed Parts。
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  Document,
  MainDocumentPart,
  Paragraph,
  Run,
  StylesPart,
  Text,
  WordprocessingDocument,
} from "../../src/word/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/golden");

async function loadHelloWorld(): Promise<Uint8Array> {
  return new Uint8Array(await readFile(join(FIXTURES_DIR, "HelloWorld.docx")));
}

describe("WordprocessingDocument · open & navigate", () => {
  it("从真实 HelloWorld.docx 打开 → 主文档 Part 可访问", async () => {
    const bytes = await loadHelloWorld();
    const doc = await WordprocessingDocument.openAsync(bytes);
    expect(doc.mainDocumentPart).toBeInstanceOf(MainDocumentPart);
    expect(doc.mainDocumentPart!.document).toBeInstanceOf(Document);
  });

  it("typed Parts 多次访问返回同一实例（cache 行为）", async () => {
    const doc = await WordprocessingDocument.openAsync(await loadHelloWorld());
    const a = doc.mainDocumentPart;
    const b = doc.mainDocumentPart;
    expect(a).toBe(b);
  });

  it("访问 stylesPart 走 part-level relationship", async () => {
    const doc = await WordprocessingDocument.openAsync(await loadHelloWorld());
    expect(doc.stylesPart).toBeInstanceOf(StylesPart);
  });

  it("不存在的关系返回 undefined", async () => {
    // 用空内存包 + 没有任何 office relationship 验证
    const doc = WordprocessingDocument.create();
    // create() 加了 officeDocument 关系，但没有 styles
    expect(doc.stylesPart).toBeUndefined();
  });
});

describe("WordprocessingDocument · mutate + saveAs + reopen", () => {
  it("修改第一个段落的文本 → save → reopen 后文本已更新", async () => {
    const bytes = await loadHelloWorld();
    const doc = await WordprocessingDocument.openAsync(bytes);

    // 找到第一个 Text
    const body = doc.mainDocumentPart!.document;
    const allText = [...body.descendants(Text)];
    expect(allText.length).toBeGreaterThan(0);
    const original = allText[0]!.text;
    allText[0]!.text = "MUTATED";

    const newBytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(newBytes);
    const reTexts = [...reopened.mainDocumentPart!.document.descendants(Text)];
    expect(reTexts[0]!.text).toBe("MUTATED");
    expect(reTexts[0]!.text).not.toBe(original);
  });

  it("未访问 typed Part 时 saveAsBytes 不会触碰其字节流", async () => {
    const bytes = await loadHelloWorld();
    const doc = await WordprocessingDocument.openAsync(bytes);
    // 直接 save，不访问 mainDocumentPart.document（不应触发 flush）
    const out = await doc.saveAsBytesAsync();
    expect(out.byteLength).toBeGreaterThan(0);
    // reopen 后 Part 仍存在
    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.mainDocumentPart).toBeInstanceOf(MainDocumentPart);
  });
});

describe("WordprocessingDocument.create() · 空白文档", () => {
  it("create + saveAsBytes 后能被 openAsync 读回", async () => {
    const doc = WordprocessingDocument.create();
    expect(doc.mainDocumentPart).toBeInstanceOf(MainDocumentPart);

    // 程序构造一段内容
    const document = doc.mainDocumentPart!.document;
    const body = document.firstChild();
    expect(body).toBeDefined(); // Body 是 EMPTY_DOC_XML 里的子节点

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.mainDocumentPart!.document.firstChild()).toBeDefined();
  });
});

describe("WordprocessingDocument · 程序构造 Paragraph → Run → Text", () => {
  it("空白文档 → 添加段落 → 写出 → 重读 → 文本可见", async () => {
    const doc = WordprocessingDocument.create();
    const document = doc.mainDocumentPart!.document;
    const body = document.firstChild()!;

    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "Built programmatically";
    r.appendChild(t);
    p.appendChild(r);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    const texts = [...reopened.mainDocumentPart!.document.descendants(Text)];
    expect(texts.length).toBe(1);
    expect(texts[0]!.text).toBe("Built programmatically");
  });
});

describe("WordprocessingDocument · diagnostics 扩展（Story-2.10）", () => {
  it("未触碰 typed Part 时 elementCount=0", async () => {
    const doc = await WordprocessingDocument.openAsync(await loadHelloWorld());
    const d = doc.package.diagnostics;
    expect(d.elementCount).toBe(0);
    expect(d.unknownElementCount).toBe(0);
  });

  it("触碰 mainDocumentPart 后 elementCount > 0、unknownElementCount = 0", async () => {
    const doc = await WordprocessingDocument.openAsync(await loadHelloWorld());
    // 触发 typed 加载 + 反序列化
    void doc.mainDocumentPart?.document;
    const d = doc.package.diagnostics;
    expect(d.elementCount).toBeGreaterThan(0);
    // HelloWorld.docx schema 已知全部命中——不应有 Unknown
    expect(d.unknownElementCount).toBe(0);
  });
});

describe("WordprocessingDocument · 不破坏 v0.1.0 公共 API", () => {
  it("doc.package 仍是 IPackage 形态，可读 parts/relationships", async () => {
    const doc = await WordprocessingDocument.openAsync(await loadHelloWorld());
    expect([...doc.package.parts()].length).toBeGreaterThan(0);
    expect(doc.package.relationships.count).toBeGreaterThan(0);
  });
});
