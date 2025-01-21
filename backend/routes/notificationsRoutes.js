import express from 'express';
import {addRoleToRequest} from "../middlewares/addRoleToRequest.js";
import {checkRole} from "../middlewares/checkRole.js";
import {
    createNotification,
    deleteNotification,
    getAllNotifications,
    getNotificationById, updateNotification
} from "../controllers/notificationController.js";

import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware.js";

export const notificationRouter = express.Router();

notificationRouter.use(verifyTokenMiddleware);


notificationRouter.get("/", getAllNotifications);
notificationRouter.get("/:id", getNotificationById);

notificationRouter.delete("/:id", deleteNotification);
notificationRouter.post('/', addRoleToRequest, checkRole, createNotification);
notificationRouter.put("/:id", addRoleToRequest, checkRole, updateNotification);