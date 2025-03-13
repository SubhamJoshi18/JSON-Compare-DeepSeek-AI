import { CorsOptions } from "cors";
import { FRONTEND_URL } from "../constants/deepseek.constant";

const corsConfig: CorsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

export { corsConfig };
