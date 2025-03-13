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
exports.clearDirectory = clearDirectory;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_libs_1 = require("../libs/logger.libs");
function clearDirectory() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dirPath = path_1.default.join(process.cwd(), "uploads");
            const files = yield fs_1.default.promises.readdir(dirPath);
            for (const file of files) {
                const filePath = path_1.default.join(dirPath, file);
                const stat = yield fs_1.default.promises.stat(filePath);
                if (stat.isDirectory()) {
                    yield clearDirectory();
                    yield fs_1.default.promises.rmdir(filePath);
                }
                else {
                    yield fs_1.default.promises.unlink(filePath);
                }
            }
            logger_libs_1.jsonLogger.info(`Directory "${dirPath}" cleared successfully.`);
        }
        catch (error) {
            logger_libs_1.jsonLogger.error("Error clearing directory:", error);
        }
    });
}
