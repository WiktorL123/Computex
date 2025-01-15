import express from "express";
import {getOrders, getOrderById, createOrder, updateOrder, deleteOrder} from "../controllers/orderController.js"
import {validateId} from "../middlewares/validateIdMiddleware.js";
import {validateOrder} from "../validators/validateOrder.js";
import {handleValidationErrors} from "../middlewares/handleValidationErrors.js";
import {validateIdParam} from "../validators/validateIdParam.js";
import calculateTotalPrice from "../middlewares/calculateTotalPrize.js";

export const orderRouter = express.Router();

orderRouter.get('/', getOrders);

orderRouter.get('/:id', validateIdParam, getOrderById);

orderRouter.post('/', validateOrder, handleValidationErrors, calculateTotalPrice, createOrder)

orderRouter.put('/:id', validateOrder, handleValidationErrors, validateIdParam, updateOrder )

orderRouter.delete('/:id', validateIdParam, deleteOrder);