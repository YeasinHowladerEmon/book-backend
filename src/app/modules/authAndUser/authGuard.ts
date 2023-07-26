import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not Authorized");
    }
    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

    
    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};


export default authGuard;
