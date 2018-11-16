import { createInitialState, Direction, startRobot } from "./model";
import { expect } from "chai";

describe("model", () => {
  describe("createInitialState", () => {
    it("should generate an initial state", () => {
      const maxX = 3;
      const maxY = 4;
      const state = createInitialState(3, 4);
      expect(state.maxX).to.eq(maxX);
      expect(state.maxY).to.eq(maxY);
      expect(state.currentRobot).to.be.undefined;
      expect(state.pastRobots).to.be.empty;
      Object.values(state.deathScents).forEach(
        direction => expect(direction).to.be.empty
      );
      expect(state.deathScents);
    });
  });

  describe("startRobot", () => {
    const maxX = 3;
    const maxY = 4;
    const initialState = createInitialState(3, 4);

    it("should add the robot to the state", () => {
      const x = 1;
      const y = 2;
      const direction = Direction.North;

      const state = startRobot(initialState, x, y, direction);
      const currentRobot = state.currentRobot;

      expect(currentRobot).to.not.be.undefined;
      expect(currentRobot.position.x).to.eq(x);
      expect(currentRobot.position.y).to.eq(y);
      expect(currentRobot.direction).to.eq(direction);
    });

    // TODO more tests around error checking correctly
  });
});
