/**
 * Story-5.2 验证：Enumerable<T> 链式 LINQ 操作子。
 *
 * 覆盖：
 * - lazy 中间操作子（Where / Select / SelectMany / Skip / Take / Distinct /
 *   Concat / OrderBy / OrderByDescending / GroupBy）；
 * - 终结操作子（First / FirstOrDefault / Last / LastOrDefault / Any / All /
 *   Count / ToArray / ToList）；
 * - 可重复迭代（不像 raw generator 一次性消费）；
 * - 链式组合典型 .NET 用法。
 */

import { describe, expect, it } from "vitest";
import { Enumerable } from "../../src/linq/index.js";

describe("Enumerable · 工厂 + 迭代", () => {
  it("from(array) 可 for-of + spread", () => {
    const e = Enumerable.from([1, 2, 3]);
    expect([...e]).toEqual([1, 2, 3]);
    const collected: number[] = [];
    for (const x of e) collected.push(x);
    expect(collected).toEqual([1, 2, 3]);
  });

  it("empty() 是空", () => {
    expect(Enumerable.empty<number>().ToArray()).toEqual([]);
  });

  it("可重复迭代（factory 模式而非一次性 generator）", () => {
    const e = Enumerable.from([1, 2, 3]).Where((x) => x > 1);
    expect(e.ToArray()).toEqual([2, 3]);
    expect(e.ToArray()).toEqual([2, 3]); // 再来一次仍可
  });
});

describe("Enumerable · 中间操作子", () => {
  it("Where 按 predicate 过滤；带 index", () => {
    const e = Enumerable.from([10, 20, 30, 40]).Where((_x, i) => i % 2 === 0);
    expect(e.ToArray()).toEqual([10, 30]);
  });

  it("Select 一对一映射；带 index", () => {
    const e = Enumerable.from(["a", "b", "c"]).Select((x, i) => `${i}:${x}`);
    expect(e.ToArray()).toEqual(["0:a", "1:b", "2:c"]);
  });

  it("SelectMany 一对多展平", () => {
    const e = Enumerable.from([[1, 2], [3], [4, 5]]).SelectMany((x) => x);
    expect(e.ToArray()).toEqual([1, 2, 3, 4, 5]);
  });

  it("Skip / Take", () => {
    expect(Enumerable.from([1, 2, 3, 4, 5]).Skip(2).ToArray()).toEqual([3, 4, 5]);
    expect(Enumerable.from([1, 2, 3, 4, 5]).Take(3).ToArray()).toEqual([1, 2, 3]);
    expect(Enumerable.from([1, 2, 3]).Take(0).ToArray()).toEqual([]);
    expect(Enumerable.from([1, 2, 3]).Take(99).ToArray()).toEqual([1, 2, 3]);
  });

  it("Distinct 按 SameValueZero 去重", () => {
    expect(Enumerable.from([1, 2, 2, 3, 1]).Distinct().ToArray()).toEqual([1, 2, 3]);
  });

  it("Concat 串联", () => {
    expect(Enumerable.from([1, 2]).Concat([3, 4]).ToArray()).toEqual([1, 2, 3, 4]);
  });

  it("OrderBy / OrderByDescending（默认比较器）", () => {
    expect(
      Enumerable.from([3, 1, 2])
        .OrderBy((x) => x)
        .ToArray(),
    ).toEqual([1, 2, 3]);
    expect(
      Enumerable.from([3, 1, 2])
        .OrderByDescending((x) => x)
        .ToArray(),
    ).toEqual([3, 2, 1]);
  });

  it("OrderBy 接自定义 compare", () => {
    expect(
      Enumerable.from(["aa", "b", "ccc"])
        .OrderBy(
          (x) => x,
          (a, b) => a.length - b.length,
        )
        .ToArray(),
    ).toEqual(["b", "aa", "ccc"]);
  });

  it("GroupBy 按 key 分组，组内序不变，组间按首次出现顺序", () => {
    const groups = Enumerable.from([1, 2, 3, 4, 5, 6])
      .GroupBy((x) => x % 3)
      .Select(([k, g]) => [k, g.ToArray()] as const)
      .ToArray();
    expect(groups).toEqual([
      [1, [1, 4]],
      [2, [2, 5]],
      [0, [3, 6]],
    ]);
  });

  it("中间操作子是 lazy（终结前不消费）", () => {
    let touched = 0;
    const e = Enumerable.from([1, 2, 3, 4]).Where((x) => {
      touched += 1;
      return x % 2 === 0;
    });
    expect(touched).toBe(0); // 未消费
    e.ToArray();
    expect(touched).toBe(4); // 一次完整扫
  });
});

describe("Enumerable · 终结操作子", () => {
  it("First / FirstOrDefault", () => {
    expect(Enumerable.from([1, 2, 3]).First()).toBe(1);
    expect(Enumerable.from([1, 2, 3]).First((x) => x > 1)).toBe(2);
    expect(Enumerable.from<number>([]).FirstOrDefault()).toBeUndefined();
    expect(() => Enumerable.from<number>([]).First()).toThrow();
    expect(() => Enumerable.from([1, 2, 3]).First((x) => x > 99)).toThrow();
  });

  it("Last / LastOrDefault", () => {
    expect(Enumerable.from([1, 2, 3]).Last()).toBe(3);
    expect(Enumerable.from([1, 2, 3]).Last((x) => x < 3)).toBe(2);
    expect(Enumerable.from<number>([]).LastOrDefault()).toBeUndefined();
    expect(() => Enumerable.from<number>([]).Last()).toThrow();
    expect(() => Enumerable.from([1, 2, 3]).Last((x) => x > 99)).toThrow();
  });

  it("Any / All", () => {
    expect(Enumerable.from([1, 2, 3]).Any()).toBe(true);
    expect(Enumerable.from<number>([]).Any()).toBe(false);
    expect(Enumerable.from([1, 2, 3]).Any((x) => x > 2)).toBe(true);
    expect(Enumerable.from([1, 2, 3]).Any((x) => x > 99)).toBe(false);
    expect(Enumerable.from([1, 2, 3]).All((x) => x > 0)).toBe(true);
    expect(Enumerable.from([1, 2, 3]).All((x) => x > 1)).toBe(false);
  });

  it("Count（带/不带 predicate）", () => {
    expect(Enumerable.from([1, 2, 3]).Count()).toBe(3);
    expect(Enumerable.from([1, 2, 3]).Count((x) => x > 1)).toBe(2);
    expect(Enumerable.from<number>([]).Count()).toBe(0);
  });

  it("ToArray / ToList 等价", () => {
    expect(Enumerable.from([1, 2, 3]).ToArray()).toEqual([1, 2, 3]);
    expect(Enumerable.from([1, 2, 3]).ToList()).toEqual([1, 2, 3]);
  });
});

describe("Enumerable · 链式典型 .NET 用法", () => {
  it("Where().Select().OrderBy().Take().ToArray()", () => {
    const result = Enumerable.from([5, 3, 8, 1, 4, 9, 2])
      .Where((x) => x > 1)
      .Select((x) => x * 10)
      .OrderBy((x) => x)
      .Take(3)
      .ToArray();
    expect(result).toEqual([20, 30, 40]);
  });

  it("SelectMany 展平嵌套结构", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(
      Enumerable.from(matrix)
        .SelectMany((row) => row)
        .Where((x) => x % 2 === 0)
        .Count(),
    ).toBe(4); // 2, 4, 6, 8
  });
});
