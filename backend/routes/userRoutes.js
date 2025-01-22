import express from "express";
import {register,
    getUserProfile,
    getUserAddresses,
    updateUserProfile,
    updateUserAddress,
    addUserAddress,
    deleteUserAddress,
    deleteUserProfile
} from "../controllers/userController.js";
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";
export const usersRouter = express.Router();

usersRouter.post('/register', register)

usersRouter.get('/profile', verifyTokenMiddleware, getUserProfile )
usersRouter.put('/profile', verifyTokenMiddleware, updateUserProfile )
usersRouter.delete('/profile', verifyTokenMiddleware, deleteUserProfile)

usersRouter.get('/addresses', verifyTokenMiddleware, getUserAddresses )
usersRouter.post('/addresses', verifyTokenMiddleware, addUserAddress )
usersRouter.put('/addresses/:addressId', verifyTokenMiddleware, updateUserAddress )
usersRouter.delete('/addresses/:addressId', verifyTokenMiddleware, deleteUserAddress)