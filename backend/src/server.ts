import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastifyIO from "fastify-socket.io";

import validateEnv from "./validateEnv";
import loggingOptions from "./loggingOptions";
import connectToDatabase from "./db";
import { userSchemas } from "./modules/user/schema";
import userRoutes from "./modules/user/routes";
import blacklistTokenModel from "./modules/user/blacklistToken.model";
import userModel from "./modules/user/user.model";
import { IUser, UserResultDoc } from "./modules/user/types";
import chatRoutes from "./modules/chat/routes";
import { chatSchemas } from "./modules/chat/schema";
import chatMessageModel from "./modules/chat/message.model";
import channelModel from "./modules/chat/channel.model";

declare module "fastify" {
  export interface FastifyRequest {
    user: UserResultDoc; // this is a mongoose document
    userObj: IUser; // this is with virtuals
    token: string;
  }

  export interface FastifyInstance {
    authenticate: () => void;
  }
}

validateEnv();

startServer();

connectToDatabase();

async function startServer() {
  const server = Fastify({
    logger: loggingOptions[process.env.NODE_ENV],
  });

  await server.register(cors, {
    origin: process.env.ORIGIN,
    credentials: true,
  });

  // this can be done by nginx
  // await server.register(import("@fastify/compress"));

  server.register(helmet);

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const token = request.headers["authorization"]
        ?.split("Bearer")
        .pop()
        .trim();

      // check if token is blacklisted or not
      blacklistTokenModel.exists({ token }).then((result) => {
        if (result) {
          reply.code(401).send({ message: "Your session has expired" });
        }
      });

      try {
        const user = await userModel.findByToken(token);

        if (!user) {
          return Promise.reject();
        } else {
          request.user = user;
          request.userObj = user.toObject({ virtuals: true });
          request.token = token;
        }
      } catch (error) {
        reply.code(401).send({ message: "Invalid authentication credentials" });
      }
    }
  );

  // websockets
  server.register(fastifyIO, {
    cors: {
      origin: process.env.ORIGIN,
    },
  });

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  for (const schema of [...userSchemas, ...chatSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/auth" });
  server.register(chatRoutes, { prefix: "api/chat" });

  await server.ready();

  // start server
  const port = process.env.PORT as unknown as number;

  await server.listen({ port, host: "0.0.0.0" });

  server.io.on("connection", (socket) => {
    console.log("new ws connection");

    socket.on("join", (channelIds: string[]) => {
      socket.join(channelIds);
    });

    socket.on("send-message", async ({ channelId, message, authorId }) => {
      const author = await userModel.findById(authorId);
      const channel = await channelModel.findById(channelId);
      const createdAt = new Date().toISOString();

      // save message in DB
      await chatMessageModel.create({
        text: message,
        author,
        channel,
      });

      socket.to(channelId).emit("new-message", {
        text: message,
        author,
        createdAt,
      });
    });
  });
}
