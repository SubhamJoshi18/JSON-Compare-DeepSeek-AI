import axios from "axios";
import {
  DEEPSEEK_API_URL,
  MAX_JSON_LENGTH,
} from "../constants/deepseek.constant";
import { jsonLogger } from "./logger.libs";
import { clearDirectory } from "../utils/files.utilts";

const CHUNK_SIZE = 1000;

const splitIntoChunks = (text: string, size: number) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
};

const compareTheJSON = async (firstJson: object, secondJson: object) => {
  const stringFirstJson = JSON.stringify(firstJson, null, 2);
  const stringSecondJson = JSON.stringify(secondJson, null, 2);

  if (
    stringFirstJson.length > MAX_JSON_LENGTH ||
    stringSecondJson.length > MAX_JSON_LENGTH
  ) {
    const firstChunks = splitIntoChunks(stringFirstJson, CHUNK_SIZE);
    const secondChunks = splitIntoChunks(stringSecondJson, CHUNK_SIZE);

    console.log(firstChunks);
    const results = [];

    try {
      for (
        let i = 0;
        i < Math.max(firstChunks.length, secondChunks.length);
        i++
      ) {
        const part1 = firstChunks[i] || "";
        const part2 = secondChunks[i] || "";

        const prompt = `Compare these JSON parts and highlight the differences:

      JSON 1 (Part ${i + 1}):
      ${part1}

      JSON 2 (Part ${i + 1}):
      ${part2}

      Provide a structured JSON output with added, removed, and modified fields.`;

        const response = await axios.post(DEEPSEEK_API_URL, {
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
          temperature: 0.7,
        });

        console.log(response.data.choices[0].message.content);

        results.push(response.data.choices[0].message.content);
      }

      return results;
    } catch (error) {
      jsonLogger.error("Error calling DeepSeek API:", error);
      throw error;
    } finally {
      await clearDirectory();
    }
  } else {
    const responseData = await compareTheJsonWithoutChunk(
      stringFirstJson,
      stringSecondJson
    );

    const parseContent = JSON.parse(responseData);

    await clearDirectory();

    const finalResult = {
      deepseekResponse: parseContent,
    };

    return finalResult;
  }
};

async function compareTheJsonWithoutChunk(
  firstJson: string,
  secondJson: string
) {
  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const prompt = `You are tasked with comparing two JSON objects. Provide a structured JSON output that highlights only the differences between the two objects. The output must strictly follow this format and contain only the specified fields.

      JSON 1:
      ${firstJson}

      JSON 2:
      ${secondJson}

      Output in this exact JSON format:
      {
        "added": { /* Fields present in JSON 2 but not in JSON 1 */ },
        "removed": { /* Fields present in JSON 1 but not in JSON 2 */ },
        "modified": { /* Fields with different values in JSON 1 and JSON 2 */ }
      }

      Strictly avoid any extra explanation, comments, or formatting outside of the specified JSON structure. Ensure the output is valid JSON, with no additional text or clarifications. The response must be only the JSON, and nothing else.`;

      const response = await axios.post(DEEPSEEK_API_URL, {
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      });

      const deepSeekResponse = response.data.choices[0].message.content;
      const modifiedString = deepSeekResponse.toString().split("```json")[1];
      if (!modifiedString) throw new Error();

      let finalModifiedString = modifiedString.replace("```", " ");
      finalModifiedString = finalModifiedString.replace("=>", ":");
      console.log(finalModifiedString);
      if (!finalModifiedString) throw new Error();

      return finalModifiedString;
    } catch (err) {
      attempt += 1;
      jsonLogger.error(`Error calling DeepSeek API (Attempt ${attempt}):`, err);

      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        jsonLogger.info(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        jsonLogger.error("Max retry attempts reached. Throwing error.");
        throw err;
      }
    }
  }
}

export default compareTheJSON;
