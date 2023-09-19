import express from "express"
import {verifyToken} from "../middleware/VerifyTokne.js"
import { createCategory, getCategory } from "../controllers/CategoryControlle.js"
const router = express.Router()

router.get("/api/get-category", verifyToken, getCategory)
router.post("/api/create-category", verifyToken, createCategory)


export default router