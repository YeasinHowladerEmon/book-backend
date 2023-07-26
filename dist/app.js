"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHanlder_1 = __importDefault(require("./app/middleware/globalErrorHanlder"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//parse
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//application
app.use("/api/v1/", routes_1.default);
// token save req.user
// global error hanlder
app.use(globalErrorHanlder_1.default);
exports.default = app;
