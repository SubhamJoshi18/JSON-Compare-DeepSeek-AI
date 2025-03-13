"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverMiddleware = serverMiddleware;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cors_config_1 = require("../config/cors.config");
function serverMiddleware(app) {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cors_1.default)(cors_config_1.corsConfig));
}
