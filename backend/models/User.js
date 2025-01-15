import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"]},
    second_name: {type: String, required: [true, "second name is required"]},
    email: {type: String, required: [true, "email is required"]},
    password: {type: String, required: [true, "password is required"]},
    is_verified: {type: Boolean, default: false},
    verify_otp: {type: String, default: null},
    verify_otp_expired_at: {type: Number, default: 0},
    reset_otp: {type: String, default: null},
    reset_otp_expired_at: {type: Number, default: 0},
    addresses: {type:
            {
               street: {type: String, required: [true, "street is required"] },
               city: {type: String, required: [true, "city is required"] },
               country: {type: String, required: [true, "street is required"] },
               zip_code: {type: String, required: [true, "street is required"] },

            }},
    role: {type: String, required: true, default: "user" }

})

export const User = mongoose.model("User", UserSchema);