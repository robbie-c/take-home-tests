import {
  getRobotOutputString,
  parseFirstLine,
  parseRobotStartLine,
  splitLines
} from "./parsing";
import assert from "assert";
import {
  createInitialState,
  finishRobot,
  moveForward,
  startRobot,
  turnLeft,
  turnRight,
  WorldState
} from "./model";

export const processFirstLine = (line: string) => {
  const parsed = parseFirstLine(line);
  assert(parsed);
  return createInitialState(parsed!.maxX, parsed!.maxY);
};

export const processRobotStartLine = (state: WorldState, line: string) => {
  const parsed = parseRobotStartLine(line);
  assert(parsed);
  return startRobot(state, parsed!.x, parsed!.y, parsed!.direction);
};

export const processRobotMovementLine = (state: WorldState, line: string) => {
  assert(line);
  let currentState = state;
  line.split("").forEach(char => {
    switch (char) {
      case "F":
        currentState = moveForward(currentState);
        break;
      case "R":
        currentState = turnRight(currentState);
        break;
      case "L":
        currentState = turnLeft(currentState);
        break;
    }
  });
  currentState = finishRobot(currentState);
  return currentState;
};

export const produceOutput = (state: WorldState) => {
  return state.pastRobots.map(robot => getRobotOutputString(robot)).join("\n");
};
