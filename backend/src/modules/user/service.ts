import { compare, hash } from "bcrypt";

import { HttpException } from "@/utils/exceptions";

import userModel from "./user.model";
import { CreateUserInput, LoginInput } from "./schema";
import { BlacklistToken, IUser } from "./types";
import blacklistTokenModel from "./blacklistToken.model";

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

export async function blacklistToken(
  token: string
){
  const isTokenBlacklisted = await blacklistTokenModel.exists({
    token,
  });

  if (isTokenBlacklisted) {
    return;
  }

  return blacklistTokenModel.create({ token });
}
