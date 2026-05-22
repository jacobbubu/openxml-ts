// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_tasks_2019_documenttasks.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerTasks2019DocumenttasksChildMaps } from "./_child-map.js";
import { AssignTaskUser } from "./assign-task-user.js";
import { AttributionTaskUser } from "./attribution-task-user.js";
import { CommentAnchor } from "./comment-anchor.js";
import { ExtensionList } from "./extension-list.js";
import { Task } from "./task.js";
import { TaskAnchor } from "./task-anchor.js";
import { TaskCreateEventInfo } from "./task-create-event-info.js";
import { TaskDeleteEventInfo } from "./task-delete-event-info.js";
import { TaskHistory } from "./task-history.js";
import { TaskHistoryEvent } from "./task-history-event.js";
import { TaskPriorityEventInfo } from "./task-priority-event-info.js";
import { TaskProgressEventInfo } from "./task-progress-event-info.js";
import { Tasks } from "./tasks.js";
import { TaskScheduleEventInfo } from "./task-schedule-event-info.js";
import { TaskTitleEventInfo } from "./task-title-event-info.js";
import { TaskUnassignAll } from "./task-unassign-all.js";
import { TaskUndeleteEventInfo } from "./task-undelete-event-info.js";
import { TaskUndo } from "./task-undo.js";
import { UnassignTaskUser } from "./unassign-task-user.js";

/**
 * 把 tasks-2019-documenttasks 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerTasks2019DocumenttasksElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Assign", AssignTaskUser);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Attribution", AttributionTaskUser);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Comment", CommentAnchor);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Task", Task);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Anchor", TaskAnchor);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Create", TaskCreateEventInfo);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Delete", TaskDeleteEventInfo);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "History", TaskHistory);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Event", TaskHistoryEvent);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Priority", TaskPriorityEventInfo);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Progress", TaskProgressEventInfo);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Tasks", Tasks);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Schedule", TaskScheduleEventInfo);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "SetTitle", TaskTitleEventInfo);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "UnassignAll", TaskUnassignAll);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Undelete", TaskUndeleteEventInfo);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Undo", TaskUndo);
  registry.register("http://schemas.microsoft.com/office/tasks/2019/documenttasks", "Unassign", UnassignTaskUser);
  registerTasks2019DocumenttasksChildMaps(registry);
}
