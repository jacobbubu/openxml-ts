import { describe, expect, it } from "vitest";
import { RelationshipCollection } from "../../../src/packaging/core/relationship-collection.js";
import { OpenXmlPackageError } from "../../../src/packaging/errors.js";
import {
  RELATIONSHIPS_NS,
  parseRelationshipsXml,
  serializeRelationshipsXml,
} from "../../../src/packaging/relationships/relationships-xml.js";

const NS = RELATIONSHIPS_NS;

describe("parseRelationshipsXml", () => {
  it("解析典型 .docx 包级 .rels", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${NS}"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="https://example.com" TargetMode="External"/></Relationships>`;
    const rels = parseRelationshipsXml(xml);
    expect(rels).toHaveLength(2);
    expect(rels[0]).toEqual({
      id: "rId1",
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      target: "word/document.xml",
      targetMode: "internal",
    });
    expect(rels[1]?.targetMode).toBe("external");
  });

  it('TargetMode="Internal" 显式标注也接受', () => {
    const xml = `<Relationships xmlns="${NS}"><Relationship Id="rId1" Type="t" Target="x" TargetMode="Internal"/></Relationships>`;
    expect(parseRelationshipsXml(xml)[0]?.targetMode).toBe("internal");
  });

  it("空集合可解析（自闭合根）", () => {
    expect(parseRelationshipsXml(`<Relationships xmlns="${NS}"/>`)).toEqual([]);
  });

  it("展开形式的 <Relationship>...</Relationship> 也接受", () => {
    const xml = `<Relationships xmlns="${NS}"><Relationship Id="rId1" Type="t" Target="x"></Relationship></Relationships>`;
    expect(parseRelationshipsXml(xml)[0]?.id).toBe("rId1");
  });

  it("缺 xmlns 抛 BACKEND_ERROR", () => {
    expect(() => parseRelationshipsXml("<Relationships/>")).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("错误根抛 BACKEND_ERROR", () => {
    expect(() => parseRelationshipsXml(`<Other xmlns="${NS}"/>`)).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("Relationship 缺 Id/Type/Target 抛错", () => {
    expect(() =>
      parseRelationshipsXml(
        `<Relationships xmlns="${NS}"><Relationship Id="rId1" Type="t"/></Relationships>`,
      ),
    ).toThrowError(expect.objectContaining({ code: "BACKEND_ERROR" }));
  });

  it("未知 TargetMode 抛错", () => {
    expect(() =>
      parseRelationshipsXml(
        `<Relationships xmlns="${NS}"><Relationship Id="rId1" Type="t" Target="x" TargetMode="Sideways"/></Relationships>`,
      ),
    ).toThrowError(expect.objectContaining({ code: "BACKEND_ERROR" }));
  });

  it("未知子元素抛错", () => {
    expect(() =>
      parseRelationshipsXml(`<Relationships xmlns="${NS}"><Garbage Id="x"/></Relationships>`),
    ).toThrowError(expect.objectContaining({ code: "BACKEND_ERROR" }));
  });

  it("DTD 攻击被 tokenizer 拦下 → SECURITY_VIOLATION", () => {
    expect(() =>
      parseRelationshipsXml(`<!DOCTYPE x SYSTEM "evil.dtd"><Relationships xmlns="${NS}"/>`),
    ).toThrowError(expect.objectContaining({ code: "SECURITY_VIOLATION" }));
  });
});

describe("serializeRelationshipsXml", () => {
  it("Internal 不输出 TargetMode（与 Office 端字节级一致）", () => {
    const rels = [
      {
        id: "rId1",
        type: "t1",
        sourceUri: "/" as const,
        target: "word/document.xml",
        targetMode: "internal" as const,
      },
    ];
    expect(serializeRelationshipsXml(rels)).toBe(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${NS}"><Relationship Id="rId1" Type="t1" Target="word/document.xml"/></Relationships>`,
    );
  });

  it('External 显式输出 TargetMode="External"', () => {
    const rels = [
      {
        id: "rId1",
        type: "t1",
        sourceUri: "/" as const,
        target: "https://example.com",
        targetMode: "external" as const,
      },
    ];
    expect(serializeRelationshipsXml(rels)).toContain(
      `Target="https://example.com" TargetMode="External"`,
    );
  });

  it("属性中特殊字符被转义", () => {
    const rels = [
      {
        id: "rId1",
        type: "t",
        sourceUri: "/" as const,
        target: 'https://x?a=1&b="2"',
        targetMode: "external" as const,
      },
    ];
    expect(serializeRelationshipsXml(rels)).toContain(`Target="https://x?a=1&amp;b=&quot;2&quot;"`);
  });
});

describe("round-trip parse↔serialize", () => {
  it("parse(serialize(c)) 与原集合等价", () => {
    const c = new RelationshipCollection("/");
    c.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      target: "word/document.xml",
      targetMode: "internal",
    });
    c.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
      target: "https://example.com",
      targetMode: "external",
    });
    const xml = c.serializeXml();
    const restored = RelationshipCollection.fromXml("/", xml);
    expect(restored.count).toBe(2);
    expect(restored.serializeXml()).toBe(xml);
  });

  it("fromXml 后自动 id 计数器不会与已有 rId 撞车", () => {
    const xml = `<Relationships xmlns="${NS}"><Relationship Id="rId5" Type="t" Target="a"/></Relationships>`;
    const c = RelationshipCollection.fromXml("/", xml);
    const r2 = c.create({
      type: "t2",
      target: "b",
      targetMode: "internal",
    });
    expect(r2.id).toBe("rId6");
  });
});

describe("rId 算法 — 与 .NET PackageRelationship 行为对齐", () => {
  it("空集合 + 3 次自动 create → rId1/2/3", () => {
    const c = new RelationshipCollection("/");
    const ids = [];
    for (let i = 0; i < 3; i += 1) {
      ids.push(c.create({ type: "t", target: `x${i}`, targetMode: "internal" }).id);
    }
    expect(ids).toEqual(["rId1", "rId2", "rId3"]);
  });

  it("手工注入 rId5 后，下一个自动 → rId6（不回填 gap，与 .NET 一致）", () => {
    const c = new RelationshipCollection("/");
    c.create({ type: "t", target: "a", targetMode: "internal", id: "rId5" });
    const r = c.create({ type: "t", target: "b", targetMode: "internal" });
    expect(r.id).toBe("rId6");
  });

  it("已自动占用 rId1 后，再手工指定 rId2，再自动 → rId3", () => {
    const c = new RelationshipCollection("/");
    c.create({ type: "t", target: "a", targetMode: "internal" });
    c.create({ type: "t", target: "b", targetMode: "internal", id: "rId2" });
    const r = c.create({ type: "t", target: "c", targetMode: "internal" });
    expect(r.id).toBe("rId3");
  });

  it("手工注入的非 rId 形 id 不影响计数器", () => {
    const c = new RelationshipCollection("/");
    c.create({
      type: "t",
      target: "a",
      targetMode: "internal",
      id: "MyHandle",
    });
    const r = c.create({ type: "t", target: "b", targetMode: "internal" });
    expect(r.id).toBe("rId1");
  });

  it("manual id rIdX 不是合法计数形式 → 不影响计数器", () => {
    const c = new RelationshipCollection("/");
    c.create({
      type: "t",
      target: "a",
      targetMode: "internal",
      id: "rIdMain",
    });
    const r = c.create({ type: "t", target: "b", targetMode: "internal" });
    expect(r.id).toBe("rId1");
  });

  it("manual id rId0 被视为合法形式（counter 抬到 1）", () => {
    const c = new RelationshipCollection("/");
    // "rId0" 在我们的接受规则里：1-9 起头才合法；rId0 视作非数字形式
    c.create({ type: "t", target: "a", targetMode: "internal", id: "rId0" });
    const r = c.create({ type: "t", target: "b", targetMode: "internal" });
    // 由于 rId0 不被视为合法计数 → 下个自动 = rId1
    expect(r.id).toBe("rId1");
  });

  it("dense 序列：rId1..rId4 全手工占满，下一个自动 → rId5", () => {
    const c = new RelationshipCollection("/");
    for (let n = 1; n <= 4; n += 1) {
      c.create({
        type: "t",
        target: `x${n}`,
        targetMode: "internal",
        id: `rId${n}`,
      });
    }
    expect(c.create({ type: "t", target: "x5", targetMode: "internal" }).id).toBe("rId5");
  });

  it("RELATIONSHIP_ID_CONFLICT 路径仍工作", () => {
    const c = new RelationshipCollection("/");
    c.create({ type: "t", target: "a", targetMode: "internal", id: "rId7" });
    expect(() =>
      c.create({
        type: "t",
        target: "b",
        targetMode: "internal",
        id: "rId7",
      }),
    ).toThrowError(expect.objectContaining({ code: "RELATIONSHIP_ID_CONFLICT" }));
  });

  it("Internal target 为空抛 RELATIONSHIP_TARGET_INVALID（继承自 1.2）", () => {
    const c = new RelationshipCollection("/");
    expect(() => c.create({ type: "t", target: "", targetMode: "internal" })).toThrowError(
      expect.objectContaining({ code: "RELATIONSHIP_TARGET_INVALID" }),
    );
  });
});

describe("RelationshipCollection — 已有测试不回退", () => {
  it("仍按插入顺序迭代", () => {
    const c = new RelationshipCollection("/");
    c.create({ type: "t", target: "a", targetMode: "internal" });
    c.create({ type: "t", target: "b", targetMode: "internal" });
    expect([...c].map((r) => r.id)).toEqual(["rId1", "rId2"]);
  });

  it("get 未知 id 仍抛 PART_NOT_FOUND", () => {
    const c = new RelationshipCollection("/");
    expect(() => c.get("nope")).toThrowError(OpenXmlPackageError);
  });
});
