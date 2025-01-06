import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category_id: {type: Number, required: true},
    subcategory_id: {type: Number, required: true},
    filters: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    },
    description: {type: String, default: ''},
    stock: {type: Number, default: 0},
    images: [String]
}, {timestamps: true, collection: 'Products'});


export const Product = mongoose.model('Product', productSchema);