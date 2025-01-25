import Review from "../models/Review.js";
import mongoose from "mongoose";

export const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find();
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found" });
        }
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

export const getReviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: `Review with id ${id} not found` });
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

export const getReviewsByProductId = async (req, res, next) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(404).json({ message: `invalid ID` });
        }

        const reviews = await Review.find({product_id: productId})
            .populate({
                path: 'user_id',
                select: 'name second_name',
            })
        if (!reviews) {
            return res.status(404).json({ message: `review not found` });
        }

        res.status(200).json(reviews);
    }
    catch (e){
        next(e);
    }
}

export const addReview = async (req, res, next) => {
    try {
        const user_id = req.user && req.user.id; // Pobieramy `id` z `req.user`
        const { product_id, rating, comment } = req.body;

        // Sprawdzenie, czy użytkownik jest uwierzytelniony
        if (!user_id) {
            return res.status(403).json({ error: "User not authenticated" });
        }

        // Walidacja danych wejściowych
        if (!product_id || !rating || !comment) {
            return res.status(400).json({ error: "Product ID, rating, and comment are required" });
        }

        // Sprawdzenie, czy użytkownik już dodał recenzję dla produktu
        const existingReview = await Review.findOne({ user_id, product_id });
        if (existingReview) {
            return res.status(400).json({ error: "User can add only one review per product" });
        }

        // Tworzenie nowej recenzji
        const newReview = new Review({
            user_id,
            product_id,
            rating,
            comment,
        });

        await newReview.save();

        res.status(201).json({
            message: "Review added successfully",
            review: newReview,
        });
    } catch (error) {
        next(error);
    }
};

export const editReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: `Review with id ${id} not found` });
        }

        if (review.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to edit this review" });
        }

        Object.assign(review, updateData);
        await review.save();

        res.status(200).json({
            message: "Review updated successfully",
            review,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: `Review with id ${id} not found` });
        }

        // Sprawdzenie, czy użytkownik jest właścicielem recenzji
        if (review.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }

        await review.remove();

        res.status(200).json({
            message: "Review deleted successfully",
            review,
        });
    } catch (error) {
        next(error);
    }
};
