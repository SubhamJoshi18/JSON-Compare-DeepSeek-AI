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
exports.validateJson = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const readJsonAndExtractContent = (filepath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promises_1.default.readFile(filepath, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.error(`Error reading JSON from ${filepath}:`, error);
        return null;
    }
});
const validateJson = (jsonContent) => __awaiter(void 0, void 0, void 0, function* () {
    const contentObject = {};
    let validJson = true;
    try {
        const firstJsonPath = path_1.default.join(process.cwd(), jsonContent[0]["filePath"]);
        const secondJsonPath = path_1.default.join(process.cwd(), jsonContent[1]["filePath"]);
        const [firstJsonContent, secondJsonContent] = yield Promise.all([
            readJsonAndExtractContent(firstJsonPath),
            readJsonAndExtractContent(secondJsonPath),
        ]);
        if (!firstJsonContent || !secondJsonContent) {
            validJson = false;
        }
        if (!("firstJson" in contentObject) || !("secondJson" in contentObject)) {
            contentObject["firstJson"] = firstJsonContent;
            contentObject["secondJson"] = secondJsonContent;
        }
    }
    catch (error) {
        console.error("Error validating JSON files:", error);
        validJson = false;
    }
    return Object.assign({
        validStatus: validJson,
    }, contentObject);
});
exports.validateJson = validateJson;
