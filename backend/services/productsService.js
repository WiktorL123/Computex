import Product from "../models/Product.js";

export const getAllProducts = async() => {
    return await Product.find({})
}
export const getProductById = async(id) => {
    return await Product.findById(id)
}
export const addNewProduct = async(productData) => {
   const product = new Product(productData);
   await product.save();
   return product;
}
export const updateProductStock = async (id, stock) =>{
    const product = await Product.findById(id)
    if (!product) {
        throw new Error('Product not found');
    }
    product.stock = stock;
    await product.save();
    return product;
}