import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// ---

const listMessagesResponseSchema = z.array(
  z.object({
    text: z.string(),
    _id: z.string(),
    author: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
  })
);

const channelIdParamSchema = z.object({ channelId: z.string() });

export type ChannelIdParamType = z.infer<typeof channelIdParamSchema>;

// ---

export const { schemas: chatSchemas, $ref } = buildJsonSchemas(
  {
    listMessagesResponseSchema,
    channelIdParamSchema,
  },
  { $id: "chatSchemas" }
);
