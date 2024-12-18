const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const {createItem,getItems,deleteItem}=require('../controllers/itemController')

const router = express.Router();

router.post('/create', protect, createItem); // Protected route to create notebook
router.get('/', getItems); // Protected route to fetch all notebooks
router.post('/delete', protect, deleteItem);