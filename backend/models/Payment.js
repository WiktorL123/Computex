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
            default: "pending"
        },
        amount: {
            type: Number,
            min: 0
        },
        currency: {
            type: String,
            enum: ["eu", "usd", "pln", "gb"],
            required: true
        }

    }
},{timestamps: true, collection: 'Payments'});

const Payment = mongoose.model("Payment", paymentSchema);