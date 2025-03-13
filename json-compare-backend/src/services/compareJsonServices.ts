import { JSONExceptions } from "../exceptions";

class CompareJsonServices {
  public async compareJson(fileContent: Express.Multer.File[]) {
    if (!fileContent || fileContent.length === 0) {
      throw new JSONExceptions(
        `There is not two json ,Please Enter Two Json to be Compare`
      );
    }

    return fileContent;
  }
}

export default new CompareJsonServices();
