import express from "express";
import { createPurohit, deletePurohit, getPurohits,getPurohitsforAdmin } from "../controllers/purohit.controller.js";
import { authMiddleware } from "../middleware/middleware.js";
const router = express.Router();

router.post('/create',authMiddleware, createPurohit);
router.get('/',getPurohits); 
router.post('/delete',authMiddleware, deletePurohit);
router.get('/admin',authMiddleware,getPurohitsforAdmin)

export default router;