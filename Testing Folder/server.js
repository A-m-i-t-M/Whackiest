const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Frontend URL
    credentials: true,
}));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const mandirRoutes=require('./routes/mandirRoutes')
app.use('/api/mandir',mandirRoutes);

const purohitRoutes=require('./routes/purohitRoutes')
app.use('/api/purohit',purohitRoutes)

const itemRoutes=require('./routes/itemRoutes')
app.use('/api/item',itemRoutes)

const serviceRoutes=require('./routes/serviceRoutes')
app.use('/api/item',serviceRoutes)

