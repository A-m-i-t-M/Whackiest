const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const {createPurohit,getPurohits,deletePurohit}=require('../controllers/purohitController')

const router = express.Router();

router.post('/create', protect, createPurohit); // Protected route to create notebook
router.get('/', getPurohits); // Protected route to fetch all notebooks
router.post('/delete', protect, deletePurohit);