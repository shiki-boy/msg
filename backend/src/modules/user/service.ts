import { compare, hash } from "bcrypt";

import { HttpException } from "@/utils/exceptions";

import userModel from "./user.model";
import { CreateUserInput, LoginInput } from "./schema";
import { IUser, UserResultDoc } from "./types";
import blacklistTokenModel from "./blacklistToken.model";
import channelModel from "../chat/channel.model";

export async function createUser(input: CreateUserInput) {
  const { password } = input;

  const user = await userModel.findOne({ email: input.email }).exec();
  if (user) {
    throw new HttpException(401, "This email already exists");
  }

  const hashedPassword = await hash(password, 10);
  const newUser = await userModel.create({
    ...input,
    password: hashedPassword,
  });

  return newUser;
}

export async function loginUser(
  input: LoginInput
): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
  const user = await userModel
    .findOne({ email: input.email })
    .select("+password")
    .exec();
  if (!user) {
    throw new HttpException(401, "This user does not exist");
  }

  const isPasswordCorrect = await compare(input.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpException(401, "Invalid credentials provided");
  }

  const { accessToken, refreshToken } = user.generateAuthToken();

  return {
    user,
    accessToken,
    refreshToken,
  };
}

export async function findUser(id: string) {
  return userModel.findById(id);
}

export async function blacklistToken(token: string) {
  const isTokenBlacklisted = await blacklistTokenModel.exists({
    token,
  });

  if (isTokenBlacklisted) {
    return;
  }

  return blacklistTokenModel.create({ token });
}

export async function addFriend(
  user: UserResultDoc,
  friend: UserResultDoc
) {
  if (!friend) {
    throw new HttpException(400, "No such user found");
  }

  if (user?.friends && user.friends.has(friend._id.toString())) {
    throw new HttpException(400, "Are already friends");
  }

  // add to the friends list
  await userModel.findByIdAndUpdate(friend._id, {
    $set: {
      [`friends.${user._id}`]: `${user.fullName}`,
    },
  });

  await userModel.findByIdAndUpdate(user._id, {
    $set: {
      [`friends.${friend._id}`]: `${friend.fullName}`,
    },
  });

  return;
}

interface CreateChannelArgType {
  isDirect: boolean;
  channelTitle?: string;
  members: UserResultDoc[];
}

export async function createChannel({
  isDirect,
  channelTitle = "",
  members,
}: CreateChannelArgType) {
  const membersMap = new Map();
  members.forEach((user) => {
    membersMap.set(user._id.toString(), user.fullName);
  });

  let title = channelTitle;
  if (isDirect) {
    const [user1, user2] = members;
    title = `${user1.fullName}_${user2.fullName}`;
  }

  const channel = await channelModel.create({
    isDirect,
    title,
    members: membersMap,
  });

  return Promise.allSettled(
    members.map((user) => {
      if (user.channels) {
        user.channels.push(channel);
      } else {
        user.channels = [channel];
      }
      user.save();
    })
  );
}

export async function listChannels(user: UserResultDoc) {
  // TODO: aggregate pipeline, for pagination
  const { channels } = await user.populate("channels");
  return channels;
}
