import {Category} from "../models/Category.js";

export const getAllCategories = async () => {
    try {
        const categories = await Category.find({})
        return categories;
    }
    catch (error) {
        throw {
            status: 400,
            message: 'Failed to get All Categories',
            details: error.message
        }
    }

}
export const getCategoryById = async (categoryId) => {
    try {
        const category = await Category.findById(categoryId)
        if (!category) {
            throw {
                status: 404,
                message: 'Category not found.',
                details: error.message
            }
        }
        return category;
    }
    catch (error) {
        throw {
            status: 400,
            message: `Failed to get category with ID ${categoryId}`,
            details: error.message
        }
    }
}
export const addNewCategory = async (categoryData) => {
    try {
        const existingCategory = await Category.findOne({ category_id: categoryData.category_id });
        if (existingCategory) {
            throw {
                status: 400,
                message: `Category with ID ${categoryData.category_id} already exists.`,
            };
        }

        const category = new Category(categoryData);
        await category.save();
        return category;
    } catch (error) {
        throw {
            status: 400,
            message: "Failed to add category",
            details: error.message
        };
    }
};