import { describe, expect, it } from "vitest";
import { PACKAGE_NAME } from "../src/index.js";

describe("openxml-ts smoke", () => {
  it("exports the package identifier", () => {
    expect(PACKAGE_NAME).toBe("openxml-ts");
  });
});
