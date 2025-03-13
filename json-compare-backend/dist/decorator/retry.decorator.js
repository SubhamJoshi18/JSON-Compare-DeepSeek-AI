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
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryRequest = retryRequest;
const logger_libs_1 = require("../libs/logger.libs");
function retryRequest(fn_1) {
    return __awaiter(this, arguments, void 0, function* (fn, retries = 3, delay = 1000, backoffFactor = 2) {
        let attempt = 0;
        while (attempt <= retries) {
            try {
                return yield fn();
            }
            catch (error) {
                attempt++;
                if (attempt > retries) {
                    logger_libs_1.jsonLogger.error(`Failed after ${retries + 1} attempts: ${error.message}`);
                    throw error;
                }
                const delayTime = delay * Math.pow(backoffFactor, attempt - 1);
                logger_libs_1.jsonLogger.info(`Attempt ${attempt} failed. Retrying in ${delayTime}ms...`);
                yield new Promise((resolve) => setTimeout(resolve, delayTime));
            }
        }
    });
}
