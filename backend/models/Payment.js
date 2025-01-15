import mongoose from "mongoose";

const paymentsSchema = new mongoose.Schema({
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
            enum: ["completed", "pending", "failed"],
            default: "pending"
        }
    }
})