import express from "express";
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";
import {checkRole} from "../middlewares/checkRole.js";
import {
    addNewProduct,
    deleteProduct,
    getAllProducts,
    getProductById, updateProduct,
} from "../controllers/productController.js";
import {addSkuToRequest} from "../middlewares/addSkuToRequest.js";
import {getAllUsers} from "../controllers/userController.js";

export const adminRouter = express.Router();


adminRouter.use(verifyTokenMiddleware)
adminRouter.use(checkRole)


adminRouter.get('/users', getAllUsers)


adminRouter.get('/products', getAllProducts )

adminRouter.get('/users/:id', getProductById)

adminRouter.post('/products', addSkuToRequest, addNewProduct)

adminRouter.delete('/products/:id', deleteProduct)


adminRouter.put('products/:id', updateProduct )





