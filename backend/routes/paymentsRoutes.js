import express from "express";
import {
 addNewPayment,
 deletePayment,
 getAllPayments,
 getPaymentById,
 updatePayment
} from "../controllers/paymentController.js";

import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";
import {addRoleToRequest} from "../middlewares/addRoleToRequest.js";
import {checkRole} from "../middlewares/checkRole.js";
export const paymentsRouter = express.Router();

 paymentsRouter.use(verifyTokenMiddleware)
 paymentsRouter.post( '/', addNewPayment)

paymentsRouter.use(addRoleToRequest, checkRole)

paymentsRouter.get('/', getAllPayments);

 paymentsRouter.get('/:id', getPaymentById);

paymentsRouter.delete('/:id', deletePayment);

paymentsRouter.put('/:id', updatePayment);