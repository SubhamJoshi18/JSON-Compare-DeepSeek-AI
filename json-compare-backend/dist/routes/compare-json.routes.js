"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = __importDefault(require("../config/multer.config"));
const compareJsonController_1 = __importDefault(require("../controller/compareJsonController"));
const upload = (0, multer_1.default)({ storage: multer_config_1.default });
const compareJsonRouter = (0, express_1.Router)();
compareJsonRouter.post("/compare-json", upload.none(), compareJsonController_1.default.compareTheJson);
exports.default = compareJsonRouter;
