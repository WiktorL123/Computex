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
                validate: {
                    validator: Number.isInteger,
                    message: "Quantity must be an integer",
                },
            },
            price: {
                type: Number,
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

cartSchema.pre("save", async function (next) {
    try {
        const Product = mongoose.model("Product");

        for (const item of this.products) {
            if (!item.price) {
                const product = await Product.findById(item.product_id);
                if (!product) {
                    throw new Error(`Product with ID ${item.product_id} not found.`);
                }
                item.price = product.price;
            }
        }

        this.totalPrice = this.products.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);

        next();
    } catch (error) {
        next(error);
    }
});

export const Cart = mongoose.model("Cart", cartSchema);
