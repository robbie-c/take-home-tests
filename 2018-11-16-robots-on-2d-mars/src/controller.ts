import { Direction } from "./model";

export const parseFirstLine = (line: string) => {
  const match = /^([0-9]+)\s+([0-9]+)\s*$/.exec(line);
  if (!match) {
    return undefined;
  }
  return {
    maxX: parseInt(match![1]),
    maxY: parseInt(match![2])
  };
};

export const parseRobotStartLine = (line: string) => {
  const match = /^([0-9]+)\s+([0-9]+)\s+([NESW])$/.exec(line);
  if (!match) {
    return undefined;
  }
  const directionLetter = match![3];
  if (!Object.values(Direction).includes(directionLetter)) {
    return undefined;
  }

  return {
    x: parseInt(match![1]),
    y: parseInt(match![2]),
    direction: directionLetter as Direction
  };
};
