import express from "express";
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
} from "../controllers/orderController.js";

import calculateTotalPrice from "../middlewares/calculateTotalPrize.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import { addRoleToRequest } from "../middlewares/addRoleToRequest.js";
import { checkRole } from "../middlewares/checkRole.js";

export const orderRouter = express.Router();


orderRouter.use(verifyTokenMiddleware);


orderRouter.post('/', calculateTotalPrice, createOrder);


orderRouter.use(addRoleToRequest, checkRole);

orderRouter.get('/', getOrders); // Pobierz wszystkie zamówienia
orderRouter.get('/:id', getOrderById); // Pobierz zamówienie po ID
orderRouter.put('/:id', updateOrder); // Zaktualizuj zamówienie
orderRouter.delete('/:id', deleteOrder); // Usuń zamówienie
