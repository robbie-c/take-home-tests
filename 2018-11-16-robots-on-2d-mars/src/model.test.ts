import { createInitialState } from "./model";
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
});
