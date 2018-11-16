import assert from "assert";

interface Vector2 {
  x: Number;
  y: Number;
}

export enum Direction {
  North,
  South,
  East,
  West
}

interface Robot {
  position: Vector2;
  direction: Direction;
}

interface WorldState {
  maxX: Number;
  maxY: Number;

  currentRobot?: Robot;
  pastRobots: Robot[];

  deathScents: {
    north: Set<Number>;
    south: Set<Number>; // y = 0
    west: Set<Number>; // x = 0
    east: Set<Number>;
  };
}

export const createInitialState = (
  maxX: Number,
  maxY: Number
): Readonly<WorldState> => {
  return {
    maxX,
    maxY,
    currentRobot: undefined,
    pastRobots: [],
    deathScents: {
      north: new Set(),
      south: new Set(),
      west: new Set(),
      east: new Set()
    }
  };
};

export const startRobot = (
  state: Readonly<WorldState>,
  x: Number,
  y: Number,
  direction: Direction
) => {
  assert(x >= 0);
  assert(x <= state.maxX);
  assert(y >= 0);
  assert(y <= state.maxY);
  assert(state.currentRobot === undefined);

  return {
    ...state,
    currentRobot: {
      position: { x, y },
      direction
    }
  };
};
