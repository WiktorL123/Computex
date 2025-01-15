import {Stripe} from "stripe";

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY)
const  addNewPayment = (req, res) => {
    const {userId, orderId} = req.body;
}