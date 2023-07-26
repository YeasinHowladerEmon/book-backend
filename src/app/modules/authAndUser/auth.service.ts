import httpStatus from "http-status";

import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { ILoginAndUser, ILoginAndUserResponse } from "./auth.interface";
import { User } from "./auth.model";
import ApiError from "../../../errors/ApiError";

const createUser = async (payload: ILoginAndUser) => {
  try {
    const { email: userEmail } = payload;
    const existUser = await User.findOne({ email: userEmail });
    if (existUser) {
      throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }

    const result = await User.create(payload);
    if (!result) {
      console.log("error");
    }
    const { _id: userId, email } = result;

    const accessToken = jwtHelpers.createToken(
      {
        userId,
        email
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return {
      email,
      accessToken
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Error Found ${error}`);
  }
};
const signIn = async (
  payload: ILoginAndUser
): Promise<ILoginAndUserResponse> => {
  const { password, email } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  
  if (isUserExist.password && isUserExist?.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is Incorrect");
  }
  const userId = isUserExist._id;
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      email
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken
  };
};

export const AuthService = {
  createUser,
  signIn
};
