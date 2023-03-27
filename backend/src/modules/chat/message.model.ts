import { model, Schema } from "mongoose";

import userModel from "../user/user.model";
import { ChatMessage } from "./types";

const ObjectId = Schema.Types.ObjectId;

// on logout we save the token here
const chatMessageSchema: Schema = new Schema<ChatMessage>(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: ObjectId,
      ref: userModel,
      required: true,
    },
    channel: {
      type: ObjectId,
      ref: userModel,
      required: true,
    },
  },
  { timestamps: true }
);

const chatMessageModel = model<ChatMessage & Document>(
  "ChatMessage",
  chatMessageSchema
);

export default chatMessageModel;
