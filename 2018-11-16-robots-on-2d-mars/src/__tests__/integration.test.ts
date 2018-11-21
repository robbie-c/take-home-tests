import { processInput } from "../controller";
import { exampleInput, exampleOutput } from "../testData/data";

describe("integration", () => {
  describe("processInput", () => {
    it("should produce expected output from spec", () => {
      const output = processInput(exampleInput);
      expect(output).toEqual(exampleOutput);
    });
  });
});
