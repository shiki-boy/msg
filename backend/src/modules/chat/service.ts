import chatMessageModel from "./message.model";

export async function listMessages(channel) {
  return chatMessageModel.find({ channel }).populate('author');
}
