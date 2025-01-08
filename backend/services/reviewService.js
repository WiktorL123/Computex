import Review from "../models/Review.js";

export const getAllReviews = async () => {
    try{
        const reviews = await Review.find({})
        if (!reviews || reviews.length === 0) {
                return []
        }
        return reviews
    }
    catch (err){
        throw {
            status: 500,
            message: `am error has occured:${err.message}`,
            details: err.stack
        }
    }

}
export const getReviewById = async (id) => {
    try {
        const review = await Review.findById(id)
        if (!review){
            return {}
        }
        return review

    }catch(err){
        throw {
            status: 500,
            message: `am error has occured:${err.message}`,
            details: err.stack
        }

    }
}
export const editReview = async (reviewData) =>{
    try {

        let review = await Review.findById(reviewData.id)
        if (!review){
            throw { status: 404, message: "Review not found" };
        }
        Object.assign(review, reviewData)

        await review.save()

        return review
    }
    catch(err){
        throw {
            status: 500,
            message: `am error has occured:${err.message}`,
            details: err.stack
        }
    }
}

export const addReview = async (reviewData) =>{
    try {

        const newReview = new Review(reviewData)
        await newReview.save()
        return newReview

    }
    catch(err){
        throw {
            status: 500,
            message: `am error has occured: ${err.message}`,
            details: err.stack
        }
    }
}

export const deleteReview = async (id) =>{
    try {
        const review = await Review.findById(id)
        if (!review){
            throw { status: 404, message: "Review not found" };
        }
        await review.deleteOne()
        return review
    }
    catch (err){
        throw {
            status: 500,
            message: `am error has occured: ${err.message}`,
            details: err.stack}
    }
}
