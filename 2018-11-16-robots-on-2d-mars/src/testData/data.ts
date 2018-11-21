import { readFileSync } from "fs";

import * as path from "path";

export const exampleInput = String(
  readFileSync(path.join(__dirname, "exampleInput.txt"))
);

export const exampleOutput = String(
  readFileSync(path.join(__dirname, "exampleOutput.txt"))
);
