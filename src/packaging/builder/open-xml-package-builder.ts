/**
 * Builder pipeline — 对位 .NET `OpenXmlPackageBuilder<TPackage>` / `IPackageBuilder<TPackage>`。
 *
 * ## 设计说明
 *
 * .NET Builder 体系是一个完整的中间件管道（类似 ASP.NET 的 `IApplicationBuilder`），
 * 用于在打开/创建包之前/之后注入生命周期钩子。openxml-ts 移植其核心骨架：
 *
 * - `PackageDelegate<T>`：包初始化钩子函数类型。
 * - `IOpenXmlPackageBuilder<T>`：链式 Builder 接口。
 * - `OpenXmlPackageBuilder<T>`：中间件管道实现（责任链模式，逆序组合）。
 *
 * **有意简化**（相对于 .NET 完整实现）：
 * - 省略 `IPackageFactory` / `IPackageInitializer` — 这两个类与 .NET 内部 DI 胶水紧耦合。
 * - 省略 `Clone()` 的深拷贝语义 — TS 端以函数式风格实现，直接在 `use()` 时追加。
 * - 省略 `TemplateFeature` — 模板初始化在 TS 端通过 `OpenSettings.from()` 更自然。
 *
 * 核心用法：
 * ```ts
 * const builder = new OpenXmlPackageBuilder<MyPkg>()
 *   .use(next => pkg => {
 *     console.log("before open");
 *     next(pkg);
 *     console.log("after open");
 *   })
 *   .use(next => pkg => {
 *     pkg.features.set(IRelationshipFilterFeature, new MyFilter());
 *     next(pkg);
 *   });
 *
 * const pipeline = builder.build();
 * pipeline(myPackage);
 * ```
 *
 * @see DocumentFormat.OpenXml.Builder.OpenXmlPackageBuilder (.NET)
 * @see DocumentFormat.OpenXml.Builder.IPackageBuilder (.NET)
 */

import type { IPackageFeatureCollection } from "../features/package-feature-collection.js";
import type { OpenSettings } from "../open-settings.js";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 包初始化钩子函数类型。
 *
 * 对位 .NET `PackageDelegate<TPackage>`。
 */
export type PackageDelegate<T> = (pkg: T) => void;

/**
 * 中间件工厂类型：接收 `next` 返回新的 delegate。
 *
 * 用法：
 * ```ts
 * const mw: PackageMiddleware<T> = next => pkg => {
 *   // 前置操作
 *   next(pkg);
 *   // 后置操作
 * };
 * ```
 */
export type PackageMiddleware<T> = (next: PackageDelegate<T>) => PackageDelegate<T>;

/**
 * 描述可拥有 `features` 和 `settings` 的包类型约束。
 *
 * Builder 只依赖这两个属性，与具体包类型解耦。
 */
export interface PackageLike {
  readonly features: IPackageFeatureCollection;
}

// ─────────────────────────────────────────────────────────────────────────────
// IOpenXmlPackageBuilder
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 链式包构建器接口。
 *
 * 对位 .NET `IPackageBuilder<TPackage>`（已简化）。
 */
export interface IOpenXmlPackageBuilder<T extends PackageLike> {
  /**
   * 注册中间件。调用顺序决定管道执行顺序（先注册先执行外层）。
   *
   * @param middleware 中间件工厂函数。
   * @returns `this`（链式调用）。
   */
  use(middleware: PackageMiddleware<T>): this;

  /**
   * 构建管道，返回一个可复用的 `PackageDelegate<T>`。
   *
   * 构建后添加的中间件不会影响已构建的管道（需重新调用 `build()`）。
   */
  build(): PackageDelegate<T>;
}

// ─────────────────────────────────────────────────────────────────────────────
// OpenXmlPackageBuilder
// ─────────────────────────────────────────────────────────────────────────────

/** 空操作 delegate（终止符）。 */
const noop = <T>(_pkg: T): void => {};

/**
 * 链式包 Builder 的标准实现。
 *
 * 以责任链（逆序组合）模式构建中间件管道，与 .NET `OpenXmlPackageBuilder<TPackage>` 对位。
 *
 * 示例：
 * ```ts
 * const builder = new OpenXmlPackageBuilder<ZipOpenXmlPackage>()
 *   .use(next => pkg => { console.log("A in"); next(pkg); console.log("A out"); })
 *   .use(next => pkg => { console.log("B in"); next(pkg); console.log("B out"); });
 *
 * // 执行顺序: A in → B in → B out → A out
 * builder.build()(myPkg);
 * ```
 */
export class OpenXmlPackageBuilder<T extends PackageLike> implements IOpenXmlPackageBuilder<T> {
  readonly #middleware: PackageMiddleware<T>[] = [];

  /**
   * 添加中间件到管道末尾。
   *
   * @param middleware 中间件工厂。
   * @returns `this`（链式调用）。
   */
  use(middleware: PackageMiddleware<T>): this {
    this.#middleware.push(middleware);
    return this;
  }

  /**
   * 构建并返回组合后的管道 delegate。
   *
   * 管道以 noop 为终止符，中间件从后往前依次包裹，使第一个注册的中间件在最外层执行。
   */
  build(): PackageDelegate<T> {
    let pipeline: PackageDelegate<T> = noop;
    for (let i = this.#middleware.length - 1; i >= 0; i--) {
      pipeline = this.#middleware[i]?.(pipeline) ?? pipeline;
    }
    return pipeline;
  }

  /**
   * 创建一个新的 Builder，继承当前已注册的所有中间件（浅拷贝）。
   *
   * 对位 .NET `IPackageBuilder.Clone()`。
   */
  clone(): OpenXmlPackageBuilder<T> {
    const copy = new OpenXmlPackageBuilder<T>();
    for (const mw of this.#middleware) {
      copy.#middleware.push(mw);
    }
    return copy;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 便捷工厂函数
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 创建内置的「注入 OpenSettings」中间件。
 *
 * 将 `settings` 保存到包的 features 集合（Symbol key）中，
 * 供后续中间件或消费方检索。
 *
 * 用法示例：
 * ```ts
 * const builder = new OpenXmlPackageBuilder<ZipOpenXmlPackage>()
 *   .use(withOpenSettings(new OpenSettings({ autoSave: false })));
 * ```
 */
export const OPEN_SETTINGS_FEATURE_KEY: unique symbol = Symbol("OpenSettings");

/**
 * 向包的 features 中注入 `OpenSettings` 的中间件工厂。
 *
 * 不依赖任何具体的包类型；只要包实现了 `PackageLike` 即可。
 */
export function withOpenSettings<T extends PackageLike>(
  settings: OpenSettings,
): PackageMiddleware<T> {
  return (next) => (pkg) => {
    // 利用 Symbol key 存储 OpenSettings，避免与其他 feature 冲突
    (pkg as Record<symbol, unknown>)[OPEN_SETTINGS_FEATURE_KEY] = settings;
    next(pkg);
  };
}

/**
 * 从包中检索之前由 `withOpenSettings` 注入的 `OpenSettings`。
 *
 * 若未注入则返回 `undefined`。
 */
export function getOpenSettings<T extends PackageLike>(pkg: T): OpenSettings | undefined {
  return (pkg as Record<symbol, unknown>)[OPEN_SETTINGS_FEATURE_KEY] as OpenSettings | undefined;
}
