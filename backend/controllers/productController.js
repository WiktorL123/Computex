import {
    getAllProducts as getAllProductsService,
    getProductById as getProductByIdService,
    addNewProduct as addNewProductsService,
    updateProductStock as updateProductStockService,}
    from "../services/productsService.js";

export const getAllProducts = async (req, res, next) => {
    try{
        const products = await getAllProductsService();
        res.status(200).json(products);
    }
    catch (error) {
        next(error)
    }
}
export const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await getProductByIdService(id);
        if (!product) {
            res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json(product);
    }
    catch (error) {
        next(error)
    }
}
export const addNewProduct = async (req, res, next) => {
    try {
        console.log('dane przeslane:' + req.body);
        const product = await addNewProductsService(req.body);
        if (!product) {
            res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'created:', product});

    }
    catch (error) {
        next(error)
    }
}
export const updateProductStock = async (req, res, next) => {
    try {
        console.log('dane przeslane:' + req.params);
        const {id} = req.params;
        const {stock} = req.body

        if (typeof stock !== 'number' || stock < 0) {
            return res.status(400).json({ message: "Invalid stock value" });
        }

        const updatedProduct = await updateProductStockService(id, stock);
        res.status(200).json({message: 'updated', updatedProduct});
    }
    catch (error) {
        next(error)
    }
}

