/**
 * PackageFeatureCollection 测试 — Epic-121 Phase 2。
 *
 * 覆盖：
 * - 基本 get/set 操作
 * - 删除特性（set undefined）
 * - revision 追踪
 * - defaults 链（未命中时向上查找）
 * - 只读模式（set 抛 TypeError）
 * - IRelationshipFilterFeature 示例注入
 * - null collection 行为（空集合 get 返回 undefined）
 */

import { describe, expect, it } from "vitest";
import {
  IRelationshipFilterFeature,
  PackageFeatureCollection,
} from "../../src/packaging/features/package-feature-collection.js";

// ── 测试用 feature 类 ──────────────────────────────────────────────────────────

abstract class IMyFeature {
  abstract getValue(): string;
}

class MyFeatureImpl extends IMyFeature {
  constructor(private readonly value: string) {
    super();
  }
  getValue(): string {
    return this.value;
  }
}

// ── 基本 get/set ───────────────────────────────────────────────────────────────

describe("PackageFeatureCollection 基本操作", () => {
  it("空集合 get 返回 undefined", () => {
    const fc = new PackageFeatureCollection();
    expect(fc.get(IMyFeature)).toBeUndefined();
  });

  it("set 后 get 返回正确实例", () => {
    const fc = new PackageFeatureCollection();
    const impl = new MyFeatureImpl("hello");
    fc.set(IMyFeature, impl);
    expect(fc.get(IMyFeature)).toBe(impl);
  });

  it("set undefined 删除特性，get 返回 undefined", () => {
    const fc = new PackageFeatureCollection();
    fc.set(IMyFeature, new MyFeatureImpl("x"));
    fc.set(IMyFeature, undefined);
    expect(fc.get(IMyFeature)).toBeUndefined();
  });

  it("覆写特性后返回新值", () => {
    const fc = new PackageFeatureCollection();
    fc.set(IMyFeature, new MyFeatureImpl("first"));
    fc.set(IMyFeature, new MyFeatureImpl("second"));
    expect(fc.get(IMyFeature)?.getValue()).toBe("second");
  });
});

// ── revision 追踪 ──────────────────────────────────────────────────────────────

describe("PackageFeatureCollection revision 追踪", () => {
  it("初始 revision 为 0", () => {
    const fc = new PackageFeatureCollection();
    expect(fc.revision).toBe(0);
  });

  it("每次 set 新值递增 revision", () => {
    const fc = new PackageFeatureCollection();
    fc.set(IMyFeature, new MyFeatureImpl("a"));
    expect(fc.revision).toBe(1);
    fc.set(IMyFeature, new MyFeatureImpl("b"));
    expect(fc.revision).toBe(2);
  });

  it("set undefined 删除已有 key 时递增 revision", () => {
    const fc = new PackageFeatureCollection();
    fc.set(IMyFeature, new MyFeatureImpl("a"));
    const rev = fc.revision;
    fc.set(IMyFeature, undefined);
    expect(fc.revision).toBe(rev + 1);
  });

  it("set undefined 对不存在 key 时不递增 revision", () => {
    const fc = new PackageFeatureCollection();
    const rev = fc.revision;
    fc.set(IMyFeature, undefined);
    expect(fc.revision).toBe(rev);
  });
});

// ── defaults 链 ────────────────────────────────────────────────────────────────

describe("PackageFeatureCollection defaults 链", () => {
  it("本地未命中时从 defaults 查找", () => {
    const defaults = new PackageFeatureCollection();
    const impl = new MyFeatureImpl("from-defaults");
    defaults.set(IMyFeature, impl);

    const child = new PackageFeatureCollection(defaults);
    expect(child.get(IMyFeature)).toBe(impl);
  });

  it("本地命中时遮蔽 defaults", () => {
    const defaults = new PackageFeatureCollection();
    defaults.set(IMyFeature, new MyFeatureImpl("from-defaults"));

    const child = new PackageFeatureCollection(defaults);
    const local = new MyFeatureImpl("local");
    child.set(IMyFeature, local);

    expect(child.get(IMyFeature)).toBe(local);
  });

  it("revision 包含 defaults 的 revision 之和", () => {
    const defaults = new PackageFeatureCollection();
    defaults.set(IMyFeature, new MyFeatureImpl("d"));
    const defaultRev = defaults.revision; // 1

    const child = new PackageFeatureCollection(defaults);
    child.set(IMyFeature, new MyFeatureImpl("c"));
    const childLocalRev = 1;

    expect(child.revision).toBe(defaultRev + childLocalRev);
  });
});

// ── 只读模式 ──────────────────────────────────────────────────────────────────

describe("PackageFeatureCollection 只读模式", () => {
  it("isReadOnly 默认为 false", () => {
    expect(new PackageFeatureCollection().isReadOnly).toBe(false);
  });

  it("只读集合 set 时抛出 TypeError", () => {
    const defaults = new PackageFeatureCollection();
    const fc = new PackageFeatureCollection(defaults, true);
    expect(() => fc.set(IMyFeature, new MyFeatureImpl("x"))).toThrow(TypeError);
  });

  it("只读集合 isReadOnly 为 true", () => {
    const fc = new PackageFeatureCollection(new PackageFeatureCollection(), true);
    expect(fc.isReadOnly).toBe(true);
  });
});

// ── IRelationshipFilterFeature 示例注入 ───────────────────────────────────────

describe("IRelationshipFilterFeature 注入示例", () => {
  class AllowOnlyRid1 extends IRelationshipFilterFeature {
    isRelationshipVisible(relationshipId: string, _type: string): boolean {
      return relationshipId === "rId1";
    }
  }

  it("注入过滤器后能检索", () => {
    const fc = new PackageFeatureCollection();
    fc.set(IRelationshipFilterFeature, new AllowOnlyRid1());
    const filter = fc.get(IRelationshipFilterFeature);
    expect(filter).toBeInstanceOf(AllowOnlyRid1);
  });

  it("过滤器逻辑正确执行", () => {
    const fc = new PackageFeatureCollection();
    fc.set(IRelationshipFilterFeature, new AllowOnlyRid1());
    const filter = fc.get(IRelationshipFilterFeature)!;
    expect(filter.isRelationshipVisible("rId1", "http://example.com/type")).toBe(true);
    expect(filter.isRelationshipVisible("rId2", "http://example.com/type")).toBe(false);
  });

  it("删除过滤器后返回 undefined", () => {
    const fc = new PackageFeatureCollection();
    fc.set(IRelationshipFilterFeature, new AllowOnlyRid1());
    fc.set(IRelationshipFilterFeature, undefined);
    expect(fc.get(IRelationshipFilterFeature)).toBeUndefined();
  });
});
