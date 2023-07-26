import express from "express";
import { AuthRoutes } from "../modules/authAndUser/auth.route";
import { BookRoutes } from "../modules/book/book.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: AuthRoutes
  },
  {
    path: "/books",
    route: BookRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
