import { Router } from "express";
import multer from "multer";
import storage from "../config/multer.config";
import CompareJsonController from "../controller/compareJsonController";

const upload = multer({ storage: storage });

const compareJsonRouter = Router();

compareJsonRouter.post(
  "/compare-json",
  upload.none(),
  CompareJsonController.compareTheJson as any
);

compareJsonRouter.post(
  "/compare-json-postman",
  upload.array("json", 2),
  CompareJsonController.compareTheJsonPostman as any
);

export default compareJsonRouter;
