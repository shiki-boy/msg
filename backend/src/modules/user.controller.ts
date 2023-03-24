import { FastifyReply, FastifyRequest } from "fastify";

import { CreateUserInput, LoginInput } from "./user.schema";
import { createUser, findUser, loginUser } from "./user.service";

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
  const response = await loginUser(request.body)

  reply.send(response)
}

export async function getUserHandler(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply
) {
  const response = await findUser(request.user._id)

  reply.send(response)
}
