import { Product } from "../models/Product.js";

const  calculateTotalPrice = async (req, res, next) => {
    try {
        const { products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Products array cannot be empty." });
        }

        const totalPrice = await Promise.all(
            products.map(async ({ product_id, quantity }) => {
                const product = await Product.findById(product_id);
                if (!product) {
                    throw new Error(`Product with ID ${product_id} not found`);
                }
                return product.price * quantity;
            })
        ).then((prices) => prices.reduce((acc, price) => acc + price, 0));

        console.log("Total Price calculated:", totalPrice);

        req.body.totalPrice = totalPrice;

        next();
    } catch (error) {
        console.error("Error in calculateTotalPriceMiddleware:", error.message);
        next(error);
    }
};
export default calculateTotalPrice