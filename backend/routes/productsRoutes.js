import express from 'express';
import
{
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProductStock,
    deleteProduct, updateProduct, getFilteredProducts,
} from "../controllers/productController.js";

import {addSkuToRequest} from "../middlewares/addSkuToRequest.js";
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";
import {addRoleToRequest} from "../middlewares/addRoleToRequest.js";
import {checkRole} from "../middlewares/checkRole.js";
import {adminRouter} from "./adminRoutes.js";

export const productsRouter = express.Router();


productsRouter.get("/search", getFilteredProducts)
productsRouter.get('/', getAllProducts )
productsRouter.get('/:id', getProductById)


productsRouter.post('/',verifyTokenMiddleware, addRoleToRequest, checkRole, addSkuToRequest, addNewProduct)
productsRouter.patch('/:id/stock',verifyTokenMiddleware, addRoleToRequest, checkRole, updateProductStock )
productsRouter.delete('/:id',verifyTokenMiddleware, addRoleToRequest, checkRole, deleteProduct)
productsRouter.put('/:id',verifyTokenMiddleware, addRoleToRequest, checkRole, updateProduct )





