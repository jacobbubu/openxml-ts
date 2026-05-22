// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_01_customui.json

import type { ElementRegistry } from "../../../element/index.js";
import { register200601CustomuiChildMaps } from "./_child-map.js";
import { Box } from "./box.js";
import { ButtonGroup } from "./button-group.js";
import { CheckBox } from "./check-box.js";
import { ComboBox } from "./combo-box.js";
import { ContextualTabSet } from "./contextual-tab-set.js";
import { ContextualTabSets } from "./contextual-tab-sets.js";
import { CustomUI } from "./custom-ui.js";
import { DialogBoxLauncher } from "./dialog-box-launcher.js";
import { DocumentSpecificQuickAccessToolbarControls } from "./document-specific-quick-access-toolbar-controls.js";
import { DropDown } from "./drop-down.js";
import { EditBox } from "./edit-box.js";
import { Group } from "./group.js";
import { Item } from "./item.js";
import { MenuSeparator } from "./menu-separator.js";
import { OfficeMenu } from "./office-menu.js";
import { QuickAccessToolbar } from "./quick-access-toolbar.js";
import { RepurposedCommand } from "./repurposed-command.js";
import { RepurposedCommands } from "./repurposed-commands.js";
import { Ribbon } from "./ribbon.js";
import { SharedQatControls } from "./shared-qat-controls.js";
import { Tab } from "./tab.js";
import { Tabs } from "./tabs.js";
import { TextLabel } from "./text-label.js";
import { UnsizedControlClone } from "./unsized-control-clone.js";
import { UnsizedDynamicMenu } from "./unsized-dynamic-menu.js";
import { UnsizedGallery } from "./unsized-gallery.js";
import { UnsizedMenu } from "./unsized-menu.js";
import { UnsizedSplitButton } from "./unsized-split-button.js";
import { VerticalSeparator } from "./vertical-separator.js";
import { VisibleButton } from "./visible-button.js";
import { VisibleToggleButton } from "./visible-toggle-button.js";

/**
 * 把 2006-01-customui 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register200601CustomuiElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "box", Box);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "buttonGroup", ButtonGroup);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "checkBox", CheckBox);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "comboBox", ComboBox);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "tabSet", ContextualTabSet);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "contextualTabs", ContextualTabSets);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "customUI", CustomUI);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "dialogBoxLauncher", DialogBoxLauncher);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "documentControls", DocumentSpecificQuickAccessToolbarControls);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "dropDown", DropDown);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "editBox", EditBox);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "group", Group);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "item", Item);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "menuSeparator", MenuSeparator);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "officeMenu", OfficeMenu);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "qat", QuickAccessToolbar);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "command", RepurposedCommand);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "commands", RepurposedCommands);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "ribbon", Ribbon);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "sharedControls", SharedQatControls);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "tab", Tab);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "tabs", Tabs);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "labelControl", TextLabel);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "control", UnsizedControlClone);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "dynamicMenu", UnsizedDynamicMenu);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "gallery", UnsizedGallery);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "menu", UnsizedMenu);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "splitButton", UnsizedSplitButton);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "separator", VerticalSeparator);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "button", VisibleButton);
  registry.register("http://schemas.microsoft.com/office/2006/01/customui", "toggleButton", VisibleToggleButton);
  register200601CustomuiChildMaps(registry);
}
