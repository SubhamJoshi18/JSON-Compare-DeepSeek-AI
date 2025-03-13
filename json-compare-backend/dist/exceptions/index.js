"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONExceptions = exports.DatabaseExceptions = exports.AppError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.name = "App Error";
        Object.setPrototypeOf(this, new.target.prototype);
    }
    getStatusCode() {
        return this.statusCode;
    }
    getMessage() {
        return this.message;
    }
}
exports.AppError = AppError;
class DatabaseExceptions extends AppError {
    constructor(message, statusCode = http_status_codes_1.default.CONFLICT) {
        super(message, statusCode);
        this.name = "Database Exceptions";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.DatabaseExceptions = DatabaseExceptions;
class JSONExceptions extends AppError {
    constructor(message, statusCode = http_status_codes_1.default.CONFLICT) {
        super(message, statusCode);
        this.name = "JSON Exceptions";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.JSONExceptions = JSONExceptions;
