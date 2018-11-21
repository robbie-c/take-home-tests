import assert from "assert";

export interface Vector2 {
  x: number;
  y: number;
}

export enum Direction {
  North = "N",
  South = "S",
  East = "E",
  West = "W"
}

export interface Robot {
  position: Vector2;
  direction: Direction;
  isAlive: boolean;
}

export interface WorldState {
  maxX: number;
  maxY: number;

  currentRobot?: Robot;
  pastRobots: Robot[];
}

export const createInitialState = (
  maxX: number,
  maxY: number
): Readonly<WorldState> => {
  return {
    maxX,
    maxY,
    currentRobot: undefined,
    pastRobots: []
  };
};

export const startRobot = (
  state: Readonly<WorldState>,
  x: number,
  y: number,
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
      direction,
      isAlive: true
    }
  };
};

const getNewPosition = (position: Vector2, direction: Direction) => {
  const { x, y } = position;
  switch (direction) {
    case Direction.North:
      return { x, y: y + 1 };
    case Direction.South:
      return { x, y: y - 1 };
    case Direction.West:
      return { x: x - 1, y };
    case Direction.East:
      return { x: x + 1, y };
  }
};

export const moveForward = (state: Readonly<WorldState>): WorldState => {
  if (!state.currentRobot) {
    // throw here rather than just assert, as a hint to the type checker
    throw new assert.AssertionError({ message: "No current robot" });
  }
  const { direction, position } = state.currentRobot;

  const newPosition = getNewPosition(position, direction);
  const { x, y } = newPosition;

  let nextCurrentRobot;
  let nextPastRobots;
  if (x < 0 || x > state.maxX || y < 0 || y > state.maxY) {
    if (
      state.pastRobots.find(
        robot =>
          !robot.isAlive &&
          robot.position.x === newPosition.x &&
          robot.position.y === newPosition.y
      )
    ) {
      // found dead robot at new position, ignore command
      nextPastRobots = state.pastRobots;
      nextCurrentRobot = state.currentRobot;
    } else {
      // fall off and die
      nextPastRobots = [
        ...state.pastRobots,
        {
          position: newPosition,
          direction,
          isAlive: false
        }
      ];
      nextCurrentRobot = undefined;
    }
  } else {
    nextPastRobots = state.pastRobots;
    nextCurrentRobot = {
      ...state.currentRobot,
      position: newPosition
    };
  }

  return {
    ...state,
    currentRobot: nextCurrentRobot,
    pastRobots: nextPastRobots
  };
};

export const getRightDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.North:
      return Direction.East;
    case Direction.East:
      return Direction.South;
    case Direction.South:
      return Direction.West;
    case Direction.West:
      return Direction.North;
  }
};

export const getLeftDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.North:
      return Direction.West;
    case Direction.East:
      return Direction.North;
    case Direction.South:
      return Direction.East;
    case Direction.West:
      return Direction.South;
  }
};

export const turnRight = (state: Readonly<WorldState>): WorldState => {
  if (!state.currentRobot) {
    // throw here rather than just assert, as a hint to the type checker
    throw new assert.AssertionError({ message: "No current robot" });
  }
  return {
    ...state,
    currentRobot: {
      ...state.currentRobot,
      direction: getRightDirection(state.currentRobot.direction)
    }
  };
};

export const turnLeft = (state: Readonly<WorldState>): WorldState => {
  if (!state.currentRobot) {
    // throw here rather than just assert, as a hint to the type checker
    throw new assert.AssertionError({ message: "No current robot" });
  }
  return {
    ...state,
    currentRobot: {
      ...state.currentRobot,
      direction: getLeftDirection(state.currentRobot.direction)
    }
  };
};

export const finishRobot = (state: Readonly<WorldState>): WorldState => {
  if (!state.currentRobot) {
    return state;
  }
  return {
    ...state,
    currentRobot: undefined,
    pastRobots: [...state.pastRobots, state.currentRobot]
  };
};
