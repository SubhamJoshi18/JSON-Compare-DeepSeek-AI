"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverRouter = serverRouter;
const error_utils_1 = require("../utils/error.utils");
const error_utils_2 = require("../utils/error.utils");
const compare_json_routes_1 = __importDefault(require("./compare-json.routes"));
function serverRouter(app) {
    app.use("/api", [compare_json_routes_1.default]);
    app.use("*", error_utils_1.notHandlleError);
    app.use(error_utils_2.globalErrorHandler);
}
