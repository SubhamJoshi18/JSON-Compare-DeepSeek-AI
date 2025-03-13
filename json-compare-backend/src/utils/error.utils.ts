import { NextFunction, Request, Response } from "express";
import { AppError } from "../exceptions";
import errStatusCode from "http-status-codes";

type MixedError = AppError | Error;

function notHandlleError(req: Request, res: Response, next: NextFunction) {
  return res.status(404).json({
    message: `The Route : ${req.originalUrl} Does not Exists on the System`,
  });
}

function globalErrorHandler(
  err: MixedError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.getStatusCode()).json({
      message: err.getMessage(),
      data: null,
      error: true,
      name: err.name,
      stackTrace: err.stack,
    });
  }

  return res.status(errStatusCode.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    data: null,
    error: true,
    name: err.name,
    stackTrace: err.stack,
  });
}

export { notHandlleError, globalErrorHandler };
