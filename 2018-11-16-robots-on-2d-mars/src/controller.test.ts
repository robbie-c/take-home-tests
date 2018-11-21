import { parseFirstLine, parseRobotStartLine } from "./controller";
import { Direction } from "./model";

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

  describe("parseRobotStartLine", () => {
    it("should parse a correct robot start line with North", () => {
      const input = "1 1 N";
      const result = parseRobotStartLine(input);
      expect(result).toEqual({ x: 1, y: 1, direction: Direction.North });
    });

    it("should parse a correct robot start line with East", () => {
      const input = "1 1 E";
      const result = parseRobotStartLine(input);
      expect(result).toEqual({ x: 1, y: 1, direction: Direction.East });
    });

    it("should parse a correct robot start line with East", () => {
      const input = "1 1 S";
      const result = parseRobotStartLine(input);
      expect(result).toEqual({ x: 1, y: 1, direction: Direction.South });
    });

    it("should parse a correct robot start line with East", () => {
      const input = "1 1 W";
      const result = parseRobotStartLine(input);
      expect(result).toEqual({ x: 1, y: 1, direction: Direction.West });
    });

    it("should reject negative numbers", () => {
      const input = "-1 1 E";
      const result = parseRobotStartLine(input);
      expect(result).toEqual(undefined);
    });

    it("should reject empty string", () => {
      const input = "";
      const result = parseRobotStartLine(input);
      expect(result).toEqual(undefined);
    });

    it("should reject missing direction", () => {
      const input = "1 1";
      const result = parseRobotStartLine(input);
      expect(result).toEqual(undefined);
    });

    it("should reject decimal point number", () => {
      const input = "1.5 1 E";
      const result = parseRobotStartLine(input);
      expect(result).toEqual(undefined);
    });

    it("should reject invalid direction", () => {
      const input = "1 1 A";
      const result = parseRobotStartLine(input);
      expect(result).toEqual(undefined);
    });
  });
});
