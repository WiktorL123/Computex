import {addRoleToRequest} from "../middlewares/addRoleToRequest.js";
import {checkRole} from "../middlewares/checkRole.js";
import {createNotification} from "../controllers/notificationController.js";

const express = require("express");
const {verifyTokenMiddleware} = require("../middlewares/verifyTokenMiddleware.js");
const {getAllNotifications, getNotificationById, updateNotification, deleteNotification} = require("../controllers/notificationController.js");
export const notificationRouter = express.Router();

notificationRouter.use(verifyTokenMiddleware);


notificationRouter.get("/", getAllNotifications);
notificationRouter.get("/:id", getNotificationById);
notificationRouter.put("/:id", updateNotification);
notificationRouter.delete("/:id", deleteNotification);
notificationRouter.post('/', addRoleToRequest, checkRole, createNotification);