import { body } from "express-validator";

export const validateProduct = [
    body("name")
        .isString()
        .withMessage("Product name must be a string.")
        .notEmpty()
        .withMessage("Product name cannot be empty."),
    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number."),
    body("category_id")
        .isNumeric()
        .withMessage("Category ID must be a numeric value."),
    body("subcategory_id")
        .isNumeric()
        .withMessage("Subcategory ID must be a numeric value."),
    body("filters")
        .isObject()
        .withMessage("Filters must be an object.")
        .custom((filters) => {
            if (Object.values(filters).some((value) => typeof value !== "string" || value.trim() === "")) {
                throw new Error("All filter values must be non-empty strings.");
            }
            return true;
        }),
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string."),
    body("stock")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer."),
    body("images")
        .isArray({ min: 1 })
        .withMessage("Images must be a non-empty array.")
        .custom((images) => {
            if (images.some((url) => !url.startsWith("http://") && !url.startsWith("https://"))) {
                throw new Error("All image URLs must start with http:// or https://.");
            }
            return true;
        }),
    body("sku")
        .isString()
        .withMessage("SKU must be a string.")
        .isLength({ min: 8, max: 8 })
        .withMessage("SKU must be exactly 8 characters long."),
];
