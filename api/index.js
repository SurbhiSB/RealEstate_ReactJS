import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error);
})

const app = express();

// Use morgan middleware (in 'dev' format)
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // ✅ allow your frontend
  credentials: true                // if using cookies or tokens
}));

app.listen(3000, () => {
    console.log('API started on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({ 
        success: false,
        statusCode,
        message,
     });
});