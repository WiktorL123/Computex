import
{   getAllReviews as getAllReviewsService,
    getReviewById as getReviewByIdService,
    editReview as editReviewService,
    addReview as addReviewService,
    deleteReview as deleteReviewService} from "../services/reviewService.js";

export const getAllReviews =  async (req, res, next) => {
    try {
        const reviews = await getAllReviewsService()
        console.log(`getAllReviews: ${reviews}`)
        res.status(200).json(reviews)
    }
    catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "An unexpected error occurred",
            details: error.details || null,
        });
        next(error)
    }
}
export const getReviewById = async (req, res, next) => {
    try{
        const {id} = req.params
        const review = await getReviewByIdService(id)
        res.status(200).json(review)
    }


    catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "An unexpected error occurred",
            details: error.details || null,
        })
         next(error)
    }

}
export const editReview = async (req, res, next) => {
    try {
        const {id} = req.params
        const reviewData = req.body

        reviewData.id = id
        const review = await editReviewService(reviewData)
        res.status(200).json({message: 'updated' + review})
    }
    catch (error) {
            res.status(error.status || 500).json({
            error: error.message || "An unexpected error occurred",
            details: error.details || null,
        })
    next(error)
    }
}
export const addReview = async (req, res, next) => {
    try {
        const reviewData = req.body;
        const newReview = await addReviewService(reviewData);
        res.status(201).json({
            message: "Review added successfully",
            review: newReview,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "An unexpected error occurred ",
            details: error.details || null,
        });
        next(error);
    }
}
export const deleteReview = async (req, res, next) => {
    try {
        const {id} = req.params
        const review = await deleteReviewService(id)
        res.status(200).json({message: 'deleted' + review})
    }
    catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "An unexpected error occurred",
            details: error.details || null
        })
        next(error)
    }

}
