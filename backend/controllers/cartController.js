
import { Cart } from "../models/Cart.js";
import mongoose from "mongoose";



export const getCart = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const cart = await Cart.findOne({ user_id: userId }).populate("products.product_id");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const addProductToCart = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { product_id, quantity, price } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({ message: "Invalid user ID or product ID" });
        }
        if (quantity < 1 || price < 0) {
            return res.status(400).json({ message: "Invalid quantity or price" });
        }

        let cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            cart = new Cart({
                user_id: userId,
                products: [{ product_id, quantity, price }],
            });
        } else {
            const existingProduct = cart.products.find(
                (product) => product.product_id.toString() === product_id
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product_id, quantity, price });
            }
        }


        await cart.save();

        res.status(200).json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        next(error);
    }
};

export const removeItemFromCart = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { product_id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({ message: "Invalid user ID or product ID" });
        }

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(
            (product) => product.product_id.toString() !== product_id
        );

        await cart.save();

        res.status(200).json({ message: "Product removed from cart successfully", cart });
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req, res) => {
    try {
        const  userId  = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('dupa')
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const cart = await Cart.findOne({ userId });
        console.log(cart)
        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        return res.status(200).json({ message: "Cart cleared.", cart });
    } catch (error) {
        return res.status(500).json(error);
    }
};
