import express from 'express';
import
{   getAllProducts,
    getProductById,
    addNewProduct,
    updateProductStock,
    deleteProduct,
    getFilteredProducts
} from "../controllers/productController.js";

import {addSkuToRequest} from "../middlewares/addSkuToRequest.js";
import {handleValidationErrors} from "../middlewares/handleValidationErrors.js";
import {validateProduct} from "../validators/validateProduct.js";
import {validateIdParam} from "../validators/validateIdParam.js";
export const productsRouter = express.Router();


productsRouter.get('/', getAllProducts )

productsRouter.get('/search', getFilteredProducts)

productsRouter.get('/:id', validateIdParam, getProductById)

productsRouter.post('/', addSkuToRequest, validateProduct, handleValidationErrors, addNewProduct)

productsRouter.patch('/:id/stock', validateIdParam, updateProductStock )

productsRouter.delete('/:id', validateIdParam, deleteProduct)

productsRouter.get('/:id', validateIdParam, getProductById);





