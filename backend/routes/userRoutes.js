import express from "express";
import {register, getUserProfile, getUserAddresses, updateUserProfile} from "../controllers/userController.js";
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";
export const usersRouter = express.Router();

usersRouter.post('/register', register)
usersRouter.get('/:id/profile', verifyTokenMiddleware, getUserProfile )
usersRouter.put('/:id/profile', verifyTokenMiddleware, updateUserProfile )
usersRouter.get('/:id/addresses', verifyTokenMiddleware, getUserAddresses )