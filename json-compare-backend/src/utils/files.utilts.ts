import fs from "fs";
import path from "path";
import { jsonLogger } from "../libs/logger.libs";

async function clearDirectory() {
  try {
    const dirPath = path.join(process.cwd(), "uploads");
    const files = await fs.promises.readdir(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);

      const stat = await fs.promises.stat(filePath);
      if (stat.isDirectory()) {
        await clearDirectory();
        await fs.promises.rmdir(filePath);
      } else {
        await fs.promises.unlink(filePath);
      }
    }
    jsonLogger.info(`Directory "${dirPath}" cleared successfully.`);
  } catch (error) {
    jsonLogger.error("Error clearing directory:", error);
  }
}

export { clearDirectory };
