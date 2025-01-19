import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    product_id:
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Product' },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User' },
    rating:
        { type: Number,
            required: [true, 'rating is required'],
            min: 1,
            max: 5
        },
    comment: { type: String, required: [true, 'comment is required'], minLength: 5, maxLength: 32 },
}, {timestamps: true, collection: 'Reviews'},)
export default mongoose.model('Reviews', reviewSchema);
