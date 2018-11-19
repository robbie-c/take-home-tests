import {
  createInitialState,
  Direction,
  moveForward,
  startRobot,
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
  });
});
