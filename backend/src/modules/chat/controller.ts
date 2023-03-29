import { HttpException } from "./../../utils/exceptions";
import { FastifyReply, FastifyRequest } from "fastify";

import channelModel from "./channel.model";
import { ChannelIdParamType } from "./schema";
import { listMessages } from "./service";

export async function listMessagesHandler(
  request: FastifyRequest<{
    Params: ChannelIdParamType;
  }>,
  reply: FastifyReply
) {
  try {
    const channel = await channelModel.findById(request.params.channelId);

    if (!channel) {
      throw new HttpException(400, "No such channel");
    }

    const response = await listMessages(channel);

    reply.send(response);
  } catch (error) {
    throw new HttpException(400, "No such channel");
  }
}