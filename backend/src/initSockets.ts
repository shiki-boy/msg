import { FastifyInstance } from "fastify";

import userModel from "./modules/user/user.model";
import channelModel from "./modules/chat/channel.model";
import chatMessageModel from "./modules/chat/message.model";
import blacklistTokenModel from "./modules/user/blacklistToken.model";

export default function initSockets(server: FastifyInstance) {
  server.io.use(async (socket, next) => {
    try {
      // refresh token
      const token = socket.handshake.auth.token;

      // check if token is blacklisted or not
      const isBlacklisted = await blacklistTokenModel.exists({ token });

      if (isBlacklisted) {
        return;
      }

      const userFound = await userModel.findByToken(token);

      if (!userFound) {
        return;
      }

      next();
    } catch (error) {
      console.log(error);
      server.log.error(error);
      server.log.warn("WS connection refused, Invalid token");
      next(new Error("WS connection refused, Invalid token"));
    }
  });

  server.io.on("connection", (socket) => {
    console.log("new ws connection");

    socket.on("join", (channelIds: string[]) => {
      socket.join(channelIds);
    });

    socket.on("send-message", async ({ channelId, message, authorId }) => {
      const author = await userModel.findById(authorId);
      const channel = await channelModel.findById(channelId);
      const createdAt = new Date().toISOString();

      // save message in DB
      await chatMessageModel.create({
        text: message,
        author,
        channel,
      });

      socket.to(channelId).emit("new-message", {
        text: message,
        author,
        createdAt,
      });
    });
  });
}
