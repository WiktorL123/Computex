import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name is required']},
    price: {type: Number, required: true, min: 0},
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


export default mongoose.model('Product', productSchema);