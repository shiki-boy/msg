import { FastifyInstance } from "fastify";
import { listMessagesHandler } from "./controller";
import { $ref } from "./schema";

async function chatRoutes(server: FastifyInstance) {
  server.get(
    "/channel/:channelId/messages",
    {
      preHandler: [server.authenticate],
      schema: { 
        params: $ref("channelIdParamSchema"),
        response: { 200: $ref("listMessagesResponseSchema") } },
    },
    listMessagesHandler
  );
}

export default chatRoutes;
