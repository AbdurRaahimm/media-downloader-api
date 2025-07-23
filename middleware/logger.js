import morgan from "morgan";
import fs from "fs";
import path, {dirname} from "path";

import { fileURLToPath } from "url";

// Get the current directory name using __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a write stream (in append mode) for logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../log/access.log"),
  { flags: "a" }
);

const logger = morgan("combined", {
  stream: accessLogStream,
  //  skip: (req, res) => res.statusCode < 400 // Skip logging for successful requests
});

export default logger;