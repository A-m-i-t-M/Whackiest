import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{console.log("Connected to the Database...")})
.catch((e)=>{console.log(e)})

const app = express();
app.use(express.json());
app.use(cookieParser);

app.listen(4000, ()=>{
    console.log("Server is up & running");
});

app.use('/backend/auth', authRouter);




app.use((error, req, res, next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});