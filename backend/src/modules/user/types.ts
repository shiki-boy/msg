import { JwtPayload } from "jsonwebtoken";
import { HydratedDocument, Model } from "mongoose";

import { BaseFields } from "@/utils/types";
import { Channel } from "../chat/types";

type MemberId = string
type MemberName = string

export interface IUser extends BaseFields {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  channels: Channel[]
  friends: Map<MemberId, MemberName>
  readonly fullName: string
}

interface IUserMethods {
  generateAuthToken: () => {accessToken: string, refreshToken: string};
}

export interface User extends Model<IUser, object, IUserMethods> {
  findByToken: (token: string) => Promise<UserResultDoc>;
}

export type UserResultDoc = HydratedDocument<IUser>

export interface CustomTokenPayload extends JwtPayload {
  _id: string;
}

export interface BlacklistToken extends BaseFields {
  token: string;
}
