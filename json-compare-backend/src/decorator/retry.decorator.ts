import { AxiosResponse } from "axios";
import { jsonLogger } from "../libs/logger.libs";

async function retryRequest<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000, 
  backoffFactor: number = 2
) {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;

      if (attempt > retries) {
        jsonLogger.error(
          `Failed after ${retries + 1} attempts: ${error.message}`
        );
        throw error;
      }

      const delayTime = delay * Math.pow(backoffFactor, attempt - 1);
      jsonLogger.info(
        `Attempt ${attempt} failed. Retrying in ${delayTime}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }
  }
}

export { retryRequest };
