import express from "express";
import {createMandir, deleteMandir} from '../controllers/mandir.controller';
import { getAllMandirs } from "../controllers/getMandir.controller.js";

const router = express.Router();

router.post('/create', protect, createMandir); 
router.get('/', protect, getAllMandirs); 
router.post("/delete", protect, deleteMandir);

export default router;