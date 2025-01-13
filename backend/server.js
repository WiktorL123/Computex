import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { coonectDB } from './config/dbConfig.js';
import { productsRouter } from "./routes/productsRoutes.js";
import { reviewRouter } from "./routes/reviewRoutes.js";
import { categoriesRouter } from "./routes/categoriesRoutes.js";
import { orderRouter } from "./routes/ordersRoutes.js";

dotenv.config();
coonectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use("/public", express.static(path.join(__dirname, "public")));


const port = process.env.PORT || 3000;
app.use(express.json());

app.use(logger);

app.get('/', (req, res) => {
    res.send("backend dziala!");
});

app.post('/api/test', (req, res) => {
    res.json({
        message: 'Dane otrzymane!',
        receivedBody: req.body,
    });
});

app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', orderRouter);

app.get('/error', (req, res) => {
    throw new Error('błąd');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
