import dotenv from "dotenv";
dotenv.config();

const isKeyExists = (key: string) => {
  return process.env[key] && process.env.hasOwnProperty(key);
};

const getEnvValue = (key: string): string | undefined => {
  return isKeyExists(key) ? process.env[key] : undefined;
};

export { getEnvValue };
