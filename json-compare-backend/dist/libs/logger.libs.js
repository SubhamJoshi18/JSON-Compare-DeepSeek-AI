"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, printf } = winston_1.default.format;
const myFormat = printf(({ level, message, service, batchId }) => {
    let jsonString = `{ "message": "${level === "error" ? message : message}"`;
    jsonString += `, "level": "${level}", "service": "${service}" }`;
    return jsonString;
});
function createLogger(service) {
    return winston_1.default.createLogger({
        levels: winston_1.default.config.syslog.levels,
        defaultMeta: {
            service,
        },
        format: combine(myFormat),
        transports: [new winston_1.default.transports.Console()],
    });
}
const jsonLogger = createLogger("json-compare");
exports.jsonLogger = jsonLogger;
