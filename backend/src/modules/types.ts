import { JwtPayload } from "jsonwebtoken";
import { Model } from "mongoose";

import { BaseFields } from "@/utils/types";

export interface IUser extends BaseFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
}

interface IUserMethods {
  generateAuthToken: () => string;
}

export interface User extends Model<IUser, object, IUserMethods> {
  findByToken: (token: string) => Promise<User>;
}

export interface CustomTokenPayload extends JwtPayload {
  _id: string;
}
