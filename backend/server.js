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

dotenv.config();
coonectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Generowanie losowego klucza sesji i zapis do process.env
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

// Konfiguracja sesji
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET, // Klucz tajny do podpisywania sesji
//         resave: false, // Nie zapisywać sesji, jeśli nie było zmian
//         saveUninitialized: false, // Nie tworzyć pustych sesji
//         cookie: {
//             maxAge: 1000 * 60 * 60 * 24, // Czas życia ciasteczka (1 dzień)
//             httpOnly: true, // Ciasteczko dostępne tylko po stronie serwera
//         },
//         store: MongoStore.create({
//             mongoUrl: process.env.MONGODB_URI, // Adres URI do MongoDB
//             collectionName: "sessions", // Nazwa kolekcji do przechowywania sesji
//         }),
//     })
// );

app.get('/', (req, res) => {
    res.send("backend dziala!");
});

app.post('/api/test', (req, res) => {
    res.json({
        message: 'Dane otrzymane!',
        receivedBody: req.body,
    });
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

// app.use((req, res) => {
//     res.status(404).render("404");
// });

app.get('/error', (req, res) => {
    throw new Error('błąd');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
