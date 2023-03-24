import { hash } from "bcrypt";

import { HttpException } from "@/utils/exceptions";

import userModel from "./user.model";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

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
