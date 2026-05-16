/**
 * Excel 计算链 Part（part-level 关系 type 为 `.../calcChain`）。
 *
 * 根元素 `<x:calcChain>`：Excel 缓存的「按依赖顺序」单元格列表，让重新打开时
 * 不必从零拓扑排序。当任一 Cell 的 `cellValue` / `cellFormula` 改动后该缓存
 * 即失效；Story-3.6 会落地「修改即丢 CalcChainPart」的策略（ADR-019）。
 *
 * @see DocumentFormat.OpenXml.Packaging.CalculationChainPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { CalculationChain } from "../generated/calculation-chain.js";

export class CalculationChainPart extends TypedXmlPart<CalculationChain> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/calcChain";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, CalculationChain);
  }

  /** `<x:calcChain>` 根元素。 */
  get calculationChain(): CalculationChain {
    return this.root;
  }

  set calculationChain(value: CalculationChain) {
    this.root = value;
  }
}
