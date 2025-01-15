import express from "express";
import {getAllCategories,
        getCategoryById,
        addNewCategory,
        updateCategory,
        deleteCategory} from "../controllers/categoryController.js"
import {handleValidationErrors} from "../middlewares/handleValidationErrors.js";
import {validateCategory} from "../validators/validateCategory.js";
import {validateIdParam} from "../validators/validateIdParam.js";


export const categoriesRouter =  express.Router();

categoriesRouter.get('/', getAllCategories);

categoriesRouter.get('/:id',  validateIdParam, handleValidationErrors, getCategoryById );

categoriesRouter.post('/', validateCategory, handleValidationErrors, addNewCategory);

categoriesRouter.put('/:id',validateCategory, validateIdParam, handleValidationErrors, updateCategory);

categoriesRouter.delete('/:id', validateIdParam, handleValidationErrors, deleteCategory);