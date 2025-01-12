import {getOrders as getOrdersService,
        getOrderById as getOrderByIdService,
        createOrder as createOrderService,
        updateOrder as updateOrderService,
        deleteOrder as deleteOrderService} from "../services/orderService.js";
export const getOrders = async (req, res, next) => {
    try{
        const orders = await getOrdersService();
        res.status(200).json({message: 'orders: ', orders});
    }
    catch(err){
        next(err);
    }

}
export const getOrderById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const order = await getOrderByIdService(id);
        res.status(200).json(order);
    }
    catch(err){
        next(err);
    }
}
export const createOrder = async (req, res, next) => {
    try {
        const order = req.body;
        const newOrder = await createOrderService(order);
        res.status(200).json({message: 'order created', order: newOrder});
    }
    catch(err){
        next(err);
    }
}
export const updateOrder = async (req, res, next) => {
    try {
        const {id} = req.params;
        const orderData = req.body;
        const newOrder = await updateOrderService(id, orderData);
        res.status(200).json({message: 'order updated', order: newOrder});
    }
    catch(error){
        next(error);
    }
}
export const deleteOrder = async (req, res, next) => {
    try {
        const {id} = req.params;
        const order = await deleteOrderService(id);
        res.status(200).json({message: 'order deleted', order});
    }
    catch(err){
        next(err);
    }

}