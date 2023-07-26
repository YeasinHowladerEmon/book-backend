import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginAndUserResponse } from "./auth.interface";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AuthService.createUser(data);
  sendResponse<ILoginAndUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    messages: "User Create Successfully",
    data: result
  });
});

const signIn = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AuthService.signIn(data);
//   let verifiedUser = null;
//   verifiedUser = jwtHelpers.verifyToken(
//     result.accessToken,
//     config.jwt.secret as Secret
//   );
//   console.log(verifiedUser)
//   req.user = verifiedUser;

  sendResponse<ILoginAndUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    messages: "User Sign In Successfully",
    data: result
  });
});

export const AuthController = {
  createUser,
  signIn
};
