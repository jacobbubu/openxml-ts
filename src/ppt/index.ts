/**
 * `openxml-ts/ppt` 公共 entry（Story-4.3 起初建）。
 *
 * 当前阶段仅暴露 typed Parts 与 generated element 类；
 * 门面 `PresentationDocument` 在 Story-4.5 接入，子 entry + size-limit 在 Story-4.8 落地。
 */

export {
  NotesMasterPart,
  NotesSlidePart,
  PresentationPart,
  SlideLayoutPart,
  SlideMasterPart,
  SlidePart,
} from "./parts/index.js";
export { TypedXmlPart } from "../parts/typed-xml-part.js";
