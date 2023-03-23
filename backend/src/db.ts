import { connect, set } from "mongoose";

const { DB_PORT, MONGO_DBNAME, MONGO_HOST, MONGO_PASSWORD, MONGO_USERNAME } =
  process.env;

export default function connectToDatabase() {
  if (process.env.NODE_ENV !== "production") {
    set("debug", true);
  }

  const dbConnection = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${DB_PORT}/${MONGO_DBNAME}?authSource=admin`;

  connect(dbConnection)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
}
