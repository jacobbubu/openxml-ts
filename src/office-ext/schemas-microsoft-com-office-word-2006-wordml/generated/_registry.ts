// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerWord2006WordmlChildMaps } from "./_child-map.js";
import { AllocatedCommandKeyboardCustomization } from "./allocated-command-keyboard-customization.js";
import { AllocatedCommandManifest } from "./allocated-command-manifest.js";
import { AllocatedCommandManifestEntry } from "./allocated-command-manifest-entry.js";
import { AllocatedCommands } from "./allocated-commands.js";
import { CharacterInsertion } from "./character-insertion.js";
import { DocEvents } from "./doc-events.js";
import { EventDocBuildingBlockAfterInsertXsdString } from "./event-doc-building-block-after-insert-xsd-string.js";
import { EventDocCloseXsdString } from "./event-doc-close-xsd-string.js";
import { EventDocContentControlAfterInsertXsdString } from "./event-doc-content-control-after-insert-xsd-string.js";
import { EventDocContentControlBeforeDeleteXsdString } from "./event-doc-content-control-before-delete-xsd-string.js";
import { EventDocContentControlOnEnterXsdString } from "./event-doc-content-control-on-enter-xsd-string.js";
import { EventDocContentControlOnExistXsdString } from "./event-doc-content-control-on-exist-xsd-string.js";
import { EventDocContentControlUpdateXsdString } from "./event-doc-content-control-update-xsd-string.js";
import { EventDocNewXsdString } from "./event-doc-new-xsd-string.js";
import { EventDocOpenXsdString } from "./event-doc-open-xsd-string.js";
import { EventDocStoreUpdateXsdString } from "./event-doc-store-update-xsd-string.js";
import { EventDocSyncXsdString } from "./event-doc-sync-xsd-string.js";
import { EventDocXmlAfterInsertXsdString } from "./event-doc-xml-after-insert-xsd-string.js";
import { EventDocXmlBeforeDeleteXsdString } from "./event-doc-xml-before-delete-xsd-string.js";
import { FixedCommandKeyboardCustomization } from "./fixed-command-keyboard-customization.js";
import { KeyMapCustomizations } from "./key-map-customizations.js";
import { KeyMapEntry } from "./key-map-entry.js";
import { MacroKeyboardCustomization } from "./macro-keyboard-customization.js";
import { MailMergeRecipients } from "./mail-merge-recipients.js";
import { Mcd } from "./mcd.js";
import { Mcds } from "./mcds.js";
import { MismatchedKeyMapCustomization } from "./mismatched-key-map-customization.js";
import { RecordHashCode } from "./record-hash-code.js";
import { RecordIncluded } from "./record-included.js";
import { SingleDataSourceRecord } from "./single-data-source-record.js";
import { TemplateCommandGroup } from "./template-command-group.js";
import { ToolbarData } from "./toolbar-data.js";
import { Toolbars } from "./toolbars.js";
import { VbaSuppData } from "./vba-supp-data.js";
import { WllMacroKeyboardCustomization } from "./wll-macro-keyboard-customization.js";

/**
 * 把 word-2006-wordml 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerWord2006WordmlElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "acd", AllocatedCommandKeyboardCustomization);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "acdManifest", AllocatedCommandManifest);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "acdEntry", AllocatedCommandManifestEntry);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "acds", AllocatedCommands);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "wch", CharacterInsertion);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "docEvents", DocEvents);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocBuildingBlockAfterInsert", EventDocBuildingBlockAfterInsertXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocClose", EventDocCloseXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocContentControlAfterInsert", EventDocContentControlAfterInsertXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocContentControlBeforeDelete", EventDocContentControlBeforeDeleteXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocContentControlOnEnter", EventDocContentControlOnEnterXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocContentControlOnExit", EventDocContentControlOnExistXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocContentControlContentUpdate", EventDocContentControlUpdateXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocNew", EventDocNewXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocOpen", EventDocOpenXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocStoreUpdate", EventDocStoreUpdateXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocSync", EventDocSyncXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocXmlAfterInsert", EventDocXmlAfterInsertXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "eventDocXmlBeforeDelete", EventDocXmlBeforeDeleteXsdString);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "fci", FixedCommandKeyboardCustomization);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "keymaps", KeyMapCustomizations);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "keymap", KeyMapEntry);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "macro", MacroKeyboardCustomization);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "recipients", MailMergeRecipients);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "mcd", Mcd);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "mcds", Mcds);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "keymapsBad", MismatchedKeyMapCustomization);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "hash", RecordHashCode);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "active", RecordIncluded);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "recipientData", SingleDataSourceRecord);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "tcg", TemplateCommandGroup);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "toolbarData", ToolbarData);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "toolbars", Toolbars);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "vbaSuppData", VbaSuppData);
  registry.register("http://schemas.microsoft.com/office/word/2006/wordml", "wll", WllMacroKeyboardCustomization);
  registerWord2006WordmlChildMaps(registry);
}
