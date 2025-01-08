import {
    getAllProducts as getAllProductsService,
    getProductById as getProductByIdService,
    addNewProduct as addNewProductsService,
    updateProductStock as updateProductStockService,
    deleteProduct as deleteProductService,
} from "../services/productsService.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await getAllProductsService();
        res.status(200).json(products);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, details: error.details });
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await getProductByIdService(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, details: error.details });
        next(error);
    }
};

export const addNewProduct = async (req, res, next) => {
    try {
        const product = await addNewProductsService(req.body);
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, details: error.details });
        next(error);
    }
};

export const updateProductStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        if (typeof stock !== "number" || stock < 0) {
            return res.status(400).json({ message: "Invalid stock value" });
        }

        const updatedProduct = await updateProductStockService(id, stock);
        res.status(200).json({ message: "Product stock updated successfully", updatedProduct });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, details: error.details });
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductService(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message, details: error.details });
        next(error);
    }
};
