import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan('dev'));

// simple test route
app.get('/health', (req, res) => {
res.json({ ok: true, message: 'X1 backend alive' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log('X1 backend running on port', PORT);
});
