import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    subcategory_id: { type: Number, required: true },
    name: { type: String, required: true },
    filters: { type: [String], default: [] },
});

const CategorySchema = new mongoose.Schema({
    category_id: { type: Number, required: true },
    name: { type: String, required: true },
    subcategories: { type: [SubCategorySchema], default: [] },
}, { timestamps: true, collection: 'Categories' });

export const Category = mongoose.model("Category", CategorySchema);
