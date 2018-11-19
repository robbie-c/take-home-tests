import { parseFirstLine } from "./controller";

describe("controller", () => {
  describe("parseFirstLine", () => {
    it("should parse a correct first line", () => {
      const input = "5 3";
      const result = parseFirstLine(input);
      expect(result).toEqual({ maxX: 5, maxY: 3 });
    });
  });
});
