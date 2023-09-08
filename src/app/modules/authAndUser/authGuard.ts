import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log('token', authorizationHeader);
    if (!authorizationHeader) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not Authorized");
    }

const token = authorizationHeader.replace("Bearer", '');

    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

    
    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};


export default authGuard;
