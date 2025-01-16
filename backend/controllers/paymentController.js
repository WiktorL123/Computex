import { Stripe } from "stripe";
import { Payment } from "../models/Payment.js";
import { Order } from "../models/Order.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);

export const addNewPayment = async (req, res, next) => {
    try {
        const { userId, orderId, currency } = req.body;

        if (!userId || !orderId) {
            return res.status(400).send({ error: "Missing userId or orderId" });
        }

        if (!currency || !["usd", "eur", "pln", "gbp"].includes(currency)) {
            return res.status(400).send({ error: "Missing or unsupported currency" });
        }


        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send({ error: "Order not found" });
        }

        const totalPrice = order.totalPrice;
        if (!totalPrice || totalPrice <= 0) {
            return res.status(400).send({ error: "Invalid totalPrice in order" });
        }

        const amount = Math.round(totalPrice * 100);

        console.log("Creating payment with amount:", amount);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata: { userId, orderId },
        });

        console.log("Payment intent created successfully:", paymentIntent.id);


        const payment = new Payment({
            user_id: userId,
            order_id: orderId,
            amount: totalPrice,
            currency,
            stripe_payment_id: paymentIntent.id,
            status: paymentIntent.status,
        });

        await payment.save();

        res.status(201).json({
            message: "Payment created successfully",
            payment,
        });
    } catch (error) {
        console.error("Payment creation failed:", error);

        if (error.type === "StripeCardError") {
            return res.status(400).send({ error: "Payment failed", details: error.message });
        }

        next(error);
    }
};

export const getAllPayments = async (req, res, next) => {
    try {
        const payments = await Payment.find()
        if (!payments.length) res.status(404).send({ error: "Payments not found" });

        res.status(200).json({payments: payments});
    }
    catch (error) {
        next(error);
    }

}
import mongoose from "mongoose";

export const getPaymentById = async (req, res, next) => {
    try {
        const { paymentId } = req.params;


        if (!mongoose.Types.ObjectId.isValid(paymentId)) {
            return res.status(400).send({ error: "Invalid Payment ID format" });
        }

        console.log("Payment ID from params:", paymentId);


        const payment = await Payment.findById(paymentId);
        console.log("Payment found:", payment);

        if (!payment) {
            return res.status(404).send({ error: "Payment not found" });
        }

        res.status(200).json({ payment });
    } catch (error) {
        next(error);
    }
};
