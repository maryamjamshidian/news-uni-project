import express from "express"
import { createNews, getNews, getNewsById } from "../controllers/NewsController.js"
import {verifyToken} from "../middleware/VerifyTokne.js"

const router = express.Router()



router.get("/api/news", verifyToken, getNews)
router.post("/api/news", verifyToken,createNews )
router.get("/api/news/:id", verifyToken , getNewsById)


export default router;