import Product from "../models/Product.js";
import {createError} from "../utils/utils.js";

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
          createError(404, 'Product with id ${id} not found');
        }
        return product;
    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        throw createError(
            500 || error.status,
            'Failed to get Product' || error.message,
            error.details || null
        )
    }
};

export const addNewProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        return product;
    } catch (error) {

        throw createError(
            500 || error.status,
            'Failed to add Product' || error.message,
            error.details || null
        )
    }
};

export const updateProductStock = async (id, stock) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw createError(404, 'Product with id ${id} not found');
        }
        product.stock = stock;
        await product.save();
        return product;
    } catch (error) {
        if ( error.status === 404 ) throw error
        throw createError(
            500 || error.status,
            'Failed to update Product' || error.message,
            error.details || null
        )
    }
};

export const deleteProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            createError(404, 'Product with id ${id} not found');
        }
        await product.deleteOne();
        return product
    } catch (error) {
       if ( error.status === 404) throw error
        throw createError(
            500 || error.status,
            'Failed to delete Product' || error.message,
            error.details || null
        )
    }
};
