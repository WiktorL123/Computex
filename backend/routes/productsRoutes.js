import express from 'express';
import
{   getAllProducts,
    getProductById,
    addNewProduct,
    updateProductStock,
    deleteProduct,
} from "../controllers/productController.js";

export const productsRouter = express.Router();


productsRouter.get('/', getAllProducts )

productsRouter.get('/:id', getProductById)

productsRouter.post('/', addNewProduct)

productsRouter.patch('/:id/stock', updateProductStock )

productsRouter.delete('/:id', deleteProduct)

