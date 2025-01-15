import {Product} from "../models/Product.js";
import {createError} from "../utils/utils.js";
import {Category} from "../models/Category.js";

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
          throw  createError(404, 'Product with id ${id} not found');
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
}

export const addNewProduct = async (productData) => {
    try {
        const product = new Product(productData);

        const existingProduct = await Product.find({
            name: productData.name
        })
        if (existingProduct.length>0) throw createError(400, 'Product already exists');
        await product.save();
        return product;
    } catch (error) {
        if (error.status === 400) throw error

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
export const getFilteredProductsAndCategory = async (categoryId, subcategoryId = null) => {
    try {
        const filter = { category_id: categoryId };
        if (subcategoryId) {
            filter.subcategory_id = subcategoryId;
        }

        const products = await Product.find(filter);

        const category = await Category.findOne({ category_id: categoryId });

        if (!category) {
            throw createError(404, `Category with ID ${categoryId} not found`);
        }

        return { products, category };
    } catch (error) {
        throw createError(
            error.status || 500,
            "Failed to fetch filtered products and category",
            error.message || null
        );
    }
};