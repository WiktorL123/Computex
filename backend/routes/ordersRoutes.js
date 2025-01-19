import express from "express";
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUserId
} from "../controllers/orderController.js"




import {validateIdParam} from "../validators/validateIdParam.js";
import calculateTotalPrice from "../middlewares/calculateTotalPrize.js";

export const orderRouter = express.Router();

orderRouter.get('/', getOrders);

orderRouter.get('/:id', getOrderById);

orderRouter.post('/', calculateTotalPrice, createOrder)

orderRouter.put('/:id', validateIdParam, updateOrder )

orderRouter.delete('/:id', validateIdParam, deleteOrder);