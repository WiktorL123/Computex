import {validationResult} from "express-validator";

export const handleValidationErrors = ( req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "validation failed",
            errors: errors.array()
        })
    }
    next()
}