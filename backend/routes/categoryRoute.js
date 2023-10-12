import express from "express"
import {verifyToken} from "../middleware/VerifyTokne.js"
import { createCategory, deleteCategory, getCategory, getCategoryHome, updateCategory } from "../controllers/CategoryControlle.js"
const router = express.Router()

router.get("/api/category/home", getCategoryHome)

router.get("/api/get-category", verifyToken, getCategory)
router.post("/api/create-category", verifyToken, createCategory)
router.put("/api/update-category/:id", verifyToken, updateCategory)
router.delete("/api/delete-category/:id", verifyToken, deleteCategory)
export default router