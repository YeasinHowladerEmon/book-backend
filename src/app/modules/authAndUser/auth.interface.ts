import { Model } from "mongoose";

export type ILoginAndUser = {
  name?: string;
  email: string;
  password: string;
};
export type ILoginAndUserResponse = {
  accessToken: string;
};



export type UserModel = Model<ILoginAndUser, Record<string, unknown>>;
