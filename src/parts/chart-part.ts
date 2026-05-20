/**
 * `ChartPart` —— 图表 Part（part-level 关系 type 为 `.../chart`）。
 *
 * 根元素是 `<c:chartSpace>`（DrawingML Chart namespace）。图表内嵌 `<a:...>`
 * DrawingML 子元素（如 `<c:txPr>` 中的 `<a:bodyPr>`、`<a:p>`），因此 registry
 * 同时注册 chart + drawing 两个命名空间，确保跨命名空间反序列化正确。
 *
 * 对位 .NET `DocumentFormat.OpenXml.Packaging.ChartPart`。
 * Faithful port——无 chart 构建便捷 helper。
 */

import { registerChartElements } from "../chart/generated/_registry.js";
import { Chart } from "../chart/generated/chart.js";
import { registerDrawingElements } from "../drawing/generated/_registry.js";
import { ElementRegistry, type OpenXmlElement } from "../element/index.js";
import { OpenXmlUnknownElement } from "../element/unknown-element.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import { TypedXmlPart } from "./typed-xml-part.js";

const CHART_NS = "http://schemas.openxmlformats.org/drawingml/2006/chart";

/**
 * ChartPart 专用 registry：同时注册 chart（c:）和 drawing（a:）元素，
 * 保证 `<c:chartSpace>` 树中跨命名空间子元素（如 `<a:bodyPr>`）能正确反序列化。
 *
 * 覆盖：codegen 把 `c:chart` 注册为叶子 ChartReference（用于 drawing 侧的引用形式），
 * 但 chartSpace 内的 `<c:chart>` 是复合元素（Chart）；用 Chart 替换以使子树正确挂载。
 */
const chartRegistry: ElementRegistry = (() => {
  const r = new ElementRegistry();
  registerChartElements(r);
  registerDrawingElements(r);
  // 覆盖：codegen 把 c:chart 注册为叶子 ChartReference，但 chartSpace 内
  // <c:chart> 是复合元素，用 Chart 替换，保证子元素能正确 append。
  r.register(CHART_NS, "chart", Chart);
  return r;
})();

export class ChartPart extends TypedXmlPart<OpenXmlElement> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.drawingml.chart+xml";

  constructor(part: IPackagePart, _registry?: ElementRegistry) {
    // 始终使用内部 chartRegistry（合并了 chart + drawing）；忽略外部传入以保持自洽。
    super(part, chartRegistry, ChartSpacePlaceholder);
  }

  /** `<c:chartSpace>` 根元素。 */
  get chartSpace(): OpenXmlElement {
    return this.root;
  }

  set chartSpace(value: OpenXmlElement) {
    this.root = value;
  }
}

/** 给 TypedXmlPart 的 RootCtor 占位：新建场景下 root 是空 `<c:chartSpace>`。 */
class ChartSpacePlaceholder extends OpenXmlUnknownElement {
  constructor() {
    super("c", "chartSpace", "http://schemas.openxmlformats.org/drawingml/2006/chart");
  }
}

export { chartRegistry };
