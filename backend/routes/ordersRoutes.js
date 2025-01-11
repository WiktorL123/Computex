import express from "express";
import {getOrders, getOrderById} from "../controllers/orderController.js"
export const orderRouter = express.Router();

orderRouter.get('/', getOrders);

orderRouter.get('/:id', getOrderById);