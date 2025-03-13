"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const deepseek_constant_1 = require("../constants/deepseek.constant");
const corsConfig = {
    origin: deepseek_constant_1.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};
exports.corsConfig = corsConfig;
