import { JwtPayload } from "jsonwebtoken";
import { Model } from "mongoose";

import { BaseFields } from "@/utils/types";

export interface IUser extends BaseFields {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
}

interface IUserMethods {
  generateAuthToken: () => {accessToken: string, refreshToken: string};
}

export interface User extends Model<IUser, object, IUserMethods> {
  findByToken: (token: string) => Promise<User>;
}

export interface CustomTokenPayload extends JwtPayload {
  _id: string;
}

export interface BlacklistToken extends BaseFields {
  token: string;
}
