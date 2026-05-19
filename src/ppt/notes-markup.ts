/**
 * Epic-51：PPT 演讲者注释自由函数访问器。
 *
 * 提供以 `Slide` 对象为入参的演讲者注释读写函数，复用
 * `PresentationDocument.getSlideNotes` / `setSlideNotes` 已有逻辑。
 *
 * 使用方式：
 * ```ts
 * import { getSpeakerNotes, setSpeakerNotes } from "openxml-ts/ppt";
 *
 * const doc = PresentationDocument.create();
 * const sp = doc.presentationPart!.slideParts[0]!;
 * setSpeakerNotes(sp.slide, doc, "Hello world");
 * console.log(getSpeakerNotes(sp.slide, doc)); // "Hello world"
 * ```
 */

import { OpenXmlPackageError } from "../packaging/errors.js";
import type { Slide } from "./generated/slide.js";
import type { SlidePart } from "./parts/slide-part.js";
import type { PresentationDocument } from "./presentation-document.js";

/**
 * 在 `doc` 里找与 `slide` 对象对应的 SlidePart。
 * 遍历 presentationPart.slideParts，比较 isLoaded 后的 slide root。
 */
function resolveSlidePartForSlide(slide: Slide, doc: PresentationDocument): SlidePart {
  const pp = doc.presentationPart;
  if (pp === undefined) {
    throw new OpenXmlPackageError({
      code: "PART_NOT_FOUND",
      message: "getSpeakerNotes/setSpeakerNotes: presentationPart is missing",
    });
  }
  for (const sp of pp.slideParts) {
    if (sp.slide === slide) return sp;
  }
  throw new OpenXmlPackageError({
    code: "PART_NOT_FOUND",
    message: "getSpeakerNotes/setSpeakerNotes: Slide is not in this presentation",
  });
}

/**
 * 读取 slide 的演讲者注释文本。
 *
 * 没有关联 NotesSlidePart 或注释文本为空时返回 `undefined`。
 *
 * @param slide  目标 `<p:sld>` 根元素（由 SlidePart.slide 获取）
 * @param doc    拥有该 slide 的 PresentationDocument
 */
export function getSpeakerNotes(slide: Slide, doc: PresentationDocument): string | undefined {
  const sp = resolveSlidePartForSlide(slide, doc);
  const text = doc.getSlideNotes(sp);
  return text.length === 0 ? undefined : text;
}

/**
 * 写入 slide 的演讲者注释文本。
 *
 * - `text` 为非空字符串：写入注释（首次调用时自动创建 NotesSlidePart）
 * - `text` 为空串或 `undefined`：清空注释内容（txBody 留空段落）
 *
 * @param slide  目标 `<p:sld>` 根元素（由 SlidePart.slide 获取）
 * @param doc    拥有该 slide 的 PresentationDocument
 * @param text   注释文本；undefined / 空串 → 清空
 */
export function setSpeakerNotes(
  slide: Slide,
  doc: PresentationDocument,
  text: string | undefined,
): void {
  const sp = resolveSlidePartForSlide(slide, doc);
  doc.setSlideNotes(sp, text ?? "");
}
