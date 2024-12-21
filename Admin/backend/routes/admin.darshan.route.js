import express from "express";
import {authMiddleware} from '../middleware/middleware.js'
import {getAdminDarshans,cancelDarshan} from '../controllers/AdminDarshan.controller.js'

const router = express.Router();

router.get('/admin',authMiddleware,getAdminDarshans);
router.post('/admin/cancel',authMiddleware,cancelDarshan)
export default router;
