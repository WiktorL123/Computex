import express from 'express';
import {getAllProducts} from "../controllers/productController.js";
import {getProductById} from "../controllers/productController.js";

export const productsRouter = express.Router();


productsRouter.get('/', getAllProducts )

productsRouter.get('/:id', getProductById)