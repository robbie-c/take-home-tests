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
  const instructions = line.split("");

  for (let char of instructions) {
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

    if (!currentState.currentRobot) {
      // robot dead, ignore further instructions
      return currentState;
    }
  }

  currentState = finishRobot(currentState);
  return currentState;
};

export const produceOutput = (state: WorldState) => {
  return (
    state.pastRobots.map(robot => getRobotOutputString(robot)).join("\n") + "\n"
  );
};

export const processInput = (input: string): string => {
  const lines = splitLines(input);
  assert(lines.length > 0);
  let state = processFirstLine(lines[0]);

  for (let i = 1; i < lines.length; i += 2) {
    state = processRobotStartLine(state, lines[i]);
    state = processRobotMovementLine(state, lines[i + 1]);
  }

  return produceOutput(state);
};
