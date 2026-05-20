/**
 * Epic-55：PPT `addSlide` 新增幻灯片自由函数。
 *
 * 提供以 `PresentationDocument` 为入参的自由函数，追加一张空白幻灯片。
 * 实际逻辑在 `PresentationDocument.addSlide()` 方法中。
 *
 * 使用方式：
 * ```ts
 * import { PresentationDocument, addSlide } from "openxml-ts/ppt";
 *
 * const doc = PresentationDocument.create();
 * const sp2 = addSlide(doc);
 * const sp3 = addSlide(doc);
 * // doc.presentationPart!.slideParts.length === 3
 * ```
 */

import type { SlideLayoutPart } from "./parts/slide-layout-part.js";
import type { SlidePart } from "./parts/slide-part.js";
import type { PresentationDocument } from "./presentation-document.js";

export interface AddSlideOptions {
  /** 为新幻灯片指定 layout Part；省略时复用第一张幻灯片的 SlideLayoutPart。 */
  layoutPart?: SlideLayoutPart;
}

/**
 * 向 `doc` 追加一张空白幻灯片，返回新 `SlidePart`。
 *
 * - 复用 seed 幻灯片 XML；
 * - 自动复用 slide0 的 SlideLayoutPart（或接受 `options.layoutPart`）；
 * - 分配唯一 sldId（现有最大值 + 1，≥ 256）；
 * - 在 `<p:sldIdLst>` 末尾追加 `<p:sldId>`；
 * - 同步更新 PresentationPart 内部 slideParts 缓存。
 *
 * @param doc     目标 PresentationDocument
 * @param options 可选配置：`layoutPart` 指定版式
 */
export function addSlide(doc: PresentationDocument, options?: AddSlideOptions): SlidePart {
  return doc.addSlide(options);
}
