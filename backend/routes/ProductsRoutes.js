import express from 'express';
import
{   getAllProducts,
    getProductById,
    addNewProduct,
    updateProductStock
} from "../controllers/productController.js";

export const productsRouter = express.Router();


productsRouter.get('/', getAllProducts )

productsRouter.get('/:id', getProductById)

productsRouter.post('/', addNewProduct)

productsRouter.patch('/:id/stock', updateProductStock )