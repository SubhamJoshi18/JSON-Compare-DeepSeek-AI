"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvValue = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isKeyExists = (key) => {
    return process.env[key] && process.env.hasOwnProperty(key);
};
const getEnvValue = (key) => {
    return isKeyExists(key) ? process.env[key] : undefined;
};
exports.getEnvValue = getEnvValue;
