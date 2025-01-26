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
            return res.status(400).json({ message: `Invalid product ID` });
        }

        // Agregacja, aby obliczyć średnią ocenę i pobrać recenzje
        const reviewsData = await Review.aggregate([
            {
                $match: { product_id: new mongoose.Types.ObjectId(productId) }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }, // Oblicz średnią ocenę
                    reviews: { $push: "$$ROOT" } // Dodaj wszystkie recenzje
                }
            }
        ]);

        // Jeśli brak recenzji dla danego produktu
        if (!reviewsData || reviewsData.length === 0) {
            return res.status(404).json({ message: `No reviews found for product ID: ${productId}` });
        }

        // Pobierz recenzje z ich referencjami użytkowników (populate)
        const populatedReviews = await Review.populate(reviewsData[0].reviews, {
            path: 'user_id',
            select: 'name second_name'
        });

        res.status(200).json({
            averageRating: reviewsData[0].averageRating.toFixed(2), // Zaokrąglij do 2 miejsc po przecinku
            reviews: populatedReviews
        });
    } catch (e) {
        next(e);
    }
};

export const addReview = async (req, res, next) => {
    try {
        const user_id = req.user && req.user.id;
        const { product_id, rating, comment } = req.body;

        if (!user_id) {
            return res.status(403).json({ message: "User not authenticated" });
        }

        if (!product_id || !rating || !comment) {
            return res.status(400).json({ message: "Product ID, rating, and comment are required" });
        }

        const existingReview = await Review.findOne({ user_id, product_id });
        if (existingReview) {
            return res.status(400).json({ message: "User can add only one review per product" });
        }

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

        if (review.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }

        await review.deleteOne();

        res.status(200).json({
            message: "Review deleted successfully",
            review,
        });
    } catch (error) {
        next(error);
    }
};
