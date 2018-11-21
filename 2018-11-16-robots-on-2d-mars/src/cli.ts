import minimist from "minimist";
import * as fs from "fs";
import { processInput } from "./controller";

const main = () => {
  const args = minimist(process.argv.slice(2));
  const pathOrFd = args._[0] || 0; // fd 0 is stdin
  const input = fs.readFileSync(pathOrFd, "utf8");
  const output = processInput(input);
  process.stdout.write(output);
};

main();
