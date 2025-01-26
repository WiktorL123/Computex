import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { coonectDB } from './config/dbConfig.js';
import { productsRouter } from "./routes/productsRoutes.js";
import { reviewRouter } from "./routes/reviewRoutes.js";
import { categoriesRouter } from "./routes/categoriesRoutes.js";
import { orderRouter } from "./routes/ordersRoutes.js";
import { usersRouter } from "./routes/userRoutes.js";
import { paymentsRouter } from "./routes/paymentsRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import crypto from "crypto";
import { adminRouter } from "./routes/adminRoutes.js";
import { promotionRouter } from "./routes/promotionRoutes.js";
import { notificationRouter } from "./routes/notificationsRoutes.js";
import * as http from "node:http";
import { Server } from "socket.io";

dotenv.config();
coonectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app); // Tworzenie serwera HTTP
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// Obsługa WebSocket
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('order-status-update', (data) => {
        console.log('Order status update:', data);
        io.emit('order-status-update', data); // Emitowanie wiadomości do wszystkich klientów
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

if (!process.env.SESSION_SECRET) {
    const randomSessionSecret = crypto.randomBytes(32).toString('hex');
    process.env.SESSION_SECRET = randomSessionSecret;
    console.log(`Generated SESSION_SECRET: ${randomSessionSecret}`);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(logger);

// Endpoint testowy
app.get('/', (req, res) => {
    res.send("backend dziala!");
});

app.use('/admin', adminRouter);
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', usersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/cart', cartRouter);
app.use('/auth', authRouter);
app.use('/api/promotions', promotionRouter);
app.use('/api/notifications', notificationRouter);

// Obsługa błędów
app.use(errorHandler);

// Użycie server.listen zamiast app.listen
server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
