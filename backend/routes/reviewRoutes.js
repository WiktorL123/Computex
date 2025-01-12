import express from "express";
import {getAllReviews} from "../controllers/reviewController.js";
import {getReviewById} from "../controllers/reviewController.js";
import {editReview} from "../controllers/reviewController.js";
import {addReview} from "../controllers/reviewController.js";
import {deleteReview} from "../controllers/reviewController.js"
import {validateId} from "../middlewares/validateIdMiddleware.js";
export const reviewRouter = express.Router();

reviewRouter.get('/', getAllReviews )

reviewRouter.get('/:id', validateId('id'),  getReviewById)

reviewRouter.put('/:id/edit', validateId('id'), editReview)

reviewRouter.post('/', addReview)

reviewRouter.delete('/:id', validateId('id'), deleteReview)