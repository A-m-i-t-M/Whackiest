import express from 'express';
import { createPaymentIntent } from '../controllers/payment.controller.js';
import {bhaktMiddleware} from '../middleware/bhaktMiddleware.js'

const router = express.Router();

router.post('/makepayment',createPaymentIntent);

export default router;
