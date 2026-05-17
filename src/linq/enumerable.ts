/**
 * `Enumerable<T>` —— LINQ 风格的链式 Iterable 包装。对位 .NET
 * `System.Linq.Enumerable`（实例方法形式，下游可直接 `.Where().Select()`
 * 不用先 `.from()` 第二次）。
 *
 * 求值规则：
 * - 中间操作子（Where / Select / SelectMany / OrderBy / Skip / Take /
 *   Distinct / Concat / GroupBy）返回新 Enumerable，**lazy** 不消费源；
 * - 终结操作子（First / Last / Any / All / Count / ToArray）执行时才迭代。
 *
 * Generator 实现：每次链式得到的 Enumerable 持有一个「调用时返新 iterator」
 * 的 factory，因此可重复迭代（不像 raw generator 一次性消费）。
 */

export class Enumerable<T> implements Iterable<T> {
  private constructor(private readonly factory: () => IterableIterator<T>) {}

  /** 工厂：包任意 Iterable。 */
  static from<T>(source: Iterable<T>): Enumerable<T> {
    return new Enumerable(function* () {
      yield* source;
    });
  }

  /** 空序列工厂——对位 .NET `Enumerable.Empty<T>()`。 */
  static empty<T>(): Enumerable<T> {
    return new Enumerable<T>(function* () {});
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.factory();
  }

  // ─── 中间操作子（lazy） ──────────────────────────────────────────────────────

  Where(predicate: (x: T, index: number) => boolean): Enumerable<T> {
    const source = this.factory;
    return new Enumerable(function* () {
      let i = 0;
      for (const x of source()) {
        if (predicate(x, i)) yield x;
        i += 1;
      }
    });
  }

  Select<U>(map: (x: T, index: number) => U): Enumerable<U> {
    const source = this.factory;
    return new Enumerable<U>(function* () {
      let i = 0;
      for (const x of source()) {
        yield map(x, i);
        i += 1;
      }
    });
  }

  SelectMany<U>(map: (x: T) => Iterable<U>): Enumerable<U> {
    const source = this.factory;
    return new Enumerable<U>(function* () {
      for (const x of source()) yield* map(x);
    });
  }

  Skip(count: number): Enumerable<T> {
    const source = this.factory;
    return new Enumerable<T>(function* () {
      let n = 0;
      for (const x of source()) {
        if (n < count) {
          n += 1;
          continue;
        }
        yield x;
      }
    });
  }

  Take(count: number): Enumerable<T> {
    const source = this.factory;
    return new Enumerable<T>(function* () {
      if (count <= 0) return;
      let n = 0;
      for (const x of source()) {
        yield x;
        n += 1;
        if (n >= count) return;
      }
    });
  }

  Distinct(): Enumerable<T> {
    const source = this.factory;
    return new Enumerable<T>(function* () {
      const seen = new Set<T>();
      for (const x of source()) {
        if (seen.has(x)) continue;
        seen.add(x);
        yield x;
      }
    });
  }

  Concat(other: Iterable<T>): Enumerable<T> {
    const source = this.factory;
    return new Enumerable<T>(function* () {
      yield* source();
      yield* other;
    });
  }

  /** 升序排序——eager 收集排序再 yield；不重复消费源。 */
  OrderBy<K>(key: (x: T) => K, compare?: (a: K, b: K) => number): Enumerable<T> {
    return this.orderInternal(key, compare, false);
  }

  OrderByDescending<K>(key: (x: T) => K, compare?: (a: K, b: K) => number): Enumerable<T> {
    return this.orderInternal(key, compare, true);
  }

  private orderInternal<K>(
    key: (x: T) => K,
    compare: ((a: K, b: K) => number) | undefined,
    descending: boolean,
  ): Enumerable<T> {
    const source = this.factory;
    const cmp = compare ?? defaultCompare;
    return new Enumerable<T>(function* () {
      const arr = [...source()];
      arr.sort((a, b) => {
        const r = cmp(key(a), key(b));
        return descending ? -r : r;
      });
      yield* arr;
    });
  }

  GroupBy<K>(key: (x: T) => K): Enumerable<readonly [K, Enumerable<T>]> {
    const source = this.factory;
    return new Enumerable<readonly [K, Enumerable<T>]>(function* () {
      const groups = new Map<K, T[]>();
      const order: K[] = [];
      for (const x of source()) {
        const k = key(x);
        const bucket = groups.get(k);
        if (bucket === undefined) {
          groups.set(k, [x]);
          order.push(k);
        } else {
          bucket.push(x);
        }
      }
      for (const k of order) {
        yield [k, Enumerable.from(groups.get(k) ?? [])] as const;
      }
    });
  }

  // ─── 终结操作子（消费源） ────────────────────────────────────────────────────

  /** 第一个匹配元素；不指定 predicate 则取首个；序列为空抛错。 */
  First(predicate?: (x: T) => boolean): T {
    for (const x of this.factory()) {
      if (predicate === undefined || predicate(x)) return x;
    }
    throw new Error("Enumerable.First: sequence contains no matching element");
  }

  FirstOrDefault(predicate?: (x: T) => boolean): T | undefined {
    for (const x of this.factory()) {
      if (predicate === undefined || predicate(x)) return x;
    }
    return undefined;
  }

  /** 最后一个匹配元素（需要完整遍历）；空抛错。 */
  Last(predicate?: (x: T) => boolean): T {
    let found: T | undefined;
    let any = false;
    for (const x of this.factory()) {
      if (predicate === undefined || predicate(x)) {
        found = x;
        any = true;
      }
    }
    if (!any) throw new Error("Enumerable.Last: sequence contains no matching element");
    return found as T;
  }

  LastOrDefault(predicate?: (x: T) => boolean): T | undefined {
    let found: T | undefined;
    for (const x of this.factory()) {
      if (predicate === undefined || predicate(x)) found = x;
    }
    return found;
  }

  Any(predicate?: (x: T) => boolean): boolean {
    for (const x of this.factory()) {
      if (predicate === undefined || predicate(x)) return true;
    }
    return false;
  }

  All(predicate: (x: T) => boolean): boolean {
    for (const x of this.factory()) {
      if (!predicate(x)) return false;
    }
    return true;
  }

  Count(predicate?: (x: T) => boolean): number {
    let n = 0;
    for (const x of this.factory()) {
      if (predicate === undefined || predicate(x)) n += 1;
    }
    return n;
  }

  ToArray(): T[] {
    return [...this.factory()];
  }

  /** .NET `ToList()` 在 TS 端语义等同 ToArray。 */
  ToList(): T[] {
    return this.ToArray();
  }
}

function defaultCompare<K>(a: K, b: K): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
