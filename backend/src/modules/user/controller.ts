import { FastifyReply, FastifyRequest } from "fastify";

import {
  AddFriendInput,
  CreateUserInput,
  LoginInput,
  RefreshTokenInput,
} from "./schema";
import {
  addFriend,
  blacklistToken,
  createChannel,
  createUser,
  listChannels,
  loginUser,
} from "./service";
import userModel from "./user.model";

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
  const response = request.userObj;

  reply.send(response);
}

export async function refreshTokenHandler(
  request: FastifyRequest<{
    Body: RefreshTokenInput;
  }>,
  reply: FastifyReply
) {
  // blacklisting refresh tokens
  await blacklistToken(request.body.token);

  const user = await userModel.findByToken(request.body.token)

  // @ts-expect-error generateAuthToken is there
  const tokens = user.generateAuthToken();

  reply.send(tokens);
}

export async function addFriendHandler(
  request: FastifyRequest<{
    Body: AddFriendInput;
  }>,
  reply: FastifyReply
) {
  const friend = await userModel.findOne({ email: request.body.email });

  await addFriend(request.body.email, request.user, friend);

  await createChannel({ isDirect: true, members: [request.user, friend] });

  reply.send({ message: "Friend added successfully" });
}

export async function listChannelsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const channels = await listChannels(request.user);
  reply.send({ channels });
}
