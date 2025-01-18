import express from "express";
import {register, getUserProfile, getUserAddresses, updateUserProfile, updateUserAddress} from "../controllers/userController.js";
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";
export const usersRouter = express.Router();

usersRouter.post('/register', register)

usersRouter.get('/:id/profile', verifyTokenMiddleware, getUserProfile )
usersRouter.put('/:id/profile', verifyTokenMiddleware, updateUserProfile )
// usersRouter.delete('/:id/profile', verifyTokenMiddleware, deleteUserProfile)


usersRouter.get('/:id/addresses', verifyTokenMiddleware, getUserAddresses )
// usersRouter.post('/:id/addresses', verifyTokenMiddleware, addUserAddresses )
usersRouter.put('/:id/addresses/addressIndex', verifyTokenMiddleware, updateUserAddress )
// usersRouter.delete('/:id/addresses', verifyTokenMiddleware, deleteUserAddress)