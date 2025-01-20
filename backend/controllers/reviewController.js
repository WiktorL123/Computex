import Review from "../models/Review.js";

export const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find();
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found" });
        }
        res.status(200).json(reviews);
    } catch (error) {
            next(error)
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
        next(error)
    }
};

export const addReview = async (req, res, next) => {
    try {
        const reviewData = req.body;
        const reviewAddedByUser = await Review.find({user_id: reviewData.userId})
        if (reviewAddedByUser.length) {
            res.status(400).send({error: `User can add only one review`, reviewAddedByUser: reviewAddedByUser});
        }
        const newReview = new Review(reviewData);
        await newReview.save();
        res.status(201).json({
            message: "Review added successfully",
            review: newReview,
        });
    } catch (error) {
        next(error)
    }
};

export const editReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {updateData} = req.body
        const review = await Review.findByIdAndUpdate(id, updateData);

        if (!review) {
            return res.status(404).json({ message: `Review with id ${id} not found` });
        }
        res.status(200).json({
            message: "Review updated successfully",
            review,
        });
    } catch (error) {
        next(error)
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({ message: `Review with id ${id} not found` });
        }

        res.status(200).json({
            message: "Review deleted successfully",
            review,
        });
    } catch (error) {
        next(error)
    }
};
