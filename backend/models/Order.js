import mongoose from "mongoose";
import {addressSchema} from "./User.js";
import calculateTotalPrize from "../middlewares/calculateTotalPrize.js";

const orderSchema = new mongoose.Schema({
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
    },
    totalPrice: {
        type: Number,
        min: 1
    },
    shippingAddress: {
        type: addressSchema,
        default: {}

    }
}, { timestamps: true, collection: 'Orders' });


export const Order = mongoose.model("Order", orderSchema);
