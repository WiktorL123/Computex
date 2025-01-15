import express from "express";
import {calculatePaymentAmount} from "../middlewares/calculatePaymentAmount.js";
export const paymentsRouter = express.Router();


 paymentsRouter.post( '/create-payment-session', calculatePaymentAmount)