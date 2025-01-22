import express from "express";
import { addProductToCart, clearCart, getCart, removeItemFromCart } from "../controllers/cartController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

export const cartRouter = express.Router();

cartRouter.get("/", verifyTokenMiddleware, getCart);
cartRouter.post("/items", verifyTokenMiddleware, addProductToCart);
cartRouter.delete("/items", verifyTokenMiddleware, removeItemFromCart);
cartRouter.delete("/", verifyTokenMiddleware, clearCart);
