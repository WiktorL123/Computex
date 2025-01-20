import express from "express";
import {
    addPromotion,
    getAllPromotions,
    getPromotionById,
    updatePromotion,
    deletePromotion,
} from "../controllers/promotionController.js";
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";
import {addRoleToRequest} from "../middlewares/addRoleToRequest.js";
import {checkRole} from "../middlewares/checkRole.js";

export const promotionRouter = express.Router();


promotionRouter.get("/", getAllPromotions);


promotionRouter.use(verifyTokenMiddleware)
promotionRouter.use(addRoleToRequest)
promotionRouter.use(checkRole)


promotionRouter.post("/", addPromotion);
promotionRouter.get("/:id", getPromotionById);
promotionRouter.put("/:id", updatePromotion);
promotionRouter.delete("/:id", deletePromotion);


