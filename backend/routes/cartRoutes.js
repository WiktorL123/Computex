import express from "express";
import {addProductToCart, clearCart, getCart, removeItemFromCart} from "../controllers/cartController.js";
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";

export const cartRouter  = express.Router();


cartRouter.get('/:userId', verifyTokenMiddleware, getCart);
cartRouter.post('/:userId/items', verifyTokenMiddleware, addProductToCart);
cartRouter.delete('/:userId/items', verifyTokenMiddleware, removeItemFromCart);
 cartRouter.delete('/:userId', verifyTokenMiddleware, clearCart);