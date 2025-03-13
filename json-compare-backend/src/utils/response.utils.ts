import serverStatusCode from "http-status-codes";
import { Response } from "express";

function sendApiResponse<T>(
  res: Response,
  data: T,
  message: string,
  statusCode = serverStatusCode.ACCEPTED
) {
  return res.status(statusCode).json({
    data,
    message,
    statusCode,
    error: false,
  });
}

export { sendApiResponse };
