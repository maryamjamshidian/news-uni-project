import express from "express";
import {Login, Logout, Register, getAllUsers } from "../controllers/userController.js";
import { verifyToken } from './../middleware/VerifyTokne.js';
import { refreshToken } from "../controllers/RefreshToken.js";

const router=express.Router();
router.get("/token", refreshToken)

router.get("/api/users", verifyToken,getAllUsers)
router.post("/api/users/register",verifyToken, Register)
router.post("/api/users/login",Login)
router.delete("/api/users/logout",verifyToken, Logout)


export default router;