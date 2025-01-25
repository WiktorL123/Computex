import { Product } from "../models/Product.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({}).populate({
            path: "category_id",
            select: "name"
        });
        if (!products.length) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({message: "products found", products});
    } catch (error) {
        next(error)    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return next({ status: 404, message: `Product with id ${id} not found` });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const getFilteredProducts = async (req, res, next) => {
    try {
        const { category_id, minPrice, maxPrice, sortBy, order, query, ...customFilters } = req.query;
        const filter = {};

        if (category_id && category_id !== "all") {
            if (!mongoose.Types.ObjectId.isValid(category_id)) {
                return res.status(400).json({ message: "Invalid category_id" });
            }
            filter.category_id = new mongoose.Types.ObjectId(category_id);
        }

        if (query){
            filter.name = {$regex: query, $options: "i"};
        }

        if (minPrice) {
            filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
        }

        if (maxPrice) {
            filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
        }

        Object.keys(customFilters).forEach((key) => {
            filter[`filters.${key}`] = customFilters[key];
        });

        const sort = {};
        if (sortBy) {
            sort[sortBy] = order === "desc" ? -1 : 1;
        }

        const products = await Product.find(filter).sort(sort).populate({
            path: "category_id",
            select: "name",
        });

        if (!products.length) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
};

export const getSuggestions = async (req, res, next) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ suggestions: [] });
        }


        const products = await Product.find({
            name: { $regex: query, $options: "i" }
        })
            .select("name _id")
            .limit(10);

        const suggestions = products.map((product) => ({
            id: product._id,
            name: product.name,
        }));

        return res.status(200).json(suggestions);
    } catch (error) {
        next(error);
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