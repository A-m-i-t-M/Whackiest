import express from "express";
import {authMiddleware} from '../middleware/middleware.js'
import {getAdminBookings,cancelBooking} from '../controllers/AdminBooking.controller.js'

const router = express.Router();

router.get('/admin',authMiddleware,getAdminBookings);
router.post('/admin/cancel',authMiddleware,cancelBooking)
export default router;