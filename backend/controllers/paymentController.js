import { Stripe } from "stripe";
import { Payment } from "../models/Payment.js";
import { Order } from "../models/Order.js";
import dotenv from "dotenv";

dotenv.config();

// const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);

export const addNewPayment = async (req, res, next) => {
    try {
        const { user_id: userId, order_id: orderId, currency } = req.body;

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

      //  console.log("Sending to Stripe:", { amount, currency, metadata: { userId, orderId } });
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount,
        //     currency,
        //     metadata: { userId, orderId },
        // });
        // if (!paymentIntent || !paymentIntent.id) {
        //     throw new Error("Failed to create payment intent in Stripe");
        // }
        const payment = new Payment({
            user_id: userId,
            order_id: orderId,
            amount: totalPrice,
            currency: currency,
            // stripe_payment_id: paymentIntent.id,

        });

        console.log("Saving payment:", payment);

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
        const  paymentId  = req.params.id;
        console.log(paymentId);


        if (!mongoose.Types.ObjectId.isValid(paymentId)) {
            return res.status(400).send({ error: "Invalid Payment ID format", id: paymentId });
        }

        console.log("Payment ID from params:", paymentId);


        const payment = await Payment.findOne({_id: paymentId});
        console.log("Payment found:", payment);

        if (!payment) {
            return res.status(404).send({ error: "Payment not found" });
        }

        res.status(200).json({ payment });
    } catch (error) {
        next(error);
    }
};

export const updatePayment = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Invalid Payment ID format", id: paymentId });
        }
        const updateData = req.body;


        const updatedPayment = await Payment.findByIdAndUpdate(id, updateData)
        if (!updatedPayment) {
            return res.status(404).send({ error: "Payment not found" });
        }
        return     res.status(200).json({message: "Payment updated successfully", payment: updatedPayment});
    }
    catch (error) {
        next(error);
    }

}


export const deletePayment = async (req, res, next) => {
    try {
        const id = req.params.id;
         if (!id || !mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).send({ error: "Invalid Payment ID format", id: id });
       }
       const deletedPayment = await Payment.findByIdAndDelete(id)
        if (!deletedPayment) {
            return res.status(404).send({ error: "Payment not found" });
        }
       return  res.status(200).json({message: "Payment deleted successfully", payment: deletedPayment})
    }
    catch (error) {
        next(error);
    }
}
