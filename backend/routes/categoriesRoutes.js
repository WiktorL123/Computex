import express from "express";
import {getAllCategories,
        getCategoryById,
        addNewCategory} from "../controllers/categoryController.js"

export const categoriesRouter =  express.Router();

categoriesRouter.get('/', getAllCategories);

categoriesRouter.get('/:id', getCategoryById );

categoriesRouter.post('/', addNewCategory);
