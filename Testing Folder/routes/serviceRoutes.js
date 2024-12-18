const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const {createService,getServices,deleteService}=require('../controllers/serviceController')

const router = express.Router();

router.post('/create', protect, createService); // Protected route to create notebook
router.get('/', getServices); // Protected route to fetch all notebooks
router.post('/delete', protect, deleteService);