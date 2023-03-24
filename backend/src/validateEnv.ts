import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
  // returns a sanitized, immutable environment object
  cleanEnv(process.env, {
    DB_PORT: str(),
    MONGO_DBNAME: str(),
    MONGO_HOST: str(),
    MONGO_PASSWORD: str(),
    MONGO_USERNAME: str(),
    NODE_ENV: str(),
    PORT: port(),
    SECRET_KEY: str(),
  });
};

export default validateEnv;
