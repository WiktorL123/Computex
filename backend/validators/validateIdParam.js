import mongoose from "mongoose";

export const validateIdParam = [
    (req, res, next) => {
        const { id } = req.params;
        if (id && !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid ID format',
                details: `Provided ID: ${id} is not a valid MongoDB ObjectId`
            });
        }
        next();
    }
];
