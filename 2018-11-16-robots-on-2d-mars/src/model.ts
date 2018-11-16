interface Vector2 {
  x: Number;
  y: Number;
}

enum Direction {
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
