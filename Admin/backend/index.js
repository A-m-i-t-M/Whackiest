import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors package
import authRouter from './routes/auth.route.js';
import purohitRouter from './routes/purohit.route.js';
import itemRouter from './routes/item.route.js';
import serviceRouter from './routes/service.route.js';
import bhaktRouter from './routes/bhakt.route.js';
import darshanRouter from './routes/darshan.route.js';
import adminDarshanRouter from './routes/admin.darshan.route.js';
import bookingRouter from './routes/booking.route.js';
import adminBookingRouter from './routes/admin.booking.route.js';
import livestreamRouter from './routes/livestream.route.js';
import qaRouter from './routes/qa.routes.js';
import paymentRouter from './routes/payment.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to the Database...');
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and other credentials
}));
app.use(express.json());
app.use(cookieParser());

// Start server
app.listen(3000, () => {
  console.log('Server is up & running...');
});

// Routes
app.use('/backend/auth', authRouter);
app.use('/backend/purohit', purohitRouter);
app.use('/backend/itemm', itemRouter);
app.use('/backend/service', serviceRouter);
app.use('/backend/bhakt/auth', bhaktRouter);
app.use('/backend/bhakt/darshan', darshanRouter);
app.use('/backend/darshans', adminDarshanRouter);
app.use('/backend/bhakt/booking', bookingRouter);
app.use('/backend/bookings', adminBookingRouter);
app.use('/backend/livestream', livestreamRouter);
app.use('/backend/qas', qaRouter);
app.use('/backend/payments', paymentRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
