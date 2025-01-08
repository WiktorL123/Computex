import Product from "../models/Product.js";

export const getAllProducts = async () => {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        throw { status: 500, message: "Failed to fetch products", details: error.message };
    }
};

export const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw { status: 404, message: "Product not found" };
        }
        return product;
    } catch (error) {
        if (error.name === "CastError") {
            throw { status: 400, message: "Invalid product ID format" };
        }
        throw { status: 500, message: "Failed to fetch product", details: error.message };
    }
};

export const addNewProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        return product;
    } catch (error) {
        if (error.name === "ValidationError") {
            throw { status: 400, message: "Invalid product data", details: error.errors };
        }
        throw { status: 500, message: "Failed to add product", details: error.message };
    }
};

export const updateProductStock = async (id, stock) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw { status: 404, message: "Product not found" };
        }
        product.stock = stock;
        await product.save();
        return product;
    } catch (error) {
        if (error.name === "CastError") {
            throw { status: 400, message: "Invalid product ID format" };
        }
        throw { status: 500, message: "Failed to update product stock", details: error.message };
    }
};

export const deleteProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw { status: 404, message: "Product not found" };
        }
        await product.deleteOne();
        return { message: "Product deleted successfully" };
    } catch (error) {
        if (error.name === "CastError") {
            throw { status: 400, message: "Invalid product ID format" };
        }
        throw { status: 500, message: "Failed to delete product", details: error.message };
    }
};
