import express from "express";
import {getAllCategories,
        getCategoryById,
        addNewCategory,
        updateCategory,
        deleteCategory} from "../controllers/categoryController.js"
import {validateId} from "../middlewares/validateIdMiddleware.js";
import {handleValidationErrors} from "../middlewares/handleValidationErrors.js";
import {validateCategory} from "../validators/validateCategory.js";


export const categoriesRouter =  express.Router();

categoriesRouter.get('/', getAllCategories);

categoriesRouter.get('/:id', validateId('id'), getCategoryById );

categoriesRouter.post('/', validateCategory, handleValidationErrors, addNewCategory);

categoriesRouter.put('/:id', handleValidationErrors, validateCategory, validateId('id'), updateCategory);

categoriesRouter.delete('/:id', validateId('id'), deleteCategory);