import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    subcategory_id: {type: Number, required: [true, 'Subcategory is required']},
    name: {type: String, required: [true, 'Name is required']},
    filters: {type: [String], default: [], required: [true, 'Filters are required']},
})


const categorySchema = new mongoose.Schema({
    category_id: {type:Number, required: [true, 'Category is required']},
    name: {type: String, required: [true, 'Name is required']},
    subcategories: {type: [subCategorySchema], default: [], required: [true, 'Subcategory is required']}

}, {timestamps: true, collection: 'Categories'});
export const Category = mongoose.model('Category', categorySchema);