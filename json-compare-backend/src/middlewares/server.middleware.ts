import { Application } from "express";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { corsConfig } from "../config/cors.config";

function serverMiddleware(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cors(corsConfig));
}

export { serverMiddleware };
