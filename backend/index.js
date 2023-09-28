import express from "express";
import db from "./config/Database.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import categoryRoutes from "./routes/categoryRoute.js"
import videoRoutes from "./routes/videoRoutes.js"
import newsRoutes from "./routes/newsRoute.js"

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("database conneted");
    // await db.sync();
} catch (error) {
  console.log(error);
}
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"))
app.use(cookieParser());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(videoRoutes);
app.use(newsRoutes);



app.listen(5000, () => console.log("server runnig"));
