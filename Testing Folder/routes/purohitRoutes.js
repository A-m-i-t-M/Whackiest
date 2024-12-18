// const express = require('express');
// const { protect } = require('../middleware/authMiddleware');
import express from "express";
import { createPurohit, getPurohits, deletePurohit } from "../controllers/purohitController";
// const {createPurohit,getPurohits,deletePurohit}=require('../controllers/purohitController')

const router = express.Router();

router.post('/create', createPurohit); // Protected route to create notebook
router.get('/', getPurohits); // Protected route to fetch all notebooks
router.post('/delete', deletePurohit);

export default router;