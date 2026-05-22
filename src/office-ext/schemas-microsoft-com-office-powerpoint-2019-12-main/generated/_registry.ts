// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2019_12_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { register201912MainChildMaps } from "./_child-map.js";
import { AddEmpty } from "./add-empty.js";
import { AsgnTaskAssignUnassignUser } from "./asgn-task-assign-unassign-user.js";
import { AtrbtnTaskAssignUnassignUser } from "./atrbtn-task-assign-unassign-user.js";
import { CommentAnchor } from "./comment-anchor.js";
import { ExtensionList } from "./extension-list.js";
import { TaskAnchor } from "./task-anchor.js";
import { TaskHistory } from "./task-history.js";
import { TaskHistoryDetails } from "./task-history-details.js";
import { TaskHistoryEvent } from "./task-history-event.js";
import { TaskPriorityRecord } from "./task-priority-record.js";
import { TaskProgressEventInfo } from "./task-progress-event-info.js";
import { TaskScheduleEventInfo } from "./task-schedule-event-info.js";
import { TaskTitleEventInfo } from "./task-title-event-info.js";
import { TaskUndo } from "./task-undo.js";
import { TaskUnknownRecord } from "./task-unknown-record.js";
import { UnasgnAllEmpty } from "./unasgn-all-empty.js";
import { UnAsgnTaskAssignUnassignUser } from "./un-asgn-task-assign-unassign-user.js";

/**
 * 把 2019-12-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register201912MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "add", AddEmpty);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "asgn", AsgnTaskAssignUnassignUser);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "atrbtn", AtrbtnTaskAssignUnassignUser);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "comment", CommentAnchor);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "anchr", TaskAnchor);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "history", TaskHistory);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "taskHistoryDetails", TaskHistoryDetails);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "event", TaskHistoryEvent);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "pri", TaskPriorityRecord);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "pcntCmplt", TaskProgressEventInfo);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "date", TaskScheduleEventInfo);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "title", TaskTitleEventInfo);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "undo", TaskUndo);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "unknown", TaskUnknownRecord);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "unasgnAll", UnasgnAllEmpty);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/12/main", "unAsgn", UnAsgnTaskAssignUnassignUser);
  register201912MainChildMaps(registry);
}
