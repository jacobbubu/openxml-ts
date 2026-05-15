import { describe, expect, it } from "vitest";
import { RelationshipCollection } from "../../../src/packaging/core/relationship-collection.js";
import {
  HYPERLINK_RELATIONSHIP_TYPE,
  createHyperlinkInput,
} from "../../../src/packaging/relationships/hyperlink.js";

describe("createHyperlinkInput", () => {
  it("产出固定 type + external", () => {
    const input = createHyperlinkInput({ target: "https://example.com" });
    expect(input.type).toBe(HYPERLINK_RELATIONSHIP_TYPE);
    expect(input.targetMode).toBe("external");
    expect(input.target).toBe("https://example.com");
    expect(input.id).toBeUndefined();
  });

  it("可显式指定 id", () => {
    const input = createHyperlinkInput({
      target: "mailto:foo@example.com",
      id: "rIdMail",
    });
    expect(input.id).toBe("rIdMail");
  });

  it("空 target 抛 RELATIONSHIP_TARGET_INVALID", () => {
    expect(() => createHyperlinkInput({ target: "" })).toThrowError(
      expect.objectContaining({ code: "RELATIONSHIP_TARGET_INVALID" }),
    );
  });

  it("纯空白 target 抛 RELATIONSHIP_TARGET_INVALID", () => {
    expect(() => createHyperlinkInput({ target: "   " })).toThrowError(
      expect.objectContaining({ code: "RELATIONSHIP_TARGET_INVALID" }),
    );
  });

  it("接入 RelationshipCollection 后正常工作", () => {
    const c = new RelationshipCollection("/");
    const rel = c.create(createHyperlinkInput({ target: "https://example.com" }));
    expect(rel.type).toBe(HYPERLINK_RELATIONSHIP_TYPE);
    expect(rel.targetMode).toBe("external");
    expect(rel.id).toBe("rId1");
  });

  it("hyperlink 进序列化时带 TargetMode=External", () => {
    const c = new RelationshipCollection("/");
    c.create(createHyperlinkInput({ target: "https://example.com" }));
    expect(c.serializeXml()).toContain('TargetMode="External"');
  });
});
