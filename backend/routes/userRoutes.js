import express from "express";
import {register} from "../controllers/userController.js";
export const usersRouter = express.Router();

usersRouter.post('/register', register)