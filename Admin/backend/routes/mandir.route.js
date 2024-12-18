import express from "express";
import {createMandir, deleteMandir} from '../controllers/mandir.controller';
import { getAllMandirs } from "../controllers/getMandir.controller.js";

const router = express.Router();

router.post('/create', protect, createMandir); // Protected route to create notebook
router.get('/', protect, getAllMandirs); // Protected route to fetch all notebooks
router.post("/delete", protect, deleteMandir);

export default router;