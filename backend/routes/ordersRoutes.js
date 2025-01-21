import express from "express";
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder, getOrdersByUserId,
} from "../controllers/orderController.js";

import calculateTotalPrice from "../middlewares/calculateTotalPrize.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import { addRoleToRequest } from "../middlewares/addRoleToRequest.js";
import { checkRole } from "../middlewares/checkRole.js";

export const orderRouter = express.Router();


orderRouter.use(verifyTokenMiddleware);


orderRouter.post('/', calculateTotalPrice, createOrder);
orderRouter.get('/:userId', getOrdersByUserId)


orderRouter.use(addRoleToRequest, checkRole);

orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrder);
orderRouter.delete('/:id', deleteOrder);
