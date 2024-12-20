import express from "express";
import {bhaktMiddleware} from '../middleware/bhaktMiddleware.js'

import {createBooking,getBookings,deleteBookings} from '../controllers/booking.controller.js'

const router = express.Router();

router.post("/create",bhaktMiddleware,createBooking);
router.get("/",bhaktMiddleware,getBookings);
router.post("/delete",bhaktMiddleware,deleteBookings);

export default router;