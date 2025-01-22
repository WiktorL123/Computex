import { Product } from "../models/Product.js";

const calculateTotalPrice = async (req, res, next) => {
    try {
        const { products } = req.body;

        if (!products || products.length === 0) {
            console.error("Products array is empty or missing.");
            return res.status(400).json({ message: "Products array cannot be empty." });
        }

        let totalPrice = 0;

        for (const { product_id, quantity } of products) {
            console.log(`Fetching product with ID: ${product_id}`);
            const product = await Product.findById(product_id);

            if (!product) {
                console.error(`Product with ID ${product_id} not found.`);
                return res.status(404).json({ message: `Product with ID ${product_id} not found.` });
            }

            const productTotal = product.price * quantity;
            console.log(`Product price: ${product.price}, Quantity: ${quantity}, Subtotal: ${productTotal}`);
            totalPrice += productTotal;
        }

        console.log("Total Price calculated:", totalPrice);

        req.body.totalPrice = totalPrice;
        next();
    } catch (error) {
        console.error("Error in calculateTotalPrice middleware:", error.message);
        next(error);
    }
};

export default calculateTotalPrice;
