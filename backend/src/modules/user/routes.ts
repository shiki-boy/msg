import { FastifyInstance } from "fastify";

import {
  addFriendHandler,
  getUserHandler,
  listChannelsHandler,
  loginHandler,
  logoutUserHandler,
  refreshTokenHandler,
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
          200: $ref("userInfoResponseSchema"),
        },
      },
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

  server.post(
    "/token/refresh",
    {
      schema: {
        body: $ref("refreshTokenSchema"),
        response: { 200: $ref("refreshTokenResponseSchema") },
      },
    },
    refreshTokenHandler
  );

  server.post(
    "/friends/add",
    {
      onRequest: [server.authenticate],
      schema: {
        body: $ref("addFriendSchema"),
        // response: { 200 : $ref("") }
      },
    },
    addFriendHandler
  );

  server.get(
    "/channels",
    {
      onRequest: [server.authenticate],
      schema: {
        response: { 200 : $ref("listChannelsSchema") }
      },
    },
    listChannelsHandler
  );
}

export default userRoutes;
