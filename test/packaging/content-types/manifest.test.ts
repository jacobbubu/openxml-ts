import { describe, expect, it } from "vitest";
import {
  CONTENT_TYPES_NS,
  ContentTypeManifest,
} from "../../../src/packaging/content-types/index.js";
import { tryPartUri } from "../../../src/packaging/interfaces/types.js";
import type { PartUri } from "../../../src/packaging/interfaces/types.js";

function uri(s: string): PartUri {
  const u = tryPartUri(s);
  if (u === undefined) throw new Error(`bad fixture URI ${s}`);
  return u;
}

describe("ContentTypeManifest — Default/Override 增删", () => {
  it("addDefault / addOverride / 顺序保持", () => {
    const m = new ContentTypeManifest();
    m.addDefault("xml", "application/xml");
    m.addDefault("rels", "application/vnd.openxmlformats-package.relationships+xml");
    m.addOverride(
      uri("/word/document.xml"),
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    );
    expect([...m.defaults()].map((d) => d.extension)).toEqual(["xml", "rels"]);
    expect([...m.overrides()].map((o) => o.partName)).toEqual(["/word/document.xml"]);
    expect(m.size).toBe(3);
  });

  it("extension 大小写无关、可点开头", () => {
    const m = new ContentTypeManifest();
    m.addDefault(".XML", "application/xml");
    expect(m.hasDefault("xml")).toBe(true);
    expect(m.hasDefault("XML")).toBe(true);
    expect(m.hasDefault(".xml")).toBe(true);
  });

  it("重复 Default 抛 BACKEND_ERROR", () => {
    const m = new ContentTypeManifest();
    m.addDefault("xml", "application/xml");
    expect(() => m.addDefault("XML", "application/xml")).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("重复 Override 抛 BACKEND_ERROR（大小写无关）", () => {
    const m = new ContentTypeManifest();
    m.addOverride(uri("/word/document.xml"), "x");
    expect(() => m.addOverride(uri("/WORD/document.xml"), "x")).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("空 contentType / extension 抛错", () => {
    const m = new ContentTypeManifest();
    expect(() => m.addDefault("", "application/xml")).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
    expect(() => m.addDefault("xml", "")).toThrowError(
      expect.objectContaining({ code: "CONTENT_TYPE_MISSING" }),
    );
    expect(() => m.addOverride(uri("/foo.xml"), "")).toThrowError(
      expect.objectContaining({ code: "CONTENT_TYPE_MISSING" }),
    );
  });

  it("removeDefault / removeOverride 返回 boolean", () => {
    const m = new ContentTypeManifest();
    m.addDefault("xml", "application/xml");
    expect(m.removeDefault("XML")).toBe(true);
    expect(m.removeDefault("xml")).toBe(false);
    m.addOverride(uri("/foo.xml"), "x");
    expect(m.removeOverride(uri("/FOO.xml"))).toBe(true);
    expect(m.removeOverride(uri("/foo.xml"))).toBe(false);
  });
});

describe("ContentTypeManifest — resolveContentType", () => {
  it("Override 优先于 Default", () => {
    const m = new ContentTypeManifest();
    m.addDefault("xml", "application/xml");
    m.addOverride(uri("/word/document.xml"), "application/vnd.special");
    expect(m.resolveContentType(uri("/word/document.xml"))).toBe("application/vnd.special");
    expect(m.resolveContentType(uri("/word/styles.xml"))).toBe("application/xml");
  });

  it("PartName 大小写无关", () => {
    const m = new ContentTypeManifest();
    m.addOverride(uri("/word/Document.XML"), "application/vnd.x");
    expect(m.resolveContentType(uri("/WORD/document.xml"))).toBe("application/vnd.x");
  });

  it("无扩展名 / 未命中返回 undefined", () => {
    const m = new ContentTypeManifest();
    m.addDefault("xml", "application/xml");
    expect(m.resolveContentType(uri("/word/no-ext"))).toBeUndefined();
    expect(m.resolveContentType(uri("/word/image.png"))).toBeUndefined();
  });
});

describe("ContentTypeManifest — 序列化", () => {
  it("产出 OPC 标准 XML（Defaults 先，Overrides 后）", () => {
    const m = new ContentTypeManifest();
    m.addDefault("xml", "application/xml");
    m.addDefault("rels", "application/vnd.openxmlformats-package.relationships+xml");
    m.addOverride(
      uri("/word/document.xml"),
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    );
    const out = m.serialize();
    expect(out).toBe(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="${CONTENT_TYPES_NS}"><Default Extension="xml" ContentType="application/xml"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`,
    );
  });

  it("属性中含特殊字符被转义", () => {
    const m = new ContentTypeManifest();
    m.addOverride(uri("/word/document.xml"), 'application/x;a="b"&c');
    expect(m.serialize()).toContain('ContentType="application/x;a=&quot;b&quot;&amp;c"');
  });

  it("空 manifest 也能序列化（始终用展开形式以保持输出形态一致）", () => {
    const m = new ContentTypeManifest();
    expect(m.serialize()).toBe(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="${CONTENT_TYPES_NS}"></Types>`,
    );
  });
});

describe("ContentTypeManifest — 解析", () => {
  it("解析标准 .docx 的 Content-Types", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="${CONTENT_TYPES_NS}"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`;
    const m = ContentTypeManifest.parse(xml);
    expect([...m.defaults()].map((d) => d.extension)).toEqual(["rels", "xml"]);
    expect(m.resolveContentType(uri("/word/document.xml"))).toBe(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    );
  });

  it("展开形式（非自闭合）的 Default 可解析", () => {
    const xml = `<Types xmlns="${CONTENT_TYPES_NS}"><Default Extension="xml" ContentType="application/xml"></Default></Types>`;
    const m = ContentTypeManifest.parse(xml);
    expect(m.resolveContentType(uri("/foo.xml"))).toBe("application/xml");
  });

  it("缺 xmlns 抛 MISSING_CONTENT_TYPES", () => {
    expect(() => ContentTypeManifest.parse("<Types/>")).toThrowError(
      expect.objectContaining({ code: "MISSING_CONTENT_TYPES" }),
    );
  });

  it("错误的根元素抛 MISSING_CONTENT_TYPES", () => {
    expect(() => ContentTypeManifest.parse(`<Other xmlns="${CONTENT_TYPES_NS}"/>`)).toThrowError(
      expect.objectContaining({ code: "MISSING_CONTENT_TYPES" }),
    );
  });

  it("Override PartName 非法 URI 抛 MISSING_CONTENT_TYPES", () => {
    expect(() =>
      ContentTypeManifest.parse(
        `<Types xmlns="${CONTENT_TYPES_NS}"><Override PartName="bad" ContentType="x"/></Types>`,
      ),
    ).toThrowError(expect.objectContaining({ code: "MISSING_CONTENT_TYPES" }));
  });

  it("Default 缺 ContentType 抛 MISSING_CONTENT_TYPES", () => {
    expect(() =>
      ContentTypeManifest.parse(
        `<Types xmlns="${CONTENT_TYPES_NS}"><Default Extension="xml"/></Types>`,
      ),
    ).toThrowError(expect.objectContaining({ code: "MISSING_CONTENT_TYPES" }));
  });

  it("未知子元素抛 MISSING_CONTENT_TYPES", () => {
    expect(() =>
      ContentTypeManifest.parse(
        `<Types xmlns="${CONTENT_TYPES_NS}"><Garbage Extension="xml"/></Types>`,
      ),
    ).toThrowError(expect.objectContaining({ code: "MISSING_CONTENT_TYPES" }));
  });

  it("DTD 攻击被拒（SECURITY_VIOLATION 来自 tokenizer）", () => {
    expect(() =>
      ContentTypeManifest.parse(
        `<!DOCTYPE foo SYSTEM "evil.dtd"><Types xmlns="${CONTENT_TYPES_NS}"/>`,
      ),
    ).toThrowError(expect.objectContaining({ code: "SECURITY_VIOLATION" }));
  });

  it("Default 完全缺失时只能解析空 Types", () => {
    const m = ContentTypeManifest.parse(`<Types xmlns="${CONTENT_TYPES_NS}"/>`);
    expect(m.size).toBe(0);
  });
});

describe("ContentTypeManifest — 边界负向", () => {
  it("空字符串抛 MISSING_CONTENT_TYPES（缺根）", () => {
    expect(() => ContentTypeManifest.parse("")).toThrowError(
      expect.objectContaining({ code: "MISSING_CONTENT_TYPES" }),
    );
  });

  it("Types 开了但未闭合 → tokenizer 先报 BACKEND_ERROR", () => {
    expect(() => ContentTypeManifest.parse(`<Types xmlns="${CONTENT_TYPES_NS}">`)).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });
});

describe("ContentTypeManifest — round-trip", () => {
  it("parse(serialize(x)) === x", () => {
    const m = new ContentTypeManifest();
    m.addDefault("xml", "application/xml");
    m.addDefault("png", "image/png");
    m.addOverride(uri("/word/document.xml"), "application/x.foo");
    m.addOverride(uri("/xl/sheet1.xml"), "application/x.bar");
    const out = m.serialize();
    const round = ContentTypeManifest.parse(out);
    expect(round.serialize()).toBe(out);
  });
});
