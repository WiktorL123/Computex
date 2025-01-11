import {getOrders as getOrdersService,
        getOrderById as getOrderByIdService} from "../services/orderService.js";
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