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
const exceptions_1 = require("../exceptions");
const deepseek_libs_1 = __importDefault(require("../libs/deepseek.libs"));
class CompareJsonServices {
    compareJson(fileContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const extractedContent = fileContent.pop();
            console.log(extractedContent);
            if (!extractedContent || extractedContent.length === 0) {
                throw new exceptions_1.JSONExceptions(`There is not two json ,Please Enter Two Json to be Compare`);
            }
            const firstJson = extractedContent[0];
            const secondJson = extractedContent[1];
            const jsonResponse = yield (0, deepseek_libs_1.default)(firstJson, secondJson);
            return jsonResponse;
        });
    }
}
exports.default = new CompareJsonServices();
