import { FastifyReply, FastifyRequest } from "fastify";

import blacklistTokenModel from "./modules/user/blacklistToken.model";
import userModel from "./modules/user/user.model";

export default async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
  tokenProvided = null
) {
  const token = request.headers["authorization"]?.split("Bearer").pop().trim() ?? tokenProvided;

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
