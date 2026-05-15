/**
 * Story-2.7 codegen 注入端到端：跑 pnpm gen:word 产出的真实 Word 类，
 * 验证 Validators 在 applyAttribute / validateRequired 两条路径上确实生效。
 */

import { describe, expect, it } from "vitest";

describe("Story-2.7 · codegen 注入 · 真实 Word 类", () => {
  // codegen 仅当至少一条 RequiredValidator 才注入 validateRequired() 方法；
  // 无 Required 属性的类（如 Paragraph）不长出此方法，由 TS 类型层面消除误用。
  // 下面用 CellMerge 这种含 w:author / w:date / w:id Required 的具体类验证。

  it("有 Required 属性的类校验缺失抛 REQUIRED_ATTR_MISSING", async () => {
    const { CellMerge } = await import("../../../src/word/generated/cell-merge.js");
    const cm = new CellMerge();
    // CellMerge 派生自 CT_CellMergeTrackChange，其 RequiredValidator 应至少标 w:author / w:id
    expect(() => cm.validateRequired()).toThrowError(
      expect.objectContaining({
        code: "REQUIRED_ATTR_MISSING",
      }),
    );
  });

  it("Required 都填全后 validateRequired 通过", async () => {
    const { CellMerge } = await import("../../../src/word/generated/cell-merge.js");
    const { StringValue } = await import("../../../src/index.js");
    const cm = new CellMerge();
    // 把所有 typed 字段都赋值（粗糙但有效）
    for (const key of Object.keys(cm) as Array<keyof typeof cm>) {
      const cur = cm[key];
      if (cur === undefined && typeof key === "string" && !["parent", "text"].includes(key)) {
        // 仅给非 children/parent 字段塞 StringValue，覆盖 author/date/id 等
        // biome-ignore lint/suspicious/noExplicitAny: 测试反射
        (cm as any)[key] = new StringValue("test");
      }
    }
    expect(() => cm.validateRequired()).not.toThrow();
  });
});

describe("Story-2.7 · 内联校验 (StringValidator MaxLength) 注入", async () => {
  const { CellMerge } = await import("../../../src/word/generated/cell-merge.js");

  it("applyAttribute 接收过长 author 抛 STRING_TOO_LONG", () => {
    const cm = new CellMerge();
    // schema 中 w:author 的 StringValidator MaxLength=255
    expect(() => cm.applyAttribute("w:author", "x".repeat(256))).toThrowError(
      expect.objectContaining({
        code: "STRING_TOO_LONG",
        attribute: "w:author",
      }),
    );
  });

  it("正常长度 author 通过", () => {
    const cm = new CellMerge();
    expect(() => cm.applyAttribute("w:author", "Alice")).not.toThrow();
  });
});
