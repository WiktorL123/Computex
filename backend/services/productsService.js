import {Product} from "../models/Product.js";

export const getAllProducts = async() => {
    return await Product.find({})
}
export const getProductById = async(id) => {
    return await Product.findById(id)
}
export const addNewProduct = async(productData) => {
   const product = new Product();
   await product.save();
   return product;
}