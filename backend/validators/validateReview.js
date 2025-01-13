import {body} from "express-validator";

export const validateReview = [
    body("product_id")
        .isMongoId()
        .withMessage("Invalid product_id format"),
    body("user_id")
        .isMongoId()
        .withMessage("Invalid user_id format"),
    body("rating")
        .isFloat({ min: 0, max: 5 })
        .withMessage("Rating must be a number between 0 and 5"),
    body("comment")
        .isString()
        .withMessage("Comment must be a string")
        .notEmpty()
        .withMessage("Comment is required"),
];
