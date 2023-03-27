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
import { UserResultDoc } from "./modules/user/types";

declare module "fastify" {
  export interface FastifyRequest {
    user: UserResultDoc;
    token: string;
  }

  export interface FastifyInstance {
    authenticate: () => void;
  }
}

validateEnv();

buildServer();

connectToDatabase();

async function buildServer() {
  const server = Fastify({
    logger: loggingOptions[process.env.NODE_ENV],
  });

  await server.register(cors, {
    origin: process.env.ORIGIN,
    credentials: true,
  });

  await server.register(import("@fastify/compress"));

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
          request.token = token;
        }
      } catch (error) {
        reply
          .code(401)
          .send({ message: "Invalid authentication credentials" });
      }
    }
  );

  // websockets
  server.register(fastifyIO, {
    cors: {
      origin: process.env.ORIGIN
    }
  });

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  for (const schema of [...userSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/auth" });

  await server.ready()
  
  // start server
  const port = process.env.PORT as unknown as number;

  await server.listen({ port, host: "0.0.0.0" });

  server.io.on('connection', (socket) => {
    console.log('new ws connection')
    socket.on('send-message', (data) => {
      socket.broadcast.emit('new-message', {text: data.message, isMine: false})
    })
  })
}
