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

    // Had to return reply here due to an error in fastify/compress
    // https://github.com/fastify/fastify-compress/issues/215#issuecomment-1210598312
    return reply.send(response);
  } catch (error) {
    console.log(error)
    throw new HttpException(500, "Something went wrong");
  }
}
