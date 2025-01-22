import {Order} from '../models/Order.js'
import {Cart} from '../models/Cart.js'



export const addOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { shippingAddress } = req.body;

        if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.country || !shippingAddress.zip_code) {
            return res.status(400).json({ message: 'Shipping address is required and must be complete.' });
        }

        const cart = await Cart.findOne({ user_id: userId }).populate('products.product_id', 'price');
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or not found.' });
        }

        const newOrder = new Order({
            user_id: userId,
            products: cart.products.map(item => ({
                product_id: item.product_id._id,
                quantity: item.quantity,
            })),
            totalPrice: cart.products.reduce((total, item) => total + item.product_id.price * item.quantity, 0),
            status: 'pending',
            shippingAddress
        });

        const savedOrder = await newOrder.save();

        return res.status(200).json({
            message: 'Order created successfully. Please confirm the order to proceed.',
            order: savedOrder
        });
    } catch (err) {
        console.error('Error creating order:', err);
        next(err);
    }
};


export const confirmOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const order = await Order.findOne({ _id: id, user_id: userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found for this user.' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ message: 'Order status must be pending to confirm.' });
        }

        order.status = 'ordered';
        order.updatedAt = Date.now();
        await order.save();

        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();
        }

        return res.status(200).json({
            message: 'Order confirmed successfully and cart cleared.',
            order
        });
    } catch (err) {
        console.error('Error confirming order:', err);
        next(err);
    }
};




export const getAllOrders = async (req, res, next) => {
    try {
        const allOrders = await Order.find();

        if (!allOrders || allOrders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        return res.status(200).json(allOrders);
    } catch (err) {
        next(err)
    }
};


export const getOrderById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const order = await Order.findOne({ _id: id, user_id: userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found for this user.' });
        }

        return res.status(200).json(order);
    } catch (err) {
       next();
    }
};

export const getAllOrdersByUserId = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log('userId:', userId);

        const userOrders = await Order.find({ user_id: userId }).sort({ createdAt: -1 });

        if (!userOrders || userOrders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        return res.status(200).json(userOrders);
    } catch (err) {
        console.error('Error fetching user orders:', err);
        next(err);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const updatedOrder = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const order = await Order.findOneAndUpdate(
            { _id: id, user_id: userId },
            updatedOrder,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found for this user.' });
        }

        return res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

export const cancelOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const order = await Order.findOne({ _id: id, user_id: userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found for this user.' });
        }

        if (order.status === 'cancelled') {
            return res.status(400).json({ message: 'Order has already been cancelled.' });
        }

        order.status = 'cancelled';
        order.updatedAt = Date.now();
        await order.save();

        return res.status(200).json({ message: 'Order has been cancelled successfully.', order });
    } catch (err) {
        next(err);
    }
};
