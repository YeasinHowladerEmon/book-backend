import { ErrorRequestHandler } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../interface/error";
import handleValidationError from "../../errors/handleValidationError";
import handleCastError from "../../errors/handleCastError";
import ApiError from "../../errors/ApiError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === "development"
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : console.log("🐱‍🏍 globalErrorHandler ~", error);

  let statusCode = 500;
  let message = "Something went Wrong !";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message
          }
        ]
      : [];
  }else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message
          }
        ]
      : [];
  }

  res.status(statusCode).json({
    status: false,
    message,
    errorMessages,
    stack: config.env !== "production"? error?.stack: undefined
  });
  next()
};

export default globalErrorHandler;
