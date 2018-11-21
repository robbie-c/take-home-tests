import * as childProcess from "child_process";
import { exampleInput, exampleOutput } from "../testData/data";

describe("e2e", () => {
  it("should produce expected output from spec", () => {
    const output = childProcess.execSync("yarn --silent start", {
      input: exampleInput
    });
    const outputString = String(output);
    expect(outputString).toEqual(exampleOutput);
  });
});
