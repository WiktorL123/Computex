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
import {getAllUsers, getUserById} from "../controllers/userController.js";
import {addRoleToRequest} from "../middlewares/addRoleToRequest.js";

export const adminRouter = express.Router();


adminRouter.use(verifyTokenMiddleware)
adminRouter.use(addRoleToRequest)
adminRouter.use(checkRole)


adminRouter.get('/users', getAllUsers)
adminRouter.get('/users/:id', getUserById)

adminRouter.get('/products', getAllProducts)
adminRouter.get('/products/:id', getProductById)
adminRouter.post('/products', addSkuToRequest, addNewProduct)
adminRouter.put('/products/:id', updateProduct)
adminRouter.delete('/products/:id', deleteProduct)

