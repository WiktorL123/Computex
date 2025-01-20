import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters long"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        maxlength: [500, "Message cannot exceed 500 characters"],
    },
    isRead: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, collection: "Notifications" });

export const Notification = mongoose.model("Notification", notificationSchema);