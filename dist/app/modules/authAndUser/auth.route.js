"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controlller_1 = require("./auth.controlller");
const router = express_1.default.Router();
router.post('/login', auth_controlller_1.AuthController.signIn);
router.post('/create-user', auth_controlller_1.AuthController.createUser);
exports.AuthRoutes = router;
