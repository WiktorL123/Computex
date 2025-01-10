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
       console.log("Data received in service:", categoryData);
        const category = new Category(categoryData);
         console.log("Category instance before save:", category);
            await category.save();
         console.log("Category saved successfully:", category);

        return category;
    } catch (error) {
        throw {
            status: 400,
            message: "Failed to add category",
            details: error.message
        };
    }
};
// export const addNewCategory = async (categoryData) => {
//     try {
//         console.log("Data received in service:", categoryData);
//         const category = new Category(categoryData);
//         console.log("Category instance before save:", category);
//         await category.save();
//         console.log("Category saved successfully:", category);
//         return category;
//     } catch (error) {
//         console.error("Error in addNewCategory service:", error.message, error.stack);
//         throw {
//             status: 400,
//             message: "Failed to add category",
//             details: error.message
//         };
//     }
// };
