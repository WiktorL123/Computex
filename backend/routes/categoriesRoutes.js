import express from "express";
import {getAllCategories,
        getCategoryById,
        addNewCategory,
        updateCategory,
        deleteCategory} from "../controllers/categoryController.js"
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";
import {addRoleToRequest} from "../middlewares/addRoleToRequest.js";
import {checkRole} from "../middlewares/checkRole.js";



export const categoriesRouter =  express.Router();




categoriesRouter.get('/', getAllCategories);

categoriesRouter.get('/:id', getCategoryById );

categoriesRouter.use(verifyTokenMiddleware)

categoriesRouter.post('/', addRoleToRequest, checkRole, addNewCategory);

categoriesRouter.put('/:id',addRoleToRequest, checkRole, updateCategory);

categoriesRouter.delete('/:id',addRoleToRequest, checkRole,  deleteCategory);