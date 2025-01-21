import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found", orders });
        }
        res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findOne({_id: id});
        if (!order) {
            return res.status(404).json({ message: `Order with id ${id} not found`, order });
        }
        res.status(200).json({ message: "Order retrieved successfully", order });
    } catch (error) {
        next(error);
    }
};


export const getOrdersByUserId = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const orders = await Order.find({user_id: userId})
        if (!orders.length) {
            return res.status(404).json({ message: `Orders not found` });
        }
        res.status(200).json({ message: "Order retrieved successfully", orders });
    }
    catch (error) {
        next(error);
    }
}

export const createOrder = async (req, res, next) => {
    try {
        const { user_id, products, shippingAddress, status = "pending" } = req.body;

        if (!user_id || !products || !products.length) {
            return res.status(400).json({
                message: "User ID and products are required, and products cannot be empty",
            });
        }

        if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.country || !shippingAddress.zip_code) {
            return res.status(400).json({
                message: "Valid shipping address is required",
            });
        }

        const productPrices = await Promise.all(
            products.map(async ({ product_id, quantity }) => {
                const product = await Product.findById(product_id);
                if (!product) {
                    throw createError(404, `Product with ID ${product_id} not found`);
                }
                return product.price * quantity;
            })
        );

        const totalPrice = productPrices.reduce((acc, price) => acc + price, 0);

        const newOrder = new Order({
            user_id,
            products,
            status,
            shippingAddress,
            totalPrice,
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order created successfully",
            order: newOrder,
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const orderData = req.body;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: `Order with id ${id} not found` });
        }

        Object.assign(order, orderData);
        await order.save();

        res.status(200).json({
            message: "Order updated successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: `Order with id ${id} not found` });
        }

        await order.deleteOne();

        res.status(200).json({
            message: "Order deleted successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
}
