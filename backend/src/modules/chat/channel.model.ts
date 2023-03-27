import { model, Schema } from "mongoose";

import { Channel } from "./types";

// const ObjectId = Schema.Types.ObjectId;

// on logout we save the token here
const channelSchema: Schema = new Schema<Channel>(
  {
    title: {
      type: String,
      required: true,
    },
    members: {
      type: Map, // { userId: fullName, ... }
      of: String,
      required: true,
    },
    isDirect: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const channelModel = model<Channel & Document>("Channel", channelSchema);

export default channelModel;
