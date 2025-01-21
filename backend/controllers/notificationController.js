import mongoose from "mongoose";
import {Notification} from "../models/Notifications.js";

export const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find();

        if (!notifications.length) {
            return res.status(404).json({ message: "No notifications found" });
        }

        res.status(200).json({
            message: "Notifications retrieved successfully",
            notifications,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        next(error);
    }
};
export const getNotificationById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid notification ID" });
        }

        const notification = await Notification.findById(id);

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({
            message: "Notification retrieved successfully",
            notification,
        });
    } catch (error) {
        console.error("Error fetching notification by ID:", error);
        next(error);
    }
};

export const updateNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, message, isRead } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid notification ID" });
        }

        const updatedNotification = await Notification.findByIdAndUpdate(
            id,
            { title, message, isRead },
            { new: true, runValidators: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({
            message: "Notification updated successfully",
            notification: updatedNotification,
        });
    } catch (error) {
        console.error("Error updating notification:", error);
        next(error);
    }
};
export const deleteNotification = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid notification ID" });
        }

        const deletedNotification = await Notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({
            message: "Notification deleted successfully",
            notification: deletedNotification,
        });
    } catch (error) {
        console.error("Error deleting notification:", error);
        next(error);
    }
};

export const createNotification = async (req, res, next) => {
    try {
        const { user_id, title, message } = req.body;


        if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: "Invalid or missing user ID" });
        }

        if (!title || title.length < 3) {
            return res.status(400).json({ message: "Title is required and must be at least 3 characters long" });
        }

        if (!message || message.length > 500) {
            return res.status(400).json({ message: "Message is required and cannot exceed 500 characters" });
        }


        const notification = new Notification({
            user_id,
            title,
            message,
            isRead: false,
        });

        await notification.save();

        res.status(201).json({
            message: "Notification created successfully",
            notification,
        });
    } catch (error) {
        console.error("Error creating notification:", error);
        next(error);
    }
};

