import express from "express";
import {getAllReviews} from "../controllers/reviewController.js";
import {getReviewById} from "../controllers/reviewController.js";
import {editReview} from "../controllers/reviewController.js";
import {addReview} from "../controllers/reviewController.js";
import {deleteReview} from "../controllers/reviewController.js"
import {validateId} from "../middlewares/validateIdMiddleware.js";
import {validateReview} from "../validators/validateReview.js";
import {handleValidationErrors} from "../middlewares/handleValidationErrors.js";
export const reviewRouter = express.Router();

reviewRouter.get('/', getAllReviews )

reviewRouter.get('/:id', validateId('id'),  getReviewById)

reviewRouter.put('/:id/edit', validateReview, handleValidationErrors, validateId('id'), editReview)

reviewRouter.post('/', validateReview, handleValidationErrors,  addReview)

reviewRouter.delete('/:id', validateId('id'), deleteReview)