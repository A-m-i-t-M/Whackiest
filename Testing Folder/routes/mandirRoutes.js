const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createMandir, deleteMandir} = require('../controllers/mandirController');
const {getAllMandirs}=require("../controllers/getMandirController")

const router = express.Router();

router.post('/create', protect, createMandir); // Protected route to create notebook
router.get('/', protect, getAllMandirs); // Protected route to fetch all notebooks
router.post("/delete", protect, deleteMandir);