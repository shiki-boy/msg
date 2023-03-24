import { FastifyReply, FastifyRequest } from "fastify";
import blacklistTokenModel from "./blacklistToken.model";

import { CreateUserInput, LoginInput } from "./schema";
import { createUser, loginUser } from "./service";

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
  const token = request.token;

  const isTokenBlacklisted = await blacklistTokenModel.exists({
    token,
  });

  if (isTokenBlacklisted) {
    return;
  }

  await blacklistTokenModel.create({ token });

  reply.send({ message: "User logged out successfully" });
}

export async function getUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const response = request.user;

  reply.send(response);
}
