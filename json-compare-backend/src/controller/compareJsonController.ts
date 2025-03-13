import { NextFunction, Request, Response } from "express";
import compareJsonServices from "../services/compareJsonServices";
import { JSONExceptions } from "../exceptions";
import { sendApiResponse } from "../utils/response.utils";

class CompareJsonController {
  public async compareTheJsonPostman(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const fileContent = req.files as Express.Multer.File[];

      const apiResponse = await compareJsonServices.compareJsonPostman(
        fileContent
      );
      const contentMessage = `The JSON Has been Compared`;
      return sendApiResponse(res, apiResponse, contentMessage);
    } catch (err) {
      next(err);
    }
  }

  public async compareTheJson(req: Request, res: Response, next: NextFunction) {
    try {
      const json1 = req.body.json1 ? JSON.parse(req.body.json1) : null;
      const json2 = req.body.json2 ? JSON.parse(req.body.json2) : null;
      const jsonarr = new Array([json1, json2]);
      const apiResponse = await compareJsonServices.compareJson(jsonarr);
      const contentMessage = `The JSON Has been Compared`;
      return sendApiResponse(res, apiResponse, contentMessage);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new CompareJsonController();
