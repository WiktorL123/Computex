import express from "express";
import {getOrders, getOrderById, createOrder, updateOrder, deleteOrder} from "../controllers/orderController.js"
import {validateId} from "../middlewares/validateIdMiddleware.js";
import {validateOrder} from "../validators/validateOrder.js";
import {handleValidationErrors} from "../middlewares/handleValidationErrors.js";

export const orderRouter = express.Router();

orderRouter.get('/', getOrders);

orderRouter.get('/:id', validateId('id'), getOrderById);

orderRouter.post('/', validateOrder, handleValidationErrors, createOrder)

orderRouter.put('/:id', validateOrder, handleValidationErrors, validateId('id'), updateOrder )

orderRouter.delete('/:id', validateId('id'), deleteOrder);