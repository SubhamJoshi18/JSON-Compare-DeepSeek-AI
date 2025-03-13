import { NextFunction, Request, Response } from "express";
import compareJsonServices from "../services/compareJsonServices";
import { JSONExceptions } from "../exceptions";
import { sendApiResponse } from "../utils/response.utils";

class CompareJsonController {
  public async compareTheJson(req: Request, res: Response, next: NextFunction) {
    try {
      const fileContent = req.files as Express.Multer.File[];

      const apiResponse = await compareJsonServices.compareJson(fileContent);
      const contentMessage = `The JSON Has been Compared`;
      return sendApiResponse(res, apiResponse, contentMessage);
    } catch (err) {
      next(err);
    }
  }
}

export default new CompareJsonController();
