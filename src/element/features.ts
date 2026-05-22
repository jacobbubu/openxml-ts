/**
 * Features 扩展性体系——对位 .NET `IFeatureCollection` / `FeatureCollection`。
 *
 * ## 设计决策（Epic-95 / issue #275）
 *
 * .NET SDK 的 Features 体系包含约 45 个接口，其中约 37 个是 `internal`（包内实现细节，
 * 如 `IPackageFeature`、`IPartUriFeature`、`ISaveFeature` 等），只有约 8 个是 `public`。
 * 这些 `internal` 接口都与 .NET 的 `OpenXmlPackage` → `OpenXmlPart` 三层继承体系紧耦合，
 * 而 openxml-ts 的封装层走了不同的架构路线（backend + 门面接口），没有等价宿主。
 *
 * 因此本模块选择**移植最小有价值的公开子集**（方案 b）：
 * - `IFeatureCollection`：typed 服务定位器接口，`get<T>` / `set<T>` / `revision`
 * - `FeatureCollection`：标准实现，支持 defaults 链、revision 递增、只读模式
 * - `OpenXmlElement.features`：让所有元素携带延迟初始化的特性集合
 *
 * **有意省略**（并在此记录原因）：
 * - `IDisposableFeature` / `IDocumentTypeFeature` / `IPartExtensionFeature`：
 *   这些接口依赖 .NET 的 OpenXmlPackage 生命周期事件机制，openxml-ts 无等价宿主；
 *   强行移植会引入无法使用的空接口，误导消费者。
 * - `IPackageEventsFeature` / `IPartEventsFeature` / `IPartRootEventsFeature` / `IRaiseFeatureEvent`：
 *   同上——依赖 .NET 包/part 事件系统，架构性不兼容。
 * - 所有 `internal` 接口（~37 个）：这些是 .NET 内部 DI 胶水，不属于公开 API，
 *   openxml-ts 等价能力由各 backend / interface 层直接提供，不需要再套一层服务定位器。
 *
 * 如果将来 openxml-ts 实现了完整的 OpenXmlPackage 生命周期，可在此基础上追加事件接口。
 */

/**
 * 类型化特性集合接口——对位 .NET `IFeatureCollection`。
 *
 * 使用方式：
 * ```ts
 * // 注册自定义特性
 * element.features.set(MyFeature, new MyFeatureImpl());
 *
 * // 检索特性（不存在时返回 undefined）
 * const feat = element.features.get(MyFeature);
 *
 * // 检查版本（用于缓存失效）
 * const rev = element.features.revision;
 * ```
 */
export interface IFeatureCollection {
  /**
   * 集合是否只读。只读集合调用 `set` 时抛出 `TypeError`。
   */
  readonly isReadOnly: boolean;

  /**
   * 每次修改递增的版本号，可用于缓存失效校验。
   * 对位 .NET `IFeatureCollection.Revision`。
   */
  readonly revision: number;

  /**
   * 按 key 检索特性。key 可以是类、接口符号或任意对象。
   * 不存在时返回 `undefined`。
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

/**
 * `IFeatureCollection` 的标准实现——对位 .NET `FeatureCollection`。
 *
 * - 支持 defaults 链：`get` 未命中本地时向上查找。
 * - `revision` 等于本地修订 + defaults 修订之和。
 * - `isReadOnly` 为 `true` 时拒绝 `set`。
 */
export class FeatureCollection implements IFeatureCollection {
  readonly #defaults: IFeatureCollection | undefined;
  #store: Map<abstract new (...args: never[]) => unknown, unknown> | undefined;
  #localRevision = 0;

  /**
   * 创建空集合。
   */
  constructor();

  /**
   * 创建带 defaults 链的集合。
   * @param defaults 未命中时的回退集合。
   * @param isReadOnly 是否只读（默认 `false`）。
   */
  constructor(defaults: IFeatureCollection, isReadOnly?: boolean);

  constructor(
    defaults?: IFeatureCollection,
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
      throw new TypeError("FeatureCollection is read-only");
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
