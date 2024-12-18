import express from "express";

import {createItem, deleteItem, getItems} from '../controllers/item.controller.js';

const router = express.Router();

router.post('/create', protect, createItem); // Protected route to create notebook
router.get('/', getItems); // Protected route to fetch all notebooks
router.post('/delete', protect, deleteItem);

export default router;