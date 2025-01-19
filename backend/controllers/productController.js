import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import { createError } from "../utils/utils.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        if (!products.length) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        next(error)    }
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
        next(error);
    }
};

export const getFilteredProducts = async (req, res, next) => {
    try {
        const {category_id, minPrice, maxPrice, sortBy, order} = req.query;
        const filter = {}

        if (category_id) {
            if (!mongoose.Types.ObjectId.isValid(category_id)) {
                return res.status(400).json({ message: "Invalid category_id" });
            }
            filter.category_id = new mongoose.Types.ObjectId(category_id); // Rzutowanie na ObjectId
        }

        if (minPrice) {
            filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
        }

        if (maxPrice) {
            filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
        }
        const sort = { }

        if (sortBy) {
            sort[sortBy] = order === "desc" ? -1 : 1;
        }
        const products = await Product.find(filter).sort(sort)

        if (!products.length)
            return res.status(404).json({ message: "No products found" });
        res.status(200).json({message: "products found", products});
    }
    catch (error) {
        next(createError(500, "Failed to get filtered products", error.message));
    }
}

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
        next(error)    }
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

        res.status(201).json({ message: "Product stock updated successfully", product });
    } catch (error) {
        next(error)
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
        next(error)
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id){
            return res.status(400).json({ message: `Missing or invalid id` });
        }

        const product = await Product.findByIdAndUpdate(id)
        if (!product) {
            return res.status(404).json({ message: `Product with id ${id} not found` });
        }
        res.status(201).json({ message: "Product updated successfully", product });
    }
    catch (error) {
        next(error)
    }

}