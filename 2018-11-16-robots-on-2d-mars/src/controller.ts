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
