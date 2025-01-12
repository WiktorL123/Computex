import mongoose from "mongoose";

export const createError = (status, message, details = null) =>({
    status,
    message,
    details,
})
export const isValidObjectId = (id) =>mongoose.Types.ObjectId.isValid(id)