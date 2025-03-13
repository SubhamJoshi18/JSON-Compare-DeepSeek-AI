"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendApiResponse = sendApiResponse;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
function sendApiResponse(res, data, message, statusCode = http_status_codes_1.default.ACCEPTED) {
    return res.status(statusCode).json({
        data,
        message,
        statusCode,
        error: false,
    });
}
