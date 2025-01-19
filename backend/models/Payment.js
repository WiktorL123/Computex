import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    payment_method: {
        type: String,
        enum: ["blik", "credit_card", "paypal"],
        default: "credit_card"
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        enum: ["eur", "usd", "pln", "gbp"],
        default: "usd"
    },
    status: {
        type: String,
        enum: ["succeeded", "failed", "requires_action", "requires_payment_method"],
        default: "requires_action",
    },
}, { timestamps: true, collection: 'Payments' });

export const Payment = mongoose.model("Payment", paymentSchema);
