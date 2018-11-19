import { parseFirstLine } from "./controller";

describe("controller", () => {
  describe("parseFirstLine", () => {
    it("should parse a correct first line", () => {
      const input = "5 3";
      const result = parseFirstLine(input);
      expect(result).toEqual({ maxX: 5, maxY: 3 });
    });

    it("should reject negative number", () => {
      const input = "-5 3";
      const result = parseFirstLine(input);
      expect(result).toEqual(undefined);
    });

    it("should reject empty string", () => {
      const input = "";
      const result = parseFirstLine(input);
      expect(result).toEqual(undefined);
    });

    it("should reject decimal point number", () => {
      const input = "5.5 3";
      const result = parseFirstLine(input);
      expect(result).toEqual(undefined);
    });

    it("should reject lines with multiple numbers", () => {
      const input = "5 3 3";
      const result = parseFirstLine(input);
      expect(result).toEqual(undefined);
    });
  });
});
