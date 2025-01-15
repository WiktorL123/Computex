import {Order} from "../models/Order.js";

export const calculatePaymentAmount = async (req, res, next) =>{
    try {
        const {orderId} = req.body
        const order = await Order.findById(orderId)
        if (!order) {
            return   res.status(404).send({message: 'Order not found'})
        }
        req.body.amount = Math.round(order.totalPrice * 100);

    }
    catch (error) {
        next(error)
    }

    }
