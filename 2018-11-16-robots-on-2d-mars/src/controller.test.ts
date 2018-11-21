import { processRobotMovementLine } from "./controller";
import { Direction, WorldState } from "./model";

describe("controller", () => {
  const buildWorldWithRobot = (
    x: number,
    y: number,
    direction: Direction
  ): WorldState => {
    return {
      maxX: 1,
      maxY: 1,
      pastRobots: [],
      currentRobot: {
        position: { x, y },
        direction,
        isAlive: true
      }
    };
  };

  const buildWorldWithPastRobot = (
    x: number,
    y: number,
    direction: Direction
  ): WorldState => {
    return {
      maxX: 1,
      maxY: 1,
      pastRobots: [
        {
          position: { x, y },
          direction,
          isAlive: true
        }
      ],
      currentRobot: undefined
    };
  };

  const initialState = buildWorldWithRobot(0, 0, Direction.North);
  const movedState = buildWorldWithRobot(0, 1, Direction.North);
  const finishedState = buildWorldWithPastRobot(0, 1, Direction.North);

  jest.mock("./model.ts");
  let model = require("./model");
  let controller = require("./controller");

  describe("processRobotMovementLine", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      model.moveForward.mockReturnValueOnce(movedState);
      model.turnLeft.mockReturnValueOnce(movedState);
      model.turnRight.mockReturnValueOnce(movedState);
      model.finishRobot.mockReturnValueOnce(finishedState);
    });

    it("calls moveForward on F", () => {
      const result = controller.processRobotMovementLine(initialState, "F");
      expect(model.moveForward).toBeCalledWith(initialState);
      expect(model.turnLeft).toBeCalledTimes(0);
      expect(model.turnRight).toBeCalledTimes(0);
      expect(model.finishRobot).toBeCalledWith(movedState);
      expect(result).toEqual(finishedState);
    });

    it("calls turnRight on R", () => {
      const result = controller.processRobotMovementLine(initialState, "R");
      expect(model.moveForward).toBeCalledTimes(0);
      expect(model.turnLeft).toBeCalledTimes(0);
      expect(model.turnRight).toBeCalledWith(initialState);
      expect(model.finishRobot).toBeCalledWith(movedState);
      expect(result).toEqual(finishedState);
    });

    it("calls turnLeft on L", () => {
      const result = controller.processRobotMovementLine(initialState, "L");
      expect(model.moveForward).toBeCalledTimes(0);
      expect(model.turnLeft).toBeCalledWith(initialState);
      expect(model.turnRight).toBeCalledTimes(0);
      expect(model.finishRobot).toBeCalledWith(movedState);
      expect(result).toEqual(finishedState);
    });

    it("handles instructions in order", () => {
      const result = controller.processRobotMovementLine(initialState, "FRL");
      // @ts-ignore
      expect(model.moveForward).toHaveBeenCalledBefore(model.turnRight);
      // @ts-ignore
      expect(model.turnRight).toHaveBeenCalledBefore(model.turnLeft);
      expect(result).toEqual(finishedState);
    });
  });
});
