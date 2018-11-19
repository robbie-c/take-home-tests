import {
  createInitialState,
  Direction,
  moveForward,
  startRobot,
  turnLeft,
  turnRight,
  Vector2,
  WorldState
} from "./model";

describe("model", () => {
  describe("createInitialState", () => {
    it("should generate an initial state", () => {
      const maxX = 3;
      const maxY = 4;
      const state = createInitialState(3, 4);
      expect(state.maxX).toEqual(maxX);
      expect(state.maxY).toEqual(maxY);
      expect(state.currentRobot).toEqual(undefined);
      expect(state.pastRobots).toEqual([]);
    });
  });

  describe("startRobot", () => {
    const maxX = 3;
    const maxY = 4;
    const initialState = createInitialState(maxX, maxY);

    it("should add the robot to the state", () => {
      const x = 1;
      const y = 2;
      const direction = Direction.North;

      const state = startRobot(initialState, x, y, direction);
      const currentRobot = state.currentRobot;

      expect(currentRobot).toBeTruthy();
      expect(currentRobot.position.x).toEqual(x);
      expect(currentRobot.position.y).toEqual(y);
      expect(currentRobot.direction).toEqual(direction);
    });

    // TODO more tests around error checking correctly
  });

  describe("moveForward", () => {
    const maxX = 1;
    const maxY = 1;
    const buildStateWithRobot = (
      position: Vector2,
      direction: Direction
    ): WorldState => {
      return {
        currentRobot: {
          position,
          direction,
          isAlive: true
        },
        pastRobots: [],
        maxX,
        maxY
      };
    };

    const buildStateWithDeadRobot = (
      position: Vector2,
      direction: Direction
    ): WorldState => {
      return {
        currentRobot: undefined,
        pastRobots: [
          {
            position,
            direction,
            isAlive: false
          }
        ],
        maxX,
        maxY
      };
    };

    const buildStateWithLiveAndDeadRobot = (
      livePosition: Vector2,
      liveDirection: Direction,
      deadPosition: Vector2,
      deadDirection: Direction
    ): WorldState => {
      return {
        currentRobot: {
          position: livePosition,
          direction: liveDirection,
          isAlive: true
        },
        pastRobots: [
          {
            position: deadPosition,
            direction: deadDirection,
            isAlive: false
          }
        ],
        maxX,
        maxY
      };
    };

    describe("happy case when there is no edge", () => {
      [
        {
          x: 0,
          y: 0,
          direction: Direction.North,
          newX: 0,
          newY: 1,
          description: "north"
        },
        {
          x: 0,
          y: 1,
          direction: Direction.South,
          newX: 0,
          newY: 0,
          description: "south"
        },
        {
          x: 1,
          y: 0,
          direction: Direction.West,
          newX: 0,
          newY: 0,
          description: "west"
        },
        {
          x: 0,
          y: 0,
          direction: Direction.East,
          newX: 1,
          newY: 0,
          description: "east"
        }
      ].forEach(({ x, y, direction, newX, newY, description }) => {
        it(description, () => {
          const initialState = buildStateWithRobot({ x, y }, direction);
          const actual = moveForward(initialState);
          const expected = buildStateWithRobot({ x: newX, y: newY }, direction);
          expect(actual).toEqual(expected);
        });
      });
    });

    describe("fall off and die", () => {
      [
        {
          x: 0,
          y: 1,
          direction: Direction.North,
          newX: 0,
          newY: 2,
          description: "north"
        },
        {
          x: 0,
          y: 0,
          direction: Direction.South,
          newX: 0,
          newY: -1,
          description: "south"
        },
        {
          x: 0,
          y: 0,
          direction: Direction.West,
          newX: -1,
          newY: 0,
          description: "west"
        },
        {
          x: 1,
          y: 0,
          direction: Direction.East,
          newX: 2,
          newY: 0,
          description: "east"
        }
      ].forEach(({ x, y, direction, newX, newY, description }) => {
        it(description, () => {
          const initialState = buildStateWithRobot({ x, y }, direction);
          const actual = moveForward(initialState);
          const expected = buildStateWithDeadRobot(
            { x: newX, y: newY },
            direction
          );
          expect(actual).toEqual(expected);
        });
      });
    });
    describe("ignore command and don't fall off due to previous scent", () => {
      [
        {
          x: 0,
          y: 1,
          direction: Direction.North,
          deadX: 0,
          deadY: 2,
          description: "north"
        },
        {
          x: 0,
          y: 0,
          direction: Direction.South,
          deadX: 0,
          deadY: -1,
          description: "south"
        },
        {
          x: 0,
          y: 0,
          direction: Direction.West,
          deadX: -1,
          deadY: 0,
          description: "west"
        },
        {
          x: 1,
          y: 0,
          direction: Direction.East,
          deadX: 2,
          deadY: 0,
          description: "east"
        }
      ].forEach(({ x, y, direction, deadX, deadY, description }) => {
        it(description, () => {
          const initialState = buildStateWithLiveAndDeadRobot(
            { x, y },
            direction,
            { x: deadX, y: deadY },
            direction
          );
          const actual = moveForward(initialState);
          expect(actual).toEqual(initialState);
        });
      });
    });
  });

  describe("turn", () => {
    const buildStateWithRobotWithDirection = (
      direction: Direction
    ): WorldState => {
      return {
        currentRobot: {
          position: { x: 0, y: 0 },
          direction,
          isAlive: true
        },
        pastRobots: [],
        maxX: 1,
        maxY: 1
      };
    };

    describe("right", () => {
      [
        {
          initialDirection: Direction.North,
          expectedDirection: Direction.East,
          description: "from north"
        },
        {
          initialDirection: Direction.East,
          expectedDirection: Direction.South,
          description: "from east"
        },
        {
          initialDirection: Direction.South,
          expectedDirection: Direction.West,
          description: "from south"
        },
        {
          initialDirection: Direction.West,
          expectedDirection: Direction.North,
          description: "from west"
        }
      ].forEach(({ initialDirection, expectedDirection, description }) => {
        it(description, () => {
          const initialState = buildStateWithRobotWithDirection(
            initialDirection
          );
          const expectedState = buildStateWithRobotWithDirection(
            expectedDirection
          );
          const actualState = turnRight(initialState);
          expect(actualState).toEqual(expectedState);
        });
      });
    });

    describe("left", () => {
      [
        {
          initialDirection: Direction.North,
          expectedDirection: Direction.West,
          description: "from north"
        },
        {
          initialDirection: Direction.East,
          expectedDirection: Direction.North,
          description: "from east"
        },
        {
          initialDirection: Direction.South,
          expectedDirection: Direction.East,
          description: "from south"
        },
        {
          initialDirection: Direction.West,
          expectedDirection: Direction.South,
          description: "from west"
        }
      ].forEach(({ initialDirection, expectedDirection, description }) => {
        it(description, () => {
          const initialState = buildStateWithRobotWithDirection(
            initialDirection
          );
          const expectedState = buildStateWithRobotWithDirection(
            expectedDirection
          );
          const actualState = turnLeft(initialState);
          expect(actualState).toEqual(expectedState);
        });
      });
    });
  });
});
