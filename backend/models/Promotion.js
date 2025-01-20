import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Promotion name is required"],
        minlength: [3, "Promotion name must be at least 3 characters long"],
    },
    description: {
        type: String,
        maxlength: [255, "Description cannot exceed 255 characters"],
    },
    discountPercentage: {
        type: Number,
        required: [true, "Discount percentage is required"],
        min: [0, "Discount percentage cannot be negative"],
        max: [100, "Discount percentage cannot exceed 100"],
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"],
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "End date must be after the start date",
        },
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    applicableProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
}, { timestamps: true, collection: "Promotions" });

export const Promotion = mongoose.model("Promotion", promotionSchema);
