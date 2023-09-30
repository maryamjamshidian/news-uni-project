import express from "express"
import { createNews, deleteNews, getLastNews, getNews, getNewsById, updateNews } from "../controllers/NewsController.js"
import {verifyToken} from "../middleware/VerifyTokne.js"

const router = express.Router()

router.get("/api/news/lastnews", getLastNews)


router.get("/api/news", verifyToken, getNews)
router.post("/api/news", verifyToken,createNews )
router.get("/api/news/:id", verifyToken , getNewsById)
router.put("/api/news/:id", verifyToken, updateNews)
router.delete("/api/news/:id", verifyToken, deleteNews)


export default router;