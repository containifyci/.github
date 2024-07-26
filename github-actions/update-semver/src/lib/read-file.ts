const fs = require("fs");
const path = require("path");

export default async function readFile(baseDir: string, file: string) {
  const pathToFile = path.join(baseDir, file);

  if (!fs.existsSync(pathToFile)) {
    throw new Error(`${file} does not exist.`);
  }

  return fs.promises.readFile(pathToFile, "utf8");
}
