import express from "express";
import { getEnvValue } from "./utils/env.utils";
import { jsonLogger } from "./libs/logger.libs";
import { serverMiddleware } from "./middlewares/server.middleware";
import { serverRouter } from "./routes/server.routes";

const app = express();
const port = Number(getEnvValue("PORT"));

async function startExpressApp() {
  try {
    console.log(port);
    await Promise.all([serverMiddleware(app), serverRouter(app)]);
    app.listen(port, () => {
      jsonLogger.info(`Server is running on the port : ${port}`);
    });
  } catch (err) {
    jsonLogger.error(`Error Starting the JSON Compare DeepSeek AI Server`);
    process.exit(0);
  }
}

(async () => {
  await startExpressApp();
})();
