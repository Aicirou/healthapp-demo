import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";
import path from "path";

// In Docker, env vars are injected by docker-compose (env_file).
// Locally, load from backend/.env as fallback.
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

const env = cleanEnv(process.env, {
  PORT: port({ default: 4000 }),
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),
  DATABASE_URL: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: "1d" }),
});

export default env;
