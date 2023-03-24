import { FastifyInstance } from "fastify";

import {
  getUserHandler,
  loginHandler,
  logoutUserHandler,
  registerUserHandler,
} from "./controller";
import { $ref } from "./schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/register",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  server.get(
    "/info",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          200: $ref("userInfoResponseSchema")
        }
      }
    },
    getUserHandler
  );

  server.post(
    "/logout",
    {
      onRequest: [server.authenticate],
    },
    logoutUserHandler
  );
}

export default userRoutes;
