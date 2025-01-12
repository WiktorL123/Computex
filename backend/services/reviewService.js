import Review from "../models/Review.js";
import {createError} from "../utils/utils.js";

export const getAllReviews = async () => {
    try{
        const reviews = await Review.find({})

        return reviews
    }
    catch (err){
        throw createError(
            500 || error.status,
            'Failed to get reviews' || error.message,
            error.details || null
        )
    }

}
export const getReviewById = async (id) => {
    try {
        const review = await Review.findById(id)
        if (!review){
           throw createError(404, `Failed to find Review with id ${id} `)
        }
        return review

    }catch(err){
        if (err.status === 404)throw err
        throw createError(
            500 || error.status,
            'Failed to get Review' || error.message,
            error.details || null
        )
    }
}
export const editReview = async (reviewData) =>{
    try {

        let review = await Review.findById(reviewData.id)
        if (!review){
           throw createError(404, `Failed to find Review with id ${reviewData.id} `)
        }
        Object.assign(review, reviewData)
        await review.save()
        return review
    }
    catch(err){
        throw createError(
            500 || error.status,
            'Failed to update Review' || error.message,
            error.details || null
        )
    }
}

export const addReview = async (reviewData) =>{
    try {

        const newReview = new Review(reviewData)
        await newReview.save()
        return newReview

    }
    catch(err){
        throw createError(
            500 || error.status,
            'Failed to add `Review`' || error.message,
            error.details || null
        )
    }
}

export const deleteReview = async (id) =>{
        try {
            const review = await Review.findById(id)
            if (!review){
               createError(404, `Review with id ${id} not found`)
            }
            await review.deleteOne()
            return review
        }
        catch (err){
            throw createError(
                500 || error.status,
                'Failed to delete Review' || error.message,
                error.details || null
            )
    }
}
