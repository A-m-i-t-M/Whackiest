import express from "express";
import {signUP, signIN, signOut,getAllTemples} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signUP);
router.post("/signin", signIN);
router.get("/signout", signOut);
router.get("/getalltemples",getAllTemples);
export default router;