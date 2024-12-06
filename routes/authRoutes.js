import express from "express";
import { loginUser, registerUser, getUser} from "../controllers/authController.js";
import {requireAuth} from "../middlewares/requireAuth.js"

const router = express.Router();


router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/user", requireAuth , getUser) 

export default router;

