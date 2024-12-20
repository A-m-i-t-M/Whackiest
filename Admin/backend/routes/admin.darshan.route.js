import express from "express";
import {authMiddleware} from '../middleware/middleware.js'
import {getAdminDarshans} from '../controllers/AdminDarshan.controller.js'

const router = express.Router();

router.get('/admin',authMiddleware,getAdminDarshans);

export default router;
