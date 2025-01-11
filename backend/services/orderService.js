import {Order} from "../models/Order.js";
export const getOrders = async () => {
    try {
        const orders = await Order.find()
        console.log("orders", orders)
        return orders;

    }
    catch (error) {
        throw {
            status: 500,
            message: 'Something went wrong',
            details: error.message || null
        }
    }
}
export const getOrderById = async (id) => {

    try{
        const order = await Order.findById(id)
        if (!order) {
            throw {
                status: 404,
                message: 'Not Found',
                details: error.message || null
            }
        }
        return order
    }catch(err){
        throw {
            status: 500,
            message: 'Something went wrong',
            details: err
        }
    }

}