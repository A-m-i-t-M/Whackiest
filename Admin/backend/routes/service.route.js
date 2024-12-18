import express from "express";
import {createService, deleteService, getServices} from '../controllers/service.controller.js';

const router = express.Router();

router.post('/create', protect, createService); // Protected route to create notebook
router.get('/', getServices); // Protected route to fetch all notebooks
router.post('/delete', protect, deleteService);

export default router;