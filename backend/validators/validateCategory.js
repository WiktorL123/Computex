import {body} from "express-validator";

export const validateCategory = [
    body("category_id")
        .isNumeric()
        .withMessage("Category ID must be a numeric value."),
    body("name")
        .isString()
        .withMessage("Category name must be a string.")
        .notEmpty()
        .withMessage("Category name cannot be empty."),
    body("subcategories")
        .isArray({ min: 1 })
        .withMessage("Subcategories must be a non-empty array."),
    body("subcategories.*.subcategory_id")
        .isNumeric()
        .withMessage("Subcategory ID must be a numeric value."),
    body("subcategories.*.name")
        .isString()
        .withMessage("Subcategory name must be a string.")
        .notEmpty()
        .withMessage("Subcategory name cannot be empty."),
    body("subcategories.*.filters")
        .isArray({ min: 1 })
        .withMessage("Filters must be a non-empty array.")
        .custom((filters) => {
            if (filters.some((filter) => typeof filter !== "string" || filter.trim() === "")) {
                throw new Error("All filters must be non-empty strings.");
            }
            return true;
        }),
];
