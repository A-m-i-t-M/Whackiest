import express from "express";
import {authMiddleware} from '../middleware/middleware.js'
import {getAdminBookings} from '../controllers/AdminBooking.controller.js'

const router = express.Router();

router.get('/admin',authMiddleware,getAdminBookings);

export default router;