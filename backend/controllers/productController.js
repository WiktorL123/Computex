import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import { createError } from "../utils/utils.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        if (!products.length) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        next(createError(500, "Failed to fetch products", error.message));
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: `Product with id ${id} not found` });
        }
        res.status(200).json(product);
    } catch (error) {
        next(createError(500, "Failed to get product", error.message));
    }
};

export const addNewProduct = async (req, res, next) => {
    try {
        const { name } = req.body;

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: `Product with name ${name} already exists` });
        }

        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        next(createError(500, "Failed to add product", error.message));
    }
};

export const updateProductStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        if (typeof stock !== "number" || stock < 0) {
            return res.status(400).json({ message: "Invalid stock value" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: `Product with id ${id} not found` });
        }

        product.stock = stock;
        await product.save();

        res.status(200).json({ message: "Product stock updated successfully", product });
    } catch (error) {
        next(createError(500, "Failed to update product stock", error.message));
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: `Product with id ${id} not found` });
        }

        await product.deleteOne();

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        next(createError(500, "Failed to delete product", error.message));
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
        const filter = { category_id: Number(category_id) };
        if (subcategory_id) {
            filter["subcategory_id"] = Number(subcategory_id);
        }

        const products = await Product.find(filter);
        const category = await Category.findOne({ category_id: Number(category_id) });

        if (!category) {
            return res.status(404).json({
                message: `Category with ID ${category_id} not found`,
            });
        }

        res.status(200).json({
            message: "Filtered products and category fetched successfully",
            products,
            category,
        });
    } catch (error) {
        next(createError(500, "Failed to fetch filtered products and category", error.message));
    }
};
