import express from "express"
import {verifyToken} from "../middleware/VerifyTokne.js"
import { createVideo } from "../controllers/VideoController.js";

const router = express.Router()


router.post("/api/create-video", verifyToken, createVideo)

export default router;