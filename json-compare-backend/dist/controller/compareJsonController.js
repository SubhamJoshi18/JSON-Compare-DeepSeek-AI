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
const compareJsonServices_1 = __importDefault(require("../services/compareJsonServices"));
const response_utils_1 = require("../utils/response.utils");
class CompareJsonController {
    compareTheJson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const json1 = req.body.json1 ? JSON.parse(req.body.json1) : null;
                const json2 = req.body.json2 ? JSON.parse(req.body.json2) : null;
                const jsonarr = new Array([json1, json2]);
                const apiResponse = yield compareJsonServices_1.default.compareJson(jsonarr);
                const contentMessage = `The JSON Has been Compared`;
                return (0, response_utils_1.sendApiResponse)(res, apiResponse, contentMessage);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
}
exports.default = new CompareJsonController();
