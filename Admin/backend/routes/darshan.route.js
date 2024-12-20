import express from "express";
import {bhaktMiddleware} from '../middleware/bhaktMiddleware.js'
import {createDarshan,getDarshans,deleteDarshan} from '../controllers/darshan.controller.js'

const router = express.Router();

router.post("/create",bhaktMiddleware,createDarshan);
router.get("/",bhaktMiddleware,getDarshans);
router.post("/delete",bhaktMiddleware,deleteDarshan);
export default router;