import {body} from "express-validator";

export const validateOrder = [
    body("user_id")
        .isMongoId()
        .withMessage("Invalid user_id format"),
    body("products")
        .isArray()
        .withMessage("Products must be an array")
        .notEmpty()
        .withMessage("Products array cannot be empty"),
    body("products.*.product_id")
        .isMongoId()
        .withMessage("Invalid product_id format"),
    body("products.*.quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),
    body("status")
        .isIn(["pending", "completed", "rejected"])
        .withMessage("Invalid status value"),
];
