import express from "express";
import {createService, deleteService, getServices,getAdminServices} from '../controllers/service.controller.js';
import { authMiddleware } from "../middleware/middleware.js";
const router = express.Router();

router.post('/create', authMiddleware, createService); // Protected route to create notebook
router.post('/',getServices); // Protected route to fetch all notebooks
router.post('/delete', authMiddleware, deleteService);
router.get('/admin',authMiddleware,getAdminServices)
export default router;