/**
 * Epic-8 验证：Strict ↔ Transitional URI 互译 + ElementRegistry / relationship
 * 双向 fallback。
 *
 * 覆盖：
 * - strictToTransitional / transitionalToStrict 表正反映射；
 * - 子类型 prefix 匹配（officeDocument/relationships/slide 等）；
 * - ElementRegistry.lookup 用 Transitional ns 注册的类，Strict ns 查询也命中；
 * - isStrictUri 识别；
 * - relationshipTypeMatches 两端等价。
 */

import { describe, expect, it } from "vitest";
import {
  ElementRegistry,
  isStrictUri,
  strictToTransitional,
  transitionalToStrict,
} from "../../src/element/index.js";
import { relationshipTypeMatches } from "../../src/parts/relationship-type-match.js";
import { Paragraph } from "../../src/word/index.js";

const STRICT_WORD = "http://purl.oclc.org/ooxml/wordprocessingml/main";
const TRANS_WORD = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const STRICT_REL = "http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument";
const TRANS_REL =
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument";

describe("strictToTransitional / transitionalToStrict", () => {
  it("已知主体 namespace 互译", () => {
    expect(strictToTransitional(STRICT_WORD)).toBe(TRANS_WORD);
    expect(transitionalToStrict(TRANS_WORD)).toBe(STRICT_WORD);
  });

  it("relationships 子类型 prefix 互译", () => {
    expect(strictToTransitional(STRICT_REL)).toBe(TRANS_REL);
    expect(transitionalToStrict(TRANS_REL)).toBe(STRICT_REL);
  });

  it("未知 URI 原样返回", () => {
    const unknown = "http://example.com/ns";
    expect(strictToTransitional(unknown)).toBe(unknown);
    expect(transitionalToStrict(unknown)).toBe(unknown);
  });

  it("isStrictUri 识别 strict 主体 + 子类型 + 拒非 strict", () => {
    expect(isStrictUri(STRICT_WORD)).toBe(true);
    expect(isStrictUri(STRICT_REL)).toBe(true);
    expect(isStrictUri(TRANS_WORD)).toBe(false);
    expect(isStrictUri("http://example.com/ns")).toBe(false);
  });
});

describe("ElementRegistry · Strict fallback", () => {
  it("Transitional ns 注册，Strict ns 查也命中", () => {
    const r = new ElementRegistry();
    r.register(TRANS_WORD, "p", Paragraph);
    expect(r.lookup(TRANS_WORD, "p")).toBe(Paragraph);
    expect(r.lookup(STRICT_WORD, "p")).toBe(Paragraph);
  });

  it("has() 也走 fallback", () => {
    const r = new ElementRegistry();
    r.register(TRANS_WORD, "p", Paragraph);
    expect(r.has(STRICT_WORD, "p")).toBe(true);
    expect(r.has(STRICT_WORD, "missing")).toBe(false);
  });

  it("未知 ns / 未注册 localName 仍 undefined", () => {
    const r = new ElementRegistry();
    expect(r.lookup("http://example.com/ns", "x")).toBeUndefined();
  });
});

describe("relationshipTypeMatches", () => {
  it("严格相等命中", () => {
    expect(relationshipTypeMatches(TRANS_REL, TRANS_REL)).toBe(true);
  });

  it("Strict 与 Transitional 互配命中", () => {
    expect(relationshipTypeMatches(STRICT_REL, TRANS_REL)).toBe(true);
    expect(relationshipTypeMatches(TRANS_REL, STRICT_REL)).toBe(true);
  });

  it("不相关 type 不命中", () => {
    expect(relationshipTypeMatches(TRANS_REL, "http://example.com/x")).toBe(false);
  });
});
