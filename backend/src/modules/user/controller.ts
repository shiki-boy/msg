import { FastifyReply, FastifyRequest } from "fastify";

import { CreateUserInput, LoginInput, RefreshTokenInput } from "./schema";
import { blacklistToken, createUser, loginUser } from "./service";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const response = await loginUser(request.body);

  reply.send(response);
}

export async function logoutUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await blacklistToken(request.token);

  reply.send({ message: "User logged out successfully" });
}

export async function getUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const response = request.user;

  reply.send(response);
}

export async function refreshTokenHandler(
  request: FastifyRequest<{
    Body: RefreshTokenInput
  }>,
  reply: FastifyReply
) {
  // blacklisting both access and refresh tokens
  await blacklistToken(request.body.token)

  await blacklistToken(request.token)

   // @ts-expect-error generateAuthToken is there
  const tokens = request.user.generateAuthToken()

  reply.send(tokens);
}
