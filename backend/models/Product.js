import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category_id: { type: Number, required: true },
    subcategory_id: { type: Number, required: true },
    filters: { type: Object, default: {} },
    description: { type: String },
    stock: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    sku: { type: String, unique: true },
}, { timestamps: true, collection: 'Products' });

export const Product = mongoose.model("Product", ProductSchema);
