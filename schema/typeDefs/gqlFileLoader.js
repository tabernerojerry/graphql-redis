import path from "path";
import fs from "fs";

export default file => fs.readFileSync(path.join(__dirname, file), "UTF-8");
