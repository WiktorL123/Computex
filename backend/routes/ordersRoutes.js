import express from "express";
import {getOrders, getOrderById, createOrder, updateOrder, deleteOrder} from "../controllers/orderController.js"
import {validateId} from "../middlewares/validateIdMiddleware.js";

export const orderRouter = express.Router();

orderRouter.get('/', getOrders);

orderRouter.get('/:id', validateId('id'), getOrderById);

orderRouter.post('/', createOrder)

orderRouter.put('/:id', validateId('id'), updateOrder )

orderRouter.delete('/:id', validateId('id'), deleteOrder);