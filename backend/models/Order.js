import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    status: {
        type: String,
        enum: ["pending", "completed", "rejected"],
        default: "pending"
    }
}, { timestamps: true, collection: 'Orders' });

export const Order = mongoose.model("Order", OrderSchema);
