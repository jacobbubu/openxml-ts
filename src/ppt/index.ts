/**
 * `openxml-ts/ppt` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { PresentationDocument } from "openxml-ts/ppt";
 *
 * await using doc = await PresentationDocument.openAsync("./deck.pptx");
 * for (const sp of doc.presentationPart!.slideParts) {
 *   console.log(sp.slide.localName);
 * }
 * ```
 *
 * 子 entry + size-limit 守护在 Story-4.8 落地；本文件 Story-4.3 起初建、4.5 接入门面。
 */

export { PresentationDocument } from "./presentation-document.js";
export {
  NotesMasterPart,
  NotesSlidePart,
  PresentationPart,
  SlideLayoutPart,
  SlideMasterPart,
  SlidePart,
} from "./parts/index.js";
export { TypedXmlPart } from "../parts/typed-xml-part.js";

export { BinaryPart } from "../parts/binary-part.js";
export {
  type AddImagePartOptions,
  ImagePart,
  extensionForMime,
  mimeForExtension,
  sniffImageMime,
} from "../parts/image-part.js";

export {
  type CreateImagePictureOptions,
  createImagePictureForPpt,
} from "./image-markup.js";

export {
  type CreateSlideTableOptions,
  createSlideTable,
  getSlideTableCellText,
  mergeSlideTableCells,
  setSlideTableCellText,
} from "./table-markup.js";
