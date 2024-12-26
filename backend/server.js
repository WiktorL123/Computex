import express from 'express';
import dotenv from 'dotenv';
import {loggerInit} from "./middlewares/logger.js";
import {errorHandler} from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

loggerInit(app);

app.get('/', (req, res) => {
    res.send("backend dziala!")
})
app.post('/api/test', (req, res) => {
    res.json({
        message: 'Dane otrzymane!',
        receivedBody: req.body,
    });
});
app.get('/error', (req, res) => {
    throw new Error('błąd')
})
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})