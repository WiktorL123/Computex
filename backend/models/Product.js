import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    category_id:
        {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
        },
    filters: {
        type: Map,
        of: String,
        validate: {
            validator: (value) =>{
                const maxFilters = 10
                return Object.keys(value).length <= maxFilters;
            },
            mongoose: 'Maximum number of filters for product is 10'

        }
    },
    description:
        {
            type: String,
            min: 1,
            max: 16
        },
    stock: {
        type: Number,
        min: 1,
        default: 0
    },
    images:
            {
                type: [String],
                default: []
            },
    sku:
        {
            type: String,
            unique: true ,
            match: [/^[a-zA-Z0-9]{8}$/, "SKU must be exactly 8 alphanumeric characters"],
        },
}, { timestamps: true, collection: 'Products' });

export const Product = mongoose.model("Product", ProductSchema);
