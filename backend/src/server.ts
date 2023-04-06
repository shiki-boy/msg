import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastifyIO from "fastify-socket.io";

import validateEnv from "./validateEnv";
import loggingOptions from "./loggingOptions";
import connectToDatabase from "./db";
import { userSchemas } from "./modules/user/schema";
import userRoutes from "./modules/user/routes";
import { IUser, UserResultDoc } from "./modules/user/types";
import chatRoutes from "./modules/chat/routes";
import { chatSchemas } from "./modules/chat/schema";
import authenticate from "./authenticate";
import initSockets from "./initSockets";

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

  server.decorate("authenticate", authenticate);

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

  initSockets(server);
}
