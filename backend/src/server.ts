import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fjwt, { JWT } from "@fastify/jwt";

import validateEnv from "./validateEnv";
import loggingOptions from "./loggingOptions";
import connectToDatabase from "./db";
import { userSchemas } from "./modules/user.schema";
import userRoutes from "./modules/user.route";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
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

  // JWT
  server.register(fjwt, {
    secret: process.env.SECRET_KEY,
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });


  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  for (const schema of [...userSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });

  // start server
  const port = process.env.PORT as unknown as number;
  await server.listen({ port, host: "0.0.0.0" });
}
