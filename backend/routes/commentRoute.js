import express from "express"
import { createComment, deleteComment, getAllComment, updateComment } from "../controllers/CommentController.js";
import {verifyToken} from "../middleware/VerifyTokne.js"


const router = express.Router()

router.get("/api/comment", verifyToken, getAllComment)
router.post("/api/comment", createComment)
router.put("/api/comment/:id", verifyToken, updateComment)
router.delete("/api/comment/:id", verifyToken, deleteComment)

export default router;