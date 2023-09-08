import express from "express";
import {Login, Register, getAllUsers } from "../controllers/userController.js";

const router=express.Router();

router.get("/api/users",getAllUsers)
router.post("/api/users/register",Register)
router.post("/api/users/login",Login)


export default router;