import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import {bhaktMiddleware} from "../middleware/bhaktMiddleware.js";
import {createLivestream,getLivestream,deleteLivestream,getAdminLiveStream} from "../controllers/livestream.controller.js"

const router = express.Router();

router.post('/create',authMiddleware,createLivestream);
router.post('/',bhaktMiddleware,getLivestream);
router.post('/delete',authMiddleware,deleteLivestream);
router.post('/admin',authMiddleware,getAdminLiveStream);
export default router;