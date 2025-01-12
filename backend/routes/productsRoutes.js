import express from 'express';
import
{   getAllProducts,
    getProductById,
    addNewProduct,
    updateProductStock,
    deleteProduct,
} from "../controllers/productController.js";
import {validateId} from "../middlewares/validateIdMiddleware.js";

export const productsRouter = express.Router();


productsRouter.get('/', getAllProducts )

productsRouter.get('/:id', validateId('id'), getProductById)

productsRouter.post('/', addNewProduct)

productsRouter.patch('/:id/stock', validateId('id'), updateProductStock )

productsRouter.delete('/:id', validateId('id'), deleteProduct)

