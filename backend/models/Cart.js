import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        unique: true,
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Product ID is required"],
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                min: [1, "Quantity must be at least 1"],
            },
            price: {
                type: Number,
                required: [true, "Product price is required"],
                min: [0, "Product price cannot be negative"],
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: [0, "Total price cannot be negative"],
        default: 0,
    },
}, { timestamps: true, collection: "Carts" });

cartSchema.pre("save", function (next) {
    this.totalPrice = this.products.reduce((total, product) => {
        return total + product.quantity * product.price;
    }, 0);
    next();
});

export const Cart = mongoose.model("Cart", cartSchema);
