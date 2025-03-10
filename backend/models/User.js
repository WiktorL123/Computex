import mongoose from "mongoose";
import {hashPassword} from "../middlewares/hashPassword.js";

export const addressSchema = new mongoose.Schema({


    street:
        {   type: String,
            required: true,
            minLength: 3, maxLength: 16
        },
    city: { type: String, required: true, minLength: 3, maxLength: 16 },
    country: { type: String, required: true, minLength: 3, maxLength: 16 },
    zip_code: {
        type: String,
        required: true,
        match: [/^\d{5}$/, "Zip code must be exactly 5 digits"]
    },
}, {_id: true});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    second_name: {
        type: String,
        required: [true, "Second name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, "Please enter a valid password"]
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    verify_otp: {
        type: String,
        default: ""
    },
    verify_otp_expired_at: {
        type: Number,
        default: 0
    },
    reset_otp: {
        type: String,
        default: ""
    },
    reset_otp_expired_at: {
        type: Number,
        default: 0
    },
    addresses: {
        type: [addressSchema],
        default: [],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, {
    timestamps: true,
    collection: "Users",
    strict: true
});
hashPassword(userSchema);
export const User = mongoose.model("User", userSchema);
