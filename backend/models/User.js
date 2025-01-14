import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"]},
    second_name: {type: String, required: [true, "second name is required"]},
    email: {type: String, required: [true, "email is required"]},
    password: {type: String, required: [true, "password is required"]},
    is_verified: {type: Boolean, default: false},
    verify_otp: {type: String, default: null}
    reset_otp: {type: String, default: null},
    reset_otp_expired_at: {type: Number, default: 0},

})