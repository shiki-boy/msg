import chatMessageModel from "./message.model";

export async function listMessages(channel) {
  return chatMessageModel
    .find({ channel })
    .sort({ createdAt: -1 })
    .populate("author", "firstName lastName _id");
}
