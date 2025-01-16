import {Order} from "../models/Order.js";

export const calculatePaymentAmount = async (req, res, next) =>{
    try {
        const {orderId} = req.body
        console.log(orderId);
        const order = await Order.findById(orderId)
        if (!order) {
            return   res.status(404).send({message: 'Order not found'})
        }
        const totalPrice = order.totalPrice;
        if (!totalPrice) {
            return res.status(400).send({ message: "Total price is not defined for this order" });
        }

        req.body.amount = Math.round(order * 100);
        console.log(`total prize: ${totalPrize}` )

        next()
    }
    catch (error) {
        next(error)
    }

    }
