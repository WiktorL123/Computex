import { Promotion } from "../models/Promotion.js";
import mongoose from "mongoose";

export const addPromotion = async (req, res, next) => {
    try {
        const { name, description, discountPercentage, startDate, endDate, applicableProducts } = req.body;

        const promotion = new Promotion({
            name,
            description,
            discountPercentage,
            startDate,
            endDate,
            applicableProducts,
        });

        await promotion.save();
        res.status(201).json({ message: "Promotion added successfully", promotion });
    } catch (error) {
        next(error);
    }
};
export const getAllPromotions = async (req, res, next) => {
    try {
        const promotions = await Promotion.find().populate("applicableProducts");

        if (!promotions.length) {
            return res.status(404).json({ message: "No promotions found" });
        }

        res.status(200).json(promotions);
    } catch (error) {
        next(error);
    }
};
export const getPromotionById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid promotion ID" });
        }

        const promotion = await Promotion.findById(id).populate("applicableProducts");

        if (!promotion) {
            return res.status(404).json({ message: "Promotion not found" });
        }

        res.status(200).json(promotion);
    } catch (error) {
        next(error);
    }
};
export const updatePromotion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid promotion ID" });
        }

        const updatedPromotion = await Promotion.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedPromotion) {
            return res.status(404).json({ message: "Promotion not found" });
        }

        res.status(200).json({ message: "Promotion updated successfully", promotion: updatedPromotion });
    } catch (error) {
        next(error);
    }
};
export const deletePromotion = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid promotion ID" });
        }

        const deletedPromotion = await Promotion.findByIdAndDelete(id);

        if (!deletedPromotion) {
            return res.status(404).json({ message: "Promotion not found" });
        }

        res.status(200).json({ message: "Promotion deleted successfully", promotion: deletedPromotion });
    } catch (error) {
        next(error);
    }
};
