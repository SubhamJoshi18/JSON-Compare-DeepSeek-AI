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
const axios_1 = __importDefault(require("axios"));
const deepseek_constant_1 = require("../constants/deepseek.constant");
const logger_libs_1 = require("./logger.libs");
const files_utilts_1 = require("../utils/files.utilts");
const CHUNK_SIZE = 1000;
const splitIntoChunks = (text, size) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += size) {
        chunks.push(text.slice(i, i + size));
    }
    return chunks;
};
const compareTheJSON = (firstJson, secondJson) => __awaiter(void 0, void 0, void 0, function* () {
    const stringFirstJson = JSON.stringify(firstJson, null, 2);
    const stringSecondJson = JSON.stringify(secondJson, null, 2);
    if (stringFirstJson.length > deepseek_constant_1.MAX_JSON_LENGTH ||
        stringSecondJson.length > deepseek_constant_1.MAX_JSON_LENGTH) {
        const firstChunks = splitIntoChunks(stringFirstJson, CHUNK_SIZE);
        const secondChunks = splitIntoChunks(stringSecondJson, CHUNK_SIZE);
        console.log(firstChunks);
        const results = [];
        try {
            for (let i = 0; i < Math.max(firstChunks.length, secondChunks.length); i++) {
                const part1 = firstChunks[i] || "";
                const part2 = secondChunks[i] || "";
                const prompt = `Compare these JSON parts and highlight the differences:

      JSON 1 (Part ${i + 1}):
      ${part1}

      JSON 2 (Part ${i + 1}):
      ${part2}

      Provide a structured JSON output with added, removed, and modified fields.`;
                const response = yield axios_1.default.post(deepseek_constant_1.DEEPSEEK_API_URL, {
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 500,
                    temperature: 0.7,
                });
                console.log(response.data.choices[0].message.content);
                results.push(response.data.choices[0].message.content);
            }
            return results;
        }
        catch (error) {
            logger_libs_1.jsonLogger.error("Error calling DeepSeek API:", error);
            throw error;
        }
        finally {
            yield (0, files_utilts_1.clearDirectory)();
        }
    }
    else {
        const responseData = yield compareTheJsonWithoutChunk(stringFirstJson, stringSecondJson);
        const parseContent = JSON.parse(responseData);
        yield (0, files_utilts_1.clearDirectory)();
        const description = {
            Description: "Description",
            added: "Fields present in JSON 2 but not in JSON 1.",
            removed: "Fields present in JSON 1 but not in JSON 2.",
            modified: "Fields with different values, showing the previous and current values.",
        };
        const finalResult = {
            description: description,
            deepseekResponse: parseContent,
        };
        return finalResult;
    }
});
function compareTheJsonWithoutChunk(firstJson, secondJson) {
    return __awaiter(this, void 0, void 0, function* () {
        const maxRetries = 5;
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                const prompt = `Compare the following two JSON objects and return only a structured JSON output highlighting the differences.

      JSON 1:
      ${firstJson}

      JSON 2:
      ${secondJson}

      Output strictly in the following JSON format:
      {
        "added": { /* Fields present in JSON 2 but not in JSON 1 */ },
        "removed": { /* Fields present in JSON 1 but not in JSON 2 */ },
        "modified": { /* Fields with different values, showing before and after */ }
      }

      Ensure the output is valid JSON with no additional text, explanations, or formatting outside this structure.`;
                const response = yield axios_1.default.post(deepseek_constant_1.DEEPSEEK_API_URL, {
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 500,
                    temperature: 0.7,
                });
                const deepSeekResponse = response.data.choices[0].message.content;
                const modifiedString = deepSeekResponse.toString().split("```json")[1];
                if (!modifiedString)
                    throw new Error();
                const finalModifiedString = modifiedString.replace("```", " ");
                console.log(finalModifiedString);
                if (!finalModifiedString)
                    throw new Error();
                return finalModifiedString;
            }
            catch (err) {
                attempt += 1;
                logger_libs_1.jsonLogger.error(`Error calling DeepSeek API (Attempt ${attempt}):`, err);
                if (attempt < maxRetries) {
                    const delay = Math.pow(2, attempt) * 1000;
                    logger_libs_1.jsonLogger.info(`Retrying in ${delay / 1000} seconds...`);
                    yield new Promise((resolve) => setTimeout(resolve, delay));
                }
                else {
                    logger_libs_1.jsonLogger.error("Max retry attempts reached. Throwing error.");
                    throw err;
                }
            }
        }
    });
}
exports.default = compareTheJSON;
