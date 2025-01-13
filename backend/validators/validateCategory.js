import {body} from "express-validator";

export const validateCategory = [
    body("subcategory_id")
        .isNumeric()
        .withMessage("Subcategory ID must be a numeric value."),
    body("name")
        .isString()
        .withMessage("Category name must be a string.")
        .notEmpty()
        .withMessage("Category name cannot be empty."),
    body("filters")
        .isArray({ min: 1 })
        .withMessage("Filters must be a non-empty array.")
        .custom((filters) => {
            if (filters.some((filter) => typeof filter !== "string" || filter.trim() === "")) {
                throw new Error("All filters must be non-empty strings.");
            }
            return true;
        }),
    body("createdAt")
        .optional()
        .isISO8601()
        .withMessage("createdAt must be a valid ISO8601 date."),
    body("updatedAt")
        .optional()
        .isISO8601()
        .withMessage("updatedAt must be a valid ISO8601 date."),
];
