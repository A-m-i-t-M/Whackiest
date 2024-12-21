import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import {bhaktMiddleware} from "../middleware/bhaktMiddleware.js";
import {createQuestion,getQAsforClient,getQuestionsForAdmin,deleteQuestion,giveAnswer } from "../controllers/qa.controller.js"

const router = express.Router();

router.post("/bhakt/create",bhaktMiddleware,createQuestion);
router.post("/bhakt/",bhaktMiddleware,getQAsforClient);
router.post("/admin",authMiddleware,getQuestionsForAdmin);
router.post("/admin/answer",authMiddleware,giveAnswer);
router.post("/bhakt/delete",bhaktMiddleware,deleteQuestion);

export default router;
