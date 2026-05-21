// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2017_3_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { Track } from "./track.js";
import { TrackList } from "./track-list.js";
import { TracksInfo } from "./tracks-info.js";

/**
 * 把 2017-3-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register20173MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2017/3/main", "track", Track);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2017/3/main", "trackLst", TrackList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2017/3/main", "tracksInfo", TracksInfo);
}
