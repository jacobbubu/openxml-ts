export {
  FLAT_OPC_NS,
  parseFlatOpc,
  type FlatOpcEntry,
  type ParsedFlatOpc,
} from "./flat-opc-parser.js";

export {
  isXmlContentType,
  packageToFlatOpc,
  type FlatOpcWriteOptions,
} from "./flat-opc-writer.js";

export { bytesToBase64, base64ToBytes } from "./base64.js";

export { fromFlatOpcAsync } from "./factory.js";
