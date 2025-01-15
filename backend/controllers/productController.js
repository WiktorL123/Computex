import {
    getAllProducts as getAllProductsService,
    getProductById as getProductByIdService,
    addNewProduct as addNewProductsService,
    updateProductStock as updateProductStockService,
    deleteProduct as deleteProductService, getFilteredProductsAndCategory
} from "../services/productsService.js";


export const getAllProducts = async (req, res, next) => {
    try {
        const products = await getAllProductsService();
        res.status(200).json(products);
    } catch (error) {

        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await getProductByIdService(id);
        res.status(200).json(product);
    } catch (error) {

        next(error);
    }
}

export const addNewProduct = async (req, res, next) => {
    try {
        const product = await addNewProductsService(req.body);
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {

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

        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await deleteProductService(id);
        res.status(200).json({message: `Product deleted successfully: `, product: product });
    } catch (error) {
        next(error);
    }
};
export const getFilteredProducts = async (req, res, next) => {
    const { category_id, subcategory_id } = req.query;

    if (!category_id) {
        return res.status(400).json({
            message: "category_id is required",
        });
    }

    try {
        const categoryId = Number(category_id);
        const subcategoryId = subcategory_id ? Number(subcategory_id) : null;

        const { products, category } = await getFilteredProductsAndCategory(categoryId, subcategoryId);

        res.status(200).json({
            message: "Filtered products and category fetched successfully",
            products,
            category,
        });
    } catch (error) {
        next(error);
    }
};
