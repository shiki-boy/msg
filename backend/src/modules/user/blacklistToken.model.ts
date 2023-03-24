import { model, Schema } from "mongoose";

import { BlacklistToken } from "./types";

// on logout we save the token here
const blacklistTokenSchema: Schema = new Schema<BlacklistToken>(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blacklistTokenModel = model<BlacklistToken & Document>(
  "BlacklistToken",
  blacklistTokenSchema
);

export default blacklistTokenModel;
