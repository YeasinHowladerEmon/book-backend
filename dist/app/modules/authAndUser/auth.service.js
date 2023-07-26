"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const auth_model_1 = require("./auth.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email: userEmail } = payload;
        const existUser = yield auth_model_1.User.findOne({ email: userEmail });
        if (existUser) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, "User already exists");
        }
        const result = yield auth_model_1.User.create(payload);
        if (!result) {
            console.log("error");
        }
        const { _id: userId, email } = result;
        const accessToken = jwtHelpers_1.jwtHelpers.createToken({
            userId,
            email
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        return {
            email,
            accessToken
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Error Found ${error}`);
    }
});
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = payload;
    const isUserExist = yield auth_model_1.User.findOne({ email });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (isUserExist.password && (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) !== password) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is Incorrect");
    }
    const userId = isUserExist._id;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId,
        email
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken
    };
});
exports.AuthService = {
    createUser,
    signIn
};
