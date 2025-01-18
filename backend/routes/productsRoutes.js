import express from 'express';
import
{
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProductStock,
    deleteProduct, updateProduct,
    // getFilteredProducts
} from "../controllers/productController.js";

import {addSkuToRequest} from "../middlewares/addSkuToRequest.js";
import {handleValidationErrors} from "../middlewares/handleValidationErrors.js";
import {validateIdParam} from "../validators/validateIdParam.js";
import {isValidObjectId} from "../utils/utils.js";
export const productsRouter = express.Router();


productsRouter.get('/', getAllProducts )

// productsRouter.get('/search', getFilteredProducts)

productsRouter.get('/:id', getProductById)

productsRouter.post('/', addSkuToRequest, addNewProduct)

productsRouter.patch('/:id/stock', updateProductStock )

productsRouter.delete('/:id', deleteProduct)

productsRouter.get('/:id', getProductById);

productsRouter.put('/:id', updateProduct )





