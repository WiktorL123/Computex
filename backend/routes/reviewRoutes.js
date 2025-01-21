import express from "express";
import {getAllReviews} from "../controllers/reviewController.js";
import {getReviewById} from "../controllers/reviewController.js";
import {editReview} from "../controllers/reviewController.js";
import {addReview} from "../controllers/reviewController.js";
import {deleteReview} from "../controllers/reviewController.js"
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";
export const reviewRouter = express.Router();



reviewRouter.get('/', getAllReviews )

reviewRouter.get('/:id',  getReviewById)


reviewRouter.use(verifyTokenMiddleware);

reviewRouter.put('/:id/edit', editReview)

reviewRouter.post('/',  addReview)

reviewRouter.delete('/:id', deleteReview)