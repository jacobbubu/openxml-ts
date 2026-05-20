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

// Epic-24：副作用导入 → Run / Paragraph / Slide / Shape 原型挂 \`text\` 访问器
import "./extensions/run-extensions.js";
import "./extensions/paragraph-extensions.js";
import "./extensions/slide-extensions.js";
import "./extensions/slide-title.js";
import "./extensions/run-formatting.js";
import "./extensions/paragraph-formatting.js";
import "./extensions/slide-background.js";
import "./extensions/shape-accessibility.js";
import "./extensions/shape-xfrm.js";
import "./extensions/shape-rotation.js";

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
export { CoreProperties } from "../parts/core-properties.js";
export { CorePropertiesPart } from "../parts/core-properties-part.js";
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

export { getSpeakerNotes, setSpeakerNotes } from "./notes-markup.js";

export { type AddSlideOptions, addSlide } from "./add-slide.js";

export {
  type PictureCrop,
  getPictureCrop,
  setPictureCrop,
} from "./extensions/picture-crop.js";
