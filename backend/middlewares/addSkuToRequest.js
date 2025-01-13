import { generateRandomSku } from "../utils/utils.js";
export const addSkuToRequest = (req, res, next) => {
    try {
        if (req.body.sku) {
            return next();
        }
        req.body.sku = generateRandomSku();
        next()

    } catch (error) {
        next({
            status: 500,
            message: "Failed to generate unique SKU",
            details: error.message || null,
        });

    }
}