import { Application } from "express";
import { notHandlleError } from "../utils/error.utils";
import { globalErrorHandler } from "../utils/error.utils";
import compareJsonRouter from "./compare-json.routes";

function serverRouter(app: Application) {
  app.use("/api", [compareJsonRouter]);

  app.use("*", notHandlleError as any);

  app.use(globalErrorHandler as any);
}

export { serverRouter };
