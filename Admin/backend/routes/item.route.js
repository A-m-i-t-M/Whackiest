import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import {createItem, deleteItem, getItems,getItemsForAdmin} from '../controllers/item.controller.js';

const router = express.Router();

router.post('/create', authMiddleware, createItem); // Protected route to create notebook
router.post('/',getItems); // Protected route to fetch all notebooks
router.post('/delete', authMiddleware, deleteItem);
router.get('/admin',authMiddleware,getItemsForAdmin);

export default router;