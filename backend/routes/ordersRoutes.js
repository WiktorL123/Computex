import express from "express";
import {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    confirmOrder,
    cancelOrder,
    getAllOrdersByUserId
} from "../controllers/orderController.js";


import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import { addRoleToRequest } from "../middlewares/addRoleToRequest.js";
import { checkRole } from "../middlewares/checkRole.js";

export const orderRouter = express.Router();


orderRouter.use(verifyTokenMiddleware);

orderRouter.get('/', addRoleToRequest, checkRole, getAllOrders)
orderRouter.get('/user', getAllOrdersByUserId)
orderRouter.get('/:id', getOrderById)
orderRouter.post('/', addOrder)
orderRouter.put('/:id',addRoleToRequest, checkRole, updateOrder)
orderRouter.put('/:id/confirm', confirmOrder)
orderRouter.patch('/:id/cancel', cancelOrder)
