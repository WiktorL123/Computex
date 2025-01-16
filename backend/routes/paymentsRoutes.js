import express from "express";
import {calculatePaymentAmount} from "../middlewares/calculatePaymentAmount.js";
import {addNewPayment, getAllPayments, getPaymentById} from "../controllers/paymentController.js";
import {validateIdParam} from "../validators/validateIdParam.js";
import {handleValidationErrors} from "../middlewares/handleValidationErrors.js";
export const paymentsRouter = express.Router();


 paymentsRouter.post( '/', addNewPayment)

paymentsRouter.get('/', getAllPayments);

 paymentsRouter.get('/:id', validateIdParam, handleValidationErrors, getPaymentById);