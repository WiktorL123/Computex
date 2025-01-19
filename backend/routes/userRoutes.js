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

usersRouter.get('/:id/profile', verifyTokenMiddleware, getUserProfile )
usersRouter.put('/:id/profile', verifyTokenMiddleware, updateUserProfile )
usersRouter.delete('/:id/profile', verifyTokenMiddleware, deleteUserProfile)

usersRouter.get('/:id/addresses', verifyTokenMiddleware, getUserAddresses )
usersRouter.post('/:id/addresses', verifyTokenMiddleware, addUserAddress )
usersRouter.put('/:id/addresses/:addressId', verifyTokenMiddleware, updateUserAddress )
usersRouter.delete('/:id/addresses/:addressId', verifyTokenMiddleware, deleteUserAddress)