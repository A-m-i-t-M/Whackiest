import express from "express";
import {signIN, signOut, signUP} from "../controllers/bhakt.controller.js";
const router = express.Router();

router.post("/signup", signUP);
router.post("/signin", signIN);
router.get("/signout", signOut);

export default router;