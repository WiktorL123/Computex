import express from "express";
import {getAllCategories,
        getCategoryById,
        addNewCategory,
        updateCategory,
        deleteCategory} from "../controllers/categoryController.js"
import {validateId} from "../middlewares/validateIdMiddleware.js";


export const categoriesRouter =  express.Router();

categoriesRouter.get('/', getAllCategories);

categoriesRouter.get('/:id', validateId('id'), getCategoryById );

categoriesRouter.post('/', addNewCategory);

categoriesRouter.put('/:id', validateId('id'), updateCategory);

categoriesRouter.delete('/:id', validateId('id'), deleteCategory);