import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    filters: {
        type: Map,
        of: String,
        validate: {
            validator: (value) => {
                const maxFilters = 10;
                return Object.keys(value).length <= maxFilters;
            },
            message: "Maximum number of filters for product is 10",
        },
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 16,
    },
    stock: {
        type: Number,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: "Stock must be a positive integer",
        },
        min: [0, "Stock cannot be negative"],
    },
    images: {
        type: [String],
        default: [],
    },
    sku: {
        type: String,
        unique: true,
        match: [/^[a-zA-Z0-9]{8}$/, "SKU must be exactly 8 alphanumeric characters"],
    },
}, { timestamps: true, collection: "Products" });

export const Product = mongoose.model("Product", ProductSchema);
