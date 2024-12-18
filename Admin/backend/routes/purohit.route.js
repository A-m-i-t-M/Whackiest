import express from "express";
import { createPurohit, deletePurohit, getPurohits } from "../controllers/purohit.controller.js";

const router = express.Router();

router.post('/create', createPurohit); // Protected route to create notebook
router.get('/', getPurohits); // Protected route to fetch all notebooks
router.post('/delete', deletePurohit);

export default router;