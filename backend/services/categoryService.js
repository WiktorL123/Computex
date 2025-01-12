import {Category} from "../models/Category.js";
import {createError} from "../utils/utils.js";

export const getAllCategories = async () => {
    try {
        const categories = await Category.find({})
        return categories;
    }
    catch (error) {
        throw createError(
            500 || error.status,
            'Failed to get Categories' || error.message,
            error.details || null
        )
    }

}
export const getCategoryById = async (categoryId) => {
    try {
        const category = await Category.findById(categoryId)
        if (!category) {
            throw createError(404, `Category with id ${categoryId} not found`)
        }
        return category;
    }
    catch (error) {
        if (error.status === 404) {
            throw error;
        }
        throw createError(
            500 || error.status,
            'Failed to get Category' || error.message,
            error.details || null
        )
    }
}
export const addNewCategory = async (categoryData) => {
    try {
            const category = new Category(categoryData);
            await category.save();
            return category;
    } catch (error) {
        throw createError(
            500 || error.status,
            'Failed to add Category' || error.message,
            error.details || null
        )
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try{
        const category = await Category.findById(categoryId)
        if (!category) {
            throw createError(404, `Category with id ${categoryId} not found`)
        }
        Object.assign(category, categoryData);
        await category.save()
        return category;
    }
    catch(error){
        if (error.status === 404) {
            throw error;
        }
        throw createError(
            500 || error.status,
            'Failed to update Category' || error.message,
            error.details || null
        )
    }

}
export const deleteCategory = async (categoryId) => {

        try{
            const category = await Category.findById(categoryId)
            if (!category) {
                throw createError(404, `Category with id ${categoryId} not found`)
            }
            await category.deleteOne()
            return category;
        }
        catch(error){
            if (error.status === 404) {
                throw error;
            }
            throw createError(
                500 || error.status,
                'Failed to delete Category' || error.message,
                error.details || null
            )
        }

    }