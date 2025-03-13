import { Router } from "express";
import multer from "multer";
import storage from "../config/multer.config";
import CompareJsonController from "../controller/compareJsonController";

const upload = multer({ storage: storage });

const compareJsonRouter = Router();

compareJsonRouter.post(
  "/compare-json",
  upload.array("json", 2),
  CompareJsonController.compareTheJson as any
);

export default compareJsonRouter;
