// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json

import type { ElementRegistry } from "../../../element/index.js";
import { register200907CustomuiChildMaps } from "./_child-map.js";
import { Backstage } from "./backstage.js";
import { BackstageGroups } from "./backstage-groups.js";
import { BackstageMenuGroup } from "./backstage-menu-group.js";
import { BottomItemsGroupControls } from "./bottom-items-group-controls.js";
import { Box } from "./box.js";
import { ButtonGroup } from "./button-group.js";
import { CheckBox } from "./check-box.js";
import { ComboBox } from "./combo-box.js";
import { Command } from "./command.js";
import { Commands } from "./commands.js";
import { ContextMenu } from "./context-menu.js";
import { ContextMenus } from "./context-menus.js";
import { ContextualTabs } from "./contextual-tabs.js";
import { ControlCloneRegular } from "./control-clone-regular.js";
import { CustomUI } from "./custom-ui.js";
import { DialogBoxLauncher } from "./dialog-box-launcher.js";
import { DocumentControlsQatItems } from "./document-controls-qat-items.js";
import { DropDownRegular } from "./drop-down-regular.js";
import { DynamicMenuRegular } from "./dynamic-menu-regular.js";
import { EditBox } from "./edit-box.js";
import { GalleryRegular } from "./gallery-regular.js";
import { Group } from "./group.js";
import { GroupBox } from "./group-box.js";
import { Hyperlink } from "./hyperlink.js";
import { ImageControl } from "./image-control.js";
import { ItemBackstageItem } from "./item-backstage-item.js";
import { LabelControl } from "./label-control.js";
import { LayoutContainer } from "./layout-container.js";
import { MenuSeparatorNoTitle } from "./menu-separator-no-title.js";
import { MenuWithTitle } from "./menu-with-title.js";
import { PrimaryItem } from "./primary-item.js";
import { QuickAccessToolbar } from "./quick-access-toolbar.js";
import { RadioButtonBackstageItem } from "./radio-button-backstage-item.js";
import { RadioGroup } from "./radio-group.js";
import { Ribbon } from "./ribbon.js";
import { Separator } from "./separator.js";
import { SharedControlsQatItems } from "./shared-controls-qat-items.js";
import { SimpleGroups } from "./simple-groups.js";
import { SplitButtonWithTitle } from "./split-button-with-title.js";
import { Tab } from "./tab.js";
import { Tabs } from "./tabs.js";
import { TabSet } from "./tab-set.js";
import { TaskFormGroup } from "./task-form-group.js";
import { TaskGroup } from "./task-group.js";
import { TaskGroupCategory } from "./task-group-category.js";
import { TaskGroupTask } from "./task-group-task.js";
import { TopItemsGroupControls } from "./top-items-group-controls.js";
import { VisibleButton } from "./visible-button.js";
import { VisibleToggleButton } from "./visible-toggle-button.js";

/**
 * 把 2009-07-customui 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register200907CustomuiElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "backstage", Backstage);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "firstColumn", BackstageGroups);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "menuGroup", BackstageMenuGroup);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "bottomItems", BottomItemsGroupControls);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "box", Box);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "buttonGroup", ButtonGroup);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "checkBox", CheckBox);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "comboBox", ComboBox);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "command", Command);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "commands", Commands);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "contextMenu", ContextMenu);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "contextMenus", ContextMenus);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "contextualTabs", ContextualTabs);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "control", ControlCloneRegular);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "customUI", CustomUI);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "dialogBoxLauncher", DialogBoxLauncher);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "documentControls", DocumentControlsQatItems);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "dropDown", DropDownRegular);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "dynamicMenu", DynamicMenuRegular);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "editBox", EditBox);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "gallery", GalleryRegular);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "group", Group);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "groupBox", GroupBox);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "hyperlink", Hyperlink);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "imageControl", ImageControl);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "item", ItemBackstageItem);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "labelControl", LabelControl);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "layoutContainer", LayoutContainer);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "menuSeparator", MenuSeparatorNoTitle);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "menu", MenuWithTitle);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "primaryItem", PrimaryItem);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "qat", QuickAccessToolbar);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "radioButton", RadioButtonBackstageItem);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "radioGroup", RadioGroup);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "ribbon", Ribbon);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "separator", Separator);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "sharedControls", SharedControlsQatItems);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "secondColumn", SimpleGroups);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "splitButton", SplitButtonWithTitle);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "tab", Tab);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "tabs", Tabs);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "tabSet", TabSet);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "taskFormGroup", TaskFormGroup);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "taskGroup", TaskGroup);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "category", TaskGroupCategory);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "task", TaskGroupTask);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "topItems", TopItemsGroupControls);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "button", VisibleButton);
  registry.register("http://schemas.microsoft.com/office/2009/07/customui", "toggleButton", VisibleToggleButton);
  register200907CustomuiChildMaps(registry);
}
