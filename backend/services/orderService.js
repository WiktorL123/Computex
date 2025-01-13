import {Order} from "../models/Order.js";
import {createError} from "../utils/utils.js";
export const getOrders = async () => {
    try {
        const orders = await Order.find()
        if (orders.length ===0)  throw createError(404, 'no orders found');
        console.log("orders", orders)
        return orders;

    }
    catch (error) {
        if (error.status === 404) throw error;
        throw createError(
            500 || error.status,
            'Failed to get Orders' || error.message,
            error.details || null
        )
    }
}
export const getOrderById = async (id) => {

    try{
        const order = await Order.findById(id)
        if (!order) {
           createError(404, 'order not found');
        }
        return order
    }catch(error){
        throw createError(
            500 || error.status,
            'Failed to get  Order' || error.message,
            error.details
        )
    }

}
export const createOrder = async (order) => {
    try {
        const newOrder = new Order(order);

        return await newOrder.save();
    } catch (err) {
        throw createError(
            500 || err.status,
            'Failed to add  Order' || err.message,
            err.details || null
        )
    }

}
export const updateOrder = async (id, orderData) => {
    try {
        const order = await Order.findById(id);

        if (!order) {
            throw createError(404, `Order with id ${id} not found`);
        }

        Object.assign(order, orderData);
        await order.save();
        return order;

    } catch (error) {
        if (error.status === 404) throw error;
        throw createError(
            500,
            "Failed to update Order",
            error.message || null
        );
    }
};
export const deleteOrder = async (id) => {

    try{
        const order = await Order.findById(id)

        if (!order) {
            throw createError(404, `Order with id ${id} not found`);
        }

        await order.deleteOne()
        return order;
    }
    catch(error){
        if (error.status === 404) throw error;
        throw createError(
            500,
            'Failed to delete Order',
            error.message || null
        )
    }
}
