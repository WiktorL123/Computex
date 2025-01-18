import express from "express";
import {login} from "../controllers/authController.js"
import {logout} from "../controllers/authController.js";
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";

export const authRouter = express.Router();

authRouter.post('/login', login)
authRouter.post('/logout', verifyTokenMiddleware, logout)