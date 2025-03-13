"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_utils_1 = require("./utils/env.utils");
const logger_libs_1 = require("./libs/logger.libs");
const server_middleware_1 = require("./middlewares/server.middleware");
const server_routes_1 = require("./routes/server.routes");
const app = (0, express_1.default)();
const port = Number((0, env_utils_1.getEnvValue)("PORT"));
function startExpressApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(port);
            yield Promise.all([(0, server_middleware_1.serverMiddleware)(app), (0, server_routes_1.serverRouter)(app)]);
            app.listen(port, () => {
                logger_libs_1.jsonLogger.info(`Server is running on the port : ${port}`);
            });
        }
        catch (err) {
            logger_libs_1.jsonLogger.error(`Error Starting the JSON Compare DeepSeek AI Server`);
            process.exit(0);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startExpressApp();
}))();
