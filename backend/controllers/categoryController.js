import { Category } from "../models/Category.js";
import { createError } from "../utils/utils.js";

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        if (!categories.length) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json({ message: "Category List", categories });
    } catch (error) {
        next(createError(500, "Failed to fetch categories", error.message));
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: `Category with id ${id} not found` });
        }
        res.status(200).json({ message: "Category found", category });
    } catch (error) {
        next(createError(500, "Failed to fetch category", error.message));
    }
};

export const addNewCategory = async (req, res, next) => {
    try {
        const categoryData = req.body;

        const existingCategory = await Category.findOne({ name: categoryData.name });
        if (existingCategory) {
            return res.status(400).json({ message: `Category with name ${categoryData.name} already exists` });
        }

        const newCategory = new Category(categoryData);
        await newCategory.save();

        res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
        next(createError(500, "Failed to add category", error.message));
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoryData = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: `Category with id ${id} not found` });
        }

        Object.assign(category, categoryData);
        await category.save();

        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        next(createError(500, "Failed to update category", error.message));
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: `Category with id ${id} not found` });
        }

        await category.deleteOne();

        res.status(200).json({ message: "Category deleted successfully", category });
    } catch (error) {
        next(createError(500, "Failed to delete category", error.message));
    }
};
