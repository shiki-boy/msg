import { model, Schema, Types } from "mongoose";
import jwt from "jsonwebtoken";

import { User, CustomTokenPayload, IUser, UserResultDoc } from "./types";
import channelModel from "../chat/channel.model";

const ObjectId = (id: string) => new Types.ObjectId(id);

const { SECRET_KEY } = process.env;

const userSchema: Schema = new Schema<IUser, User>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    channels: [
      {
        type: Schema.Types.ObjectId,
        ref: channelModel,
        default: [],
      },
    ],
    friends: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  }
);

userSchema.methods.generateAuthToken = function () {
  const user = this; // eslint-disable-line @typescript-eslint/no-this-alias

  const jwtPayload = {
    _id: user._id.toHexString(),
  };

  const signOptions: jwt.SignOptions = {
    expiresIn: "5m",
    algorithm: "HS256",
  };

  const accessToken = jwt.sign(jwtPayload, SECRET_KEY, signOptions).toString();

  const refreshToken = jwt
    .sign(jwtPayload, SECRET_KEY, { ...signOptions, expiresIn: "1d" })
    .toString();

  return {
    accessToken,
    refreshToken,
  };
};

userSchema.statics.findByToken = function (
  token: string
): Promise<UserResultDoc> {
  const user = this; // eslint-disable-line @typescript-eslint/no-this-alias
  const verifyOptions: jwt.VerifyOptions = {
    algorithms: ["HS256"],
  };
  try {
    const decoded = jwt.verify(
      token,
      SECRET_KEY,
      verifyOptions
    ) as CustomTokenPayload;

    return user.findById(decoded._id);
  } catch (error) {
    return Promise.reject();
  }
};

const userModel = model<IUser, User>("User", userSchema);

export default userModel;
