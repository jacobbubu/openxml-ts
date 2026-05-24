/**
 * OpenXmlPackageBuilder 测试 — Epic-121 Phase 3。
 *
 * 覆盖：
 * - 空管道（无中间件）执行 noop
 * - 单个中间件前/后置执行顺序
 * - 多个中间件组合执行顺序（A→B in, B→A out）
 * - clone() 独立副本语义
 * - withOpenSettings / getOpenSettings 工具函数
 * - 链式调用（use().use().build()）
 */

import { describe, expect, it, vi } from "vitest";
import {
  OpenXmlPackageBuilder,
  type PackageLike,
  getOpenSettings,
  withOpenSettings,
} from "../../src/packaging/builder/open-xml-package-builder.js";
import { PackageFeatureCollection } from "../../src/packaging/features/package-feature-collection.js";
import { OpenSettings } from "../../src/packaging/open-settings.js";

// ── 最小 PackageLike stub ──────────────────────────────────────────────────────

function makePkg(): PackageLike {
  return { features: new PackageFeatureCollection() };
}

// ── 空管道 ────────────────────────────────────────────────────────────────────

describe("OpenXmlPackageBuilder 空管道", () => {
  it("无中间件时 build() 返回 noop，执行不抛错", () => {
    const builder = new OpenXmlPackageBuilder<PackageLike>();
    const pipeline = builder.build();
    expect(() => pipeline(makePkg())).not.toThrow();
  });
});

// ── 单中间件 ──────────────────────────────────────────────────────────────────

describe("OpenXmlPackageBuilder 单中间件", () => {
  it("前置逻辑在 next 之前执行", () => {
    const order: string[] = [];
    const builder = new OpenXmlPackageBuilder<PackageLike>().use((next) => (pkg) => {
      order.push("before");
      next(pkg);
    });

    builder.build()(makePkg());
    expect(order).toEqual(["before"]);
  });

  it("后置逻辑在 next 之后执行", () => {
    const order: string[] = [];
    const builder = new OpenXmlPackageBuilder<PackageLike>().use((next) => (pkg) => {
      next(pkg);
      order.push("after");
    });

    builder.build()(makePkg());
    expect(order).toEqual(["after"]);
  });

  it("pkg 实例透传到中间件", () => {
    const pkg = makePkg();
    let received: PackageLike | undefined;
    const builder = new OpenXmlPackageBuilder<PackageLike>().use((next) => (p) => {
      received = p;
      next(p);
    });

    builder.build()(pkg);
    expect(received).toBe(pkg);
  });
});

// ── 多中间件顺序 ──────────────────────────────────────────────────────────────

describe("OpenXmlPackageBuilder 多中间件执行顺序", () => {
  it("A→B in, B→A out（洋葱模型）", () => {
    const order: string[] = [];
    const builder = new OpenXmlPackageBuilder<PackageLike>()
      .use((next) => (pkg) => {
        order.push("A-in");
        next(pkg);
        order.push("A-out");
      })
      .use((next) => (pkg) => {
        order.push("B-in");
        next(pkg);
        order.push("B-out");
      });

    builder.build()(makePkg());
    expect(order).toEqual(["A-in", "B-in", "B-out", "A-out"]);
  });

  it("三层中间件顺序正确", () => {
    const order: string[] = [];
    new OpenXmlPackageBuilder<PackageLike>()
      .use((next) => (pkg) => {
        order.push("1");
        next(pkg);
      })
      .use((next) => (pkg) => {
        order.push("2");
        next(pkg);
      })
      .use((next) => (pkg) => {
        order.push("3");
        next(pkg);
      })
      .build()(makePkg());

    expect(order).toEqual(["1", "2", "3"]);
  });
});

// ── clone() ───────────────────────────────────────────────────────────────────

describe("OpenXmlPackageBuilder clone()", () => {
  it("clone 后两个 builder 共享基础中间件", () => {
    const calls: string[] = [];

    const base = new OpenXmlPackageBuilder<PackageLike>().use((next) => (pkg) => {
      calls.push("base");
      next(pkg);
    });

    const cloned = base.clone().use((next) => (pkg) => {
      calls.push("extra");
      next(pkg);
    });

    // base: 仅 "base"
    base.build()(makePkg());
    expect(calls).toEqual(["base"]);

    // cloned: "base" + "extra"
    calls.length = 0;
    cloned.build()(makePkg());
    expect(calls).toEqual(["base", "extra"]);
  });

  it("向 clone 添加中间件不影响原 builder 的中间件数量", () => {
    const baseMiddlewareCount = { count: 0 };

    const base = new OpenXmlPackageBuilder<PackageLike>().use((next) => (pkg) => {
      baseMiddlewareCount.count++;
      next(pkg);
    });

    // base 的 clone 多加一个中间件
    const cloneExtraCount = { count: 0 };
    const cloned = base.clone().use((next) => (pkg) => {
      cloneExtraCount.count++;
      next(pkg);
    });

    // 运行 base 一次：共享中间件执行 1 次，cloned 额外中间件 0 次
    base.build()(makePkg());
    expect(baseMiddlewareCount.count).toBe(1);
    expect(cloneExtraCount.count).toBe(0);

    // 运行 cloned 一次：共享中间件再执行 1 次，cloned 额外中间件执行 1 次
    cloned.build()(makePkg());
    expect(baseMiddlewareCount.count).toBe(2); // 累计 2
    expect(cloneExtraCount.count).toBe(1);
  });
});

// ── withOpenSettings / getOpenSettings ────────────────────────────────────────

describe("withOpenSettings / getOpenSettings", () => {
  it("注入 settings 后可通过 getOpenSettings 检索", () => {
    const settings = new OpenSettings({ autoSave: false });
    const builder = new OpenXmlPackageBuilder<PackageLike>().use(withOpenSettings(settings));

    let retrieved: OpenSettings | undefined;
    const pkg = makePkg();
    builder.use((next) => (p) => {
      retrieved = getOpenSettings(p);
      next(p);
    });

    builder.build()(pkg);
    expect(retrieved).toBe(settings);
  });

  it("未注入时 getOpenSettings 返回 undefined", () => {
    const pkg = makePkg();
    expect(getOpenSettings(pkg)).toBeUndefined();
  });

  it("注入的 autoSave=false 可从 settings 读出", () => {
    const settings = new OpenSettings({ autoSave: false });
    const pkg = makePkg();

    new OpenXmlPackageBuilder<PackageLike>().use(withOpenSettings(settings)).build()(pkg);

    expect(getOpenSettings(pkg)?.autoSave).toBe(false);
  });
});

// ── build() 可多次调用 ─────────────────────────────────────────────────────────

describe("OpenXmlPackageBuilder build() 幂等性", () => {
  it("多次调用 build() 返回不同但功能等价的 delegate", () => {
    const spy = vi.fn();
    const builder = new OpenXmlPackageBuilder<PackageLike>().use((next) => (pkg) => {
      spy();
      next(pkg);
    });

    builder.build()(makePkg());
    builder.build()(makePkg());
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
