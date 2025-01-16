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
        type: {
            type: String,
            enum: ["blik", "credit_card", "paypal"],
            default: "credit_card"
        },
        amount: {
            type: Number,
            min: 0
        },
        currency: {
            type: String,
            enum: ["eur", "usd", "pln", "gbp"],
            default: "usd"
        },
        stripe_payment_id: {
            type: String,
            default: "",
            unique: true,
        },
        status: {
            type: String,
            enum: ["succeeded", "failed", "requires_action"],
            default: "requires_action",
        },

    }
},{timestamps: true, collection: 'Payments'});

export const Payment = mongoose.model("Payment", paymentSchema);