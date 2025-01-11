import {getAllCategories as getAllCategoriesService,
        getCategoryById as getCategoryByIdService,
        addNewCategory as addNewCategoryService,
        updateCategory as updateCategoryService,
        deleteCategory as deleteCategoryService} from "../services/categoryService.js";

export const getAllCategories = async (req,res, next) => {
    try {
        const categories = await getAllCategoriesService()
        res.status(200).json({message: 'Category List', categories: categories});

    }
    catch (error) {
        next(error)
        res.status(400 || res.statusCode).json({error: error.message});

    }
}
export const getCategoryById = async (req,res, next) => {
    try {
        const {id} = req.params;
        const category = await getCategoryByIdService(id);
        res.status(200).json({category: category});
    }
    catch (error) {
        next(error)
    }
}
export const addNewCategory = async (req, res, next) => {
    try{

        const categoryData = req.body
        console.log("Adding new category with data:", JSON.stringify(categoryData))

        const category = await addNewCategoryService(categoryData);
        res.status(200).json({message: 'Category Added', category: category});
    }
    catch (error) {
        next(error)
    }

}
export const updateCategory = async (req,res, next) => {
    try {
        const {id} = req.params;
        let categoryData = req.body
        const updatedCategory =  await updateCategoryService(id, categoryData)
        res.status(200).json({message: 'Category Updated', category: updatedCategory});
    }
    catch (error) {
        next(error)
    }
}
export const deleteCategory = async (req,res, next) => {
    try {
        const {id} = req.params
        const category = await deleteCategoryService(id);
        res.status(200).json({message: 'Category Deleted', category: category});

    }
    catch (error) {
        next(error)
    }
}