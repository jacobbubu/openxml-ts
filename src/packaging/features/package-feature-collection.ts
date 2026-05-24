/**
 * 包级 Feature DI 系统——对位 .NET `IFeatureCollection` / `FeatureCollection`（包级）。
 *
 * ## 设计说明
 *
 * .NET SDK 的包级 Feature 系统包含约 45 个接口，其中绝大多数是 `internal`（与 .NET 的
 * `OpenXmlPackage` → `OpenXmlPart` 三层继承体系紧耦合）。openxml-ts 采用 backend +
 * 门面接口的不同架构，因此只移植最小有价值的公开子集：
 *
 * - `IPackageFeatureCollection`：包级 typed 服务定位器接口
 * - `PackageFeatureCollection`：Map-based 实现，支持 defaults 链、revision 追踪、只读模式
 * - 示例 feature interface：`IRelationshipFilterFeature`（可注入自定义关系过滤逻辑）
 *
 * **有意省略**（与 element-level `features.ts` 的决策相同）：
 * - 所有 `internal` 接口（`IPackageFeature`, `ISaveFeature`, `IPartUriFeature` 等）
 * - 事件 feature（`IPackageEventsFeature`, `IPartEventsFeature`）— 架构性不兼容
 *
 * @see DocumentFormat.OpenXml.Features.IFeatureCollection (.NET)
 * @see DocumentFormat.OpenXml.Features.FeatureCollection (.NET)
 */

// ─────────────────────────────────────────────────────────────────────────────
// IPackageFeatureCollection
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 包级 typed 特性集合接口。
 *
 * 使用构造函数（class）作为 key，与 element-level `IFeatureCollection` 保持一致。
 *
 * 用法示例：
 * ```ts
 * // 注入自定义过滤特性
 * pkg.features.set(IRelationshipFilterFeature, myFilterImpl);
 *
 * // 读取特性（不存在时返回 undefined）
 * const filter = pkg.features.get(IRelationshipFilterFeature);
 *
 * // 版本号用于缓存失效
 * const rev = pkg.features.revision;
 * ```
 *
 * 对位 .NET `DocumentFormat.OpenXml.Features.IFeatureCollection`。
 */
export interface IPackageFeatureCollection {
  /**
   * 集合是否只读。只读时调用 `set` 抛出 `TypeError`。
   */
  readonly isReadOnly: boolean;

  /**
   * 每次修改递增的版本号，可用于缓存失效校验。
   * 对位 .NET `IFeatureCollection.Revision`。
   */
  readonly revision: number;

  /**
   * 按 key 检索特性。不存在时返回 `undefined`。
   *
   * 对位 .NET `IFeatureCollection.Get<TFeature>()`。
   */
  get<T>(key: abstract new (...args: never[]) => T): T | undefined;

  /**
   * 注册特性。传入 `undefined` 时删除该特性。
   *
   * 对位 .NET `IFeatureCollection.Set<TFeature>(instance)`。
   *
   * @throws {TypeError} 集合为只读时。
   */
  set<T>(key: abstract new (...args: never[]) => T, value: T | undefined): void;
}

// ─────────────────────────────────────────────────────────────────────────────
// PackageFeatureCollection
// ─────────────────────────────────────────────────────────────────────────────

/**
 * `IPackageFeatureCollection` 的标准 Map-based 实现。
 *
 * - 支持 defaults 链：`get` 未命中本地时向上查找父集合。
 * - `revision` 等于本地修订 + defaults 修订之和。
 * - `isReadOnly` 为 `true` 时拒绝 `set`（抛出 `TypeError`）。
 *
 * 对位 .NET `DocumentFormat.OpenXml.Features.FeatureCollection`。
 */
export class PackageFeatureCollection implements IPackageFeatureCollection {
  readonly #defaults: IPackageFeatureCollection | undefined;
  #store: Map<abstract new (...args: never[]) => unknown, unknown> | undefined;
  #localRevision = 0;

  /**
   * 创建空的包级特性集合。
   */
  constructor();

  /**
   * 创建带 defaults 链的包级特性集合。
   *
   * @param defaults 未命中时的回退集合。
   * @param isReadOnly 是否只读（默认 `false`）。
   */
  constructor(defaults: IPackageFeatureCollection, isReadOnly?: boolean);

  constructor(
    defaults?: IPackageFeatureCollection,
    readonly isReadOnly = false,
  ) {
    this.#defaults = defaults;
  }

  get revision(): number {
    return this.#localRevision + (this.#defaults?.revision ?? 0);
  }

  get<T>(key: abstract new (...args: never[]) => T): T | undefined {
    if (this.#store?.has(key)) {
      return this.#store.get(key) as T;
    }
    return this.#defaults?.get(key);
  }

  set<T>(key: abstract new (...args: never[]) => T, value: T | undefined): void {
    if (this.isReadOnly) {
      throw new TypeError("PackageFeatureCollection is read-only");
    }

    if (value === undefined) {
      if (this.#store?.delete(key)) {
        this.#localRevision++;
      }
      return;
    }

    if (this.#store === undefined) {
      this.#store = new Map();
    }
    this.#store.set(key, value);
    this.#localRevision++;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 示例 Feature 接口：IRelationshipFilterFeature
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 关系过滤特性接口——对位 .NET `IRelationshipFilterFeature`。
 *
 * 允许用户注入自定义逻辑来决定哪些关系在枚举/查找时可见。
 *
 * 用法示例：
 * ```ts
 * class MyFilter extends IRelationshipFilterFeature {
 *   isRelationshipVisible(relationshipId: string, _type: string): boolean {
 *     // 仅暴露 rId1
 *     return relationshipId === "rId1";
 *   }
 * }
 * pkg.features.set(IRelationshipFilterFeature, new MyFilter());
 * ```
 *
 * 对位 .NET `DocumentFormat.OpenXml.Features.IRelationshipFilterFeature`。
 */
export abstract class IRelationshipFilterFeature {
  /**
   * 判断给定 relationship 在当前上下文中是否可见。
   *
   * @param relationshipId 关系 ID（如 `"rId1"`）。
   * @param relationshipType 关系类型 URI（如 `"http://...officeDocument"`）。
   * @returns `true` 表示可见，`false` 表示过滤掉。
   */
  abstract isRelationshipVisible(relationshipId: string, relationshipType: string): boolean;
}
