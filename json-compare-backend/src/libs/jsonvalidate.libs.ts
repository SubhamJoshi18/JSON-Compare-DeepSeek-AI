import path from "path";
import fs from "fs/promises";

const readJsonAndExtractContent = async (filepath: string) => {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON from ${filepath}:`, error);
    return null;
  }
};

const validateJson = async (jsonContent: { filePath: string }[]) => {
  const contentObject = {} as any;
  let validJson = true;

  try {
    const firstJsonPath = path.join(process.cwd(), jsonContent[0]["filePath"]);
    const secondJsonPath = path.join(process.cwd(), jsonContent[1]["filePath"]);

    const [firstJsonContent, secondJsonContent] = await Promise.all([
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
  } catch (error) {
    console.error("Error validating JSON files:", error);
    validJson = false;
  }

  return Object.assign(
    {
      validStatus: validJson,
    },
    contentObject
  );
};

export { validateJson };
