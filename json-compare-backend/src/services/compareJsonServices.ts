import { JSONExceptions } from "../exceptions";
import compareTheJSON from "../libs/deepseek.libs";
import { validateJson } from "../libs/jsonvalidate.libs";

class CompareJsonServices {
  public async compareJson(fileContent: Express.Multer.File[]) {
    if (!fileContent || fileContent.length === 0) {
      throw new JSONExceptions(
        `There is not two json ,Please Enter Two Json to be Compare`
      );
    }
    const jsonFiles = fileContent.map((data) => {
      return {
        filePath: data.path,
      };
    });

    const validMimeTypeAndJson = fileContent.filter(
      (data) =>
        !(
          data.mimetype.split("/")[1] === "json" &&
          data.originalname.endsWith("json")
        )
    );

    if (Array.isArray(validMimeTypeAndJson) && validMimeTypeAndJson.length > 0)
      throw new JSONExceptions(
        `The Provided File Should be JSON, Enter the Appropriate JSON`
      );

    const { validStatus, firstJson, secondJson } = await validateJson(
      jsonFiles
    );

    if (!validStatus) throw new JSONExceptions(`The JSON is not valid`);

    const jsonResponse = await compareTheJSON(firstJson, secondJson);

    return jsonResponse;
  }
}

export default new CompareJsonServices();
