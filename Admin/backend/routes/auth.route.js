import express from "express";
import {signUP, signIN} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signUP);
router.post("/signin", signIN);

export default router;