import express from 'express';
import
{   getAllProducts,
    getProductById,
    addNewProduct,
    updateProductStock,
    deleteProduct,
} from "../controllers/productController.js";
import {validateId} from "../middlewares/validateIdMiddleware.js";
import {addSkuToRequest} from "../middlewares/addSkuToRequest.js";
import {handleValidationErrors} from "../middlewares/handleValidationErrors.js";
import {validateProduct} from "../validators/validateProduct.js";
export const productsRouter = express.Router();


productsRouter.get('/', getAllProducts )

productsRouter.get('/:id', validateId('id'), getProductById)

productsRouter.post('/', addSkuToRequest, validateProduct, handleValidationErrors, addNewProduct)

productsRouter.patch('/:id/stock', validateId('id'), updateProductStock )

productsRouter.delete('/:id', validateId('id'), deleteProduct)

