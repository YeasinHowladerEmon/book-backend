"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/authAndUser/auth.route");
const book_route_1 = require("../modules/book/book.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/books",
        route: book_route_1.BookRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
