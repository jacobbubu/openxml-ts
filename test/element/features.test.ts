import { describe, expect, it } from "vitest";
import {
  FeatureCollection,
  type IFeatureCollection,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  OpenXmlLeafElement,
} from "../../src/index.js";

// ---------------------------------------------------------------------------
// 测试用特性类——用 class 作为 key（对位 .NET 的 typeof(TFeature)）
// ---------------------------------------------------------------------------

abstract class ICounter {
  abstract count: number;
}

class CounterFeature extends ICounter {
  count = 0;
}

abstract class ILogger {
  abstract log(msg: string): void;
  abstract messages: string[];
}

class LoggerFeature extends ILogger {
  messages: string[] = [];
  log(msg: string): void {
    this.messages.push(msg);
  }
}

// ---------------------------------------------------------------------------
// 测试用元素
// ---------------------------------------------------------------------------

class TLeaf extends OpenXmlLeafElement {
  override readonly localName = "t" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "urn:test:w" as const;
  override cloneNode(_deep: boolean): TLeaf {
    return new TLeaf();
  }
}

class TComposite extends OpenXmlCompositeElement {
  override readonly localName = "r" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "urn:test:w" as const;
  override readonly children = new OpenXmlElementList(this);
  override cloneNode(_deep: boolean): TComposite {
    return new TComposite();
  }
}

// ---------------------------------------------------------------------------
// FeatureCollection 单元测试
// ---------------------------------------------------------------------------

describe("FeatureCollection", () => {
  it("get 未注册特性返回 undefined", () => {
    const fc = new FeatureCollection();
    expect(fc.get(CounterFeature)).toBeUndefined();
  });

  it("set / get 往返正确", () => {
    const fc = new FeatureCollection();
    const counter = new CounterFeature();
    fc.set(CounterFeature, counter);
    expect(fc.get(CounterFeature)).toBe(counter);
  });

  it("set undefined 删除特性", () => {
    const fc = new FeatureCollection();
    fc.set(CounterFeature, new CounterFeature());
    expect(fc.get(CounterFeature)).toBeDefined();
    fc.set(CounterFeature, undefined);
    expect(fc.get(CounterFeature)).toBeUndefined();
  });

  it("revision 初始为 0，每次 set 递增", () => {
    const fc = new FeatureCollection();
    expect(fc.revision).toBe(0);
    fc.set(CounterFeature, new CounterFeature());
    expect(fc.revision).toBe(1);
    fc.set(LoggerFeature, new LoggerFeature());
    expect(fc.revision).toBe(2);
  });

  it("删除不存在的特性不递增 revision", () => {
    const fc = new FeatureCollection();
    fc.set(CounterFeature, undefined);
    expect(fc.revision).toBe(0);
  });

  it("isReadOnly 为 false 时可以写入", () => {
    const fc = new FeatureCollection();
    expect(fc.isReadOnly).toBe(false);
    expect(() => fc.set(CounterFeature, new CounterFeature())).not.toThrow();
  });

  it("只读集合拒绝 set 并抛出 TypeError", () => {
    const defaults = new FeatureCollection();
    defaults.set(CounterFeature, new CounterFeature());
    const ro = new FeatureCollection(defaults, true);
    expect(ro.isReadOnly).toBe(true);
    expect(() => ro.set(CounterFeature, new CounterFeature())).toThrow(TypeError);
  });

  it("defaults 链：本地未命中时向 defaults 查找", () => {
    const defaults = new FeatureCollection();
    const counter = new CounterFeature();
    defaults.set(CounterFeature, counter);

    const child = new FeatureCollection(defaults);
    expect(child.get(CounterFeature)).toBe(counter);
  });

  it("本地设置覆盖 defaults 中的同类特性", () => {
    const defaults = new FeatureCollection();
    defaults.set(CounterFeature, new CounterFeature());

    const child = new FeatureCollection(defaults);
    const localCounter = new CounterFeature();
    localCounter.count = 42;
    child.set(CounterFeature, localCounter);

    expect(child.get(CounterFeature)).toBe(localCounter);
    expect(child.get(CounterFeature)?.count).toBe(42);
  });

  it("revision 等于本地修订 + defaults 修订之和", () => {
    const defaults = new FeatureCollection();
    defaults.set(CounterFeature, new CounterFeature()); // defaults.revision = 1

    const child = new FeatureCollection(defaults);
    expect(child.revision).toBe(1); // 0 + 1
    child.set(LoggerFeature, new LoggerFeature()); // child local = 1
    expect(child.revision).toBe(2); // 1 + 1
  });

  it("可注册多种不同特性，互不干扰", () => {
    const fc = new FeatureCollection();
    const counter = new CounterFeature();
    const logger = new LoggerFeature();
    fc.set(CounterFeature, counter);
    fc.set(LoggerFeature, logger);

    expect(fc.get(CounterFeature)).toBe(counter);
    expect(fc.get(LoggerFeature)).toBe(logger);
  });
});

// ---------------------------------------------------------------------------
// OpenXmlElement.features 集成测试
// ---------------------------------------------------------------------------

describe("OpenXmlElement.features", () => {
  it("叶子元素 features 属性存在且返回 IFeatureCollection", () => {
    const leaf = new TLeaf();
    expect(leaf.features).toBeDefined();
    expect(typeof leaf.features.get).toBe("function");
    expect(typeof leaf.features.set).toBe("function");
  });

  it("复合元素 features 属性存在且返回 IFeatureCollection", () => {
    const comp = new TComposite();
    expect(comp.features).toBeDefined();
    expect(typeof comp.features.get).toBe("function");
  });

  it("features 延迟初始化：每次访问返回同一实例", () => {
    const leaf = new TLeaf();
    const f1 = leaf.features;
    const f2 = leaf.features;
    expect(f1).toBe(f2);
  });

  it("两个不同元素各有独立的 features 集合", () => {
    const a = new TLeaf();
    const b = new TLeaf();
    a.features.set(CounterFeature, new CounterFeature());
    expect(a.features.get(CounterFeature)).toBeDefined();
    expect(b.features.get(CounterFeature)).toBeUndefined();
  });

  it("元素 features 可注册并检索自定义特性", () => {
    const el = new TComposite();
    const logger = new LoggerFeature();
    el.features.set(LoggerFeature, logger);
    logger.log("hello");

    const retrieved = el.features.get(LoggerFeature);
    expect(retrieved).toBe(logger);
    expect(retrieved?.messages).toEqual(["hello"]);
  });

  it("features 满足 IFeatureCollection 接口（结构类型检查）", () => {
    const el = new TLeaf();
    const fc: IFeatureCollection = el.features; // 编译通过即为正确
    expect(typeof fc.revision).toBe("number");
    expect(typeof fc.isReadOnly).toBe("boolean");
  });
});
