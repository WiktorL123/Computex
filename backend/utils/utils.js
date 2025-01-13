import mongoose from "mongoose";

export const createError = (status, message, details = null) =>({
    status,
    message,
    details,
})
export const isValidObjectId = (id) =>mongoose.Types.ObjectId.isValid(id)

export const generateRandomSku = () =>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let sku = ""
    for (let i =0; i<8; i++)
        sku += chars[Math.floor(Math.random() * chars.length)]
    return sku
}