
import { Cart } from "../models/Cart.js";
import mongoose from "mongoose";


export const getCart = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user_id: userId }).populate("products.product_id");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Zmapowanie produktów na bardziej czytelny format
        const cartResponse = {
            ...cart._doc,
            products: cart.products.map((item) => ({
                ...item._doc,
                product: item.product_id,
                product_id: undefined, // Usunięcie oryginalnego pola
            })),
        };

        res.status(200).json(cartResponse);
    } catch (error) {
        next(error);
    }
};


export const addProductToCart = async (req, res, next) => {
    try {
        console.log("Request user in addProductToCart:", req.user); // Logowanie danych użytkownika

        const userId = req.user.id;
        const { product_id, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        if (quantity < 1) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        let cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            cart = new Cart({
                user_id: userId,
                products: [{ product_id, quantity }],
            });
        } else {
            const existingProduct = cart.products.find(
                (product) => product.product_id.toString() === product_id
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product_id, quantity });
            }
        }

        await cart.save();

        res.status(200).json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        console.error("Error in addProductToCart:", error);
        next(error);
    }
};

export const removeItemFromCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { product_id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const initialLength = cart.products.length;
        cart.products = cart.products.filter(
            (product) => product.product_id.toString() !== product_id
        );

        if (cart.products.length === initialLength) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        await cart.save();

        res.status(200).json({ message: "Product removed from cart successfully", cart });
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const userId = req.user.id; // Pobranie user_id z JWT tokena

        const cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        cart.products = [];
        cart.totalPrice = 0;

        await cart.save();

        return res.status(200).json({ message: "Cart cleared.", cart });
    } catch (error) {
        return res.status(500).json(error);
    }
};
