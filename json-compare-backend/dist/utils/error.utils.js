"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notHandlleError = notHandlleError;
exports.globalErrorHandler = globalErrorHandler;
const exceptions_1 = require("../exceptions");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
function notHandlleError(req, res, next) {
    return res.status(404).json({
        message: `The Route : ${req.originalUrl} Does not Exists on the System`,
    });
}
function globalErrorHandler(err, req, res, next) {
    if (err instanceof exceptions_1.AppError) {
        return res.status(err.getStatusCode()).json({
            message: err.getMessage(),
            data: null,
            error: true,
            name: err.name,
            stackTrace: err.stack,
        });
    }
    return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        data: null,
        error: true,
        name: err.name,
        stackTrace: err.stack,
    });
}
